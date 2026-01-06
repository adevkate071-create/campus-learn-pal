import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function normalizeGoogleApiKey(raw: string | undefined) {
  if (!raw) return "";
  // Users sometimes paste "GOOGLE_AI_API_KEY=AIza..." or wrap the key in quotes.
  return raw
    .trim()
    .replace(/^GOOGLE_AI_API_KEY\s*=\s*/i, "")
    .replace(/^['"]/, "")
    .replace(/['"]$/, "")
    .trim();
}

function isLikelyGoogleApiKey(key: string) {
  // Google AI Studio keys are typically ~39 chars and start with AIza
  return key.startsWith("AIza") && key.length >= 30;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const mode = body?.mode as string | undefined;
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    const apiKey = normalizeGoogleApiKey(Deno.env.get("GOOGLE_AI_API_KEY"));
    if (!apiKey) throw new Error("GOOGLE_AI_API_KEY is not configured");

    // Fail fast with a clear error if the stored key is obviously wrong/truncated.
    if (!isLikelyGoogleApiKey(apiKey)) {
      return new Response(
        JSON.stringify({
          error:
            "Google API key looks invalid or truncated. Paste the FULL key value from Google AI Studio (starts with 'AIza' and is ~39 chars).",
          keyLength: apiKey.length,
        }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Non-streaming health check used by the "Test Connection" button.
    if (mode === "health") {
      console.log("Running Gemini health check...", { keyLength: apiKey.length });

      const ping = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: "ping" }] }],
            generationConfig: { maxOutputTokens: 4 },
          }),
        },
      );

      if (!ping.ok) {
        const errorText = await ping.text();
        const isKeyInvalid =
          errorText.includes("API_KEY_INVALID") || errorText.includes("API key not valid");

        return new Response(
          JSON.stringify({
            ok: false,
            error: isKeyInvalid
              ? "Google API key is invalid (rejected by Google). Create a new key in Google AI Studio and paste the full AIza... value."
              : "Health check failed.",
            details: errorText,
            keyLength: apiKey.length,
          }),
          {
            status: isKeyInvalid ? 401 : 500,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      return new Response(
        JSON.stringify({ ok: true, status: "ok", keyLength: apiKey.length, model: "gemini-2.5-flash-lite" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    console.log("Sending request to Google Gemini AI...", { keyLength: apiKey.length });

    const systemPrompt =
      "You are StudyBuddy AI, a helpful engineering tutor. You help students with their doubts in physics, mathematics, chemistry, and engineering subjects. Provide clear, step-by-step explanations with formulas when needed. Keep your responses concise but thorough.";

    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: String(msg.content ?? "") }],
    }));

    if (contents.length > 0 && contents[0].role === "user") {
      contents[0].parts[0].text = `${systemPrompt}\n\nUser question: ${contents[0].parts[0].text}`;
    } else if (contents.length === 0) {
      contents.push({ role: "user", parts: [{ text: systemPrompt }] });
    }

    const upstream = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:streamGenerateContent?alt=sse&key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
          },
        }),
      },
    );

    if (!upstream.ok) {
      const errorText = await upstream.text();
      console.error("Google AI error:", upstream.status, errorText);

      if (upstream.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (errorText.includes("API_KEY_INVALID") || errorText.includes("API key not valid")) {
        return new Response(
          JSON.stringify({
            error:
              "Google API rejected the key. Create a NEW key in Google AI Studio and paste ONLY the full AIza... value (no quotes / no GOOGLE_AI_API_KEY=).",
            details: errorText,
            keyLength: apiKey.length,
          }),
          {
            status: 401,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      return new Response(JSON.stringify({ error: "AI service error", details: errorText }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const reader = upstream.body?.getReader();
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    const stream = new ReadableStream({
      async start(controller) {
        if (!reader) {
          controller.close();
          return;
        }

        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const jsonStr = line.slice(6).trim();
            if (!jsonStr || jsonStr === "[DONE]") continue;

            try {
              const parsed = JSON.parse(jsonStr);
              const text = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) {
                const openAIFormat = JSON.stringify({ choices: [{ delta: { content: text } }] });
                controller.enqueue(encoder.encode(`data: ${openAIFormat}\n\n`));
              }
            } catch {
              // Skip malformed JSON
            }
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

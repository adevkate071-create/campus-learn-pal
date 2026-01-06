import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    const SAMBANOVA_API_KEY = Deno.env.get("SAMBANOVA_API_KEY");
    if (!SAMBANOVA_API_KEY) {
      throw new Error("SAMBANOVA_API_KEY is not configured");
    }

    console.log("Sending request to SambaNova AI...");

    const systemPrompt =
      "You are StudyBuddy AI, a helpful engineering tutor. You help students with their doubts in physics, mathematics, chemistry, and engineering subjects. Provide clear, step-by-step explanations with formulas when needed. Keep your responses concise but thorough.";

    const upstream = await fetch("https://api.sambanova.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SAMBANOVA_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "DeepSeek-R1-0528",
        messages: [{ role: "system", content: systemPrompt }, ...(messages ?? [])],
        stream: true,
      }),
    });

    if (!upstream.ok) {
      const errorText = await upstream.text();
      console.error("SambaNova AI error:", upstream.status, errorText);

      if (upstream.status === 401) {
        return new Response(
          JSON.stringify({
            error: "Invalid AI API key (401). Please update SAMBANOVA_API_KEY.",
            details: errorText,
          }),
          {
            status: 401,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      if (upstream.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(
        JSON.stringify({ error: "AI service error", status: upstream.status, details: errorText }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    return new Response(upstream.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

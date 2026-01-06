import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const userMessage = messages?.[messages.length - 1]?.content || "";
    
    console.log("User message:", userMessage);
    console.log("Fetching joke from Official Joke API...");

    const response = await fetch("https://official-joke-api.appspot.com/random_joke", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Joke API error:", response.status);
      return new Response(JSON.stringify({ error: "Joke API error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const jokeData = await response.json();
    console.log("Joke data:", jokeData);

    // Format the joke as a response
    const jokeResponse = `😂 ${jokeData.setup}\n\n👉 ${jokeData.punchline}`;

    // Return as SSE format to maintain compatibility with existing frontend
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        const data = JSON.stringify({
          choices: [{
            delta: { content: jokeResponse }
          }]
        });
        controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        controller.close();
      }
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

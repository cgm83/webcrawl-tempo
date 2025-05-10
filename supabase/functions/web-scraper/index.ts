import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.6";
import { FirecrawlRequest, FirecrawlResponse } from "@shared/types.ts";

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
      status: 200,
    });
  }

  try {
    const {
      url,
      maxDepth = 2,
      limit = 1000,
      onlyMainContent = true,
    } = await req.json();

    // Validate required fields
    if (!url) {
      throw new Error("URL is required");
    }

    // Get the webhook URL from the request headers
    const webhookUrl = req.headers.get("x-webhook-url") || "";

    // Create the request body for Firecrawl
    const requestBody: FirecrawlRequest = {
      url,
      maxDepth,
      limit,
      scrapeOptions: {
        onlyMainContent,
        actions: [{ type: "wait" }],
        blockAds: true,
      },
    };

    // Add webhook if provided
    if (webhookUrl) {
      requestBody.webhook = {
        url: webhookUrl,
      };
    }

    // Make the request to Firecrawl via Pica Passthrough
    const response = await fetch(
      "https://api.picaos.com/v1/passthrough/crawl",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-pica-secret": Deno.env.get("PICA_SECRET_KEY") || "",
          "x-pica-connection-key":
            Deno.env.get("PICA_FIRECRAWL_CONNECTION_KEY") || "",
          "x-pica-action-id":
            "conn_mod_def::GClH_mo3YYg::aIBsc5axSY6zSqWRu0s-hg",
        },
        body: JSON.stringify(requestBody),
      },
    );

    const data: FirecrawlResponse = await response.json();

    if (!response.ok) {
      throw new Error(`Failed to start crawl: ${JSON.stringify(data)}`);
    }

    // Store the crawl job in Supabase if successful
    if (data.success) {
      const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_KEY") || "";
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { error } = await supabase.from("crawl_jobs").insert({
        job_id: data.id,
        url: data.url,
        status: "pending",
        created_at: new Date().toISOString(),
        config: requestBody,
      });

      if (error) {
        console.error("Error storing crawl job:", error);
      }
    }

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error in web scraper function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      status: 400,
    });
  }
});

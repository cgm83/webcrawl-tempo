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

    // Create the request body for Firecrawl
    const requestBody: FirecrawlRequest = {
      url,
      maxDepth,
      limit,
      // Webhook is required and must be defined directly in the main object
      webhook: {
        url: "https://webhook.site/mock-webhook-url",
      },
      scrapeOptions: {
        onlyMainContent,
        // The actions array must include at least one action with type "wait"
        actions: [{ type: "wait" }],
        blockAds: true,
      },
    };

    // Log the full request details for debugging
    console.log(
      "Making request to Firecrawl with body:",
      JSON.stringify(requestBody, null, 2),
    );
    console.log("Using PICA keys:", {
      secretKeyExists: Boolean(Deno.env.get("PICA_SECRET_KEY")),
      connectionKeyExists: Boolean(
        Deno.env.get("PICA_FIRECRAWL_CONNECTION_KEY"),
      ),
    });

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

    console.log("Firecrawl API response status:", response.status);
    console.log(
      "Firecrawl API response headers:",
      Object.fromEntries(response.headers.entries()),
    );

    // Try to parse the response as JSON
    let data;
    const responseText = await response.text();
    try {
      data = JSON.parse(responseText);
      console.log("Firecrawl API response data:", data);
    } catch (e) {
      console.error("Failed to parse response as JSON:", responseText);
      data = { success: false, error: "Invalid JSON response" };
    }

    if (!response.ok) {
      // Return the error from the API but with a 200 status to the client
      // This prevents the Edge Function error but still communicates the API error
      return new Response(
        JSON.stringify({
          success: false,
          error: `Firecrawl API error: ${response.status}`,
          details: data,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          status: 200, // Return 200 to prevent Edge Function error
        },
      );
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
    // Return a 200 status with error details to prevent Edge Function error
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        isEdgeFunctionError: true,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        status: 200, // Return 200 to prevent Edge Function error
      },
    );
  }
});

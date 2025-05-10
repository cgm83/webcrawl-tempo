import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type CrawlJob = {
  id: number;
  job_id: string;
  url: string;
  status: string;
  created_at: string;
  updated_at: string | null;
  completed_at: string | null;
  config: any;
  result: any;
};

export function WebScraperResults() {
  const [jobs, setJobs] = useState<CrawlJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCrawlJobs() {
      try {
        const { data, error } = await supabase
          .from("crawl_jobs")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setJobs(data || []);
      } catch (err) {
        console.error("Error fetching crawl jobs:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load crawl jobs",
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCrawlJobs();

    // Set up realtime subscription
    const subscription = supabase
      .channel("crawl_jobs_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "crawl_jobs" },
        (payload) => {
          // Refresh the job list when changes occur
          fetchCrawlJobs();
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-md">
        <h3 className="font-semibold">Error Loading Crawl Jobs</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-muted/30 border rounded-md p-8 text-center">
        <h3 className="font-semibold text-lg mb-2">No Crawl Jobs Yet</h3>
        <p className="text-muted-foreground">
          Start a new web scraping job to see results here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Recent Crawl Jobs</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {jobs.map((job) => (
          <Card key={job.id} className="overflow-hidden">
            <CardHeader className="bg-muted/30 pb-2">
              <CardTitle className="text-base font-medium flex justify-between items-center">
                <span className="truncate">{job.url}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${getStatusBadgeColor(job.status)}`}
                >
                  {job.status}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Job ID:</span>
                  <span className="font-mono">{job.job_id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Started:</span>
                  <span>{new Date(job.created_at).toLocaleString()}</span>
                </div>
                {job.config && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Depth:</span>
                    <span>{job.config.maxDepth || 2}</span>
                  </div>
                )}
                {job.result && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-semibold mb-2">Results</h4>
                    <pre className="bg-muted p-2 rounded text-xs overflow-auto max-h-40">
                      {JSON.stringify(job.result, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function getStatusBadgeColor(status: string): string {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "failed":
      return "bg-red-100 text-red-800";
    case "processing":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

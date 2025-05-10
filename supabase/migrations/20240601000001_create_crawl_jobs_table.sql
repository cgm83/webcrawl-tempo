CREATE TABLE IF NOT EXISTS crawl_jobs (
  id SERIAL PRIMARY KEY,
  job_id TEXT NOT NULL,
  url TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  config JSONB,
  result JSONB
);

-- Enable realtime for the crawl_jobs table
alter publication supabase_realtime add table crawl_jobs;

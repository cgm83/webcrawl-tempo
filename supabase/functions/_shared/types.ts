export interface FirecrawlRequest {
  url: string;
  webhook?: {
    url: string;
    headers?: Record<string, string>;
    metadata?: Record<string, any>;
    events?: string[];
  };
  excludePaths?: string[];
  includePaths?: string[];
  maxDepth?: number;
  ignoreSitemap?: boolean;
  ignoreQueryParameters?: boolean;
  limit?: number;
  allowBackwardLinks?: boolean;
  allowExternalLinks?: boolean;
  scrapeOptions?: {
    formats?: string[];
    onlyMainContent?: boolean;
    includeTags?: string[];
    excludeTags?: string[];
    headers?: Record<string, string>;
    waitFor?: number;
    mobile?: boolean;
    skipTlsVerification?: boolean;
    timeout?: number;
    jsonOptions?: {
      schema?: any;
      systemPrompt?: string;
      prompt?: string;
    };
    actions?: Array<{
      type?: string;
      milliseconds?: number;
      selector?: string;
    }>;
    location?: {
      country?: string;
      languages?: string[];
    };
    removeBase64Images?: boolean;
    blockAds?: boolean;
    proxy?: "basic" | "stealth";
  };
}

export interface FirecrawlResponse {
  success: boolean;
  id: string;
  url: string;
}

export interface WebScraperFormData {
  url: string;
  maxDepth: number;
  limit: number;
  onlyMainContent: boolean;
}

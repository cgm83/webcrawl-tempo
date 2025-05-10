import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WebScraperForm } from "./WebScraperForm";
import { WebScraperResults } from "./WebScraperResults";

export default function WebScraper() {
  return (
    <div className="w-full max-w-4xl mx-auto bg-background">
      <h1 className="text-3xl font-bold mb-6">Web Scraper</h1>
      <p className="text-muted-foreground mb-8">
        Crawl and extract data from websites using Firecrawl's powerful web
        scraping capabilities.
      </p>

      <Tabs defaultValue="new" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="new">New Scrape</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>
        <TabsContent value="new">
          <WebScraperForm />
        </TabsContent>
        <TabsContent value="results">
          <WebScraperResults />
        </TabsContent>
      </Tabs>
    </div>
  );
}

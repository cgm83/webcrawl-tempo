import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { supabase } from "@/lib/supabase";

const formSchema = z.object({
  url: z.string().url({
    message: "Please enter a valid URL including http:// or https://",
  }),
  maxDepth: z.number().min(1).max(10),
  limit: z.number().min(10).max(10000),
  onlyMainContent: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

export function WebScraperForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    id?: string;
    error?: string;
  } | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
      maxDepth: 2,
      limit: 1000,
      onlyMainContent: true,
    },
  });

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke(
        "supabase-functions-web-scraper",
        {
          body: values,
        },
      );

      if (error) {
        throw new Error(error.message);
      }

      // Check if the response indicates an error from the Firecrawl API
      if (!data.success) {
        throw new Error(data.error || "Failed to start crawl job");
      }

      setResult({ success: true, id: data.id });
    } catch (error) {
      console.error("Error starting web scrape:", error);
      setResult({
        success: false,
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="bg-card p-6 rounded-lg border shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Web Scraper</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the full URL of the website you want to scrape
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxDepth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Crawl Depth: {field.value}</FormLabel>
                <FormControl>
                  <Slider
                    min={1}
                    max={10}
                    step={1}
                    defaultValue={[field.value]}
                    onValueChange={(vals) => field.onChange(vals[0])}
                  />
                </FormControl>
                <FormDescription>
                  How many links deep should the crawler go (1-10)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="limit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page Limit: {field.value}</FormLabel>
                <FormControl>
                  <Slider
                    min={10}
                    max={10000}
                    step={10}
                    defaultValue={[field.value]}
                    onValueChange={(vals) => field.onChange(vals[0])}
                  />
                </FormControl>
                <FormDescription>
                  Maximum number of pages to crawl (10-10,000)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="onlyMainContent"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Extract only main content</FormLabel>
                  <FormDescription>
                    Filter out navigation, footers, and other non-content
                    elements
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Starting Crawl...
              </>
            ) : (
              "Start Web Scraping"
            )}
          </Button>
        </form>
      </Form>

      {result && (
        <div
          className={`mt-6 p-4 rounded-md ${result.success ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}
        >
          {result.success ? (
            <>
              <h3 className="font-semibold">Crawl Started Successfully!</h3>
              <p className="mt-1">Job ID: {result.id}</p>
              <p className="mt-2 text-sm">
                The crawler is now processing your request. Results will be
                stored in the database.
              </p>
            </>
          ) : (
            <>
              <h3 className="font-semibold">Error Starting Crawl</h3>
              <p className="mt-1">{result.error}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

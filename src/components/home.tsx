import React from "react";
import Layout from "./Layout";
import WelcomeSection from "./WelcomeSection";
import Counter from "./Counter";
import WebScraper from "./WebScraper";

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <WelcomeSection
          title="Web Scraper with Firecrawl"
          description="A powerful web scraping tool built with Vite, React, and Firecrawl"
        />

        <div className="mt-12 w-full max-w-4xl mx-auto">
          <WebScraper />
        </div>

        <div className="mt-12 w-full max-w-md mx-auto">
          <div className="bg-card shadow-lg rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Interactive Example
            </h2>
            <Counter />
          </div>
        </div>

        <div className="mt-12 w-full max-w-2xl mx-auto">
          <div className="bg-card shadow-lg rounded-lg p-6 border border-border">
            <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground mr-2 text-xs">
                  1
                </span>
                <span>
                  Enter a URL in the Web Scraper form to start crawling a
                  website
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground mr-2 text-xs">
                  2
                </span>
                <span>
                  Adjust the crawl depth and page limit to control how much data
                  is collected
                </span>
              </li>
              <li className="flex items-start">
                <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground mr-2 text-xs">
                  3
                </span>
                <span>
                  View your crawl results in the Results tab after starting a
                  scrape job
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;

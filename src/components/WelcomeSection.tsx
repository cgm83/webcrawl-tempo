import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Database, Globe } from "lucide-react";
import { Link } from "react-router-dom";

interface WelcomeSectionProps {
  title?: string;
  description?: string;
}

const WelcomeSection = ({
  title = "Web Scraper with Firecrawl",
  description = "A powerful web scraping tool built with Vite, React, and Firecrawl",
}: WelcomeSectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-background">
      <div className="flex flex-col items-center text-center max-w-3xl">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-4">
          <div className="bg-gradient-to-br from-purple-400 to-blue-500 p-3 rounded-lg shadow-lg">
            <Globe className="h-10 w-10 text-white" />
          </div>
          <span className="text-4xl font-bold">+</span>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="React logo"
            className="h-16 w-16 animate-spin-slow"
            style={{ animationDuration: "10s" }}
          />
        </div>

        {/* Title and Description */}
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">{description}</p>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
          <div className="bg-card rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Web Scraping</h3>
            <p className="text-sm text-muted-foreground">
              Extract data from any website with customizable depth and content
              filtering.
            </p>
          </div>

          <div className="bg-card rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Data Storage</h3>
            <p className="text-sm text-muted-foreground">
              Automatically store and organize scraped content in your Supabase
              database.
            </p>
          </div>

          <div className="bg-card rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Developer Friendly</h3>
            <p className="text-sm text-muted-foreground">
              Built with modern tools like React, Vite, and Supabase for a
              seamless development experience.
            </p>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="w-full max-w-md bg-card rounded-lg border p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                1
              </span>
              <span>
                Enter a URL in the Web Scraper form to start crawling a website
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                2
              </span>
              <span>
                Adjust the crawl depth and page limit to control how much data
                is collected
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                3
              </span>
              <span>
                View your crawl results in the Results tab after starting a
                scrape job
              </span>
            </li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="mt-2">
          <Link to="/scraper">
            <Button className="group" size="lg">
              Start Scraping
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;

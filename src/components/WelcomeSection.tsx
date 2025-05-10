import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface WelcomeSectionProps {
  title?: string;
  description?: string;
}

const WelcomeSection = ({
  title = "Welcome to Vite + React",
  description = "A lightning-fast React development environment powered by Vite",
}: WelcomeSectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 bg-background">
      <div className="flex flex-col items-center text-center max-w-3xl">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-4">
          <img
            src="/vite.svg"
            alt="Vite logo"
            className="h-16 w-16 animate-pulse"
          />
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

        {/* Getting Started Section */}
        <div className="w-full max-w-md bg-card rounded-lg border p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                1
              </span>
              <span>
                Edit{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-sm">
                  src/App.tsx
                </code>{" "}
                and save to test HMR
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                2
              </span>
              <span>
                Try the Counter component below to see state management
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                3
              </span>
              <span>Check out the documentation links in the navigation</span>
            </li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="mt-8">
          <Button className="group">
            Start Building
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;

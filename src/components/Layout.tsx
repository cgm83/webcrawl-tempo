import React from "react";
import { Link } from "react-router-dom";
import { Github, ExternalLink } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children = <div>Content goes here</div> }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/vite.svg" alt="Vite Logo" className="h-8 w-8" />
            <span className="font-bold text-xl">Vite + React</span>
          </div>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link
                  to="/"
                  className="text-sm hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href="https://vitejs.dev/guide/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-primary transition-colors flex items-center gap-1"
                >
                  Docs <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/vitejs/vite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-primary transition-colors flex items-center gap-1"
                >
                  GitHub <Github size={14} />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>

      <footer className="border-t py-6 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Built with Vite and React</p>
          <div className="mt-2 flex justify-center gap-4">
            <a
              href="https://vitejs.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Vite
            </a>
            <a
              href="https://react.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              React
            </a>
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Tailwind CSS
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

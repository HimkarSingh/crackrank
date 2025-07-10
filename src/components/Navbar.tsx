
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code, User, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <Code className="h-8 w-8 text-foreground drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-all duration-200" />
              <span className="text-xl font-bold text-foreground font-inter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.5)] transition-all duration-200">CrackRank</span>
            </Link>
            
            <div className="hidden md:flex ml-10 space-x-8">
              <Link
                to="/problems"
                className={`px-3 py-2 text-sm font-medium transition-all duration-200 font-inter ${
                  isActive('/problems')
                    ? 'text-foreground border-b-2 border-foreground drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                    : 'text-muted-foreground hover:text-foreground hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]'
                }`}
              >
                Problems
              </Link>
              <Link
                to="/dashboard"
                className={`px-3 py-2 text-sm font-medium transition-all duration-200 font-inter ${
                  isActive('/dashboard')
                    ? 'text-foreground border-b-2 border-foreground drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                    : 'text-muted-foreground hover:text-foreground hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/discuss"
                className={`px-3 py-2 text-sm font-medium transition-all duration-200 font-inter ${
                  isActive('/discuss')
                    ? 'text-foreground border-b-2 border-foreground drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                    : 'text-muted-foreground hover:text-foreground hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]'
                }`}
              >
                Discuss
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 px-0 text-foreground hover:bg-accent hover:text-foreground border border-border hover:border-primary/40 transition-all duration-200"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
              ) : (
                <Moon className="h-4 w-4 drop-shadow-[0_0_6px_rgba(0,0,0,0.6)]" />
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="font-inter bg-transparent border-border text-foreground hover:bg-accent hover:text-foreground hover:border-primary/40 transition-all duration-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]"
            >
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button 
              size="sm" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-inter transition-all duration-200 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:scale-105"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}


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
    <nav className="border-b border-border bg-background shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Code className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-primary font-inter">CrackRank</span>
            </Link>
            
            <div className="hidden md:flex ml-10 space-x-8">
              <Link
                to="/problems"
                className={`px-3 py-2 text-sm font-medium transition-colors font-inter ${
                  isActive('/problems')
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Problems
              </Link>
              <Link
                to="/dashboard"
                className={`px-3 py-2 text-sm font-medium transition-colors font-inter ${
                  isActive('/dashboard')
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/discuss"
                className={`px-3 py-2 text-sm font-medium transition-colors font-inter ${
                  isActive('/discuss')
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-primary'
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
              className="h-9 w-9 px-0"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Button variant="outline" size="sm" className="font-inter">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 font-inter">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

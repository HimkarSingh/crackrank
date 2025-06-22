
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
    <nav className="border-b border-white/10 bg-black backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <Code className="h-8 w-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,1)] transition-all duration-200" />
              <span className="text-xl font-bold text-white font-inter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] transition-all duration-200">CrackRank</span>
            </Link>
            
            <div className="hidden md:flex ml-10 space-x-8">
              <Link
                to="/problems"
                className={`px-3 py-2 text-sm font-medium transition-all duration-200 font-inter ${
                  isActive('/problems')
                    ? 'text-white border-b-2 border-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                    : 'text-gray-300 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]'
                }`}
              >
                Problems
              </Link>
              <Link
                to="/dashboard"
                className={`px-3 py-2 text-sm font-medium transition-all duration-200 font-inter ${
                  isActive('/dashboard')
                    ? 'text-white border-b-2 border-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                    : 'text-gray-300 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]'
                }`}
              >
                Dashboard
              </Link>
              <Link
                to="/discuss"
                className={`px-3 py-2 text-sm font-medium transition-all duration-200 font-inter ${
                  isActive('/discuss')
                    ? 'text-white border-b-2 border-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                    : 'text-gray-300 hover:text-white hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]'
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
              className="h-9 w-9 px-0 text-white hover:bg-white/10 hover:text-white border border-white/20 hover:border-white/40 transition-all duration-200"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
              ) : (
                <Moon className="h-4 w-4 drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="font-inter bg-transparent border-white/30 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-200 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
            >
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
            <Button 
              size="sm" 
              className="bg-white text-black hover:bg-gray-100 font-inter transition-all duration-200 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] hover:scale-105"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

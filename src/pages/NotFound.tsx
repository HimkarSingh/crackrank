
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-inter">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-8xl font-bold mb-4 text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]">404</h1>
          <div className="w-24 h-1 bg-white mx-auto mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"></div>
          <h2 className="text-2xl font-semibold mb-4 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
            Page Not Found
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="bg-transparent border-white/30 text-white hover:bg-white hover:text-black transition-all duration-200 shadow-[0_0_10px_rgba(255,255,255,0.2)] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-white text-black hover:bg-gray-100 transition-all duration-200 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] hover:scale-105"
          >
            <Home className="h-4 w-4 mr-2" />
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

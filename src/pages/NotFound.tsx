
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-filson font-bold mb-6">404</h1>
        <p className="text-xl text-gray-600 mb-8 font-inter">
          This page is still under construction.
        </p>
        <Button asChild className="bg-black hover:bg-gray-800 text-white font-medium transition-colors">
          <a href="/">Return Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

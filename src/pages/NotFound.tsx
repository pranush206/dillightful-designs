import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-[60vh] flex items-center justify-center py-20">
      <div className="container-custom text-center">
        <div className="text-8xl mb-6">🫙</div>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Looks like this jar is empty! The page you're looking for doesn't exist.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/menu">
              <ArrowLeft className="mr-2 h-4 w-4" />
              View Menu
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;

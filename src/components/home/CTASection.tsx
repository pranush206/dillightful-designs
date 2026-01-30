import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container-custom text-center">
        <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
          Ready to Taste the Tradition?
        </h2>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
          Order your favorite pickles today and experience the authentic flavors 
          that have been loved by families for generations.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" variant="accent">
            <Link to="/menu">
              Browse Our Menu
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
          >
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

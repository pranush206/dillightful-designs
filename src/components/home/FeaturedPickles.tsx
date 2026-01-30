import { Link } from "react-router-dom";
import { pickles } from "@/data/pickles";
import { PickleCard } from "@/components/pickles/PickleCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function FeaturedPickles() {
  const featuredPickles = pickles.filter((p) => p.isFeatured);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Customer Favorites
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-4">
            Featured Pickles
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our most loved flavors, crafted with care using time-honored recipes 
            and the freshest ingredients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredPickles.map((pickle) => (
            <PickleCard key={pickle.id} pickle={pickle} />
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/menu">
              View All Pickles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

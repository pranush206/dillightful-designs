import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag } from "lucide-react";
import heroImage from "@/assets/hero-pickles.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] flex items-center overflow-hidden isolate">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImage}
          alt="Traditional homemade pickles"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 py-20">
        <div className="max-w-2xl animate-fade-up">
          <span className="inline-block text-accent font-medium text-sm tracking-wider uppercase mb-4">
            🫙 Handcrafted with Love
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            Taste the Tradition of
            <br />
            <span className="text-accent">7 Hills Pickles</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
            Experience authentic flavors passed down through generations. 
            Our pickles are crafted using traditional recipes with the finest 
            ingredients, sun-ripened to perfection.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="xl" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/menu">
                <ShoppingBag className="mr-2 h-5 w-5" />
                View Menu
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-foreground">
              <Link to="/contact">
                Bulk Order
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}

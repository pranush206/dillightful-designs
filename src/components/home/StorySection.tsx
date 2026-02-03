import { Heart, Sun, Leaf, Award } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Made with Love",
    description: "Every jar is crafted with care using recipes passed down through generations.",
  },
  {
    icon: Sun,
    title: "Sun-Ripened",
    description: "Traditional sun-drying methods enhance the authentic flavors of our pickles.",
  },
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description: "We source the finest seasonal produce from local farmers.",
  },
  {
    icon: Award,
    title: "Quality Promise",
    description: "No preservatives or artificial flavors - just pure, authentic taste.",
  },
];

export function StorySection() {
  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <span className="text-primary font-medium text-sm tracking-wider uppercase">
              Our Story
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mt-2 mb-6">
              A Legacy of Authentic Flavors
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              For over three decades, our family has preserved the art of traditional 
              pickle making. What started in a humble kitchen has now become a beloved 
              brand, but our commitment to authenticity remains unchanged.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Each jar of 7 Hills Natu Ruchulu carries the warmth of home cooking - prepared 
              in small batches using hand-picked ingredients, aromatic spices ground 
              fresh, and the patience of traditional sun-curing methods.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <feature.icon className="h-6 w-6 text-primary mb-2" />
                  <h4 className="font-semibold text-sm mb-1">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl">
                  🥭
                </div>
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-success/20 to-primary/20 flex items-center justify-center text-5xl">
                  🌶️
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent/20 to-pickle-yellow/20 flex items-center justify-center text-5xl">
                  🍋
                </div>
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-pickle-orange/20 to-primary/20 flex items-center justify-center text-6xl">
                  🧄
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-card shadow-card rounded-full px-6 py-3 flex items-center gap-2">
              <span className="text-2xl">👨‍👩‍👧</span>
              <span className="font-semibold text-sm">3 Generations of Tradition</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

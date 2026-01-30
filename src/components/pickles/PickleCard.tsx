import { Pickle } from "@/data/pickles";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Flame } from "lucide-react";
import { useCart } from "@/store/cart";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PickleCardProps {
  pickle: Pickle;
  onClick?: () => void;
}

export function PickleCard({ pickle, onClick }: PickleCardProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    addItem(pickle);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <Card
      variant="interactive"
      className="group overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={pickle.image}
          alt={pickle.name}
          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {pickle.isSpecial && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
            ⭐ Special
          </span>
        )}
        <div className="absolute top-3 right-3 flex gap-0.5">
          {Array.from({ length: pickle.spiceLevel }).map((_, i) => (
            <Flame
              key={i}
              className={cn(
                "h-4 w-4",
                pickle.spiceLevel === 3 ? "text-pickle-red" : "text-pickle-orange"
              )}
              fill="currentColor"
            />
          ))}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display text-lg font-semibold line-clamp-1">{pickle.name}</h3>
          <span className="text-xs text-muted-foreground whitespace-nowrap">{pickle.weight}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4 min-h-[2.5rem]">
          {pickle.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">₹{pickle.price}</span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className={cn(
              "transition-all duration-300",
              isAdding && "scale-110 bg-success"
            )}
          >
            <ShoppingCart className="h-4 w-4 mr-1.5" />
            {isAdding ? "Added!" : "Add"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

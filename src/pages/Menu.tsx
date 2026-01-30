import { useState } from "react";
import { pickles, Category } from "@/data/pickles";
import { PickleCard } from "@/components/pickles/PickleCard";
import { CategoryFilter } from "@/components/pickles/CategoryFilter";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, Flame } from "lucide-react";
import { useCart } from "@/store/cart";
import type { Pickle } from "@/data/pickles";

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [selectedPickle, setSelectedPickle] = useState<Pickle | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCart();

  const filteredPickles =
    selectedCategory === "all"
      ? pickles
      : pickles.filter((p) => p.category.includes(selectedCategory));

  const handlePickleClick = (pickle: Pickle) => {
    setSelectedPickle(pickle);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (selectedPickle) {
      addItem(selectedPickle, quantity);
      setSelectedPickle(null);
      openCart();
    }
  };

  return (
    <main className="py-12">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Our Collection
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-2 mb-4">
            Pickle Menu
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our handcrafted selection of traditional pickles. Each jar is made 
            with love using authentic recipes and the finest ingredients.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10">
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>

        {/* Pickles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPickles.map((pickle) => (
            <PickleCard
              key={pickle.id}
              pickle={pickle}
              onClick={() => handlePickleClick(pickle)}
            />
          ))}
        </div>

        {filteredPickles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No pickles found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Product Detail Dialog */}
      <Dialog open={!!selectedPickle} onOpenChange={() => setSelectedPickle(null)}>
        <DialogContent className="sm:max-w-2xl">
          {selectedPickle && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">
                  {selectedPickle.name}
                </DialogTitle>
              </DialogHeader>
              <div className="grid sm:grid-cols-2 gap-6 mt-4">
                <div className="relative">
                  <img
                    src={selectedPickle.image}
                    alt={selectedPickle.name}
                    className="w-full aspect-square object-cover rounded-xl"
                  />
                  {selectedPickle.isSpecial && (
                    <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-semibold px-2.5 py-1 rounded-full">
                      ⭐ Special Edition
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 mb-3">
                    <span className="text-sm text-muted-foreground mr-2">Spice Level:</span>
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Flame
                        key={i}
                        className={`h-4 w-4 ${
                          i < selectedPickle.spiceLevel
                            ? selectedPickle.spiceLevel === 3
                              ? "text-pickle-red"
                              : "text-pickle-orange"
                            : "text-muted"
                        }`}
                        fill={i < selectedPickle.spiceLevel ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">{selectedPickle.description}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-muted-foreground">Weight:</span>
                    <span className="font-medium">{selectedPickle.weight}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {selectedPickle.category.map((cat) => (
                      <span
                        key={cat}
                        className="text-xs bg-muted px-2 py-1 rounded-full capitalize"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-bold text-primary">
                        ₹{selectedPickle.price}
                      </span>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-semibold w-8 text-center">
                          {quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setQuantity(quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Button size="lg" className="w-full" onClick={handleAddToCart}>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart - ₹{selectedPickle.price * quantity}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Menu;

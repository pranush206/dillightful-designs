import { Category, categories } from "@/data/pickles";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant={selected === cat.id ? "default" : "outline"}
          size="sm"
          className={cn(
            "transition-all duration-300",
            selected === cat.id && "shadow-card"
          )}
          onClick={() => onSelect(cat.id as Category)}
        >
          <span className="mr-1.5">{cat.icon}</span>
          {cat.name}
        </Button>
      ))}
    </div>
  );
}

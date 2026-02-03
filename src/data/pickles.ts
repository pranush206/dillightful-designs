import pickleMangoImg from "@/assets/pickle-mango.jpg";
import pickleLimeImg from "@/assets/pickle-lime.jpg";
import pickleChiliImg from "@/assets/pickle-chili.jpg";
import pickleMixedImg from "@/assets/pickle-mixed.jpg";
import pickleGarlicImg from "@/assets/pickle-garlic.jpg";
import pickleChickenImg from "@/assets/pickle-chicken.jpg";

export type Category = "all" | "veg" | "non-veg" | "spicy" | "special";

export interface Pickle {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: string;
  image: string;
  category: Category[];
  spiceLevel: 1 | 2 | 3;
  isSpecial?: boolean;
  isFeatured?: boolean;
}

export const pickles: Pickle[] = [
  {
    id: "mango-pickle",
    name: "Aam Ka Achar",
    description: "Traditional raw mango pickle with aromatic spices, sun-ripened and preserved in pure mustard oil.",
    price: 249,
    weight: "250g",
    image: pickleMangoImg,
    category: ["veg", "special"],
    spiceLevel: 2,
    isSpecial: true,
    isFeatured: true,
  },
  {
    id: "lime-pickle",
    name: "Nimbu Ka Achar",
    description: "Tangy lime pickle with green chili, hand-cut and slow cured for authentic taste.",
    price: 199,
    weight: "250g",
    image: pickleLimeImg,
    category: ["veg"],
    spiceLevel: 2,
    isFeatured: true,
  },
  {
    id: "chili-pickle",
    name: "Mirchi Ka Achar",
    description: "Fiery whole red chili pickle, stuffed with spices and preserved in aromatic oil.",
    price: 179,
    weight: "200g",
    image: pickleChiliImg,
    category: ["veg", "spicy"],
    spiceLevel: 3,
    isFeatured: true,
  },
  {
    id: "mixed-pickle",
    name: "Mixed Vegetable Achar",
    description: "A colorful medley of carrots, cauliflower, and turnip in traditional spice blend.",
    price: 229,
    weight: "300g",
    image: pickleMixedImg,
    category: ["veg"],
    spiceLevel: 2,
  },
  {
    id: "garlic-pickle",
    name: "Lehsun Ka Achar",
    description: "Whole garlic cloves marinated in aromatic spices and pure mustard oil.",
    price: 219,
    weight: "200g",
    image: pickleGarlicImg,
    category: ["veg", "spicy"],
    spiceLevel: 2,
  },
  {
    id: "chicken-pickle",
    name: "Murgh Ka Achar",
    description: "Tender chicken pieces slow-cooked in authentic pickle spices and preserved in oil.",
    price: 349,
    weight: "250g",
    image: pickleChickenImg,
    category: ["non-veg", "special"],
    spiceLevel: 2,
    isSpecial: true,
  },
];

export const categories = [
  { id: "all", name: "All Pickles", icon: "🫙" },
  { id: "veg", name: "Vegetarian", icon: "🥬" },
  { id: "non-veg", name: "Non-Vegetarian", icon: "🍗" },
  { id: "spicy", name: "Extra Spicy", icon: "🌶️" },
  { id: "special", name: "Special Edition", icon: "⭐" },
] as const;

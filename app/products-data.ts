export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  categoryId: string;
  title: string;
  price: number;
  description: string;
  rating: number;
  reviewCount: number;
  stock: number;
  tags?: string[];
};

export const CATEGORIES: Category[] = [
  { id: "all", name: "All Products" },
  { id: "1", name: "Accessories" },
  { id: "2", name: "Chemicals" },
  { id: "3", name: "Machines" },
];

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    categoryId: "1",
    title: "Microfiber Towel Set",
    price: 14.99,
    description: "Ultra soft absorbent towels",
    rating: 4.8,
    reviewCount: 124,
    stock: 15,
    tags: ["new-arrivals", "featured"],
  },
  {
    id: "p2",
    categoryId: "1",
    title: "Heavy Duty Spray Bottle",
    price: 6.5,
    description: "Professional leak-proof sprayer",
    rating: 4.2,
    reviewCount: 48,
    stock: 0,
    tags: ["featured"],
  },
  {
    id: "p3",
    categoryId: "2",
    title: "Floor Cleaner Concentrate",
    price: 24.99,
    description: "Concentrated eco-friendly formula",
    rating: 4.6,
    reviewCount: 89,
    stock: 5,
    tags: ["new-arrivals"],
  },
  {
    id: "p4",
    categoryId: "2",
    title: "Industrial Degreaser",
    price: 32.0,
    description: "Removes stubborn grease and oil fast",
    rating: 4.9,
    reviewCount: 210,
    stock: 42,
    tags: ["featured"],
  },
  {
    id: "p5",
    categoryId: "3",
    title: "Commercial Backpack Vac",
    price: 289.0,
    description: "High power lightweight vacuum",
    rating: 4.7,
    reviewCount: 35,
    stock: 3,
    tags: ["new-arrivals"],
  },
  {
    id: "p6",
    categoryId: "3",
    title: "Automatic Floor Scrubber",
    price: 1250.0,
    description: "Battery powered walk-behind scrubber",
    rating: 5.0,
    reviewCount: 12,
    stock: 2,
    tags: ["featured"],
  },
];

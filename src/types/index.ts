export type Size = "L" | "XL" | "XXL" | "One Size";

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  details: string[];
  price: number;
  category: "tee" | "cap";
  color: string;
  sizes: Size[];
  soldOutSizes?: Size[];
  image: string;
  images?: string[];
}

export interface CartItem {
  productId: string;
  size: Size;
  quantity: number;
}

export interface CartLine extends CartItem {
  product: Product;
  lineTotal: number;
}

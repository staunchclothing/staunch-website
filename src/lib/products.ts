import type { Product, Size } from "@/types";

export const CONTACT_EMAIL = "info@staunchco.uk";

export const products: Product[] = [
  {
    id: "staunch-cap",
    slug: "staunch-cap",
    name: "Staunch Cap",
    description:
      "Structured six-panel cap with embroidered Staunch oxen logo. Built for long days and hard graft.",
    details: [
      "Adjustable strap",
      "Embroidered oxen logo",
      "Durable cotton twill",
      "One size fits most",
    ],
    price: 4000,
    category: "cap",
    color: "Black",
    sizes: ["One Size"],
    image: "/products/cap-front.png",
    images: ["/products/cap-front.png", "/products/cap-back.png"],
  },
  {
    id: "staunch-tee-white",
    slug: "heavyweight-tee-white",
    name: "White Heavyweight T-Shirt",
    description:
      "100% cotton heavyweight tee with Staunch branding. Thick, durable, and built to last.",
    details: [
      "100% cotton",
      "180gsm fabric",
      "Screen-printed Staunch logo",
      "Relaxed fit",
    ],
    price: 3500,
    category: "tee",
    color: "White",
    sizes: ["L", "XL", "XXL"],
    soldOutSizes: ["L", "XXL"],
    image: "/products/tee-white.png",
  },
  {
    id: "staunch-tee-black",
    slug: "heavyweight-tee-black",
    name: "Black Heavyweight T-Shirt",
    description:
      "100% cotton heavyweight tee with Staunch branding. Thick, durable, and built to last.",
    details: [
      "100% cotton",
      "180gsm fabric",
      "Screen-printed Staunch logo",
      "Relaxed fit",
    ],
    price: 3500,
    category: "tee",
    color: "Black",
    sizes: ["L", "XL", "XXL"],
    soldOutSizes: ["L", "XXL"],
    image: "/products/tee-black.png",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function isSizeAvailable(product: Product, size: Size): boolean {
  return (
    product.sizes.includes(size) && !product.soldOutSizes?.includes(size)
  );
}

export function getAvailableSizes(product: Product): Size[] {
  return product.sizes.filter((size) => isSizeAvailable(product, size));
}

export function formatPrice(pence: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(pence / 100);
}

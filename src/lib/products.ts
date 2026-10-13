import type { Product, Size } from "@/types";

export const CONTACT_EMAIL = "info@staunchco.uk";

export const products: Product[] = [
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
  {
    id: "staunch-tee-autumn",
    slug: "limited-edition-autumn-heavyweight-tee",
    name: "Embroidered Premium Cotton Heavyweight T",
    description:
      "100% cotton premium heavyweight tee with embroidered oxen logo.",
    details: [
      "100% cotton",
      "180gsm heavyweight fabric",
      "Embroidered Staunch oxen",
      "Relaxed fit",
    ],
    price: 4600,
    category: "tee",
    color: "Autumn",
    sizes: ["L", "XL", "XXL"],
    image: "/products/tee-autumn-front.png",
    images: [
      "/products/tee-autumn-front.png",
      "/products/tee-autumn-back.png",
    ],
    preorder: "Coming in 1 week",
  },
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
    id: "staunch-bottle-opener",
    slug: "staunch-bottle-opener",
    name: "The Staunch Opener",
    description:
      "Welcome to the most important tool for your box. We have designed your first and last bottle opener. Simple, strong like an ox, and ready for a lifetime of service. Carry this weapon up any mountain and down any trench for it will never let you down.",
    details: [
      "4mm thick black die-cast zinc alloy",
      "75mm in length",
    ],
    price: 1200,
    category: "opener",
    color: "Black",
    sizes: ["One Size"],
    image: "/products/bottle-opener-wordmark.jpg",
    images: [
      "/products/bottle-opener-wordmark.jpg",
      "/products/bottle-opener-ox.jpg",
      "/products/bottle-opener-lifestyle.jpg",
    ],
    tagline: "One eye on the boundary, one eye on the pub.",
    imageFit: "contain",
  },
];

export const categoryLabels: Record<Product["category"], string> = {
  tee: "Heavyweight Tee",
  cap: "Cap",
  opener: "Bottle Opener",
};

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function isTeeDealProduct(product: Product | undefined): boolean {
  return product?.category === "tee" && !product.preorder;
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

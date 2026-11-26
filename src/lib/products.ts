import type { Product, Size } from "@/types";

export const CONTACT_EMAIL = "info@staunchco.uk";

export const products: Product[] = [
  {
    id: "staunch-tee-white",
    slug: "heavyweight-tee-white",
    name: "The Original T-shirt White",
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
    image: "/products/tee-white-full.jpg",
    images: ["/products/tee-white-full.jpg", "/products/tee-white.png"],
  },
  {
    id: "staunch-tee-black",
    slug: "heavyweight-tee-black",
    name: "The Original T-shirt Black",
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
    image: "/products/tee-black-full.jpg",
    images: ["/products/tee-black-full.jpg", "/products/tee-black.png"],
  },
  {
    id: "staunch-tee-ox-tallow",
    slug: "ox-t-shirt-tallow",
    name: "The Ox T-Shirt Tallow",
    description:
      "100% cotton premium heavyweight tee with embroidered oxen logo.",
    details: [
      "100% cotton",
      "220gsm fabric",
      "Embroidered Staunch oxen",
      "Relaxed fit",
    ],
    price: 5500,
    category: "tee",
    color: "Tallow",
    sizes: ["L", "XL", "XXL"],
    image: "/products/tee-ox-tallow-full.jpg",
    images: [
      "/products/tee-ox-tallow-full.jpg",
      "/products/tee-ox-tallow-ox.jpg",
      "/products/tee-ox-tallow-size.jpg",
    ],
    newRelease: true,
  },
  {
    id: "staunch-tee-ox-navy",
    slug: "ox-t-shirt-navy",
    name: "The Ox T-Shirt Navy",
    description:
      "100% cotton premium heavyweight tee with embroidered oxen logo.",
    details: [
      "100% cotton",
      "220gsm fabric",
      "Embroidered Staunch oxen",
      "Relaxed fit",
    ],
    price: 5500,
    category: "tee",
    color: "Navy",
    sizes: ["L", "XL", "XXL"],
    image: "/products/tee-ox-navy-full.jpg",
    images: [
      "/products/tee-ox-navy-full.jpg",
      "/products/tee-ox-navy-ox.jpg",
      "/products/tee-ox-navy-size.jpg",
    ],
    newRelease: true,
  },
  {
    id: "staunch-cap",
    slug: "staunch-cap",
    name: "The Staunch Cap",
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
  },
];

const SHOP_ALL_ORDER = [
  "staunch-tee-ox-tallow",
  "staunch-tee-ox-navy",
  "staunch-bottle-opener",
  "staunch-tee-white",
  "staunch-tee-black",
  "staunch-cap",
] as const;

const TEE_ORDER = [
  "staunch-tee-ox-tallow",
  "staunch-tee-ox-navy",
  "staunch-tee-white",
  "staunch-tee-black",
] as const;

const ACCESSORY_ORDER = ["staunch-bottle-opener", "staunch-cap"] as const;

function productsById(ids: readonly string[]): Product[] {
  return ids
    .map((id) => getProductById(id))
    .filter((product): product is Product => Boolean(product));
}

export const shopNavLinks = [
  { href: "/shop", label: "Shop all" },
  { href: "/shop/new", label: "New" },
  { href: "/shop/t-shirts", label: "T-shirts" },
  { href: "/shop/accessories", label: "Accessories" },
] as const;

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getNewReleaseProducts(): Product[] {
  return products.filter((product) => product.newRelease);
}

export function getShopAllProducts(): Product[] {
  return productsById(SHOP_ALL_ORDER);
}

export function getTeeProducts(): Product[] {
  return productsById(TEE_ORDER);
}

export function getAccessoryProducts(): Product[] {
  return productsById(ACCESSORY_ORDER);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function isTeeDealProduct(product: Product | undefined): boolean {
  return (
    product?.id === "staunch-tee-white" || product?.id === "staunch-tee-black"
  );
}

export function isOxTeeProduct(product: Product | undefined): boolean {
  return (
    product?.id === "staunch-tee-ox-tallow" ||
    product?.id === "staunch-tee-ox-navy"
  );
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

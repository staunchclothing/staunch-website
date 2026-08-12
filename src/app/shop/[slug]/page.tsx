import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartForm } from "@/components/AddToCartForm";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductImage } from "@/components/ProductImage";
import { formatPrice, getProductBySlug, products } from "@/lib/products";
import { TEE_PAIR_PRICE } from "@/lib/pricing";
import { FREE_SHIPPING_DETAIL } from "@/lib/shipping";
import type { Metadata } from "next";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const images = product.images ?? [product.image];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Link
        href="/shop"
        className="text-xs font-medium uppercase tracking-[0.2em] text-staunch-muted transition-colors hover:text-staunch-accent"
      >
        ← Back to shop
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        {images.length > 1 ? (
          <ProductGallery images={images} alt={product.name} />
        ) : (
          <div className="overflow-hidden rounded-lg border border-staunch-border">
            <ProductImage
              src={product.image}
              alt={product.name}
              className="w-full"
              priority
            />
          </div>
        )}

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-staunch-accent">
            {product.category === "tee" ? "Heavyweight Tee" : "Cap"}
          </p>
          <h1 className="font-display mt-2 text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-medium">{formatPrice(product.price)}</p>
          {product.category === "tee" && (
            <p className="mt-1 text-sm text-staunch-accent">
              2 for {formatPrice(TEE_PAIR_PRICE)}
            </p>
          )}
          <p className="mt-6 text-sm leading-relaxed text-staunch-muted sm:text-base">
            {product.description}
          </p>

          <ul className="mt-6 space-y-2 border-y border-staunch-border py-6">
            {product.details.map((detail) => (
              <li
                key={detail}
                className="flex items-center gap-2 text-sm text-staunch-muted"
              >
                <span className="h-1 w-1 rounded-full bg-staunch-accent" />
                {detail}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <AddToCartForm product={product} />
          </div>

          <p className="mt-6 text-xs leading-relaxed text-staunch-muted">
            {FREE_SHIPPING_DETAIL} Dispatched within 2–3 working days.
          </p>
        </div>
      </div>
    </div>
  );
}

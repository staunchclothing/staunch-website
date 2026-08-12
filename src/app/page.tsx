import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroLogoStack } from "@/components/Logo";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

const TAGLINE =
  "High quality 100% cotton heavyweight tees and caps for hardworking people, whether on the tools, on the trail, or pushing past the limit. Built tough. Built Staunch.";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-staunch-border">
        <div className="mx-auto grid max-w-6xl lg:grid-cols-2">
          <div className="flex flex-col justify-center px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-staunch-accent">
              Est. 2025
            </p>
            <h1 className="font-display mt-4 text-5xl font-bold uppercase leading-[0.95] tracking-tight text-staunch-fg sm:text-6xl lg:text-7xl">
              Built for
              <br />
              Hard Work
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-staunch-muted sm:text-lg">
              {TAGLINE}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-staunch-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90"
              >
                Shop now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-md border border-staunch-border px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-staunch-fg transition-colors hover:border-staunch-accent hover:text-staunch-accent"
              >
                Our story
              </Link>
            </div>
          </div>

          <div className="relative flex min-h-[420px] items-center justify-center border-t border-staunch-border bg-staunch-bg px-8 py-16 lg:min-h-0 lg:border-l lg:border-t-0">
            <HeroLogoStack />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-staunch-accent">
              The range
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              Shop essentials
            </h2>
            <p className="mt-2 text-sm text-staunch-accent">
              Tees £35 each — 2 for £65 · Free UK shipping
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden text-sm font-medium uppercase tracking-[0.15em] text-staunch-muted transition-colors hover:text-staunch-accent sm:inline-flex sm:items-center sm:gap-2"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Link
          href="/shop"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.15em] text-staunch-muted transition-colors hover:text-staunch-accent sm:hidden"
        >
          View all products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <section className="border-y border-staunch-border bg-staunch-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-3">
          {[
            {
              title: "100% Cotton",
              text: "Premium fabric that feels solid from day one and holds up wash after wash.",
            },
            {
              title: "Built to Last",
              text: "Heavyweight 180gsm fabric and quality screen printing. Kit that earns its place in your rotation.",
            },
            {
              title: "For Hard Workers",
              text: "Designed for trades, early starts, and long shifts. No fuss. No compromise.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-display text-xl font-semibold uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-staunch-muted">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="rounded-xl border border-staunch-border bg-staunch-surface p-8 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              Wear the oxen
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-staunch-muted sm:text-base">
              The Staunch cap is structured, embroidered with the oxen logo, and
              ready for the site, the yard, or the pub after a long day.
            </p>
          </div>
          <Link
            href="/shop/staunch-cap"
            className="mt-8 inline-flex shrink-0 items-center justify-center rounded-md bg-staunch-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90 lg:mt-0"
          >
            Shop the cap
          </Link>
        </div>
      </section>

      <section className="border-t border-staunch-border bg-staunch-bg">
        <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <p className="text-base leading-relaxed text-staunch-muted sm:text-lg">
            {TAGLINE}
          </p>
        </div>
      </section>
    </>
  );
}

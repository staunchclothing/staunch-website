import type { ReactNode } from "react";

export function ShopListing({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-staunch-accent">
          Shop
        </p>
        <h1 className="font-display mt-2 text-4xl font-bold uppercase tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-staunch-muted sm:text-base">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

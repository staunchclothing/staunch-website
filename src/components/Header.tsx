"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { useCart } from "@/context/CartContext";
import { shopNavLinks } from "@/lib/products";
import { cn } from "@/lib/utils";

const pageLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function isShopAll(pathname: string) {
  return pathname === "/shop";
}

function isShopSection(pathname: string) {
  return pathname === "/shop" || pathname.startsWith("/shop/");
}

function isNavActive(href: string, pathname: string) {
  if (href === "/shop") return isShopAll(pathname);
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-staunch-border bg-staunch-bg/95 backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-4 sm:h-[4.5rem] sm:px-6">
        <Link href="/" className="text-staunch-fg" onClick={() => setMenuOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden h-full items-center gap-8 md:flex">
          <div className="group relative flex h-full items-center">
            <Link
              href="/shop"
              className={cn(
                "inline-flex h-full items-center text-sm font-medium uppercase tracking-[0.15em] transition-colors hover:text-staunch-accent",
                isShopSection(pathname)
                  ? "text-staunch-accent"
                  : "text-staunch-muted",
              )}
            >
              Shop
            </Link>
            <div className="invisible absolute left-0 top-full z-50 min-w-[12.5rem] pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-lg border border-staunch-border bg-staunch-bg py-2 shadow-lg">
                {shopNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block px-4 py-2.5 text-sm font-medium uppercase tracking-[0.15em] transition-colors hover:bg-staunch-surface hover:text-staunch-accent",
                      isNavActive(link.href, pathname)
                        ? "text-staunch-accent"
                        : "text-staunch-muted",
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {pageLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium uppercase tracking-[0.15em] transition-colors hover:text-staunch-accent",
                pathname === link.href
                  ? "text-staunch-accent"
                  : "text-staunch-muted",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-staunch-border text-staunch-fg transition-colors hover:border-staunch-accent hover:text-staunch-accent"
            aria-label={`Cart, ${itemCount} items`}
          >
            <ShoppingBag className="h-4 w-4" />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-staunch-accent px-1 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-staunch-border text-staunch-fg md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-staunch-border bg-staunch-bg px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {shopNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-sm font-medium uppercase tracking-[0.15em]",
                  isNavActive(link.href, pathname)
                    ? "bg-staunch-surface text-staunch-accent"
                    : "text-staunch-muted",
                )}
              >
                {link.label}
              </Link>
            ))}
            {pageLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-3 text-sm font-medium uppercase tracking-[0.15em]",
                  pathname === link.href
                    ? "bg-staunch-surface text-staunch-accent"
                    : "text-staunch-muted",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

import Link from "next/link";
import { TAGLINE } from "@/lib/brand";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-staunch-border bg-staunch-bg">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Logo variant="wordmark" blendWith="bg" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-staunch-muted">
              {TAGLINE}
            </p>
            <p className="mt-3 text-sm font-medium text-staunch-fg">
              Free shipping on all UK orders.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-staunch-fg">
              Shop
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-staunch-muted">
              <li>
                <Link href="/shop" className="hover:text-staunch-accent">
                  All products
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/heavyweight-tee-white"
                  className="hover:text-staunch-accent"
                >
                  Heavyweight Tees
                </Link>
              </li>
              <li>
                <Link href="/shop/staunch-cap" className="hover:text-staunch-accent">
                  Caps
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-staunch-fg">
              Info
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-staunch-muted">
              <li>
                <Link href="/about" className="hover:text-staunch-accent">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-staunch-accent">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/contact#shipping" className="hover:text-staunch-accent">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-staunch-border pt-8 text-xs text-staunch-muted sm:flex-row sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Staunch. All rights reserved.</p>
          <p>Est. 2025 — For the hardworking.</p>
        </div>
      </div>
    </footer>
  );
}

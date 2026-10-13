import Link from "next/link";
import { TAGLINE } from "@/lib/brand";
import { shopNavLinks } from "@/lib/products";
import { FREE_SHIPPING_SHORT } from "@/lib/shipping";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-staunch-border bg-staunch-bg">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <Logo
              variant="wordmark"
              blendWith="bg"
              wordmarkClassName="w-28 sm:w-40"
            />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-staunch-muted">
              {TAGLINE}
            </p>
            <p className="mt-3 text-sm font-medium text-staunch-fg">
              {FREE_SHIPPING_SHORT}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-staunch-fg">
              Shop
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-staunch-muted">
              {shopNavLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-staunch-accent">
                    {link.label}
                  </Link>
                </li>
              ))}
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
          <p>Est. 2023</p>
        </div>
      </div>
    </footer>
  );
}

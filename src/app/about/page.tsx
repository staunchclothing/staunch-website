import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Staunch Origins — loyalty, courage, hard work, and resilience.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:items-start lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-staunch-accent">
            About
          </p>
          <h1 className="font-display mt-2 text-4xl font-bold uppercase tracking-tight sm:text-5xl">
            The Staunch Origins
          </h1>
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-staunch-muted sm:text-base">
            <p>We are building a British brand tied to a set of values.</p>
            <p className="font-medium text-staunch-fg">
              Loyalty, Courage, Hard Work and Resilience.
            </p>
            <p>
              Championing a way of being that is increasingly rare today:
              standing by your people, pushing yourself, earning your stripes,
              and seeing things through. Staunch is here to channel a mindset.
              The kit is merely the extension of it: hard wearing, simplified
              and dependable, designed to fly the colours throughout the most
              arduous of tasks.
            </p>
            <p className="font-display text-lg font-semibold uppercase tracking-wide text-staunch-fg sm:text-xl">
              Staunch on. Wear the ox. Wear it hard.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-staunch-border lg:sticky lg:top-24">
          <Image
            src="/about/origins.png"
            alt="Staunch founders in the mountains"
            width={850}
            height={1024}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {[
          { stat: "100%", label: "Cotton fabric" },
          { stat: "180gsm", label: "Heavyweight cotton" },
          { stat: "2023", label: "Est." },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-staunch-border bg-staunch-surface p-6 text-center"
          >
            <p className="font-display text-3xl font-bold uppercase text-staunch-accent">
              {item.stat}
            </p>
            <p className="mt-2 text-sm text-staunch-muted">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

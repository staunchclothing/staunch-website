import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Staunch Origins — loyalty, courage, hard work, and resilience.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-staunch-accent">
          About
        </p>
        <h1 className="font-display mt-2 text-4xl font-bold uppercase tracking-tight sm:text-5xl">
          The Staunch Origins
        </h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-staunch-muted sm:text-base">
          <p>
            We are building a brand that is tied to a set of values.
          </p>
          <p className="font-medium text-staunch-fg">
            Loyalty, Courage, Hard Work and Resilience.
          </p>
          <p>
            These values represent a way of being that is increasingly rare
            today: standing by your people, pushing yourself, earning your
            stripes, and seeing things through. We want to create something
            that represents a mindset. The clothes are simply an extension of
            it.
          </p>
          <p>
            Just remember what you are championing every time you wear the
            shirt.
          </p>
          <p className="font-display text-lg font-semibold uppercase tracking-wide text-staunch-fg sm:text-xl">
            Staunch. Wear the ox. Wear it hard.
          </p>
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

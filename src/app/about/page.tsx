import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Staunch — quality kit for hardworking people.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-staunch-accent">
          About
        </p>
        <h1 className="font-display mt-2 text-4xl font-bold uppercase tracking-tight sm:text-5xl">
          Built Staunch
        </h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-staunch-muted sm:text-base">
          <p>
            Staunch started with a simple idea: hardworking people deserve kit
            that matches their standards. Not fast fashion. Not thin, shapeless
            tees that fall apart after a few washes. Proper gear.
          </p>
          <p>
            Every Staunch product is made from 100% cotton heavyweight fabric —
            thick enough to feel premium, durable enough for real work. Our tees
            and caps carry the Staunch oxen because they&apos;re built for people
            who show up, day in and day out.
          </p>
          <p>
            Whether you&apos;re on site, in the workshop, or grabbing a pint after
            a long shift, Staunch is kit you can rely on. No nonsense. No
            compromise.
          </p>
        </div>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {[
          { stat: "180gsm", label: "Heavyweight cotton" },
          { stat: "100%", label: "Cotton construction" },
          { stat: "2025", label: "Est. year" },
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

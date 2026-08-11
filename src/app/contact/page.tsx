"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/products";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Staunch enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-staunch-accent">
            Contact
          </p>
          <h1 className="font-display mt-2 text-4xl font-bold uppercase tracking-tight sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-staunch-muted sm:text-base">
            Questions about sizing, orders, or wholesale? Drop us a message and
            we&apos;ll get back to you as soon as we can.
          </p>

          <div className="mt-10 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-staunch-muted">
                Email
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-1 block text-staunch-fg transition-colors hover:text-staunch-accent"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
            <div id="shipping">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-staunch-muted">
                Shipping
              </p>
              <p className="mt-1 text-sm leading-relaxed text-staunch-muted">
                Free shipping on all UK orders. Free US shipping on orders of
                £65 or more. Dispatched within 2–3 working days.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-staunch-muted">
                Returns
              </p>
              <p className="mt-1 text-sm leading-relaxed text-staunch-muted">
                Unworn items with tags attached can be returned within 14 days.
                Contact us before sending anything back.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-staunch-border bg-staunch-surface p-6 sm:p-8">
          {submitted ? (
            <div className="py-8 text-center">
              <p className="font-display text-xl font-semibold uppercase">
                Opening your email app…
              </p>
              <p className="mt-3 text-sm text-staunch-muted">
                If nothing opened, email us directly at {CONTACT_EMAIL}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-6 text-sm text-staunch-accent underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-staunch-muted"
                >
                  Name
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-md border border-staunch-border bg-staunch-bg px-4 py-3 text-sm text-staunch-fg outline-none transition-colors focus:border-staunch-accent"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-staunch-muted"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-md border border-staunch-border bg-staunch-bg px-4 py-3 text-sm text-staunch-fg outline-none transition-colors focus:border-staunch-accent"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-staunch-muted"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full resize-none rounded-md border border-staunch-border bg-staunch-bg px-4 py-3 text-sm text-staunch-fg outline-none transition-colors focus:border-staunch-accent"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-staunch-accent px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-opacity hover:opacity-90"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

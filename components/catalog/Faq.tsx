"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/content/faq";

export function Faq({ items, title = "Questions fréquentes" }: { items: FaqItem[]; title?: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-center text-[10px] font-semibold uppercase tracking-brand text-sand-600">
          F.A.Q.
        </p>
        <h2 className="mt-2 text-center font-display text-3xl text-ink md:text-4xl">{title}</h2>
        <div className="mt-8 divide-y divide-ink/10 rounded-3xl border border-ink/10 bg-white">
          {items.map((it, i) => {
            const open = openIdx === i;
            return (
              <button
                key={it.q}
                type="button"
                onClick={() => setOpenIdx(open ? null : i)}
                className="w-full px-6 py-5 text-left transition hover:bg-bone/40"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-base text-ink md:text-lg">{it.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-ink/60 transition ${open ? "rotate-180" : ""}`}
                  />
                </div>
                {open ? (
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{it.a}</p>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
      {/* JSON-LD FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((it) => ({
              "@type": "Question",
              name: it.q,
              acceptedAnswer: { "@type": "Answer", text: it.a },
            })),
          }),
        }}
      />
    </section>
  );
}

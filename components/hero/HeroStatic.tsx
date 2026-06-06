"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { heroSlides } from "@/content/heroSlides";
import { whatsappContactUrl } from "@/lib/whatsapp";

/** Server-rendered first hero slide — paints immediately without carousel JS. */
export function HeroStatic() {
  const slide = heroSlides[0];

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-bone">
      <Image
        src={slide.image}
        alt={slide.imageAlt}
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink" />
      <div className="absolute inset-0 bg-gradient-ink" />

      <div className="relative z-10 flex h-full flex-col justify-end pb-24 md:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div
              dir="rtl"
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-sand-400/40 bg-ink/50 px-4 py-2"
            >
              <span className="font-arabic text-sm font-semibold text-sand-300 md:text-base">
                {slide.badgeAr}
              </span>
            </div>

            <h1 className="font-display text-4xl leading-[1.05] tracking-tight text-bone md:text-6xl lg:text-7xl">
              {slide.titleFr}
            </h1>
            <p className="mt-5 max-w-xl text-base text-bone/80 md:text-lg">
              {slide.subtitleFr}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={slide.ctaPrimary.href}
                className="inline-flex h-14 items-center rounded-full bg-brand px-7 text-sm font-semibold text-white shadow-xl shadow-brand/30 transition hover:bg-brand-600"
              >
                {slide.ctaPrimary.label}
              </Link>
              <a
                href={whatsappContactUrl("expert")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center gap-2 rounded-full border border-bone/30 bg-bone/5 px-7 text-sm font-semibold text-bone transition hover:bg-bone/10"
              >
                <MessageCircle className="h-4 w-4" />
                Parler à un Expert
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

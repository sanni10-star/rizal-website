"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { heroSlides } from "@/content/heroSlides";
import { whatsappContactUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 35 }, [
    Autoplay({ delay: 6500, stopOnInteraction: false, stopOnMouseEnter: true }),
  ]);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-bone">
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {heroSlides.map((slide, index) => {
            const isNear = Math.abs(index - selected) <= 1;

            return (
              <article
                key={slide.id}
                className="relative h-full w-full shrink-0 grow-0 basis-full"
              >
                {isNear ? (
                  <Image
                    src={slide.image}
                    alt={slide.imageAlt}
                    fill
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    sizes="100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-ink" aria-hidden />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/30 to-ink" />
                <div className="absolute inset-0 bg-gradient-ink" />

                <div className="relative z-10 flex h-full flex-col justify-end pb-24 md:pb-32">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl">
                      <div
                        dir="rtl"
                        className="mb-5 inline-flex items-center gap-2 rounded-full border border-sand-400/40 bg-ink/50 px-4 py-2 backdrop-blur"
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
                          className="inline-flex h-14 items-center gap-2 rounded-full border border-bone/30 bg-bone/5 px-7 text-sm font-semibold text-bone backdrop-blur transition hover:bg-bone/10"
                        >
                          <MessageCircle className="h-4 w-4" />
                          Parler à un Expert
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        <button
          type="button"
          aria-label="Précédent"
          onClick={() => emblaApi?.scrollPrev()}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/30 bg-ink/40 text-bone backdrop-blur hover:bg-ink/60"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-2 rounded-full border border-bone/20 bg-ink/40 px-3 py-2 backdrop-blur">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Aller au slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                selected === i ? "w-8 bg-sand-400" : "w-1.5 bg-bone/40",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Suivant"
          onClick={() => emblaApi?.scrollNext()}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-bone/30 bg-ink/40 text-bone backdrop-blur hover:bg-ink/60"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="absolute right-6 top-24 z-20 hidden -translate-y-0 lg:block">
        <div className="rounded-2xl border border-bone/20 bg-ink/40 px-4 py-3 backdrop-blur">
          <p className="text-[10px] uppercase tracking-brand text-sand-400">
            Showroom Essaouira
          </p>
          <p className="mt-1 font-display text-sm text-bone">
            Essaouira, Maroc
          </p>
        </div>
      </div>
    </section>
  );
}

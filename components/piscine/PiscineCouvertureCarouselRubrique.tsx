"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, ChevronLeft, ChevronRight, Sun } from "lucide-react";
import { PISCINE_MARQUES_COUVERTURE_PATH } from "@/content/piscine-marques-couverture";
import { piscineCouvertureProduits } from "@/content/piscine-couverture-produits";
import { cn } from "@/lib/utils";

const TOTAL = piscineCouvertureProduits.length;

const aspectClass =
  "aspect-[16/9] min-h-[17.5rem] sm:aspect-[21/9] sm:min-h-[min(42vw,22rem)] md:min-h-[min(38vw,26rem)]";

export function PiscineCouvertureCarouselRubrique() {
  const plugins = useMemo(
    () => [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })],
    [],
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 35 }, plugins);
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
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const active = piscineCouvertureProduits[selected];

  return (
    <div className="mt-10">
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-3xl border border-ink/8 shadow-xl ring-sand-400/30",
          aspectClass,
        )}
      >
        <div ref={emblaRef} className="h-full overflow-hidden">
          <div className="flex h-full">
            {piscineCouvertureProduits.map((produit, index) => {
              const isNear = Math.abs(index - selected) <= 1;

              return (
                <article
                  key={produit.id}
                  className="relative h-full w-full shrink-0 grow-0 basis-full"
                >
                  <Link
                    href={`${PISCINE_MARQUES_COUVERTURE_PATH}#${produit.id}`}
                    className="group absolute inset-0 z-[5] block outline-none focus-visible:ring-2 focus-visible:ring-sand-400 focus-visible:ring-offset-2"
                    aria-label={`Voir ${produit.name} — ${produit.series}`}
                  >
                    {isNear ? (
                      <Image
                        src={produit.installImage}
                        alt={produit.installImageAlt}
                        fill
                        priority={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                        sizes="100vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-ink" aria-hidden />
                    )}

                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(170deg, ${produit.accent}22 0%, rgba(14,22,42,0.55) 40%, rgba(11,15,28,0.88) 100%)`,
                      }}
                      aria-hidden
                    />

                    <div className="pointer-events-none absolute left-5 top-5 z-10 rounded-xl bg-white/95 px-3 py-2 shadow-md backdrop-blur">
                      <Image
                        src={produit.logo}
                        alt={`Logo ${produit.name}`}
                        width={150}
                        height={40}
                        className="h-8 w-auto object-contain object-left"
                      />
                    </div>

                    <div
                      className="pointer-events-none absolute right-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg"
                      style={{ backgroundColor: produit.accent }}
                    >
                      <Sun className="h-3 w-3" />
                      {produit.phaseLabel}
                    </div>

                    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent px-6 pb-14 pt-16 sm:pb-16">
                      <p className="text-[10px] font-semibold uppercase tracking-brand text-sand-300">
                        {produit.tagline}
                      </p>
                      <p className="mt-1 font-display text-2xl text-bone md:text-3xl">
                        {produit.name} — {produit.series}
                      </p>
                    </div>

                    <span className="pointer-events-none absolute bottom-20 right-6 z-10 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-xs font-semibold text-ink shadow-lg transition group-hover:bg-white sm:bottom-24">
                      Voir les {TOTAL} produits
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Produit précédent"
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-bone/25 bg-ink/50 p-2 text-bone backdrop-blur transition hover:bg-ink/70"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Produit suivant"
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-bone/25 bg-ink/50 p-2 text-bone backdrop-blur transition hover:bg-ink/70"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {piscineCouvertureProduits.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Voir ${p.name}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                selected === i ? "w-6 bg-white" : "w-1.5 bg-white/45",
              )}
            />
          ))}
        </div>
      </div>

      {active ? (
        <Link
          href={PISCINE_MARQUES_COUVERTURE_PATH}
          className="group mt-6 flex flex-col gap-4 outline-none sm:flex-row sm:items-end sm:justify-between focus-visible:ring-2 focus-visible:ring-sand-400 focus-visible:ring-offset-2"
        >
          <div className="max-w-2xl">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-brand text-sand-600">
              Couverture thermique — bâche à bulles
            </p>
            <h3 className="font-display text-3xl leading-tight text-ink transition group-hover:text-ink/80 md:text-4xl">
              {active.name} — {active.series}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">{active.description}</p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bone shadow-md transition group-hover:bg-ink/85 group-hover:shadow-lg sm:self-end">
            Voir les {TOTAL} produits
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      ) : null}
    </div>
  );
}

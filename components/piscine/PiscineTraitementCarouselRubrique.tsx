"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, Beaker, ChevronLeft, ChevronRight } from "lucide-react";
import { PISCINE_MARQUES_TRAITEMENT_PATH } from "@/content/piscine-marques-traitement";
import { piscineTraitementProduits } from "@/content/piscine-traitement-produits";
import { cn } from "@/lib/utils";

const aspectClass =
  "aspect-[4/3] min-h-[20rem] sm:min-h-[22rem] md:min-h-[26rem] lg:aspect-[16/10]";

export function PiscineTraitementCarouselRubrique() {
  const plugins = useMemo(
    () => [Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })],
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

  const active = piscineTraitementProduits[selected];

  return (
    <div className="mt-10">
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-xl ring-sand-400/30",
          aspectClass,
        )}
      >
        <div ref={emblaRef} className="h-full overflow-hidden">
          <div className="flex h-full">
            {piscineTraitementProduits.map((produit, index) => (
              <article
                key={produit.id}
                className="relative h-full w-full shrink-0 grow-0 basis-full"
              >
                <Link
                  href={`${PISCINE_MARQUES_TRAITEMENT_PATH}#${produit.id}`}
                  className="group flex h-full flex-col outline-none focus-visible:ring-2 focus-visible:ring-sand-400 focus-visible:ring-offset-2"
                  aria-label={`Voir ${produit.name} — ${produit.series}`}
                >
                  {/* Zone produit — 62 % hauteur, fond blanc */}
                  <div className="relative min-h-0 flex-[62] bg-white">
                    <Image
                      src={produit.productImage}
                      alt={produit.productImageAlt}
                      fill
                      priority={index === selected}
                      sizes="(max-width: 768px) 100vw, 70vw"
                      className="object-contain object-center px-6 pb-2 pt-14 transition-transform duration-500 group-hover:scale-[1.02] sm:px-10 sm:pt-16"
                    />

                    <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-xl bg-white/95 px-3 py-2 shadow-md backdrop-blur sm:left-5 sm:top-5">
                      <Image
                        src={produit.logo}
                        alt={`Logo ${produit.name}`}
                        width={150}
                        height={40}
                        className="h-7 w-auto object-contain object-left sm:h-8"
                      />
                    </div>

                    <div
                      className="pointer-events-none absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg sm:right-5 sm:top-5"
                      style={{ backgroundColor: produit.accent }}
                    >
                      <Beaker className="h-3 w-3" />
                      {produit.phaseLabel}
                    </div>
                  </div>

                  {/* Bandeau texte — 38 % bas, sans recouvrir le produit */}
                  <div
                    className="relative flex shrink-0 flex-[38] flex-col justify-end px-5 pb-12 pt-4 sm:px-6 sm:pb-14"
                    style={{
                      background: `linear-gradient(135deg, ${produit.accent} 0%, #0e162a 55%, #0b0f1c 100%)`,
                    }}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-brand text-sand-300">
                      {produit.tagline}
                    </p>
                    <p className="mt-1 font-display text-xl text-bone sm:text-2xl md:text-3xl">
                      {produit.name} — {produit.series}
                    </p>

                    <span className="pointer-events-none absolute bottom-14 right-5 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-xs font-semibold text-ink shadow-lg transition group-hover:bg-white sm:bottom-16">
                      Voir les 8 produits
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Produit précédent"
          className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-ink/15 bg-white/90 p-2 text-ink shadow-md backdrop-blur transition hover:bg-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Produit suivant"
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-ink/15 bg-white/90 p-2 text-ink shadow-md backdrop-blur transition hover:bg-white"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {piscineTraitementProduits.map((p, i) => (
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
          href={PISCINE_MARQUES_TRAITEMENT_PATH}
          className="group mt-6 flex flex-col gap-4 outline-none sm:flex-row sm:items-end sm:justify-between focus-visible:ring-2 focus-visible:ring-sand-400 focus-visible:ring-offset-2"
        >
          <div className="max-w-2xl">
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-brand text-sand-600">
              Traitement piscine — chimie
            </p>
            <h3 className="font-display text-3xl leading-tight text-ink transition group-hover:text-ink/80 md:text-4xl">
              {active.name} — {active.series}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/65">{active.description}</p>
          </div>

          <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bone shadow-md transition group-hover:bg-ink/85 group-hover:shadow-lg sm:self-end">
            Voir les 8 produits
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      ) : null}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { solaireOnduloursRubriqueTiles } from "@/content/solaire-onduleurs-rubrique";
import { cn } from "@/lib/utils";

const aspectClass =
  "aspect-[16/9] min-h-[17.5rem] sm:aspect-[21/9] sm:min-h-[min(42vw,22rem)] md:min-h-[min(38vw,26rem)]";

function SliderImage({
  imageSrc,
  imageAlt,
  imageSecondary,
  imageSecondaryAlt,
}: {
  imageSrc: string;
  imageAlt: string;
  imageSecondary?: string;
  imageSecondaryAlt?: string;
}) {
  const dual = Boolean(imageSecondary?.trim()) && Boolean(imageSecondaryAlt?.trim());
  const [active, setActive] = useState<0 | 1>(0);

  useEffect(() => {
    if (!dual) return;
    const t = window.setInterval(() => setActive((c) => (c === 0 ? 1 : 0)), 3500);
    return () => window.clearInterval(t);
  }, [dual]);

  if (dual) {
    return (
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="100vw"
          className={cn(
            "object-cover object-center transition-opacity duration-700 ease-out",
            active === 0 ? "opacity-100" : "opacity-0",
          )}
        />
        <Image
          src={imageSecondary!}
          alt={imageSecondaryAlt!}
          fill
          sizes="100vw"
          className={cn(
            "object-cover object-center transition-opacity duration-700 ease-out",
            active === 1 ? "opacity-100" : "opacity-0",
          )}
        />
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
          {[0, 1].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i as 0 | 1)}
              aria-label={`Image ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                active === i ? "w-5 bg-white" : "w-1.5 bg-white/50",
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={imageAlt}
      fill
      sizes="100vw"
      className="object-cover object-center"
    />
  );
}

export function SolaireOnduloursRubrique() {
  return (
    <div className="mt-10">
      {solaireOnduloursRubriqueTiles.map((tile) => (
        <Link key={tile.id} href={tile.href} className="group block outline-none">
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-3xl border border-ink/8 shadow-xl ring-sand-400/30 transition-shadow duration-300 group-hover:shadow-2xl group-focus-visible:ring-2",
              aspectClass,
            )}
          >
            <SliderImage
              imageSrc={tile.image}
              imageAlt={tile.imageAlt ?? tile.title}
              imageSecondary={tile.imageSecondary}
              imageSecondaryAlt={tile.imageSecondaryAlt}
            />
            <div className="pointer-events-none absolute left-5 top-5 z-10 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-white/90">
                {tile.subtitle}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              {tile.eyebrow ? (
                <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-brand text-sand-600">
                  {tile.eyebrow}
                </p>
              ) : null}
              <h3 className="font-display text-3xl leading-tight text-ink md:text-4xl">
                {tile.title}
              </h3>
              {tile.description ? (
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {tile.description}
                </p>
              ) : null}
            </div>

            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-bone shadow-md transition-all duration-200 group-hover:bg-ink/85 group-hover:shadow-lg sm:self-end">
              {tile.ctaLabel ?? "Découvrir"}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductImage } from "./ProductImage";
import { cn } from "@/lib/utils";

export function ProductGalleryCarousel({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 }, [
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true }),
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

  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <div className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-white">
        <ProductImage
          src={images[0]}
          alt={alt}
          loading="eager"
          fit="contain"
        />
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {images.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[3/2] w-full shrink-0 grow-0 basis-full"
            >
              <ProductImage
                src={src}
                alt={`${alt} — ${i + 1}`}
                loading={i === 0 ? "eager" : "lazy"}
                fit="contain"
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            aria-label="Image précédente"
            onClick={() => emblaApi?.scrollPrev()}
            className="absolute left-3 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-white/90 text-ink shadow-md backdrop-blur transition hover:bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Image suivante"
            onClick={() => emblaApi?.scrollNext()}
            className="absolute right-3 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-ink/10 bg-white/90 text-ink shadow-md backdrop-blur transition hover:bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-ink/60 px-3 py-1.5 backdrop-blur">
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Image ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  selected === i ? "w-5 bg-white" : "w-1.5 bg-white/40",
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

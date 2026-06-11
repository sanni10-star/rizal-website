"use client";

import dynamic from "next/dynamic";

const PiscineFiltresCarouselRubrique = dynamic(
  () =>
    import("@/components/piscine/PiscineFiltresCarouselRubrique").then(
      (mod) => mod.PiscineFiltresCarouselRubrique,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="mt-10 aspect-[16/9] min-h-[17.5rem] animate-pulse rounded-3xl bg-ink/5 sm:aspect-[21/9] sm:min-h-[min(42vw,22rem)] md:min-h-[min(38vw,26rem)]"
        aria-hidden
      />
    ),
  },
);

export function PiscineFiltresCarouselRubriqueClient() {
  return <PiscineFiltresCarouselRubrique />;
}

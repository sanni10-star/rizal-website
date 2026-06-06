"use client";

import dynamic from "next/dynamic";
import type { CatalogItem } from "@/types/catalog";
import type { FaqItem } from "@/content/faq";
import { Container } from "@/components/ui/Container";

const HomeBrandGrid = dynamic(() => import("@/components/home/HomeBrandGrid"), {
  ssr: false,
  loading: () => (
    <section className="bg-ink py-20 md:py-28">
      <Container>
        <div className="h-8 w-48 animate-pulse rounded bg-bone/10" />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-bone/10" />
          ))}
        </div>
      </Container>
    </section>
  ),
});

const HomeFeaturedGrid = dynamic(
  () => import("@/components/home/HomeFeaturedGrid"),
  {
    ssr: false,
    loading: () => (
      <section className="bg-white py-20">
        <Container>
          <div className="h-8 w-56 animate-pulse rounded bg-ink/5" />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-3xl bg-ink/5" />
            ))}
          </div>
        </Container>
      </section>
    ),
  },
);

const DeferredFaq = dynamic(
  () => import("@/components/catalog/Faq").then((m) => m.Faq),
  { ssr: false },
);

export function HomeDeferredSections({
  featured,
}: {
  featured: CatalogItem[];
}) {
  return (
    <>
      <HomeBrandGrid />
      <HomeFeaturedGrid items={featured} />
    </>
  );
}

export function HomeDeferredFaq({ items }: { items: FaqItem[] }) {
  return (
    <Container>
      <DeferredFaq items={items} />
    </Container>
  );
}

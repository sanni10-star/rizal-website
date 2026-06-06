"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CatalogItem } from "@/types/catalog";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { GammeCard } from "@/components/catalog/GammeCard";
import { gammeHref } from "@/lib/links";

export default function HomeFeaturedGrid({ items }: { items: CatalogItem[] }) {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <SectionTitle
            eyebrow="Sélection RIZAL"
            title="Nos gammes phares"
            description="Une sélection de produits et services demandés par nos clients villas."
          />
          <Link
            href="/climatisation"
            className="hidden shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-widest2 text-sand-600 hover:text-sand-700 md:inline-flex"
          >
            Tout le catalogue <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <GammeCard key={item.id} item={item} href={gammeHref(item)} />
          ))}
        </div>
      </Container>
    </section>
  );
}

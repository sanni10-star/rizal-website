"use client";

import Image from "next/image";
import { BRANDS_HVAC } from "@/content/catalog";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { BrandCard } from "@/components/catalog/BrandCard";

export default function HomeBrandGrid() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <Image
        src="/img/bg/essaouira-blue.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover saturate-[1.15]"
        quality={75}
        loading="lazy"
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(170deg, rgba(26,40,69,0.72) 0%, rgba(14,22,42,0.80) 40%, rgba(11,15,28,0.88) 100%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 35%, rgba(56,120,200,0.10) 0%, transparent 70%)",
        }}
        aria-hidden
      />
      <Container className="relative z-10">
        <SectionTitle
          eyebrow="Climatisation"
          title="Les quatre noms qui définissent l'air de prestige."
          description="MEGALIFE, INGELEC, LG et TRANE — chacun avec son ADN, tous distribués officiellement par RIZAL."
          invert
        />
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
          {BRANDS_HVAC.map((brand) => (
            <BrandCard key={brand} brand={brand} />
          ))}
        </div>
      </Container>
    </section>
  );
}

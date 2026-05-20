import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GammeCard } from "@/components/catalog/GammeCard";
import { catalog } from "@/content/catalog";
import { buildMetadata } from "@/lib/seo";
import { PISCINE_WATERPOOL_PATH } from "@/content/piscine-pompes-rubrique";

export const metadata: Metadata = buildMetadata({
  title: "Pompes Waterpool Orion — Robustes & Fiables | RIZAL",
  description:
    "Pompe piscine Waterpool Orion — auto-amorçante robuste, 0.5 à 3 CV, mono et triphasé. Excellent rapport qualité-prix. Disponible chez RIZAL à Essaouira.",
  path: PISCINE_WATERPOOL_PATH,
});

export default function WaterpoolPage() {
  const waterItems = catalog.filter(
    (i) => i.id.startsWith("pompe-waterpool-") || i.id.startsWith("waterpool-"),
  );

  return (
    <article className="bg-bone">
      <div className="bg-ink pb-16 pt-24">
        <Container>
          <nav className="mb-10 flex flex-wrap items-center gap-2 text-xs text-bone/45">
            <Link href="/" className="transition hover:text-bone/80">Accueil</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/services/piscine" className="transition hover:text-bone/80">Piscine</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-bone/70">Waterpool</span>
          </nav>

          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
              Pompes Waterpool
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-bone md:text-6xl">
              Pompes piscine<br className="hidden md:block" /> Waterpool Orion
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-bone/65">
              Gamme Orion — pompes auto-amorçantes robustes de 0.5 à 3 CV,
              disponibles en monophasé (220V) et triphasé (380V). Excellent
              rapport qualité-prix pour les piscines au Maroc.
            </p>
          </div>
        </Container>
      </div>

      <div className="pb-24">
        <Container>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {waterItems.map((item) => (
              <GammeCard key={item.id} item={item} href={`/services/piscine#${item.id}`} />
            ))}
          </div>
        </Container>
      </div>

      <div className="border-t border-ink/8 bg-white">
        <Container className="py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-600">
                Besoin d&apos;aide ?
              </p>
              <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">
                Quelle pompe pour votre piscine ?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                Nous dimensionnons la pompe adaptée au volume de votre bassin
                et à votre installation de filtration.
              </p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:bg-brand-600"
              >
                <MessageCircle className="h-4 w-4" />
                Demander un devis
              </Link>
              <Link
                href="/services/piscine"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-ink/15 bg-bone px-6 text-sm font-semibold text-ink transition hover:bg-ink/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Piscine
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </article>
  );
}

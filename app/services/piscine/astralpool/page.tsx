import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GammeCard } from "@/components/catalog/GammeCard";
import { catalog } from "@/content/catalog";
import { buildMetadata } from "@/lib/seo";
import { PISCINE_ASTRALPOOL_PATH } from "@/content/piscine-pompes-rubrique";

export const metadata: Metadata = buildMetadata({
  title: "Pompes Astralpool — Victoria Plus & Sena | RIZAL",
  description:
    "Pompes piscine Astralpool Victoria Plus et Sena — auto-amorçantes, silencieuses, inox 316. De 0.33 à 3 CV. Disponibles chez RIZAL à Essaouira.",
  path: PISCINE_ASTRALPOOL_PATH,
});

export default function AstralpoolPage() {
  const astralItems = catalog.filter(
    (i) => i.id.startsWith("pompe-astralpool-") || i.id.startsWith("astralpool-"),
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
            <span className="text-bone/70">Astralpool</span>
          </nav>

          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
              Pompes Astralpool
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-bone md:text-6xl">
              Pompes piscine<br className="hidden md:block" /> Astralpool
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-bone/65">
              Victoria Plus et Sena — pompes auto-amorçantes silencieuses, pièces
              en inox 316, pré-filtres de grande capacité. Leader mondial de
              l&apos;équipement piscine.
            </p>
          </div>
        </Container>
      </div>

      <div className="pb-24">
        <Container>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {astralItems.map((item) => (
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

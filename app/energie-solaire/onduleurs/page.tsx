import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GammeCard } from "@/components/catalog/GammeCard";
import { solaireItems } from "@/content/catalog";
import { gammeHref } from "@/lib/links";
import { buildMetadata } from "@/lib/seo";
import { SOLAIRE_ONDULEURS_PATH } from "@/content/solaire-onduleurs-rubrique";

export const metadata: Metadata = buildMetadata({
  title: "Onduleurs hybrides solaires — SolaX, Solis, Deye | RIZAL",
  description:
    "Onduleurs hybrides monophasés et triphasés SolaX X1-LITE, X3-NEO, Solis, Deye — compatibles batteries lithium, monitoring app. Solutions RIZAL au Maroc.",
  path: SOLAIRE_ONDULEURS_PATH,
});

export default function OnduloursPage() {
  const onduleurItems = solaireItems.filter((i) => i.id.startsWith("onduleur-"));

  return (
    <article className="bg-bone">
      <div className="bg-ink pb-16 pt-24">
        <Container>
          <nav className="mb-10 flex flex-wrap items-center gap-2 text-xs text-bone/45">
            <Link href="/" className="transition hover:text-bone/80">Accueil</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/energie-solaire" className="transition hover:text-bone/80">Énergie Solaire</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-bone/70">Onduleurs</span>
          </nav>

          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
              Gammes onduleurs hybrides
            </p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-bone md:text-6xl">
              Onduleurs pour votre<br className="hidden md:block" /> installation solaire
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-bone/65">
              SolaX, Solis, Deye — onduleurs monophasés et triphasés compatibles
              batteries lithium, monitoring par app, garantie constructeur.
            </p>
          </div>
        </Container>
      </div>

      <div className="pb-24">
        <Container>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {onduleurItems.map((item) => (
              <GammeCard key={item.id} item={item} href={gammeHref(item)} />
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
                Quel onduleur pour votre projet ?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                Notre équipe dimensionne l&apos;onduleur idéal selon votre
                consommation, le nombre de panneaux et vos batteries.
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
                href="/energie-solaire"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-ink/15 bg-bone px-6 text-sm font-semibold text-ink transition hover:bg-ink/5"
              >
                <ArrowLeft className="h-4 w-4" />
                Énergie solaire
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </article>
  );
}

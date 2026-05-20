import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { realisations } from "@/content/realisations";
import { buildMetadata } from "@/lib/seo";
import { FeaturedProject } from "@/components/realisations/FeaturedProject";

export const metadata: Metadata = buildMetadata({
  title: "Réalisations — Villas RIZAL au Maroc",
  description:
    "Découvrez nos réalisations : villas équipées en climatisation, solaire, piscines à débordement et rénovations totales à Essaouira.",
  path: "/realisations",
});

export default function RealisationsPage() {
  const featured = realisations.find((r) => r.featured);
  const others = realisations.filter((r) => !r.featured);

  return (
    <>
      <section className="bg-ink pt-28 pb-16 text-bone">
        <Container>
          <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
            Réalisations
          </p>
          <h1 className="mt-3 font-display text-5xl md:text-7xl">
            Quelques villas que nous avons servies.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-bone/75 md:text-lg">
            À Essaouira et dans la région, des projets conçus, livrés et
            garantis par RIZAL. Construction, climatisation, solaire, piscine,
            rénovation, traitement d&apos;eau.
          </p>
        </Container>
      </section>

      {featured && <FeaturedProject project={featured} />}

      <section className="bg-bone py-16 md:py-24">
        <Container>
          <SectionTitle
            eyebrow={`${others.length} autres projets`}
            title="Notre portfolio"
          />
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {others.map((r) => (
              <article
                key={r.id}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                  <img
                    src={r.image}
                    alt={r.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-brand text-sand-600">
                    {r.category} &mdash; {r.city}
                  </p>
                  <h3 className="mt-2 font-display text-xl text-ink">
                    {r.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink/65">{r.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

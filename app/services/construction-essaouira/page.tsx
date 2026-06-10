import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd, localServiceJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { realisations } from "@/content/realisations";
import { whatsappContactUrl } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Construction Essaouira — Villas, Piscines & Rénovation RIZAL",
  description:
    "Entreprise de construction à Essaouira : villas clé-en-main, piscines, rénovation et gros œuvre. RIZAL à Tamanar, garantie décennale. Devis gratuit sous 7 jours.",
  path: "/services/construction-essaouira",
  keywords: [
    "construction Essaouira",
    "entreprise construction Essaouira",
    "construction villa Essaouira",
    "rénovation Essaouira",
    "constructeur Essaouira",
  ],
});

const services = [
  {
    title: "Construction de villa",
    description:
      "Villas neuves clé-en-main à Essaouira et Ghazoua : gros œuvre, finitions premium, livraison contractualisée.",
    href: "/services/renovation-villa",
  },
  {
    title: "Construction de piscine",
    description:
      "Piscines à débordement, skimmer et couloir de nage — structure béton armé, garantie décennale.",
    href: "/services/piscine",
  },
  {
    title: "Rénovation & extension",
    description:
      "Rénovation totale de villa : démolition, électricité NM, plomberie, marbre, tadelakt et domotique.",
    href: "/services/renovation-villa",
  },
] as const;

const process = [
  "Visite sur site et étude de faisabilité",
  "Plans 3D et devis ferme sous 7 jours",
  "Gros œuvre et coordination des corps de métier",
  "Finitions premium et réception clé-en-main",
] as const;

const path = "/services/construction-essaouira";
const constructionProjects = realisations.filter((r) =>
  r.category.toLowerCase().includes("construction"),
);

export default function ConstructionEssaouiraPage() {
  return (
    <>
      <JsonLd
        data={localServiceJsonLd({
          name: "Construction Essaouira",
          description:
            "Construction de villas, piscines et rénovation à Essaouira par RIZAL — entreprise locale, garantie décennale.",
          path,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", url: SITE.url },
          { name: "Construction Essaouira", url: `${SITE.url}${path}` },
        ])}
      />

      <section className="relative bg-ink pt-28 pb-20 text-bone">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="/img/realisations/villa-ghazoua/villa-hero-enhanced.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-ink/70 to-ink" />
        <Container className="relative z-10">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-bone/70 transition hover:text-bone"
          >
            <span aria-hidden>←</span>
            Retour à l&apos;accueil
          </Link>
          <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
            Construction & Gros Œuvre
          </p>
          <h1 className="mt-3 font-display text-5xl md:text-7xl">
            Construction à Essaouira — villas & piscines RIZAL
          </h1>
          <p className="mt-5 max-w-2xl text-base text-bone/80 md:text-lg">
            RIZAL, entreprise de construction à Essaouira et province : villas
            neuves, piscines sur-mesure, rénovation et extension. Un seul
            interlocuteur, délais respectés, garantie décennale.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappContactUrl("expert")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-600"
            >
              <Phone className="h-4 w-4" />
              Étude gratuite
            </a>
            <Link
              href="/realisations"
              className="inline-flex h-12 items-center rounded-full border border-bone/30 bg-bone/5 px-6 text-sm font-semibold text-bone hover:bg-bone/10"
            >
              Nos réalisations
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-bone py-16 md:py-20">
        <Container>
          <SectionTitle
            eyebrow="Nos prestations"
            title="Construction à Essaouira : nos expertises"
            description="De la fondation à la livraison clé-en-main, RIZAL maîtrise chaque étape de votre projet."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="flex flex-col rounded-3xl border border-ink/8 bg-white p-6"
              >
                <h2 className="font-display text-2xl text-ink">{service.title}</h2>
                <p className="mt-3 flex-1 text-sm text-ink/70">
                  {service.description}
                </p>
                <Link
                  href={service.href}
                  className="mt-5 text-xs font-semibold uppercase tracking-widest2 text-sand-600 hover:text-ink"
                >
                  En savoir plus →
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <h2 className="font-display text-3xl text-ink md:text-4xl">
            Notre processus de construction à Essaouira
          </h2>
          <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            {process.map((step, i) => (
              <li
                key={step}
                className="flex items-start gap-4 rounded-2xl bg-bone p-5"
              >
                <span className="font-display text-3xl text-sand-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg text-ink">{step}</h3>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {constructionProjects.length > 0 && (
        <section className="bg-bone py-16 md:py-20">
          <Container>
            <SectionTitle
              eyebrow="Réalisations"
              title="Projets de construction à Essaouira et région"
            />
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {constructionProjects.slice(0, 2).map((project) => (
                <article
                  key={project.id}
                  className="overflow-hidden rounded-3xl bg-white shadow-sm"
                >
                  <div className="relative aspect-[16/10]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[10px] font-semibold uppercase tracking-brand text-sand-600">
                      {project.category} — {project.city}
                    </p>
                    <h3 className="mt-2 font-display text-xl text-ink">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-ink/70 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-ink py-14 text-bone">
        <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl md:text-3xl">
              Entreprise de construction à Tamanar — Essaouira
            </h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-bone/75">
              <MapPin className="h-4 w-4 text-sand-400" />
              {SITE.addressDisplay}
            </p>
          </div>
          <a
            href={SITE.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-600"
          >
            <Check className="h-4 w-4" />
            Fiche Google vérifiée
          </a>
        </Container>
      </section>
    </>
  );
}

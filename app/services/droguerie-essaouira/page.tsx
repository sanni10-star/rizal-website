import type { Metadata } from "next";
import Link from "next/link";
import { Check, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd, localServiceJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { whatsappContactUrl } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Droguerie Essaouira — Quincaillerie & Matériaux RIZAL",
  description:
    "Droguerie à Essaouira : plomberie, électricité, quincaillerie et matériaux de construction. Showroom RIZAL à Tamanar, livraison Essaouira et région. Devis gratuit.",
  path: "/services/droguerie-essaouira",
  keywords: [
    "droguerie Essaouira",
    "quincaillerie Essaouira",
    "magasin bricolage Essaouira",
    "plomberie Essaouira",
    "matériaux construction Essaouira",
  ],
});

const departments = [
  {
    title: "Plomberie & sanitaire",
    items: ["Robinetterie", "Tuyauterie PVC & cuivre", "Adoucisseurs", "Pompes"],
  },
  {
    title: "Électricité",
    items: ["Câbles & gaines", "Tableaux électriques", "Éclairage", "Domotique"],
  },
  {
    title: "Quincaillerie",
    items: ["Vis & fixations", "Serrurerie", "Outillage", "Peinture & finitions"],
  },
  {
    title: "Chantier & villa",
    items: ["Ciment & mortier", "Carrelage", "Menuiserie", "Étanchéité"],
  },
] as const;

const path = "/services/droguerie-essaouira";

export default function DroguerieEssaouiraPage() {
  return (
    <>
      <JsonLd
        data={localServiceJsonLd({
          name: "Droguerie Essaouira",
          description:
            "Droguerie et quincaillerie RIZAL pour Essaouira et la province : plomberie, électricité, matériaux et outillage.",
          path,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Accueil", url: SITE.url },
          { name: "Droguerie Essaouira", url: `${SITE.url}${path}` },
        ])}
      />

      <section className="bg-ink pt-28 pb-20 text-bone">
        <Container>
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-bone/70 transition hover:text-bone"
          >
            <span aria-hidden>←</span>
            Retour à l&apos;accueil
          </Link>
          <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
            Droguerie & Quincaillerie
          </p>
          <h1 className="mt-3 font-display text-5xl md:text-7xl">
            Droguerie à Essaouira — votre magasin RIZAL
          </h1>
          <p className="mt-5 max-w-2xl text-base text-bone/80 md:text-lg">
            RIZAL est votre droguerie de référence pour Essaouira et la province :
            plomberie, électricité, quincaillerie et matériaux de construction.
            Showroom à Tamanar, conseil expert et livraison locale.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappContactUrl("expert")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white hover:bg-brand-600"
            >
              <Phone className="h-4 w-4" />
              Demander un devis
            </a>
            <a
              href={SITE.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-bone/30 bg-bone/5 px-6 text-sm font-semibold text-bone hover:bg-bone/10"
            >
              <MapPin className="h-4 w-4" />
              Itinéraire showroom
            </a>
          </div>
        </Container>
      </section>

      <section className="bg-bone py-16 md:py-20">
        <Container>
          <SectionTitle
            eyebrow="Rayons"
            title="Tout pour vos chantiers à Essaouira"
            description="Une droguerie complète pour particuliers, artisans et promoteurs de la région d'Essaouira."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {departments.map((dept) => (
              <article
                key={dept.title}
                className="rounded-3xl border border-ink/8 bg-white p-6"
              >
                <h2 className="font-display text-2xl text-ink">{dept.title}</h2>
                <ul className="mt-4 space-y-2">
                  {dept.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-ink/75"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-sand-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <h2 className="font-display text-3xl text-ink md:text-4xl">
            Pourquoi choisir RIZAL pour votre droguerie à Essaouira ?
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
            <article className="rounded-2xl bg-bone p-6">
              <h3 className="font-display text-xl text-ink">Stock local</h3>
              <p className="mt-2 text-sm text-ink/70">
                Showroom à Tamanar, à 30 min d&apos;Essaouira — retrait sur place
                ou livraison sur chantier.
              </p>
            </article>
            <article className="rounded-2xl bg-bone p-6">
              <h3 className="font-display text-xl text-ink">Conseil expert</h3>
              <p className="mt-2 text-sm text-ink/70">
                Équipe disponible WhatsApp 7j/7 pour vous orienter sur le bon
                matériel plomberie, électricité ou quincaillerie.
              </p>
            </article>
            <article className="rounded-2xl bg-bone p-6">
              <h3 className="font-display text-xl text-ink">Multi-services</h3>
              <p className="mt-2 text-sm text-ink/70">
                Droguerie, climatisation, solaire et construction — un seul
                interlocuteur pour votre projet à Essaouira.
              </p>
            </article>
          </div>
          <p className="mt-10 text-sm text-ink/60">
            <strong>Adresse :</strong> {SITE.addressDisplay} —{" "}
            <a href={SITE.googleMaps} className="text-sand-700 underline">
              Voir sur Google Maps
            </a>
          </p>
        </Container>
      </section>
    </>
  );
}

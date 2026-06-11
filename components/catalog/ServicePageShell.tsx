import Link from "next/link";
import { Check, Clock3, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { AddToCartButton } from "@/components/catalog/AddToCartButton";
import { CrossSellRow } from "@/components/catalog/CrossSellRow";
import { whatsappContactUrl, whatsappLinkForItem } from "@/lib/whatsapp";
import type { CatalogItem } from "@/types/catalog";

export function ServicePageShell({
  eyebrow,
  title,
  intro,
  heroImage,
  items,
  process: steps,
  guarantee,
  crossSells,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  heroImage: string;
  items: CatalogItem[];
  process?: { title: string; text: string }[];
  guarantee?: string;
  crossSells?: CatalogItem[];
}) {
  return (
    <>
      <section className="relative bg-ink pt-28 pb-20 text-bone">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src={heroImage} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-ink/60 to-ink" />
        <Container className="relative z-10">
          <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-display text-5xl md:text-7xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base text-bone/80 md:text-lg">{intro}</p>

          <div className="mt-8 inline-flex flex-wrap gap-3">
            <a
              href={whatsappContactUrl("expert")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-white shadow-lg shadow-brand/20 hover:bg-brand-600"
            >
              Demander une étude gratuite
            </a>
            <Link
              href="/realisations"
              className="inline-flex h-12 items-center rounded-full border border-bone/30 bg-bone/5 px-6 text-sm font-semibold text-bone backdrop-blur hover:bg-bone/10"
            >
              Voir nos réalisations
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap gap-6">
            <div className="inline-flex items-center gap-2 text-sm text-bone/80">
              <Clock3 className="h-4 w-4 text-sand-400" /> Délais respectés
            </div>
            <div className="inline-flex items-center gap-2 text-sm text-bone/80">
              <ShieldCheck className="h-4 w-4 text-sand-400" /> {guarantee ?? "Garantie décennale"}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16 md:py-20">
        <Container>
          <SectionTitle eyebrow="Nos solutions" title="Choisissez votre projet" />
          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {items.map((item) => (
              <article
                key={item.id}
                id={item.id}
                className="scroll-mt-28 grid grid-cols-1 gap-6 rounded-3xl border border-ink/5 bg-bone p-6 sm:grid-cols-5"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white sm:col-span-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={
                      item.id === "sec-imou-cruiser-dual"
                        ? "absolute inset-0 h-full w-full object-cover object-center"
                        : "absolute inset-0 h-full w-full object-contain object-center"
                    }
                  />
                  {item.badge ? (
                    <span className="absolute left-3 top-3 rounded-full bg-ink/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest2 text-sand-300">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-col sm:col-span-3">
                  <h3 className="font-display text-2xl text-ink">{item.name}</h3>
                  {item.gammeLabel ? (
                    <p className="mt-1 text-xs uppercase tracking-widest2 text-sand-600">
                      {item.gammeLabel}
                    </p>
                  ) : null}
                  <p className="mt-3 text-sm text-ink/75">
                    {item.longDescFr ?? item.shortDescFr}
                  </p>
                  {item.highlights && item.highlights.length > 0 ? (
                    <ul className="mt-3 space-y-1.5">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-sm text-ink/80">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-sand-600" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="mt-5 flex flex-wrap gap-2">
                    <AddToCartButton itemId={item.id} className="h-11 px-5 text-sm" />
                    <a
                      href={whatsappLinkForItem(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center rounded-full bg-wa px-5 text-sm font-semibold text-white hover:bg-emerald-600"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {steps && steps.length > 0 ? (
        <section className="bg-bone py-16 md:py-20">
          <Container>
            <SectionTitle eyebrow="Processus" title="Comment nous travaillons" />
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
              {steps.map((s, i) => {
                const isLast = i === steps.length - 1;
                return (
                  <div
                    key={s.title}
                    className={
                      isLast
                        ? "relative overflow-hidden rounded-2xl bg-gradient-to-br from-ink to-ink/90 p-5 text-bone shadow-xl ring-2 ring-sand-400/30"
                        : "rounded-2xl bg-white p-5"
                    }
                  >
                    <p
                      className={`mb-2 font-display text-3xl ${isLast ? "text-sand-300" : "text-sand-500"}`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p
                      className={`font-display text-lg ${isLast ? "text-bone" : "text-ink"}`}
                    >
                      {s.title}
                    </p>
                    <p
                      className={`mt-1.5 text-sm ${isLast ? "text-bone/70" : "text-ink/60"}`}
                    >
                      {s.text}
                    </p>
                    {isLast && (
                      <div className="absolute -bottom-3 -right-3 h-16 w-16 rounded-full bg-sand-400/10" />
                    )}
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      ) : null}

      {crossSells && crossSells.length > 0 ? (
        <CrossSellRow items={crossSells} title="Compléter votre projet" />
      ) : null}
    </>
  );
}

import Image from "next/image";
import { solaireDocBrands, solaireInstallScenes } from "@/content/solaire-doc-brands";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type Props = {
  /**
   * `true` : rendu sans `<section>` ni fond bone — à placer **dans** la zone catalogue
   * (ex. sous les cartes panneaux), le parent fournit déjà le `<Container>`.
   */
  embedded?: boolean;
};

export function SolaireDocBrandShowcase({ embedded = false }: Props) {
  const inner = (
    <>
      <SectionTitle
        eyebrow="Fiches constructeurs"
        title="Eau chaude solaire & capteurs certifiés"
        description="Inspiré de vos PDF : chauffe-eau solaire émaillé (thermosiphon) et gamme Sonne Aktion Solar Keymark. Visuels créatifs — remplacez par vos assets officiels pour la prod."
      />

      <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {solaireDocBrands.map((b) => (
          <article
            key={b.id}
            className="overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-sm"
          >
            <div className="relative aspect-[16/10] bg-ink">
              <Image
                src={b.heroImage}
                alt={b.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 font-display text-xl text-bone md:text-2xl">
                {b.name}
              </p>
            </div>
            <div className="p-6 md:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-600">
                {b.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/80">{b.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-ink/75">
                {b.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                    {h}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[10px] uppercase tracking-widest2 text-ink/45">
                {b.sourceNote}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-16">
        <h3 className="font-display text-2xl text-ink md:text-3xl">Installations types</h3>
        <p className="mt-2 max-w-2xl text-sm text-ink/70">
          Deux ambiances pour illustrer le rendu sur villa marocaine et le côté « installation
          premium ».
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          {solaireInstallScenes.map((s) => (
            <figure
              key={s.id}
              className="overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-sm"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <figcaption className="p-4 md:p-5">
                <p className="font-medium text-ink">{s.title}</p>
                <p className="mt-1 text-xs text-ink/65">{s.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </>
  );

  if (embedded) {
    return (
      <div
        id="solaire-marques-documents"
        className={cn(
          "mt-14 border-t border-ink/10 pt-12",
          "rounded-2xl bg-bone/40 px-4 py-10 sm:px-6 md:px-8 md:py-12",
        )}
      >
        {inner}
      </div>
    );
  }

  return (
    <section className="border-t border-ink/5 bg-bone py-16 md:py-20">
      <Container>{inner}</Container>
    </section>
  );
}

import { Container } from "@/components/ui/Container";
import type { LegalPage } from "@/content/legal";

export function LegalShell({ page }: { page: LegalPage }) {
  return (
    <>
      <section className="bg-ink pt-28 pb-12 text-bone">
        <Container>
          <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
            Mentions légales
          </p>
          <h1 className="mt-3 font-display text-4xl md:text-6xl">{page.title}</h1>
          <p className="mt-4 text-xs text-bone/55">
            Dernière mise à jour : {page.updatedAt}
          </p>
        </Container>
      </section>

      <section className="bg-bone py-16 md:py-20">
        <Container>
          <article className="prose prose-lg mx-auto max-w-3xl">
            {page.intro ? (
              <p className="mb-10 text-base leading-relaxed text-ink/80">
                {page.intro}
              </p>
            ) : null}

            {page.sections.map((s) => (
              <section key={s.heading} className="mb-10">
                <h2 className="font-display text-2xl text-ink md:text-3xl">
                  {s.heading}
                </h2>
                <div className="mt-3 space-y-2.5 text-sm leading-relaxed text-ink/75">
                  {s.body.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>
            ))}

            <p className="mt-12 text-xs text-ink/50">
              Pour toute question relative à ce document : entrepriserizal@gmail.com
            </p>
          </article>
        </Container>
      </section>
    </>
  );
}

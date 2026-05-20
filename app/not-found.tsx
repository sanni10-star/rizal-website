import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="bg-ink py-32 text-bone">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
            Erreur 404
          </p>
          <h1 className="mt-3 font-display text-5xl md:text-7xl">
            Page introuvable.
          </h1>
          <p className="mt-4 text-bone/70">
            Le contenu que vous cherchez n&apos;existe pas ou a été déplacé.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/"
              className="inline-flex h-12 items-center rounded-full bg-sand-400 px-6 text-sm font-semibold text-ink hover:bg-sand-300"
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center rounded-full border border-bone/30 bg-bone/5 px-6 text-sm font-semibold text-bone hover:bg-bone/10"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

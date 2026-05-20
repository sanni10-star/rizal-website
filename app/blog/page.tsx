import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { posts } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog RIZAL | Guides & conseils pour votre villa au Maroc",
  description:
    "Guides RIZAL : climatisation, solaire, renovation, piscines. Conseils premium pour proprietaires de villas au Maroc.",
};

export default function BlogIndexPage() {
  return (
    <main className="bg-bone pb-24 pt-32">
      <Container className="max-w-3xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-brand text-sand-600">
          Blog RIZAL
        </p>
        <h1 className="mt-3 font-display text-5xl text-ink md:text-6xl">
          Guides & conseils villa
        </h1>
        <p className="mt-4 text-base text-ink/65">
          Notre expertise pour proprietaires exigeants au Maroc.
        </p>
      </Container>

      <Container className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group block overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-xl"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-ink/10">
              <Image
                src={p.cover}
                alt={p.title}
                fill
                className="object-cover transition group-hover:scale-105"
                sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
              />
            </div>
            <div className="p-6">
              <p className="text-[10px] font-semibold uppercase tracking-brand text-sand-600">
                {p.category} · {p.readingTime}
              </p>
              <h2 className="mt-2 font-display text-2xl text-ink">{p.title}</h2>
              <p className="mt-2 text-sm text-ink/65">{p.excerpt}</p>
            </div>
          </Link>
        ))}
      </Container>
    </main>
  );
}

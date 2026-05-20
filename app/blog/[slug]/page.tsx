import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { posts } from "@/content/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: "Article introuvable" };
  return {
    title: `${post.title} | Blog RIZAL`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <main className="bg-bone pb-24 pt-32">
      <Container className="max-w-3xl">
        <Link href="/blog" className="text-xs uppercase tracking-widest2 text-sand-600 hover:underline">
          &lt; Retour au blog
        </Link>
        <p className="mt-6 text-[10px] font-semibold uppercase tracking-brand text-sand-600">
          {post.category} · {post.readingTime}
        </p>
        <h1 className="mt-3 font-display text-4xl text-ink md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-base text-ink/65">{post.excerpt}</p>

        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl bg-ink/10">
          <Image src={post.cover} alt={post.title} fill className="object-cover" />
        </div>

        <article className="prose prose-rizal mt-10 max-w-none text-ink/85">
          {post.body.split("\n\n").map((para, i) => {
            if (para.startsWith("## ")) {
              return (
                <h2 key={i} className="mt-10 font-display text-2xl text-ink">
                  {para.replace(/^## /, "")}
                </h2>
              );
            }
            if (para.startsWith("- ")) {
              return (
                <ul key={i} className="my-4 list-disc space-y-1 pl-5 text-sm">
                  {para.split("\n").map((li, j) => (
                    <li key={j}>{li.replace(/^- /, "")}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="mt-4 text-sm leading-relaxed">
                {para}
              </p>
            );
          })}
        </article>
      </Container>
    </main>
  );
}

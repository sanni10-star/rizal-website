import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { reviews } from "@/content/reviews";

export function ReviewsBlock({ category }: { category?: string }) {
  const items = category
    ? reviews.filter((r) => r.category === category)
    : reviews.filter((r) => r.featured);

  if (items.length === 0) return null;

  return (
    <section className="bg-bone py-20">
      <Container>
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-brand text-sand-600">
            Ils nous ont fait confiance
          </p>
          <h2 className="mt-2 font-display text-4xl text-ink md:text-5xl">
            247+ villas livrees, note 4,9 / 5
          </h2>
          <div className="mt-3 inline-flex items-center gap-1 text-sand-500">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
            <span className="ml-2 text-xs text-ink/60">Source : avis Google verifies</span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.slice(0, 6).map((r) => (
            <article
              key={r.id}
              className="rounded-3xl border border-ink/5 bg-white p-7 shadow-sm"
            >
              <div className="flex items-center gap-1 text-sand-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <h3 className="mt-3 font-display text-xl text-ink">{r.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">{r.body}</p>
              <div className="mt-5 border-t border-ink/5 pt-4 text-xs text-ink/55">
                <strong className="text-ink/80">{r.authorName}</strong>
                {r.authorCity ? ` - ${r.authorCity}` : null}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

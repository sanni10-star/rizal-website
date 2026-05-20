import { db } from "@/lib/db";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminQuotesPage() {
  let quotes: Awaited<ReturnType<typeof db.quote.findMany>> = [];
  let error: string | null = null;
  try {
    quotes = await db.quote.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
      include: { lines: true, lead: true },
    });
  } catch {
    error = "Database not reachable yet.";
  }

  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-ink">Devis WhatsApp</h1>
      <p className="mt-1 text-sm text-ink/60">200 derniers paniers checkout.</p>

      {error ? (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error}
        </p>
      ) : (
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {quotes.map((q: any) => (
            <article
              key={q.id}
              className="rounded-2xl border border-ink/5 bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest2 text-sand-600">
                    {new Date(q.createdAt).toLocaleString("fr-FR")}
                  </p>
                  <p className="mt-1 font-medium text-ink">
                    {q.firstName} {q.lastName} {q.phone ? `· ${q.phone}` : ""}
                  </p>
                </div>
                <span className="rounded-full bg-ink/5 px-3 py-1 text-[10px] uppercase tracking-widest2 text-ink/60">
                  {q.status}
                </span>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-ink/80">
                {q.lines.map((l: any) => (
                  <li key={l.id}>
                    {l.qty}× {l.brand ? `${l.brand} - ` : ""} {l.name}
                  </li>
                ))}
              </ul>
            </article>
          ))}
          {quotes.length === 0 ? (
            <p className="text-sm text-ink/50">Aucun devis envoye.</p>
          ) : null}
        </div>
      )}
    </AdminShell>
  );
}

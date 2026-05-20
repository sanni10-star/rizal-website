import { db } from "@/lib/db";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
  let subs: Awaited<ReturnType<typeof db.subscriber.findMany>> = [];
  let error: string | null = null;
  try {
    subs = await db.subscriber.findMany({
      orderBy: { createdAt: "desc" },
      take: 500,
    });
  } catch {
    error = "Database not reachable yet.";
  }

  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-ink">Newsletter</h1>
      <p className="mt-1 text-sm text-ink/60">{subs.length} abonnes.</p>
      {error ? (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error}
        </p>
      ) : (
        <ul className="mt-6 divide-y divide-ink/5 rounded-2xl border border-ink/5 bg-white">
          {subs.map((s) => (
            <li key={s.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-medium text-ink">{s.email}</p>
                <p className="text-xs text-ink/55">
                  {s.firstName ?? ""} {s.city ? `· ${s.city}` : ""} {s.source ? `· ${s.source}` : ""}
                </p>
              </div>
              <p className="text-xs text-ink/50">
                {new Date(s.createdAt).toLocaleDateString("fr-FR")}
              </p>
            </li>
          ))}
        </ul>
      )}
    </AdminShell>
  );
}

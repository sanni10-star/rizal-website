import { db } from "@/lib/db";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  let leads: Awaited<ReturnType<typeof db.lead.findMany>> = [];
  let error: string | null = null;
  try {
    leads = await db.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });
  } catch (e) {
    error = "Database not reachable yet. Run prisma migrate.";
  }

  return (
    <AdminShell>
      <h1 className="font-display text-3xl text-ink">Leads</h1>
      <p className="mt-1 text-sm text-ink/60">200 derniers contacts captures.</p>

      {error ? (
        <p className="mt-6 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {error}
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-ink/10 bg-white">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-bone/60 text-left text-[10px] uppercase tracking-widest2 text-ink/60">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Score</th>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">Téléphone</th>
                <th className="px-4 py-3">Ville</th>
                <th className="px-4 py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-t border-ink/5">
                  <td className="px-4 py-3 text-ink/60">
                    {new Date(l.createdAt).toLocaleString("fr-FR")}
                  </td>
                  <td className="px-4 py-3">{l.source}</td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        l.score >= 70
                          ? "rounded-full bg-emerald-100 px-2 py-0.5 text-xs text-emerald-700"
                          : l.score >= 40
                          ? "rounded-full bg-amber-100 px-2 py-0.5 text-xs text-amber-700"
                          : "rounded-full bg-ink/5 px-2 py-0.5 text-xs text-ink/60"
                      }
                    >
                      {l.score}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {l.firstName} {l.lastName}
                  </td>
                  <td className="px-4 py-3">{l.phone}</td>
                  <td className="px-4 py-3">{l.city}</td>
                  <td className="px-4 py-3 text-xs uppercase tracking-widest2 text-ink/55">
                    {l.status}
                  </td>
                </tr>
              ))}
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-ink/50">
                    Aucun lead pour le moment.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}

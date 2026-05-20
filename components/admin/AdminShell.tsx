import Link from "next/link";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-ink/10 bg-white px-6">
        <p className="font-display text-xl text-ink">RIZAL Admin</p>
        <nav className="flex items-center gap-5 text-sm text-ink/70">
          <Link href="/admin/leads" className="hover:text-ink">Leads</Link>
          <Link href="/admin/quotes" className="hover:text-ink">Devis</Link>
          <Link href="/admin/subscribers" className="hover:text-ink">Newsletter</Link>
          <form action="/api/admin/logout" method="POST">
            <button className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-bone">
              Logout
            </button>
          </form>
        </nav>
      </header>
      <div className="p-6">{children}</div>
    </>
  );
}

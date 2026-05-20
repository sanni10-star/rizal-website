"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pwd }),
    });
    if (res.ok) window.location.href = "/admin/leads";
    else setErr("Mot de passe incorrect");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink p-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-2xl"
      >
        <h1 className="font-display text-3xl text-ink">RIZAL Admin</h1>
        <p className="mt-1 text-sm text-ink/60">Accès réservé à l&apos;équipe interne.</p>
        <input
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          placeholder="Mot de passe"
          className="mt-6 h-12 w-full rounded-xl border border-ink/10 bg-bone px-4 text-sm focus:border-sand-400 focus:outline-none"
          required
          autoFocus
        />
        {err ? <p className="mt-2 text-xs text-red-600">{err}</p> : null}
        <button className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-bone">
          Connexion
        </button>
      </form>
    </main>
  );
}

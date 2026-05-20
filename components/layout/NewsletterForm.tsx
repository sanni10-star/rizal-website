"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      const data = await res.json();
      setState(data.ok ? "ok" : "error");
      if (data.ok) setEmail("");
    } catch {
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <p className="mt-6 rounded-full bg-sand-400/15 px-4 py-3 text-xs text-sand-300">
        Merci ! Vous recevrez bientôt nos guides et offres exclusives.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-6 flex gap-2">
      <input
        name="email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre email"
        className="h-10 w-full rounded-full border border-bone/20 bg-bone/5 px-4 text-sm text-bone placeholder:text-bone/40 focus:border-sand-400 focus:outline-none"
      />
      <button
        type="submit"
        disabled={state === "loading"}
        className="h-10 shrink-0 rounded-full bg-sand-400 px-4 text-xs font-semibold uppercase tracking-widest2 text-ink hover:bg-sand-300 disabled:opacity-50"
      >
        {state === "loading" ? "..." : "Inscription"}
      </button>
    </form>
  );
}

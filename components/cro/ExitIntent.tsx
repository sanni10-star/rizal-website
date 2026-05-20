"use client";

import { useEffect, useState } from "react";
import { X, Download, Check } from "lucide-react";

const KEY = "rizal-exit-shown";

export function ExitIntent({
  magnet = "guide-climatisation",
  title = "Avant de partir...",
  subtitle = "Téléchargez notre guide gratuit : Choisir la climatisation de votre villa au Maroc en 2026.",
  benefits = [
    "Comparatif MEGALIFE / INGELEC / LG / TRANE",
    "Calcul des BTU selon vos pièces",
    "Coûts d'installation et de maintenance",
    "Erreurs à éviter (climat marocain)",
  ],
}: {
  magnet?: "guide-climatisation" | "guide-solaire-villa" | "checklist-renovation" | "guide-piscine";
  title?: string;
  subtitle?: string;
  benefits?: string[];
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY)) return;

    let triggered = false;

    function trigger() {
      if (triggered) return;
      triggered = true;
      sessionStorage.setItem(KEY, "1");
      setOpen(true);
    }

    function onMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) trigger();
    }
    const tid = window.setTimeout(trigger, 90_000); // 90s fallback
    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      document.removeEventListener("mouseleave", onMouseLeave);
      clearTimeout(tid);
    };
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/lead-magnet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, magnet }),
      });
      const data = await res.json();
      if (data.ok) {
        setDone(true);
        if (data.file?.url) window.open(data.file.url, "_blank");
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
        <button
          onClick={() => setOpen(false)}
          aria-label="Fermer"
          className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink/10"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="bg-gradient-to-br from-ink to-ink/95 px-7 py-6 text-bone">
          <p className="text-[10px] font-semibold uppercase tracking-brand text-sand-400">
            Cadeau RIZAL
          </p>
          <h3 className="mt-1.5 font-display text-3xl">{title}</h3>
        </div>

        <div className="px-7 py-6">
          {done ? (
            <div className="text-center">
              <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <Check className="h-6 w-6" />
              </div>
              <p className="mt-3 font-display text-xl text-ink">
                Le guide arrive dans votre boîte mail.
              </p>
              <p className="mt-1 text-sm text-ink/60">
                Le téléchargement s&apos;est ouvert dans un nouvel onglet.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-ink/70">{subtitle}</p>
              <ul className="mt-4 space-y-2">
                {benefits.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-sm text-ink/85"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-sand-600" />
                    {b}
                  </li>
                ))}
              </ul>

              <form onSubmit={submit} className="mt-5 flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  className="h-12 flex-1 rounded-full border border-ink/10 bg-bone px-5 text-sm focus:border-sand-400 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-sand-400 px-5 text-sm font-semibold text-ink hover:bg-sand-300 disabled:opacity-50"
                >
                  <Download className="h-4 w-4" />
                  {submitting ? "..." : "Recevoir"}
                </button>
              </form>
              <p className="mt-2 text-[10px] text-ink/50">
                100% gratuit, désinscription en 1 clic. Conforme loi 09-08.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

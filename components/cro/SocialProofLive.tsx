"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

type Stats = {
  quotesToday: number;
  leadsWeek: number;
  reviews: number;
  avgRating: number;
};

export function SocialProofLive() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    fetch("/api/social-proof")
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) setStats(d);
      })
      .catch(() => {});
    const t = setTimeout(() => setShow(true), 6000);
    return () => clearTimeout(t);
  }, []);

  if (!show || !stats || closed) return null;

  return (
    <div className="fixed bottom-24 left-4 z-30 hidden max-w-xs animate-fade-up rounded-2xl border border-ink/10 bg-white/95 p-3.5 shadow-xl backdrop-blur md:block">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand-400/15 text-sand-700">
          <Sparkles className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest2 text-sand-600">
            Cette semaine sur RIZAL
          </p>
          <p className="mt-0.5 text-sm font-medium text-ink">
            <strong>{stats.leadsWeek}</strong> villas étudiées · <strong>{stats.quotesToday}</strong> devis aujourd&apos;hui
          </p>
          <p className="mt-1 text-[11px] text-ink/55">
            Note clients : {stats.avgRating}/5 ({stats.reviews}+ avis)
          </p>
        </div>
        <button
          onClick={() => setClosed(true)}
          aria-label="Fermer"
          className="text-ink/40 hover:text-ink"
        >
          ×
        </button>
      </div>
    </div>
  );
}

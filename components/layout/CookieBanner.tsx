"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const KEY = "rizal-cookies-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  function decide(value: "accept" | "reject") {
    localStorage.setItem(KEY, value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-md">
      <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-2xl shadow-ink/15">
        <p className="font-display text-lg text-ink">Cookies & vie privée</p>
        <p className="mt-1.5 text-sm text-ink/70">
          Nous utilisons des cookies essentiels au panier (devis), et, sous
          réserve de votre accord, des cookies analytiques (GA4 / Meta Pixel)
          pour améliorer notre site. Conforme loi 09-08 et RGPD.{" "}
          <Link
            className="underline decoration-sand-400 underline-offset-2 hover:text-ink"
            href="/politique-cookies"
          >
            En savoir plus
          </Link>
          .
        </p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => decide("reject")}
            className="flex-1 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-sm font-medium text-ink hover:bg-bone"
          >
            Refuser
          </button>
          <button
            onClick={() => decide("accept")}
            className="flex-1 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-bone hover:bg-ink/90"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}

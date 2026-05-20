"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { SITE } from "@/lib/site";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMsg(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      firstName: String(fd.get("firstName") ?? ""),
      lastName: String(fd.get("lastName") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      city: String(fd.get("city") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      budget: String(fd.get("budget") ?? ""),
      message: String(fd.get("message") ?? ""),
      landingPage: typeof window !== "undefined" ? window.location.href : undefined,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) setState("ok");
      else {
        setState("error");
        setErrorMsg(data.error ?? "Erreur");
      }
    } catch {
      setState("error");
      setErrorMsg("Connexion impossible");
    }
  }

  if (state === "ok") {
    return (
      <div className="rounded-3xl border border-emerald-300/40 bg-emerald-50 p-10 text-center lg:col-span-3">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
          <Check className="h-6 w-6" />
        </div>
        <h2 className="mt-5 font-display text-3xl text-ink">Demande reçue</h2>
        <p className="mt-2 text-sm text-ink/70">
          Notre équipe vous contacte sous 24 heures ouvrées. Pour une réponse
          immédiate, écrivez-nous sur WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-3xl border border-ink/5 bg-white p-7 lg:col-span-3"
    >
      <h2 className="font-display text-3xl text-ink">Demander un rappel</h2>
      <p className="mt-1 text-sm text-ink/60">
        Remplissez le formulaire — nous vous contactons sous 24h ouvrées.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-ink/60">
            Prénom *
          </span>
          <input
            name="firstName"
            required
            className="mt-1 h-12 w-full rounded-xl border border-ink/10 bg-bone px-4 text-sm focus:border-sand-400 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-ink/60">
            Nom *
          </span>
          <input
            name="lastName"
            required
            className="mt-1 h-12 w-full rounded-xl border border-ink/10 bg-bone px-4 text-sm focus:border-sand-400 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-ink/60">
            Téléphone *
          </span>
          <input
            name="phone"
            required
            type="tel"
            placeholder="+212 6 ..."
            className="mt-1 h-12 w-full rounded-xl border border-ink/10 bg-bone px-4 text-sm focus:border-sand-400 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-ink/60">
            Email
          </span>
          <input
            name="email"
            type="email"
            className="mt-1 h-12 w-full rounded-xl border border-ink/10 bg-bone px-4 text-sm focus:border-sand-400 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-ink/60">
            Ville
          </span>
          <select
            name="city"
            defaultValue={SITE.cities[0]}
            className="mt-1 h-12 w-full rounded-xl border border-ink/10 bg-bone px-4 text-sm focus:border-sand-400 focus:outline-none"
          >
            {SITE.cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
            <option>Autre</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-ink/60">
            Budget estimé
          </span>
          <select
            name="budget"
            className="mt-1 h-12 w-full rounded-xl border border-ink/10 bg-bone px-4 text-sm focus:border-sand-400 focus:outline-none"
          >
            <option value="">Je ne sais pas encore</option>
            <option value="<50k">Moins de 50 000 MAD</option>
            <option value="50-150k">50 000 - 150 000 MAD</option>
            <option value="150-500k">150 000 - 500 000 MAD</option>
            <option value=">500k">Plus de 500 000 MAD</option>
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-ink/60">
            Sujet *
          </span>
          <select
            name="subject"
            required
            className="mt-1 h-12 w-full rounded-xl border border-ink/10 bg-bone px-4 text-sm focus:border-sand-400 focus:outline-none"
          >
            <option>Climatisation</option>
            <option>Énergie Solaire</option>
            <option>Construction Piscine</option>
            <option>Rénovation Villa</option>
            <option>Traitement d&apos;Eau</option>
            <option>Autre</option>
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-ink/60">
            Votre projet
          </span>
          <textarea
            name="message"
            rows={5}
            className="mt-1 w-full rounded-xl border border-ink/10 bg-bone p-4 text-sm focus:border-sand-400 focus:outline-none"
            placeholder="Décrivez votre projet en quelques lignes..."
          />
        </label>
      </div>

      <p className="mt-4 text-[11px] text-ink/50">
        En soumettant ce formulaire, vous acceptez que vos données soient
        traitées par RIZAL pour répondre à votre demande, conformément à
        notre{" "}
        <a href="/politique-confidentialite" className="underline">
          politique de confidentialité
        </a>{" "}
        (Loi 09-08).
      </p>

      {errorMsg ? (
        <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">
          {errorMsg}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "loading"}
        className="mt-5 inline-flex h-14 items-center rounded-full bg-ink px-8 font-semibold text-bone hover:bg-ink/85 disabled:opacity-50"
      >
        {state === "loading" ? "Envoi en cours..." : "Envoyer ma demande"}
      </button>
    </form>
  );
}

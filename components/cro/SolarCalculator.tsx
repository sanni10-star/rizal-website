"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const KITS = [
  { kwc: 5, panels: 10, batteryKwh: 4.8, prodMin: 8000, prodMax: 9500 },
  { kwc: 10, panels: 20, batteryKwh: 9.6, prodMin: 16000, prodMax: 19000 },
  { kwc: 15, panels: 30, batteryKwh: 14.4, prodMin: 24000, prodMax: 28500 },
  { kwc: 20, panels: 40, batteryKwh: 19.2, prodMin: 32000, prodMax: 38000 },
];

export function SolarCalculator() {
  const [bill, setBill] = useState(2500); // MAD/month
  const [withClim, setWithClim] = useState(true);
  const [withPool, setWithPool] = useState(false);
  const [withVe, setWithVe] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  // Estimation simple : facture annuelle / 1,3 MAD par kWh moyen ONEE résidentiel
  const annualKwh = (bill * 12) / 1.3;
  let recommendedKwc = annualKwh / 1500; // 1500 kWh/kWc/an au Maroc
  if (withClim) recommendedKwc *= 1.15;
  if (withPool) recommendedKwc *= 1.25;
  if (withVe) recommendedKwc += 3;

  const kit =
    KITS.find((k) => k.kwc >= recommendedKwc) ?? KITS[KITS.length - 1];

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/calculator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "solar",
        email,
        phone,
        result: {
          bill,
          withClim,
          withPool,
          withVe,
          recommendedKwc: Math.round(recommendedKwc * 10) / 10,
          kit: `${kit.kwc} kWc`,
        },
      }),
    });
    setSent(true);
  }

  return (
    <div className="rounded-3xl border border-ink/5 bg-white p-7 shadow-xl shadow-ink/5">
      <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-600">
        Calculateur Solaire RIZAL
      </p>
      <h3 className="mt-2 font-display text-3xl text-ink">
        Quel kit solaire pour votre villa ?
      </h3>
      <p className="mt-2 text-sm text-ink/60">
        Basé sur l&apos;ensoleillement marocain (1500 kWh/kWc/an) et votre consommation.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-ink/60">
            Facture ONEE moyenne (MAD / mois)
          </span>
          <input
            type="range"
            min={500}
            max={10000}
            step={100}
            value={bill}
            onChange={(e) => setBill(+e.target.value)}
            className="mt-3 w-full accent-sand-400"
          />
          <p className="mt-1 text-sm font-semibold text-ink">
            {bill.toLocaleString("fr-FR")} MAD / mois
          </p>
        </label>

        <fieldset className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <label className="inline-flex items-center gap-2 rounded-xl border border-ink/10 bg-bone p-3 text-sm">
            <input
              type="checkbox"
              checked={withClim}
              onChange={(e) => setWithClim(e.target.checked)}
              className="h-4 w-4 accent-sand-500"
            />
            Climatisation
          </label>
          <label className="inline-flex items-center gap-2 rounded-xl border border-ink/10 bg-bone p-3 text-sm">
            <input
              type="checkbox"
              checked={withPool}
              onChange={(e) => setWithPool(e.target.checked)}
              className="h-4 w-4 accent-sand-500"
            />
            Piscine + PAC
          </label>
          <label className="inline-flex items-center gap-2 rounded-xl border border-ink/10 bg-bone p-3 text-sm">
            <input
              type="checkbox"
              checked={withVe}
              onChange={(e) => setWithVe(e.target.checked)}
              className="h-4 w-4 accent-sand-500"
            />
            Voiture électrique
          </label>
        </fieldset>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-2xl border border-sand-400/30 bg-sand-50 p-5 sm:grid-cols-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-brand text-sand-700">
            Kit recommandé
          </p>
          <p className="mt-1 font-display text-3xl text-ink">{kit.kwc} kWc</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-brand text-sand-700">
            Composants
          </p>
          <p className="mt-1 text-sm text-ink/85">
            {kit.panels} panneaux 500 Wc
            <br />
            {kit.batteryKwh} kWh batteries
          </p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-brand text-sand-700">
            Production estimée
          </p>
          <p className="mt-1 text-sm text-ink/85">
            {kit.prodMin.toLocaleString("fr-FR")} - {kit.prodMax.toLocaleString("fr-FR")} kWh / an
          </p>
        </div>
      </div>

      {sent ? (
        <div className="mt-5 inline-flex items-center gap-2 text-sm text-emerald-700">
          <Check className="h-4 w-4" /> Étude personnalisée en cours - notre ingénieur vous contacte sous 24h.
        </div>
      ) : (
        <form onSubmit={submit} className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email (optionnel)"
            className="h-12 rounded-full border border-ink/10 bg-bone px-4 text-sm focus:border-sand-400 focus:outline-none"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Téléphone (optionnel)"
            className="h-12 rounded-full border border-ink/10 bg-bone px-4 text-sm focus:border-sand-400 focus:outline-none"
          />
          <button
            type="submit"
            className="h-12 rounded-full bg-ink px-5 text-sm font-semibold text-bone hover:bg-ink/85"
          >
            Recevoir l&apos;étude détaillée
          </button>
        </form>
      )}
    </div>
  );
}

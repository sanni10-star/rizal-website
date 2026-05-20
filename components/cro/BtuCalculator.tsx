"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type Exposure = "nord" | "est" | "sud" | "ouest";
type Insulation = "good" | "medium" | "poor";

const EXPOSURE_FACTOR: Record<Exposure, number> = {
  nord: 0.95,
  est: 1.0,
  ouest: 1.05,
  sud: 1.15,
};
const INSULATION_FACTOR: Record<Insulation, number> = {
  good: 0.9,
  medium: 1.0,
  poor: 1.2,
};

function computeBtu(args: {
  surface: number;
  height: number;
  occupants: number;
  exposure: Exposure;
  insulation: Insulation;
  morocco: boolean;
}) {
  const volume = args.surface * args.height;
  // Base 130 BTU/m³ for hot Moroccan climate
  let btu = volume * (args.morocco ? 130 : 110);
  btu *= EXPOSURE_FACTOR[args.exposure];
  btu *= INSULATION_FACTOR[args.insulation];
  btu += args.occupants * 600;
  return Math.round(btu / 500) * 500;
}

const BTU_TIERS = [
  { btu: 9000, name: "9 000 BTU/h", typical: "Chambre, bureau (jusqu'à 18 m²)" },
  { btu: 12000, name: "12 000 BTU/h", typical: "Salon de chambre, suite (18-30 m²)" },
  { btu: 18000, name: "18 000 BTU/h", typical: "Grand salon, séjour (30-45 m²)" },
  { btu: 24000, name: "24 000 BTU/h", typical: "Très grand salon, suite parentale (45-60 m²)" },
  { btu: 36000, name: "36 000 BTU/h", typical: "Espace ouvert, double salon (60-90 m²)" },
  { btu: 48000, name: "48 000 BTU/h", typical: "Cassette / Gainable villa (90+ m²)" },
];

export function BtuCalculator() {
  const [surface, setSurface] = useState(25);
  const [height, setHeight] = useState(2.7);
  const [occupants, setOccupants] = useState(2);
  const [exposure, setExposure] = useState<Exposure>("sud");
  const [insulation, setInsulation] = useState<Insulation>("medium");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const btu = computeBtu({ surface, height, occupants, exposure, insulation, morocco: true });
  const recommended =
    BTU_TIERS.find((t) => t.btu >= btu) ?? BTU_TIERS[BTU_TIERS.length - 1];

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/calculator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "btu",
        email,
        phone,
        result: { surface, height, occupants, exposure, insulation, btu, recommended: recommended.name },
      }),
    });
    setSent(true);
  }

  return (
    <div className="rounded-3xl border border-ink/5 bg-white p-7 shadow-xl shadow-ink/5">
      <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-600">
        Calculateur RIZAL
      </p>
      <h3 className="mt-2 font-display text-3xl text-ink">
        Quelle puissance de climatiseur pour votre pièce ?
      </h3>
      <p className="mt-2 text-sm text-ink/60">
        Calcul adapté au climat marocain (jusqu&apos;à 50°C extérieur).
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-ink/60">
            Surface (m²)
          </span>
          <input
            type="number"
            min={5}
            max={300}
            value={surface}
            onChange={(e) => setSurface(+e.target.value)}
            className="mt-1 h-12 w-full rounded-xl border border-ink/10 bg-bone px-4 text-sm focus:border-sand-400 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-ink/60">
            Hauteur sous plafond (m)
          </span>
          <input
            type="number"
            step="0.1"
            min={2.2}
            max={6}
            value={height}
            onChange={(e) => setHeight(+e.target.value)}
            className="mt-1 h-12 w-full rounded-xl border border-ink/10 bg-bone px-4 text-sm focus:border-sand-400 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-ink/60">
            Nb. occupants moyens
          </span>
          <input
            type="number"
            min={1}
            max={20}
            value={occupants}
            onChange={(e) => setOccupants(+e.target.value)}
            className="mt-1 h-12 w-full rounded-xl border border-ink/10 bg-bone px-4 text-sm focus:border-sand-400 focus:outline-none"
          />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-ink/60">
            Exposition
          </span>
          <select
            value={exposure}
            onChange={(e) => setExposure(e.target.value as Exposure)}
            className="mt-1 h-12 w-full rounded-xl border border-ink/10 bg-bone px-4 text-sm focus:border-sand-400 focus:outline-none"
          >
            <option value="nord">Nord</option>
            <option value="est">Est</option>
            <option value="sud">Sud (chaud)</option>
            <option value="ouest">Ouest (chaud après-midi)</option>
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-widest2 text-ink/60">
            Isolation de la villa
          </span>
          <select
            value={insulation}
            onChange={(e) => setInsulation(e.target.value as Insulation)}
            className="mt-1 h-12 w-full rounded-xl border border-ink/10 bg-bone px-4 text-sm focus:border-sand-400 focus:outline-none"
          >
            <option value="good">Bonne (villa récente, double vitrage)</option>
            <option value="medium">Moyenne (standard)</option>
            <option value="poor">Faible (ancien, simple vitrage)</option>
          </select>
        </label>
      </div>

      <div className="mt-6 rounded-2xl border border-sand-400/30 bg-sand-50 p-5">
        <p className="text-[10px] font-semibold uppercase tracking-brand text-sand-700">
          Recommandation RIZAL
        </p>
        <p className="mt-1 font-display text-3xl text-ink">
          {recommended.name}
        </p>
        <p className="mt-1 text-sm text-ink/65">
          Puissance frigorifique nécessaire : <strong>{btu.toLocaleString("fr-FR")} BTU/h</strong>.
          {" "}
          {recommended.typical}
        </p>
      </div>

      {sent ? (
        <div className="mt-5 inline-flex items-center gap-2 text-sm text-emerald-700">
          <Check className="h-4 w-4" /> Recommandation envoyée. Notre expert vous recontacte sous 24h.
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
            Recevoir un devis adapté
          </button>
        </form>
      )}
    </div>
  );
}

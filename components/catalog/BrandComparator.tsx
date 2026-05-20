import { Check, Minus } from "lucide-react";
import { Container } from "@/components/ui/Container";

const ROWS: {
  label: string;
  values: { megalife: string | boolean; ingelec: string | boolean; lg: string | boolean; trane: string | boolean };
}[] = [
  {
    label: "Origine",
    values: {
      megalife: "Asie + assemblage Maroc",
      ingelec: "Maroc",
      lg: "Coree du Sud",
      trane: "Etats-Unis",
    },
  },
  {
    label: "Positionnement",
    values: {
      megalife: "Rapport Q/P",
      ingelec: "Fiabilite locale",
      lg: "Premium design",
      trane: "Premium VRF / commercial",
    },
  },
  {
    label: "Inverter",
    values: { megalife: true, ingelec: true, lg: true, trane: true },
  },
  {
    label: "Encastrable / Cassette",
    values: { megalife: true, ingelec: true, lg: true, trane: true },
  },
  {
    label: "Multi-split",
    values: { megalife: true, ingelec: true, lg: true, trane: true },
  },
  {
    label: "Solution VRF (grandes villas)",
    values: { megalife: false, ingelec: false, lg: true, trane: true },
  },
  {
    label: "Wi-Fi natif / App",
    values: { megalife: false, ingelec: false, lg: true, trane: true },
  },
  {
    label: "Garantie compresseur",
    values: { megalife: "5 ans", ingelec: "5 ans", lg: "10 ans", trane: "10 ans" },
  },
  {
    label: "Ideal pour",
    values: {
      megalife: "Appart. & villas standard",
      ingelec: "Climat marocain difficile",
      lg: "Villa moderne premium",
      trane: "Villa XL & projet sur-mesure",
    },
  },
];

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto h-4 w-4 text-emerald-600" />
    ) : (
      <Minus className="mx-auto h-4 w-4 text-ink/30" />
    );
  }
  return <span className="text-xs text-ink/80">{value}</span>;
}

export function BrandComparator() {
  return (
    <section className="bg-white py-20">
      <Container>
        <div className="text-center">
          <p className="text-[10px] font-semibold uppercase tracking-brand text-sand-600">
            Comparateur marques
          </p>
          <h2 className="mt-2 font-display text-4xl text-ink md:text-5xl">
            Quelle marque pour votre villa ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink/60">
            Synthèse RIZAL pour vous aider à choisir avant l&apos;étude personnalisée.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-3xl border border-ink/10">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="bg-ink text-bone">
                <th className="px-5 py-4 text-left text-[10px] font-semibold uppercase tracking-widest2">
                  Critère
                </th>
                {(["MEGALIFE", "INGELEC", "LG", "TRANE"] as const).map((b) => (
                  <th
                    key={b}
                    className="px-5 py-4 text-center text-[10px] font-semibold uppercase tracking-widest2"
                  >
                    {b}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">
              {ROWS.map((row, idx) => (
                <tr
                  key={row.label}
                  className={idx % 2 === 0 ? "bg-bone/40" : ""}
                >
                  <td className="px-5 py-4 text-left font-medium text-ink">
                    {row.label}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Cell value={row.values.megalife} />
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Cell value={row.values.ingelec} />
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Cell value={row.values.lg} />
                  </td>
                  <td className="px-5 py-4 text-center">
                    <Cell value={row.values.trane} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { BtuCalculator } from "@/components/cro/BtuCalculator";
import { SolarCalculator } from "@/components/cro/SolarCalculator";

export const metadata: Metadata = {
  title: "Calculateurs RIZAL | BTU climatisation & kWc solaire",
  description:
    "Calculez gratuitement la puissance de climatisation (BTU) et la taille de votre kit solaire (kWc) adaptée à votre villa au Maroc.",
};

export default function OutilsPage() {
  return (
    <main className="bg-bone pb-24 pt-32">
      <Container className="max-w-3xl text-center">
        <p className="text-[10px] font-semibold uppercase tracking-brand text-sand-600">
          Outils RIZAL
        </p>
        <h1 className="mt-3 font-display text-5xl text-ink md:text-6xl">
          Calculez votre projet
        </h1>
        <p className="mt-4 text-base text-ink/65">
          Outils gratuits, sans inscription : recevez immediatement une recommandation precise et chiffree.
        </p>
      </Container>

      <Container className="mt-14 grid max-w-5xl gap-10">
        <BtuCalculator />
        <SolarCalculator />
      </Container>
    </main>
  );
}

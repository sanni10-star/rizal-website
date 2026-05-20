import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { cgu } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Conditions Générales d'Utilisation",
  description: "CGU — Conditions Générales d'Utilisation du site rizal.click.",
  path: "/cgu",
});

export default function Page() {
  return <LegalShell page={cgu} />;
}

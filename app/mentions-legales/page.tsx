import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { mentionsLegales } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Mentions Légales",
  description: "Mentions légales du site rizal.click — RIZAL SARL.",
  path: "/mentions-legales",
});

export default function Page() {
  return <LegalShell page={mentionsLegales} />;
}

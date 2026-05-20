import type { Metadata } from "next";
import { LegalShell } from "@/components/legal/LegalShell";
import { confidentialite } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Politique de Confidentialité",
  description: "Politique de confidentialité conforme à la loi 09-08 (CNDP) et au RGPD.",
  path: "/politique-confidentialite",
});

export default function Page() {
  return <LegalShell page={confidentialite} />;
}

import { Star, Shield, Clock3, Award } from "lucide-react";
import { Container } from "@/components/ui/Container";

const items = [
  { icon: Star, label: "4,9/5 sur 247+ avis Google" },
  { icon: Shield, label: "Garantie décennale & constructeur" },
  { icon: Clock3, label: "Délais respectés contractuellement" },
  { icon: Award, label: "Distributeur officiel 4 marques" },
];

export function TrustRibbon() {
  return (
    <div className="border-y border-ink/5 bg-white py-3">
      <Container>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-ink/70 md:text-sm">
          {items.map((it) => (
            <li key={it.label} className="inline-flex items-center gap-1.5">
              <it.icon className="h-3.5 w-3.5 text-sand-600" />
              <span>{it.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

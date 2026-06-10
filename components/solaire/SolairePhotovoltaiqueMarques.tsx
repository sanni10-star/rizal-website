import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Zap } from "lucide-react";
import { solairePhotovoltaiqueMarques } from "@/content/solaire-photovoltaique-marques";

export function SolairePhotovoltaiqueMarques() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {solairePhotovoltaiqueMarques.map((marque) => (
        <Link
          key={marque.id}
          href={`/energie-solaire/${marque.catalogId}`}
          className="group flex flex-col overflow-hidden rounded-3xl border border-ink/8 bg-white shadow-sm transition hover:shadow-xl hover:shadow-ink/10"
        >
          <div
            className="relative aspect-[16/10] overflow-hidden"
            style={{ background: marque.bgGradient }}
          >
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="relative h-full w-full max-w-[280px]">
                <Image
                  src={marque.image}
                  alt={`Panneau photovoltaïque ${marque.name} ${marque.series}`}
                  fill
                  sizes="(max-width: 640px) 80vw, 40vw"
                  className="object-contain drop-shadow-2xl transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </div>

            <div className="absolute left-4 top-4 z-10 rounded-xl bg-white/95 px-3 py-2 shadow-md backdrop-blur">
              <Image
                src={marque.logo}
                alt={`Logo ${marque.name}`}
                width={120}
                height={32}
                className="h-7 w-auto object-contain object-left"
              />
            </div>

            <div
              className="absolute right-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg"
              style={{ backgroundColor: marque.accent }}
            >
              <Zap className="h-3 w-3" />
              {marque.powerRange}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />
            <p className="absolute bottom-3 left-4 text-[10px] font-semibold uppercase tracking-widest text-white/90">
              Tier 1 · {marque.series}
            </p>
          </div>

          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-2xl text-ink">{marque.name}</h3>
                <p
                  className="mt-1 text-[11px] font-semibold uppercase tracking-brand"
                  style={{ color: marque.accent }}
                >
                  {marque.tagline}
                </p>
              </div>
              <span
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition group-hover:scale-105"
                style={{ backgroundColor: marque.accentLight, color: marque.accent }}
              >
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
              {marque.description}
            </p>
            <span className="mt-4 text-xs font-semibold uppercase tracking-widest2 text-ink/50 group-hover:text-ink">
              Voir la fiche produit →
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

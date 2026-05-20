"use client";

import { useState } from "react";
import { MapPin, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import type { Realisation } from "@/content/realisations";

export function FeaturedProject({ project }: { project: Realisation }) {
  const [activePhase, setActivePhase] = useState(
    (project.timeline?.length ?? 1) - 1,
  );

  return (
    <>
      {/* ─── Featured Hero ─── */}
      <section className="relative overflow-hidden bg-ink py-16 md:py-24">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src={project.image}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-ink via-ink/95 to-ink/70" />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-sand-400/30 bg-sand-400/10 px-4 py-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-[11px] font-semibold uppercase tracking-brand text-sand-300">
                  Projet phare
                </span>
              </div>

              <h2 className="mt-5 font-display text-4xl text-bone md:text-5xl">
                {project.title}
              </h2>

              <div className="mt-3 inline-flex items-center gap-1.5 text-sm text-bone/60">
                <MapPin className="h-3.5 w-3.5" />
                {project.city}
              </div>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-bone/75">
                {project.description}
              </p>

              {project.stats && (
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {project.stats.map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-bone/10 bg-bone/5 p-3 backdrop-blur"
                    >
                      <p className="font-display text-2xl text-sand-300">
                        {s.value}
                      </p>
                      <p className="mt-0.5 text-[11px] uppercase tracking-widest text-bone/50">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
              <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-ink backdrop-blur">
                Livré — Ghazoua, Essaouira
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─── Construction Timeline ─── */}
      {project.timeline && project.timeline.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <Container>
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-600">
                De la première pierre au résultat final
              </p>
              <h2 className="mt-2 font-display text-3xl text-ink md:text-4xl">
                Les étapes de construction
              </h2>
            </div>

            {/* Timeline navigation */}
            <div className="relative mt-12">
              {/* Progress bar */}
              <div className="absolute left-0 top-5 hidden h-0.5 w-full bg-ink/10 md:block" />
              <div
                className="absolute left-0 top-5 hidden h-0.5 bg-gradient-to-r from-sand-500 to-emerald-500 transition-all duration-500 md:block"
                style={{
                  width: `${(activePhase / ((project.timeline?.length ?? 1) - 1)) * 100}%`,
                }}
              />

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {project.timeline.map((step, i) => (
                  <button
                    key={step.phase}
                    type="button"
                    onClick={() => setActivePhase(i)}
                    className={cn(
                      "group relative flex flex-col items-center text-center transition-all duration-300",
                      activePhase === i ? "scale-105" : "opacity-60 hover:opacity-90",
                    )}
                  >
                    <div
                      className={cn(
                        "z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-all duration-300",
                        activePhase === i
                          ? "border-sand-500 bg-sand-500 text-white shadow-lg shadow-sand-500/30"
                          : i < activePhase
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-ink/20 bg-white text-ink/50",
                      )}
                    >
                      {step.phase}
                    </div>
                    <p
                      className={cn(
                        "mt-2 text-xs font-medium transition-colors",
                        activePhase === i ? "text-ink" : "text-ink/50",
                      )}
                    >
                      {step.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Active phase image */}
            <div className="relative mt-10 overflow-hidden rounded-3xl shadow-xl">
              <div className="aspect-[16/9] md:aspect-[21/9]">
                {project.timeline.map((step, i) => (
                  <img
                    key={step.phase}
                    src={step.image}
                    alt={step.label}
                    className={cn(
                      "absolute inset-0 h-full w-full object-cover transition-all duration-700",
                      activePhase === i
                        ? "scale-100 opacity-100"
                        : "scale-105 opacity-0",
                    )}
                  />
                ))}
              </div>

              {/* Phase label overlay */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/80 to-transparent p-6 md:p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-sand-300">
                      Phase {project.timeline[activePhase].phase}
                    </p>
                    <p className="mt-1 font-display text-2xl text-white md:text-3xl">
                      {project.timeline[activePhase].label}
                    </p>
                  </div>
                  {activePhase < project.timeline.length - 1 && (
                    <button
                      type="button"
                      onClick={() => setActivePhase((p) => p + 1)}
                      className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/30"
                    >
                      Suivant
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Final result callout */}
            {activePhase === (project.timeline?.length ?? 1) - 1 && (
              <div className="mt-8 overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-sand-50 p-6 md:p-8">
                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-brand text-emerald-700">
                      Projet livré avec succès
                    </p>
                    <p className="mt-1 font-display text-2xl text-ink">
                      Villa de rêve livrée en 8 mois
                    </p>
                    <p className="mt-1 text-sm text-ink/60">
                      450 m² de construction neuve avec piscine, terrasses
                      panoramiques et finitions haut de gamme.
                    </p>
                  </div>
                  <a
                    href="https://wa.me/212630730350?text=Bonjour%2C%20je%20souhaite%20un%20devis%20construction%20villa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition hover:bg-brand-600"
                  >
                    Demander un devis similaire
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}
          </Container>
        </section>
      )}

      {/* ─── Gallery ─── */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="bg-bone py-16 md:py-20">
          <Container>
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-600">
                Galerie photos
              </p>
              <h2 className="mt-2 font-display text-3xl text-ink">
                Vues du projet
              </h2>
            </div>
            <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
              {project.gallery.map((img) => (
                <div
                  key={img.src}
                  className="mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-white shadow-sm"
                >
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                  <p className="px-4 py-3 text-xs text-ink/60">{img.caption}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

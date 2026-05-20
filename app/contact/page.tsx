import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/site";
import { whatsappContactUrl } from "@/lib/whatsapp";
import { buildMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Contactez RIZAL à Essaouira — WhatsApp, téléphone, email. Showroom multi-services : plomberie, énergie solaire, climatisation, piscine.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="bg-ink pt-28 pb-20 text-bone">
        <Container>
          <p className="text-[11px] font-semibold uppercase tracking-brand text-sand-400">
            Contact
          </p>
          <h1 className="mt-3 font-display text-5xl md:text-7xl">
            Parlons de votre projet.
          </h1>
          <p className="mt-5 max-w-2xl text-base text-bone/75 md:text-lg">
            Un chef de projet RIZAL vous rappelle gratuitement sous 24h pour
            étudier votre projet villa — climatisation, solaire, piscine,
            rénovation, traitement d&apos;eau.
          </p>
        </Container>
      </section>

      <section className="bg-bone py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="font-display text-3xl text-ink">Coordonnées</h2>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sand-400/15 text-sand-700">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest2 text-ink/60">
                      Téléphone & WhatsApp
                    </p>
                    <a
                      href={whatsappContactUrl("general")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-ink hover:text-sand-700"
                    >
                      {SITE.whatsappDisplay}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sand-400/15 text-sand-700">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest2 text-ink/60">
                      Email
                    </p>
                    <a href={`mailto:${SITE.email}`} className="text-lg font-medium text-ink hover:text-sand-700">
                      {SITE.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sand-400/15 text-sand-700">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest2 text-ink/60">
                      Adresse
                    </p>
                    <a
                      href={SITE.googleMaps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-ink hover:text-sand-700 underline decoration-ink/20 underline-offset-4 hover:decoration-sand-700/50"
                    >
                      Essaouira, Maroc — Voir sur Google Maps
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-sand-400/15 text-sand-700">
                    <Clock className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest2 text-ink/60">
                      Horaires
                    </p>
                    <p className="text-lg font-medium text-ink">{SITE.hours}</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8">
                <a
                  href={whatsappContactUrl("expert")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center gap-2 rounded-full bg-wa px-7 text-base font-semibold text-white shadow-xl shadow-emerald-900/20 hover:bg-emerald-600"
                >
                  <MessageCircle className="h-5 w-5" />
                  Discuter sur WhatsApp
                </a>
              </div>
            </div>

            <ContactForm />
          </div>
        </Container>
      </section>

      {/* Google Maps */}
      <section className="border-t border-ink/8">
        <div className="relative w-full">
          <a
            href={SITE.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute right-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-bone shadow-lg transition hover:bg-ink/85"
          >
            <MapPin className="h-4 w-4" />
            Ouvrir dans Google Maps
          </a>
          <iframe
            title="Localisation RIZAL Essaouira"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3000!2d-9.760002136230469!3d31.510543823242188!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDMwJzM4LjAiTiA5wrA0NSczNi4wIlc!5e0!3m2!1sfr!2sma!4v1"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </section>
    </>
  );
}

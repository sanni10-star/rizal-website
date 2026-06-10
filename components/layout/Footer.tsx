import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SITE } from "@/lib/site";
import { whatsappContactUrl } from "@/lib/whatsapp";
import { NewsletterForm } from "@/components/layout/NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-ink text-bone">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="group/logo w-fit">
              <Logo variant="gold" withTagline />
            </div>
            <p className="mt-5 text-sm text-bone/70">
              {SITE.authority} pour la climatisation premium, l&apos;énergie
              solaire, la rénovation de villas, les piscines et le traitement
              d&apos;eau.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={SITE.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bone/20 hover:bg-bone/10"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={SITE.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bone/20 hover:bg-bone/10"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={SITE.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-bone/20 hover:bg-bone/10"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-brand text-sand-400">
              Catalogue
            </h3>
            <ul className="space-y-2 text-sm text-bone/80">
              <li><Link className="hover:text-sand-300" href="/climatisation">Climatisation</Link></li>
              <li><Link className="hover:text-sand-300" href="/climatisation/megalife">MEGALIFE</Link></li>
              <li><Link className="hover:text-sand-300" href="/climatisation/ingelec">INGELEC</Link></li>
              <li><Link className="hover:text-sand-300" href="/climatisation/lg">LG</Link></li>
              <li><Link className="hover:text-sand-300" href="/climatisation/trane">TRANE</Link></li>
              <li><Link className="hover:text-sand-300" href="/energie-solaire">Énergie Solaire</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-brand text-sand-400">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-bone/80">
              <li><Link className="hover:text-sand-300" href="/services/droguerie-essaouira">Droguerie Essaouira</Link></li>
              <li><Link className="hover:text-sand-300" href="/services/construction-essaouira">Construction Essaouira</Link></li>
              <li><Link className="hover:text-sand-300" href="/services/piscine">Construction Piscine</Link></li>
              <li><Link className="hover:text-sand-300" href="/services/renovation-villa">Rénovation Villa</Link></li>
              <li><Link className="hover:text-sand-300" href="/services/traitement-eau">Traitement d&apos;Eau</Link></li>
              <li><Link className="hover:text-sand-300" href="/realisations">Réalisations</Link></li>
              <li><Link className="hover:text-sand-300" href="/a-propos">À Propos</Link></li>
              <li><Link className="hover:text-sand-300" href="/garanties">Garanties</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-brand text-sand-400">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-bone/80">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-sand-400" />
                <a href={whatsappContactUrl("general")} target="_blank" rel="noopener noreferrer" className="hover:text-sand-300">
                  {SITE.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-sand-400" />
                <a href={`mailto:${SITE.email}`} className="hover:text-sand-300">{SITE.email}</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sand-400" />
                <a
                  href={SITE.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sand-300 underline decoration-bone/20 underline-offset-2"
                >
                  {SITE.addressDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-sand-400" />
                <span>{SITE.hours}</span>
              </li>
            </ul>

            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-bone/10 pt-6 text-xs text-bone/50 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; 2026 {SITE.name} &mdash; {SITE.domain}. Tous droits
            réservés. {SITE.authority}.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            <li><Link className="hover:text-sand-300" href="/mentions-legales">Mentions légales</Link></li>
            <li><Link className="hover:text-sand-300" href="/cgv">CGV</Link></li>
            <li><Link className="hover:text-sand-300" href="/cgu">CGU</Link></li>
            <li><Link className="hover:text-sand-300" href="/politique-confidentialite">Confidentialité</Link></li>
            <li><Link className="hover:text-sand-300" href="/politique-cookies">Cookies</Link></li>
            <li><Link className="hover:text-sand-300" href="/garanties">Garanties</Link></li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}

import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Cairo, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, localBusinessJsonLd } from "@/lib/seo";
import { BackButtonWrapper } from "@/components/ui/BackButtonWrapper";
import { Analytics } from "@/components/analytics/Analytics";
import { DeferredLayoutWidgets } from "@/components/layout/DeferredLayoutWidgets";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-sans",
  display: "swap",
});

const arabic = Cairo({
  subsets: ["arabic"],
  weight: ["600"],
  variable: "--font-arabic",
  display: "swap",
});

const logo = Playfair_Display({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-logo",
  display: "swap",
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${sans.variable} ${arabic.variable} ${logo.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="font-sans antialiased">
        <JsonLd data={localBusinessJsonLd()} />
        <Header />
        <BackButtonWrapper />
        <main>{children}</main>
        <Footer />
        <DeferredLayoutWidgets />
        <Analytics />
      </body>
    </html>
  );
}

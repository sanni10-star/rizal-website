"use client";

import dynamic from "next/dynamic";

const StickyMobileCTA = dynamic(
  () =>
    import("@/components/cro/StickyMobileCTA").then((m) => m.StickyMobileCTA),
  { ssr: false },
);

const ExitIntent = dynamic(
  () => import("@/components/cro/ExitIntent").then((m) => m.ExitIntent),
  { ssr: false },
);

const SocialProofLive = dynamic(
  () =>
    import("@/components/cro/SocialProofLive").then((m) => m.SocialProofLive),
  { ssr: false },
);

const CookieBanner = dynamic(
  () =>
    import("@/components/layout/CookieBanner").then((m) => m.CookieBanner),
  { ssr: false },
);

const CartDrawer = dynamic(
  () => import("@/components/cart/CartDrawer").then((m) => m.CartDrawer),
  { ssr: false },
);

export function DeferredLayoutWidgets() {
  return (
    <>
      <StickyMobileCTA />
      <SocialProofLive />
      <ExitIntent />
      <CookieBanner />
      <CartDrawer />
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

/**
 * Pixels strategy — speed-first, dedup-ready.
 *
 *  • GA4 + Meta Pixel are NOT loaded on first paint.
 *  • They load on the FIRST user interaction (scroll / mousemove / touch / click)
 *    OR after a 3-second idle fallback. This protects LCP / FCP / TBT.
 *  • Each conversion event we fire generates a unique `event_id` (see lib/conversions.ts).
 *    The same `event_id` is sent client-side via fbq(...) AND server-side via the
 *    Meta Conversions API (POST /api/conversions/meta) so Meta deduplicates.
 *  • GA4 dedup uses `client_id` (set via gtag config) shared with the server-side
 *    Measurement Protocol call.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!gaId && !pixelId) return;
    if (shouldLoad) return;

    let triggered = false;
    const fire = () => {
      if (triggered) return;
      triggered = true;
      setShouldLoad(true);
      cleanup();
    };

    const events = ["scroll", "mousemove", "touchstart", "click", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, fire, { passive: true, once: true }));
    const timeout = window.setTimeout(fire, 3000);

    function cleanup() {
      events.forEach((e) => window.removeEventListener(e, fire));
      window.clearTimeout(timeout);
    }
    return cleanup;
  }, [gaId, pixelId, shouldLoad]);

  if (!gaId && !pixelId) return null;
  if (!shouldLoad) return null;

  return (
    <>
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="lazyOnload"
          />
          <Script id="ga4-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                anonymize_ip: true,
                send_page_view: true
              });
            `}
          </Script>
        </>
      ) : null}

      {pixelId ? (
        <Script id="meta-pixel" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      ) : null}
    </>
  );
}

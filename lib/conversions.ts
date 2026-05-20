/**
 * Unified conversions tracker (client + server, deduplicated).
 *
 * Each event gets a UUID `event_id`. We fire it once on the client (via fbq /
 * gtag) AND once on the server (Meta Conversions API + GA4 Measurement
 * Protocol). Meta dedupes by event_id; GA4 dedupes when the same client_id is
 * preserved across both calls.
 *
 * Usage:
 *   import { trackLead } from "@/lib/conversions";
 *   await trackLead({ value: 1500, currency: "MAD", phone, email, leadId });
 */

import crypto from "node:crypto";

export type ConversionEvent =
  | "Lead"           // contact form, calculator opt-in, lead magnet
  | "AddToCart"      // product added to devis
  | "InitiateCheckout"  // user opens cart drawer
  | "Purchase"       // WhatsApp checkout (treated as conversion)
  | "Subscribe"      // newsletter
  | "Schedule";      // appointment booking

export type ConversionPayload = {
  eventName: ConversionEvent;
  eventId?: string;
  value?: number;          // estimated value in MAD
  currency?: string;       // default MAD
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  city?: string | null;
  country?: string;        // ISO 3166 alpha-2; default MA
  // For deduplication / attribution
  fbp?: string | null;     // Facebook browser id cookie (_fbp)
  fbc?: string | null;     // Facebook click id cookie (_fbc)
  clientUserAgent?: string | null;
  clientIp?: string | null;
  eventSourceUrl?: string | null;
  // Lookup
  leadId?: string;
  quoteId?: string;
};

export function newEventId() {
  return crypto.randomUUID();
}

function sha256(value?: string | null) {
  if (!value) return undefined;
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

function eventValueForName(eventName: ConversionEvent) {
  const v = {
    Lead: 1500,
    AddToCart: 2500,
    InitiateCheckout: 5000,
    Purchase: 25000,
    Subscribe: 200,
    Schedule: 5000,
  };
  return v[eventName];
}

/**
 * Fire a server-side Meta Conversions API event.
 * Silently no-ops when META_PIXEL_ID or META_CAPI_TOKEN is missing.
 */
export async function fireMetaCAPI(p: ConversionPayload) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  const testCode = process.env.META_CAPI_TEST_EVENT_CODE; // optional

  if (!pixelId || !token) return { skipped: true } as const;

  const eventId = p.eventId ?? newEventId();
  const value = p.value ?? eventValueForName(p.eventName);
  const currency = p.currency ?? "MAD";

  const body = {
    data: [
      {
        event_name: p.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: p.eventSourceUrl,
        user_data: {
          em: sha256(p.email),
          ph: sha256(p.phone?.replace(/[^0-9]/g, "")),
          fn: sha256(p.firstName),
          ln: sha256(p.lastName),
          ct: sha256(p.city),
          country: sha256(p.country ?? "ma"),
          client_user_agent: p.clientUserAgent ?? undefined,
          client_ip_address: p.clientIp ?? undefined,
          fbp: p.fbp ?? undefined,
          fbc: p.fbc ?? undefined,
        },
        custom_data: {
          currency,
          value,
          lead_id: p.leadId,
          quote_id: p.quoteId,
        },
      },
    ],
    ...(testCode ? { test_event_code: testCode } : {}),
  };

  try {
    const url = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(token)}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const txt = await res.text();
      console.warn("[meta CAPI]", res.status, txt);
    }
    return { ok: res.ok, eventId } as const;
  } catch (err) {
    console.warn("[meta CAPI] failed", err);
    return { ok: false, eventId } as const;
  }
}

/**
 * Fire a server-side GA4 Measurement Protocol event.
 * Silently no-ops when NEXT_PUBLIC_GA_ID or GA4_API_SECRET is missing.
 */
export async function fireGA4(p: ConversionPayload & { clientId?: string }) {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;
  const apiSecret = process.env.GA4_API_SECRET;

  if (!measurementId || !apiSecret) return { skipped: true } as const;

  const clientId = p.clientId ?? "rizal-server-" + newEventId();
  const value = p.value ?? eventValueForName(p.eventName);

  const body = {
    client_id: clientId,
    events: [
      {
        name: p.eventName.toLowerCase(),
        params: {
          currency: p.currency ?? "MAD",
          value,
          lead_id: p.leadId,
          quote_id: p.quoteId,
          engagement_time_msec: 100,
        },
      },
    ],
  };

  try {
    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return { ok: true } as const;
  } catch (err) {
    console.warn("[GA4 MP] failed", err);
    return { ok: false } as const;
  }
}

/**
 * Convenience: fire a Lead conversion across both providers in parallel.
 */
export async function trackLead(p: Omit<ConversionPayload, "eventName">) {
  const eventId = p.eventId ?? newEventId();
  await Promise.allSettled([
    fireMetaCAPI({ ...p, eventName: "Lead", eventId }),
    fireGA4({ ...p, eventName: "Lead", eventId }),
  ]);
  return eventId;
}

/**
 * Convenience: fire a Purchase conversion (cart → WhatsApp checkout).
 */
export async function trackPurchase(p: Omit<ConversionPayload, "eventName">) {
  const eventId = p.eventId ?? newEventId();
  await Promise.allSettled([
    fireMetaCAPI({ ...p, eventName: "Purchase", eventId }),
    fireGA4({ ...p, eventName: "Purchase", eventId }),
  ]);
  return eventId;
}

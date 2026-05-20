/**
 * Google Sheets webhook integration.
 *
 * Set SHEETS_WEBHOOK_URL in your env to a deployed Apps Script Web App URL.
 * See tools/sheets/rizal-sheet-webhook.gs for the script to paste in your
 * Google Sheet (Extensions > Apps Script).
 *
 * Every lead / quote / subscriber is forwarded to the sheet as a new row,
 * fire-and-forget (network errors do not block the user response).
 */

type SheetRow =
  | {
      tab: "Leads";
      payload: {
        id: string;
        createdAt: string;
        source: string;
        score: number;
        firstName?: string;
        lastName?: string;
        phone?: string;
        email?: string;
        city?: string;
        subject?: string;
        message?: string;
        budget?: string;
        utmSource?: string;
        utmCampaign?: string;
        landingPage?: string;
      };
    }
  | {
      tab: "Quotes";
      payload: {
        id: string;
        createdAt: string;
        leadId?: string;
        firstName?: string;
        lastName?: string;
        phone?: string;
        email?: string;
        city?: string;
        itemsCount: number;
        items: string;
      };
    }
  | {
      tab: "Newsletter";
      payload: {
        id: string;
        createdAt: string;
        email: string;
        firstName?: string;
        city?: string;
        source?: string;
      };
    }
  | {
      tab: "Appointments";
      payload: {
        id: string;
        createdAt: string;
        type: string;
        scheduledAt: string;
        firstName: string;
        lastName: string;
        phone: string;
        email?: string;
        city: string;
        notes?: string;
      };
    };

export async function pushToSheet(row: SheetRow) {
  const url = process.env.SHEETS_WEBHOOK_URL;
  const secret = process.env.SHEETS_WEBHOOK_SECRET;
  if (!url) return { skipped: true } as const;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(secret ? { "x-rizal-secret": secret } : {}),
      },
      body: JSON.stringify({ ...row, secret }),
    });
    return { ok: res.ok } as const;
  } catch (err) {
    console.warn("[sheets] push failed", err);
    return { ok: false } as const;
  }
}

/**
 * RIZAL — Google Sheets Webhook (Apps Script)
 * ------------------------------------------------------------------
 * INSTRUCTIONS DE DEPLOIEMENT :
 *
 * 1. Cree un nouveau Google Sheet, nomme-le par exemple "RIZAL — Leads & Devis".
 * 2. Cree 4 onglets (en respectant l'orthographe exacte) :
 *      Leads | Quotes | Newsletter | Appointments
 * 3. Ouvre Extensions > Apps Script.
 * 4. Supprime tout le code existant et colle l'integralite de ce fichier.
 * 5. (Optionnel mais recommande) — En haut du fichier ci-dessous, remplace
 *    SHARED_SECRET par un secret long aleatoire (UUID v4 ideal).
 *    Tu mettras le meme secret cote backend dans la variable d'env
 *    SHEETS_WEBHOOK_SECRET.
 * 6. Clique sur "Deployer" > "Nouveau deploiement".
 *      Type : "Application Web"
 *      Executer en tant que : Moi
 *      Acces : Toute personne (meme anonyme)
 * 7. Copie l'URL "/exec" qui te sera donnee.
 * 8. Cote backend RIZAL, dans .env :
 *      SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/AKfyc.../exec
 *      SHEETS_WEBHOOK_SECRET=ton-secret-ici
 *
 * Chaque lead / devis / abonne / RDV ajoute via l'API du site sera
 * automatiquement ecrit dans l'onglet correspondant.
 *
 * Pour tester apres deploiement :
 *   curl -X POST <URL> -H "Content-Type: application/json" \
 *     -d '{"tab":"Leads","secret":"...","payload":{"id":"test","createdAt":"2026-05-05","source":"TEST","score":0}}'
 */

var SHARED_SECRET = ""; // optionnel — vide = pas de verification

var TAB_HEADERS = {
  Leads: [
    "ID", "Date (UTC)", "Source", "Score",
    "Prenom", "Nom", "Telephone", "Email", "Ville",
    "Sujet", "Message", "Budget",
    "UTM Source", "UTM Campaign", "Landing Page"
  ],
  Quotes: [
    "ID", "Date (UTC)", "Lead ID",
    "Prenom", "Nom", "Telephone", "Email", "Ville",
    "Articles (qte totale)", "Detail produits"
  ],
  Newsletter: [
    "ID", "Date (UTC)", "Email", "Prenom", "Ville", "Source"
  ],
  Appointments: [
    "ID", "Date demande (UTC)", "Type RDV", "Date RDV planifiee",
    "Prenom", "Nom", "Telephone", "Email", "Ville", "Notes"
  ]
};

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    // Verification du secret partage (si configure)
    if (SHARED_SECRET && body.secret !== SHARED_SECRET) {
      return jsonResponse({ ok: false, error: "Invalid secret" }, 401);
    }

    var tab = body.tab;
    var payload = body.payload || {};

    if (!tab || !TAB_HEADERS[tab]) {
      return jsonResponse({ ok: false, error: "Unknown tab: " + tab }, 400);
    }

    var sheet = ensureTab_(tab);
    var row = buildRow_(tab, payload);
    sheet.appendRow(row);

    return jsonResponse({ ok: true, tab: tab, rows: sheet.getLastRow() });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) }, 500);
  }
}

function doGet() {
  return jsonResponse({ ok: true, service: "RIZAL Sheets Webhook", time: new Date().toISOString() });
}

function ensureTab_(tab) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(tab);
  if (!sheet) {
    sheet = ss.insertSheet(tab);
  }
  // Ajoute les headers si vide
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(TAB_HEADERS[tab]);
    sheet.getRange(1, 1, 1, TAB_HEADERS[tab].length)
      .setFontWeight("bold")
      .setBackground("#1A2845")
      .setFontColor("#F47B20");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function buildRow_(tab, p) {
  switch (tab) {
    case "Leads":
      return [
        p.id || "",
        p.createdAt || new Date().toISOString(),
        p.source || "",
        p.score || 0,
        p.firstName || "",
        p.lastName || "",
        p.phone || "",
        p.email || "",
        p.city || "",
        p.subject || "",
        p.message || "",
        p.budget || "",
        p.utmSource || "",
        p.utmCampaign || "",
        p.landingPage || ""
      ];

    case "Quotes":
      return [
        p.id || "",
        p.createdAt || new Date().toISOString(),
        p.leadId || "",
        p.firstName || "",
        p.lastName || "",
        p.phone || "",
        p.email || "",
        p.city || "",
        p.itemsCount || 0,
        p.items || ""
      ];

    case "Newsletter":
      return [
        p.id || "",
        p.createdAt || new Date().toISOString(),
        p.email || "",
        p.firstName || "",
        p.city || "",
        p.source || ""
      ];

    case "Appointments":
      return [
        p.id || "",
        p.createdAt || new Date().toISOString(),
        p.type || "",
        p.scheduledAt || "",
        p.firstName || "",
        p.lastName || "",
        p.phone || "",
        p.email || "",
        p.city || "",
        p.notes || ""
      ];

    default:
      return [JSON.stringify(p)];
  }
}

function jsonResponse(obj, status) {
  var output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

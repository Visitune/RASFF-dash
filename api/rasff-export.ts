import type { VercelRequest, VercelResponse } from '@vercel/node';

// ---------------------------------------------------------------------------
// Source : API publique officielle RASFF Window (Commission Européenne)
// https://webgate.ec.europa.eu/rasff-window
// Aucune auth, réponse en temps réel (dernières notifications publiées).
// ---------------------------------------------------------------------------
const API_URL =
  'https://webgate.ec.europa.eu/rasff-window/backend/public/notification/search/consolidated/en/';

const PAGE_SIZE = 50;
const MAX_PAGES = 10; // 500 notifications ≈ 3 mois d'historique

const API_HEADERS = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  Origin: 'https://webgate.ec.europa.eu',
  Referer: 'https://webgate.ec.europa.eu/rasff-window/screen/list',
  'X-Requested-With': 'XMLHttpRequest',
};

const MONITORED_CLASSIFICATIONS = [
  'alert notification',
  'border rejection',
  'information notification for attention',
  'information notification for follow-up',
];

const MONITORED_TYPES = ['food'];

const PATHOGENS = [
  'Listeria monocytogenes', 'Salmonella', 'Escherichia coli', 'Norovirus',
  'Clostridium botulinum', 'Shigella', 'Campylobacter', 'Staphylococcus',
  'Vibrio', 'Bacillus cereus', 'Yersinia', 'Hepatitis', 'Cyclospora',
  'Cryptosporidium', 'E. coli', 'STEC', 'Shigatoxin', 'Listeria',
];

function extractPathogen(subject: string): string {
  if (!subject) return '';
  for (const p of PATHOGENS) {
    if (subject.toLowerCase().includes(p.toLowerCase())) return p;
  }
  return '';
}

/** RASFF riskDecision -> niveau de risque du dashboard */
function riskDecisionToLevel(desc: string): string {
  const s = (desc || '').toLowerCase();
  if (s.includes('not serious') || s.includes('no risk')) return 'Low';
  if (s.includes('serious')) return 'Serious';
  if (s.includes('potential') || s.includes('undecided')) return 'Medium';
  return 'Medium';
}

/** Convertit "17-10-2026 21:09:08" -> "2026-10-17" */
function toIsoDate(raw: string): string {
  if (!raw) return '';
  const m = raw.match(/^(\d{2})-(\d{2})-(\d{4})/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
}

/** "17-10-2026 21:09:08" -> "17-10-2026 00:00:00" (format attendu par csvParser.ts) */
function toDisplayDate(raw: string): string {
  if (!raw) return '';
  const m = raw.match(/^(\d{2})-(\d{2})-(\d{4})/);
  return m ? `${m[1]}-${m[2]}-${m[3]} 00:00:00` : '';
}

const CSV_HEADER = [
  'reference', 'category', 'type', 'subject', 'date', 'notifying_country',
  'classification', 'risk_decision', 'distribution', 'forAttention',
  'forFollowUp', 'operator', 'origin', 'hazards', 'notification_id',
  'notification_url',
];

function notificationToRow(n: any): string[] {
  const subject = (n.subject || '').trim();
  const classification = (n.notificationClassification?.description || '').trim();
  const riskDecision = (n.riskDecision?.description || '').trim();
  const origin = n.originCountries?.[0]?.organizationName || '';
  const notifying = n.notifyingCountry?.organizationName || '';
  const notifId = String(n.notifId || '');
  const url = notifId
    ? `https://webgate.ec.europa.eu/rasff-window/screen/notification/${notifId}`
    : '';

  return [
    n.reference || '',                                          // reference
    n.productCategory?.description || 'Unknown',                // category
    classification,                                            // type
    subject,                                                   // subject
    toDisplayDate(n.ecValidationDate || ''),                    // date
    notifying || 'Unknown',                                     // notifying_country
    riskDecisionToLevel(riskDecision),                          // classification
    riskDecision,                                               // risk_decision
    '',                                                        // distribution
    '',                                                        // forAttention
    '',                                                        // forFollowUp
    '',                                                        // operator
    origin || 'Unknown',                                       // origin
    extractPathogen(subject),                                  // hazards
    notifId,                                                   // notification_id
    url,                                                       // notification_url
  ];
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const collected: any[] = [];

    for (let page = 1; page <= MAX_PAGES; page++) {
      const payload = { parameters: { pageNumber: page, itemsPerPage: PAGE_SIZE } };

      const upstream = await fetch(API_URL, {
        method: 'POST',
        headers: API_HEADERS,
        body: JSON.stringify(payload),
      } as any);

      if (!upstream.ok) {
        console.warn(`RASFF API page ${page} failed: ${upstream.status}`);
        break;
      }

      const body: any = await upstream.json();
      const notifs = body.notifications || [];
      if (!notifs.length) break;

      collected.push(...notifs);
    }

    // Filtres : type "food" + classifications surveillées
    const filtered = collected.filter((n) => {
      const ptype = (n.productType?.description || '').toLowerCase();
      if (!MONITORED_TYPES.includes(ptype)) return false;
      const classif = (n.notificationClassification?.description || '').toLowerCase();
      return MONITORED_CLASSIFICATIONS.some((mc) => classif.includes(mc));
    });

    const rows = filtered.map(notificationToRow);
    const csv = [CSV_HEADER.join('\t'), ...rows.map((r) => r.join('\t'))].join('\n');

    // Cache CDN : 1h frais, stale-while-revalidate 24h
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('Content-Type', 'text/tab-separated-values; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(csv);
  } catch (err) {
    console.error('RASFF proxy error:', err);
    res.status(502).json({ error: 'Failed to fetch RASFF data' });
  }
}

/**
 * Regenerate rasff_data.tsv + src/lib/mockData.ts
 * Source: RASFF Window public API (live)
 * Usage: node process.js
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = __dirname;

const API_URL = 'https://webgate.ec.europa.eu/rasff-window/backend/public/notification/search/consolidated/en/';
const PAGE_SIZE = 50;
const MAX_PAGES = 10;

const API_HEADERS = {
  'Accept': 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  'Origin': 'https://webgate.ec.europa.eu',
  'Referer': 'https://webgate.ec.europa.eu/rasff-window/screen/list',
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

function extractPathogen(subject) {
  if (!subject) return '';
  for (const p of PATHOGENS) {
    if (subject.toLowerCase().includes(p.toLowerCase())) return p;
  }
  return '';
}

function riskDecisionToLevel(desc) {
  const s = (desc || '').toLowerCase();
  if (s.includes('not serious') || s.includes('no risk')) return 'Low';
  if (s.includes('serious')) return 'Serious';
  if (s.includes('potential') || s.includes('undecided')) return 'Medium';
  return 'Medium';
}

function toDisplayDate(raw) {
  if (!raw) return '';
  const m = raw.match(/^([0-9]{2})-([0-9]{2})-([0-9]{4})/);
  return m ? `${m[1]}-${m[2]}-${m[3]} 00:00:00` : '';
}

function toIsoDate(raw) {
  if (!raw) return '';
  const m = raw.match(/^([0-9]{2})-([0-9]{2})-([0-9]{4})/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
}

function valueFromRisk(risk) {
  if (risk === 'Serious') return 3;
  if (risk === 'Medium') return 2;
  return 1;
}

async function fetchAllNotifications() {
  const all = [];
  for (let page = 1; page <= MAX_PAGES; page++) {
    const payload = { parameters: { pageNumber: page, itemsPerPage: PAGE_SIZE } };
    const resp = await fetch(API_URL, {
      method: 'POST',
      headers: API_HEADERS,
      body: JSON.stringify(payload),
    });
    if (!resp.ok) break;
    const body = await resp.json();
    const notifs = body.notifications || [];
    if (!notifs.length) break;
    all.push(...notifs);
  }
  return all;
}

async function main() {
  console.log('Fetching RASFF data from official RASFF Window API...');
  const notifications = await fetchAllNotifications();
  console.log(`Total notifications: ${notifications.length}`);

  const filtered = notifications.filter((n) => {
    const ptype = (n.productType && n.productType.description || '').toLowerCase();
    if (!MONITORED_TYPES.includes(ptype)) return false;
    const classif = (n.notificationClassification && n.notificationClassification.description || '').toLowerCase();
    return MONITORED_CLASSIFICATIONS.some((mc) => classif.includes(mc));
  });
  console.log(`After filter: ${filtered.length}`);

  const header = [
    'reference','category','type','subject','date','notifying_country',
    'classification','risk_decision','distribution','forAttention',
    'forFollowUp','operator','origin','hazards','notification_id',
    'notification_url',
  ].join('\t');

  const rows = filtered.map((n) => {
    const subject = (n.subject || '').trim();
    const classification = (n.notificationClassification && n.notificationClassification.description || '').trim();
    const riskDecision = (n.riskDecision && n.riskDecision.description || '').trim();
    const origin = n.originCountries && n.originCountries[0] && n.originCountries[0].organizationName || '';
    const notifying = n.notifyingCountry && n.notifyingCountry.organizationName || '';
    const notifId = String(n.notifId || '');
    const url = notifId ? `https://webgate.ec.europa.eu/rasff-window/screen/notification/${notifId}` : '';

    return [
      n.reference || '',
      n.productCategory && n.productCategory.description || 'Unknown',
      classification,
      subject,
      toDisplayDate(n.ecValidationDate || ''),
      notifying || 'Unknown',
      riskDecisionToLevel(riskDecision),
      riskDecision,
      '', '', '', '',
      origin || 'Unknown',
      extractPathogen(subject),
      notifId,
      url,
    ].join('\t');
  });

  const tsvPath = path.join(PROJECT_ROOT, 'rasff_data.tsv');
  fs.writeFileSync(tsvPath, [header, ...rows].join('\n') + '\n', 'utf8');
  console.log(`Wrote ${tsvPath} (${rows.length} rows)`);

  const mockRows = filtered.map((n) => {
    const subject = (n.subject || '').trim();
    const classification = (n.notificationClassification && n.notificationClassification.description || '').trim();
    const riskDecision = (n.riskDecision && n.riskDecision.description || '').trim();
    const origin = n.originCountries && n.originCountries[0] && n.originCountries[0].organizationName || 'Unknown';
    const notifying = n.notifyingCountry && n.notifyingCountry.organizationName || 'Unknown';
    const notifId = String(n.notifId || '');
    const url = notifId ? `https://webgate.ec.europa.eu/rasff-window/screen/notification/${notifId}` : '';

    return JSON.stringify({
      id: n.reference || '',
      date: toIsoDate(n.ecValidationDate || ''),
      category: n.productCategory && n.productCategory.description || 'Unknown',
      product: subject,
      hazard: extractPathogen(subject),
      origin: origin,
      notifying_country: notifying,
      risk_level: riskDecisionToLevel(riskDecision),
      status: classification,
      value: valueFromRisk(riskDecisionToLevel(riskDecision)),
      notification_id: notifId || undefined,
      notification_url: url || undefined,
    });
  }).join(',\n');

  const mockPath = path.join(PROJECT_ROOT, 'src', 'lib', 'mockData.ts');
  fs.writeFileSync(
    mockPath,
    `export interface RasffData {
  id: string;
  date: string;
  category: string;
  product: string;
  hazard: string;
  origin: string;
  notifying_country: string;
  risk_level: string;
  status: string;
  value: number;
  notification_id?: string;
  notification_url?: string;
}

// AUTO-GENERATED from RASFF Window API
// by \`node process.js\`. Do not edit by hand.
export const mockRasffData: RasffData[] = [
${mockRows}
];
`,
    'utf8'
  );
  console.log(`Wrote ${mockPath} (${filtered.length} rows)`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});

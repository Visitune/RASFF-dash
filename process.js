// ============================================================
// Generate mockData.ts and rasff_data.tsv from FOOD-SAFETY-HORIZON-SCAN
// (the repo that scrapes RASFF 2x/day via GitHub Actions)
// Usage: node process.js
// ============================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = __dirname;

const RECALLS_JSON_URL =
  'https://raw.githubusercontent.com/Visitune/FOOD-SAFETY-HORIZON-SCAN/main/docs/data/recalls.json';

function classificationToRisk(classification) {
  const c = (classification || '').toLowerCase();
  if (c.includes('not serious')) return 'Low';
  if (c.includes('border rejection')) return 'Medium';
  if (c.includes('alert')) return 'Serious';
  if (c.includes('information')) return 'Medium';
  return 'Medium';
}

function parseReasonField(raw) {
  const s = raw || '';
  const catMatch = s.match(/category:\s*([^;\n]+?)(?:;|$)/i);
  const riskMatch = s.match(/risk:\s*([^;\n]+?)(?:;|$)/i);
  const classMatch = s.match(/classification:\s*([^;\n]+?)(?:;|$)/i);
  return {
    category: catMatch ? catMatch[1].trim() : '',
    risk: riskMatch ? riskMatch[1].trim() : '',
    classification: classMatch ? classMatch[1].trim() : '',
  };
}

function parseCompanyField(raw) {
  const s = raw || '';
  const originMatch = s.match(/Origin:\s*([^|]+?)\s*\|\s*Notifying:/i);
  const countryMatch = s.match(/Notifying:\s*(.+)$/i);
  return {
    origin: originMatch ? originMatch[1].trim() : '',
    notifyingCountry: countryMatch ? countryMatch[1].trim() : '',
  };
}

function refFromNotes(notes) {
  const m = (notes || '').match(/#(\d{4}\.\d+)/);
  return m ? m[1] : '';
}

function toDmyDate(dateRaw) {
  const m = (dateRaw || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return dateRaw || '';
  return `${m[3]}-${m[2]}-${m[1]} 00:00:00`;
}

function toIsoDate(dateRaw) {
  const m = (dateRaw || '').match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return '';
  return `${m[1]}-${m[2]}-${m[3]}`;
}

async function main() {
  console.log('Fetching RASFF data from FOOD-SAFETY-HORIZON-SCAN...');

  const upstream = await fetch(RECALLS_JSON_URL, {
    headers: { Accept: 'application/json' },
  });
  if (!upstream.ok) throw new Error(`Upstream HTTP ${upstream.status}`);

  const data = (await upstream.json()).filter(
    (row) => row.Source && String(row.Source).toLowerCase().includes('rasff'),
  );
  console.log(`RASFF entries found: ${data.length}`);

  // --- rasff_data.tsv ---
  const header = [
    'reference', 'category', 'type', 'subject', 'date', 'product', 'hazard',
    'origin', 'notifying_country', 'risk_level', 'status',
    'notification_id', 'notification_url', 'value',
  ].join('\t');

  const rows = data.map((entry) => {
    const ref = refFromNotes(entry.Notes);
    const parsed = parseReasonField(entry.Reason);
    const company = parseCompanyField(entry.Company);
    const type = parsed.classification || entry.Class || 'Unknown';
    const riskLevel = classificationToRisk(parsed.classification || entry.Class);
    const value = { Serious: 3, Medium: 2, Low: 1 }[riskLevel] ?? 1;
    const notifId = entry.URL ? (entry.URL.split('/').pop() || '') : '';
    return [
      ref,
      parsed.category || 'Unknown',
      type,
      entry.Product || '',
      toDmyDate(entry.Date),
      entry.Product || '',
      entry.Pathogen || 'Unknown',
      company.origin || 'Unknown',
      company.notifyingCountry || 'Unknown',
      riskLevel,
      type,
      notifId,
      entry.URL || '',
      String(value),
    ].join('\t');
  });

  const tsvPath = path.join(PROJECT_ROOT, 'rasff_data.tsv');
  fs.writeFileSync(tsvPath, [header, ...rows].join('\n') + '\n', 'utf8');
  console.log(`Wrote ${tsvPath} (${rows.length} rows)`);

  // --- src/lib/mockData.ts ---
  const mockRows = data.map((entry) => {
    const parsed = parseReasonField(entry.Reason);
    const company = parseCompanyField(entry.Company);
    const type = parsed.classification || entry.Class || 'Unknown';
    const riskLevel = classificationToRisk(parsed.classification || entry.Class);
    const value = { Serious: 3, Medium: 2, Low: 1 }[riskLevel] ?? 1;
    return JSON.stringify({
      id: refFromNotes(entry.Notes),
      date: toIsoDate(entry.Date),
      category: parsed.category || 'Unknown',
      product: entry.Product || '',
      hazard: entry.Pathogen || '',
      origin: company.origin || 'Unknown',
      notifying_country: company.notifyingCountry || 'Unknown',
      risk_level: riskLevel,
      status: type,
      value,
      notification_id: entry.URL ? entry.URL.split('/').pop() : undefined,
      notification_url: entry.URL || undefined,
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

// AUTO-GENERATED from FOOD-SAFETY-HORIZON-SCAN (docs/data/recalls.json)
// by \`node process.js\`. Do not edit by hand.
export const mockRasffData: RasffData[] = [
${mockRows}
];
`,
    'utf8',
  );
  console.log(`Wrote ${mockPath} (${data.length} rows)`);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});

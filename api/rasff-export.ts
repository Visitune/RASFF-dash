import type { VercelRequest, VercelResponse } from '@vercel/node';

// Source de données mise à jour 2×/jour par le scraper RASFF de FOOD-SAFETY-HORIZON-SCAN
const RECALLS_JSON_URL =
  'https://raw.githubusercontent.com/Visitune/FOOD-SAFETY-HORIZON-SCAN/main/docs/data/recalls.json';

function parseReasonField(reason: string): {
  category: string;
  risk: string;
  classification: string;
} {
  if (!reason) return { category: '', risk: '', classification: '' };

  // Extraire les champs après les marqueurs
  const catMatch = reason.match(/category:\s*([^;\n]+?)(?:;|$)/i);
  const riskMatch = reason.match(/risk:\s*([^;\n]+?)(?:;|$)/i);
  const classMatch = reason.match(/classification:\s*([^;\n]+?)(?:;|$)/i);

  return {
    category: catMatch ? catMatch[1].trim() : '',
    risk: riskMatch ? riskMatch[1].trim() : '',
    classification: classMatch ? classMatch[1].trim() : '',
  };
}

function parseCompanyField(company: string): { origin: string; notifyingCountry: string } {
  if (!company) return { origin: '', notifyingCountry: '' };

  const originMatch = company.match(/Origin:\s*([^|]+?)\s*\|\s*Notifying:/i);
  const countryMatch = company.match(/Notifying:\s*(.+)$/i);

  return {
    origin: originMatch ? originMatch[1].trim() : '',
    notifyingCountry: countryMatch ? countryMatch[1].trim() : '',
  };
}

function classificationToRiskLevel(classification: string): string {
  const c = (classification || '').toLowerCase();
  if (c.includes('not serious')) return 'Low';
  if (c.includes('border rejection')) return 'Medium';
  if (c.includes('alert')) return 'Serious';
  if (c.includes('information')) return 'Medium';
  return 'Medium';
}

function riskLevelToValue(riskLevel: string): number {
  if (riskLevel === 'Serious') return 3;
  if (riskLevel === 'High') return 2.5;
  if (riskLevel === 'Medium') return 2;
  return 1;
}

/**
 * Transforme une entrée JSON du FOOD-SAFETY-HORIZON-SCAN en ligne CSV
 * compatible avec le format attendu par le frontend de RASFF-dash.
 */
function rasffEntryToCsvRow(entry: Record<string, any>): string[] {
  const dateRaw = entry.Date ?? '';
  // Normaliser la date au format DD-MM-YYYY HH:MM:SS (attendu par csvParser.ts)
  let formattedDate = dateRaw;
  const isoMatch = dateRaw.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    formattedDate = `${isoMatch[3]}-${isoMatch[2]}-${isoMatch[1]} 00:00:00`;
  }

  const parsed = parseReasonField(entry.Reason);
  const companyInfo = parseCompanyField(entry.Company);

  // Extraire notification_id de l'URL RASFF
  const notificationId = entry.URL
    ? entry.URL.split('/').pop() || ''
    : '';

  // Extraire la référence RASFF (ex: 2026.7838) depuis Notes
  const refMatch = (entry.Notes || '').match(/#([\d]{4}\.[\d]+)/);
  const reference = refMatch ? refMatch[1] : notificationId;

  const risk_level = classificationToRiskLevel(parsed.classification || entry.Class);
  const type = parsed.classification || entry.Class || 'Unknown';

  return [
    reference,                                           // reference
    parsed.category || 'Unknown',                        // category
    type,                                                // type
    entry.Product || '',                                 // subject
    formattedDate,                                       // date (DD-MM-YYYY HH:MM:SS)
    entry.Product || '',                                 // subject (duplicate for compat)
    entry.Country || companyInfo.origin || '',           // origin
    companyInfo.notifyingCountry || 'Unknown',           // notifying_country
    risk_level,                                          // classification
    parsed.risk || risk_level,                          // risk_decision
    '',                                                  // distribution
    '',                                                  // forAttention
    '',                                                  // forFollowUp
    '',                                                  // operator
    notificationId,                                       // notification_id
    entry.URL || '',                                     // notification_url
    String(riskLevelToValue(risk_level)),                // value (pour heatmaps etc.)
  ];
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const upstream = await fetch(RECALLS_JSON_URL, {
      headers: { Accept: 'application/json' },
    });

    if (!upstream.ok) {
      return res
        .status(upstream.status)
        .json({ error: `Upstream error ${upstream.status}` });
    }

    const data: Record<string, any>[] = await upstream.json();

    // Filtrer uniquement les entrées RASFF (EU)
    const rasffEntries = data.filter(
      (row) => row.Source && row.Source.toLowerCase().includes('rasff'),
    );

    if (rasffEntries.length === 0) {
      return res.status(404).json({ error: 'No RASFF data found upstream' });
    }

    // En-tête CSV identique au format rasff_data.tsv attendu par process.js
    const header = [
      'reference',
      'category',
      'type',
      'subject',
      'date',
      'product',
      'origin',
      'notifying_country',
      'classification',
      'risk_decision',
      'distribution',
      'forAttention',
      'forFollowUp',
      'operator',
      'notification_id',
      'notification_url',
      'value',
    ].join('\t');

    const csvBody = [
      header,
      ...rasffEntries.map((entry) => rasffEntryToCsvRow(entry).join('\t')),
    ].join('\n');

    // Cache CDN : 1h frais, stale jusqu'à 24h pendant revalidation
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.setHeader('Content-Type', 'text/tab-separated-values; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(csvBody);
  } catch (err) {
    console.error('RASFF proxy error:', err);
    res.status(502).json({ error: 'Failed to fetch RASFF data' });
  }
}

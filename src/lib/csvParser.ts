import Papa from 'papaparse';
import { mockRasffData, RasffData } from './mockData';
import { rasffNotificationMap } from './rasffNotificationMap';

export interface Alert {
  reference: string;
  category: string;
  type: string;
  subject: string;
  date: string;
  parsedDate: Date;
  notifying_country: string;
  classification: string;
  risk_decision: string;
  distribution: string;
  forAttention: string;
  forFollowUp: string;
  operator: string;
  origin: string;
  hazards: string;
  notification_id?: string;
  notification_url?: string;
}

const CACHE_KEY = 'rasff_alerts_cache';
const CACHE_TS_KEY = 'rasff_alerts_cache_ts';
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const RASFF_EXPORT_URL =
  'https://webgate.ec.europa.eu/rasff-window/backend/public/notification/search/export/en/';

const SHEET_URL =
  'https://docs.google.com/spreadsheets/d/1OvFp8TLFhLB5BxcK2ZzmvMMWFoPGYJ-Mipb888j1JLI/export?format=csv';

async function fetchCsvFromRasff(): Promise<string> {
  const response = await fetch(RASFF_EXPORT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: JSON.stringify({
      date: { startRange: '', endRange: '' },
      countries: {},
      type: {},
      notificationStatus: {},
      product: {},
      risk: {},
      reference: '',
      subject: '',
    }),
  });
  if (!response.ok) throw new Error(`RASFF API HTTP ${response.status}`);
  return response.text();
}

function parseRow(alert: any): Alert {
  const dateStr: string = alert.date ?? '';
  const parts = dateStr.split(' ');
  let parsedDate = new Date(0);
  const notification_id =
    alert.notification_id ??
    alert.notificationId ??
    alert.rasff_notification_id ??
    alert.detail_id;
  const notification_url =
    alert.notification_url ??
    alert.notificationUrl ??
    alert.detail_url ??
    alert.url;

  if (parts.length >= 2) {
    const [day, month, year] = parts[0].split('-').map(Number);
    const [h, m, s] = parts[1].split(':').map(Number);
    parsedDate = new Date(year, month - 1, day, h, m, s);
  } else if (parts.length === 1 && parts[0]) {
    const [day, month, year] = parts[0].split('-').map(Number);
    parsedDate = new Date(year, month - 1, day);
  }

  return { ...alert, parsedDate, notification_id, notification_url };
}

function mockRowToAlert(row: RasffData): Alert {
  return {
    reference: row.id,
    category: row.category,
    type: row.status,
    subject: row.product,
    date: row.date,
    parsedDate: row.date ? new Date(`${row.date}T00:00:00`) : new Date(0),
    notifying_country: row.notifying_country,
    classification: row.risk_level,
    risk_decision: row.risk_level,
    distribution: '',
    forAttention: '',
    forFollowUp: '',
    operator: '',
    origin: row.origin,
    hazards: row.hazard,
    notification_id: row.notification_id,
    notification_url: row.notification_url,
  };
}

export async function fetchAlerts(forceRefresh = false): Promise<Alert[]> {
  if (!forceRefresh) {
    const ts = localStorage.getItem(CACHE_TS_KEY);
    const cached = localStorage.getItem(CACHE_KEY);
    if (ts && cached && Date.now() - Number(ts) < CACHE_TTL_MS) {
      const raw: Omit<Alert, 'parsedDate'>[] = JSON.parse(cached);
      return raw.map(parseRow);
    }
  }

  let csvText: string | null = null;

  try {
    csvText = await fetchCsvFromRasff();
    console.info('RASFF data loaded from official API.');
  } catch (rasffError) {
    console.warn('RASFF API fetch failed, trying Google Sheets fallback.', rasffError);
    try {
      const response = await fetch(SHEET_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      csvText = await response.text();
      console.info('RASFF data loaded from Google Sheets.');
    } catch (sheetError) {
      console.warn('Google Sheets fetch failed, falling back to bundled dataset.', sheetError);
    }
  }

  if (!csvText) {
    return mockRasffData.map(mockRowToAlert);
  }

  return new Promise((resolve, reject) => {
    Papa.parse<any>(csvText!, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data: Alert[] = results.data.map(parseRow);
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify(data.map(({ parsedDate, ...rest }) => rest))
          );
          localStorage.setItem(CACHE_TS_KEY, String(Date.now()));
        } catch {
          // Ignore cache write failures.
        }
        resolve(data);
      },
      error: reject,
    });
  });
}

function classificationToRisk(c: string): RasffData['risk_level'] {
  const s = (c ?? '').toLowerCase();
  if (s.includes('not serious')) return 'Low';
  if (s.includes('potentially')) return 'Medium';
  if (s.includes('serious')) return 'Serious';
  if (s.includes('undecided')) return 'Medium';
  return 'Medium';
}

function riskToValue(r: RasffData['risk_level']): number {
  if (r === 'Serious') return 3;
  if (r === 'High') return 2.5;
  if (r === 'Medium') return 2;
  return 1;
}

export function mapAlertsToRasff(alerts: Alert[]): RasffData[] {
  return alerts.map(a => {
    const risk_level = classificationToRisk(a.classification);
    const pd = a.parsedDate;
    const hardcodedLink = rasffNotificationMap[a.reference];
    const isoDate =
      pd instanceof Date && !Number.isNaN(pd.getTime())
        ? pd.toISOString().split('T')[0]
        : '';

    return {
      id: a.reference,
      date: isoDate,
      product: a.subject || a.category,
      hazard: a.hazards || 'Unknown',
      origin: a.origin || 'Unknown',
      category: a.category || 'Unknown',
      notifying_country: a.notifying_country || 'Unknown',
      status: a.type || 'Unknown',
      risk_level,
      value: riskToValue(risk_level),
      notification_id: a.notification_id || hardcodedLink?.notification_id,
      notification_url:
        a.notification_url ||
        hardcodedLink?.notification_url ||
        ((a.notification_id || hardcodedLink?.notification_id)
          ? `https://webgate.ec.europa.eu/rasff-window/screen/notification/${a.notification_id || hardcodedLink?.notification_id}`
          : undefined),
    };
  });
}

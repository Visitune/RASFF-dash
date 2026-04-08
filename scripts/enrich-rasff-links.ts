import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { rasffNotificationMap, type RasffNotificationLinkEntry } from '../src/lib/rasffNotificationMap';

type SearchPayload = {
  parameters: {
    pageNumber: number;
    itemsPerPage: number;
  };
  notificationReference: string;
};

type ApiNotification = {
  notifId: number | string;
  reference: string;
};

type ApiResponse = {
  notifications?: ApiNotification[];
  totalElements?: number;
};

type CandidateReference = {
  reference: string;
  date: string;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const tsvPath = path.join(repoRoot, 'rasff_data.tsv');
const mapPath = path.join(repoRoot, 'src', 'lib', 'rasffNotificationMap.ts');
const endpointBase =
  'https://webgate.ec.europa.eu/rasff-window/backend/public/notification/search/consolidated';

const args = process.argv.slice(2);

function getArg(name: string, fallback?: string): string | undefined {
  const exact = args.find(arg => arg.startsWith(`${name}=`));
  if (exact) return exact.slice(name.length + 1);
  const idx = args.indexOf(name);
  if (idx >= 0 && idx + 1 < args.length) return args[idx + 1];
  return fallback;
}

function hasFlag(name: string): boolean {
  return args.includes(name);
}

function parseIsoDate(value: string): Date {
  const dt = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(dt.getTime())) {
    throw new Error(`Invalid ISO date: ${value}`);
  }
  return dt;
}

function formatIsoDate(value: Date): string {
  return value.toISOString().slice(0, 10);
}

function parseTsvDate(raw: string): string | null {
  const [dmy] = raw.trim().split(' ');
  const [dd, mm, yyyy] = dmy.split('-').map(Number);
  if (!dd || !mm || !yyyy) return null;
  return `${yyyy.toString().padStart(4, '0')}-${mm.toString().padStart(2, '0')}-${dd
    .toString()
    .padStart(2, '0')}`;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function readRecentReferences(since: string, until: string): Promise<CandidateReference[]> {
  const raw = await fs.readFile(tsvPath, 'utf8');
  const lines = raw.split(/\r?\n/).filter(Boolean);
  const rows = lines.slice(1);
  const unique = new Map<string, CandidateReference>();

  for (const row of rows) {
    const cols = row.split('\t');
    const reference = (cols[0] || '').trim();
    const rawDate = (cols[4] || '').trim();
    const isoDate = rawDate ? parseTsvDate(rawDate) : null;

    if (!reference || !isoDate) continue;
    if (isoDate < since || isoDate > until) continue;

    unique.set(reference, { reference, date: isoDate });
  }

  return [...unique.values()].sort((a, b) => {
    if (a.date === b.date) return a.reference.localeCompare(b.reference);
    return a.date.localeCompare(b.date);
  });
}

function buildPayload(reference: string): SearchPayload {
  return {
    parameters: {
      pageNumber: 1,
      itemsPerPage: 25,
    },
    notificationReference: reference,
  };
}

async function fetchNotificationLink(
  reference: string,
  lang: string,
): Promise<RasffNotificationLinkEntry | null> {
  const response = await fetch(`${endpointBase}/${lang}/`, {
    method: 'POST',
    headers: {
      accept: 'application/json, text/plain, */*',
      'content-type': 'application/json',
    },
    body: JSON.stringify(buildPayload(reference)),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const json = (await response.json()) as ApiResponse;
  const notifications = json.notifications || [];
  const exact = notifications.find(item => item.reference === reference) || notifications[0];

  if (!exact?.notifId) return null;

  const notificationId = String(exact.notifId);
  return {
    notification_id: notificationId,
    notification_url: `https://webgate.ec.europa.eu/rasff-window/screen/notification/${notificationId}`,
  };
}

async function writeMapFile(map: Record<string, RasffNotificationLinkEntry>): Promise<void> {
  const sortedEntries = Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
  const body = sortedEntries
    .map(([reference, entry]) => {
      return `  ${JSON.stringify(reference)}: ${JSON.stringify(entry, null, 2)
        .split('\n')
        .join('\n  ')},`;
    })
    .join('\n');

  const fileContent = `export interface RasffNotificationLinkEntry {
  notification_id: string;
  notification_url: string;
}

// This file is intentionally kept in the repo and updated incrementally by
// \`npm run enrich:rasff-links\`. It is the durable, hardcoded mapping between
// public RASFF references (e.g. 2026.2954) and internal notification IDs
// (e.g. 836052).
export const rasffNotificationMap: Record<string, RasffNotificationLinkEntry> = {
${body}
};
`;

  await fs.writeFile(mapPath, fileContent, 'utf8');
}

async function main(): Promise<void> {
  const now = new Date();
  const until = getArg('--until', formatIsoDate(now))!;
  const lastDays = Number(getArg('--last-days', '90'));
  const sinceDefault = (() => {
    const dt = parseIsoDate(until);
    dt.setUTCDate(dt.getUTCDate() - lastDays);
    return formatIsoDate(dt);
  })();
  const since = getArg('--since', sinceDefault)!;
  const delayMs = Number(getArg('--delay-ms', '800'));
  const lang = getArg('--lang', 'en')!;
  const limitArg = getArg('--limit');
  const limit = limitArg ? Number(limitArg) : undefined;
  const force = hasFlag('--force');

  if (Number.isNaN(delayMs) || delayMs < 0) throw new Error(`Invalid --delay-ms: ${delayMs}`);
  if (Number.isNaN(lastDays) || lastDays < 0) throw new Error(`Invalid --last-days: ${lastDays}`);
  if (limitArg && (Number.isNaN(limit) || (limit ?? 0) <= 0)) {
    throw new Error(`Invalid --limit: ${limitArg}`);
  }

  const recentRefs = await readRecentReferences(since, until);
  const existing = { ...rasffNotificationMap };
  const candidates = recentRefs.filter(item => force || !existing[item.reference]);
  const queue = typeof limit === 'number' ? candidates.slice(0, limit) : candidates;

  console.log(
    JSON.stringify(
      {
        since,
        until,
        delayMs,
        lang,
        totalRecentReferences: recentRefs.length,
        alreadyMapped: recentRefs.length - candidates.length,
        toProcess: queue.length,
      },
      null,
      2,
    ),
  );

  let found = 0;
  let notFound = 0;
  let failed = 0;

  for (let index = 0; index < queue.length; index += 1) {
    const item = queue[index];
    const prefix = `[${index + 1}/${queue.length}] ${item.reference}`;

    try {
      const result = await fetchNotificationLink(item.reference, lang);

      if (!result) {
        notFound += 1;
        console.log(`${prefix} -> not found`);
      } else {
        existing[item.reference] = result;
        await writeMapFile(existing);
        found += 1;
        console.log(`${prefix} -> ${result.notification_id}`);
      }
    } catch (error) {
      failed += 1;
      const message = error instanceof Error ? error.message : String(error);
      console.error(`${prefix} -> failed: ${message}`);
    }

    if (index < queue.length - 1 && delayMs > 0) {
      await sleep(delayMs);
    }
  }

  console.log(
    JSON.stringify(
      {
        found,
        notFound,
        failed,
        finalMapSize: Object.keys(existing).length,
        output: path.relative(repoRoot, mapPath),
      },
      null,
      2,
    ),
  );
}

await main();

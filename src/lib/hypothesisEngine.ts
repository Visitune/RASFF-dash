import { RasffData } from './mockData';

export type HypothesisVerdict = 'confirmee' | 'infirmee' | 'incertaine';

export interface HypothesisResultData {
  id: string;
  verdict: HypothesisVerdict;
  confidenceScore: number;
  summary: string;
  chartData?: any[];
}

const UNKNOWN_VALUES = new Set([
  '',
  'unknown',
  'unknown origin',
  'n/a',
  'na',
  'null',
  'undefined',
]);

const normalizeText = (value?: string) => (value ?? '').trim().toLowerCase();
const isKnownValue = (value?: string) => !UNKNOWN_VALUES.has(normalizeText(value));

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const safePercent = (value: number) => `${(value * 100).toFixed(1)}%`;

const getKnownSubset = (
  data: RasffData[],
  fields: Array<keyof Pick<RasffData, 'category' | 'origin' | 'hazard' | 'date'>>
) =>
  data.filter(row =>
    fields.every(field => {
      if (field === 'date') return Boolean(row.date);
      return isKnownValue(String(row[field] ?? ''));
    })
  );

const getWeeklyVolumes = (data: RasffData[]) => {
  const weekMap = new Map<string, number>();

  data.forEach(row => {
    if (!row.date) return;
    const dt = new Date(`${row.date}T00:00:00`);
    if (Number.isNaN(dt.getTime())) return;

    const tmp = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()));
    const day = tmp.getUTCDay() || 7;
    tmp.setUTCDate(tmp.getUTCDate() + 4 - day);
    const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
    const week = Math.ceil(((tmp.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    const key = `${tmp.getUTCFullYear()}-S${String(week).padStart(2, '0')}`;
    weekMap.set(key, (weekMap.get(key) ?? 0) + 1);
  });

  return Array.from(weekMap.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([week, volume]) => ({ week, volume }));
};

const linearRegressionSlope = (values: number[]) => {
  const n = values.length;
  if (n < 2) return 0;

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  values.forEach((y, x) => {
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumXX += x * x;
  });

  const denom = n * sumXX - sumX * sumX;
  if (denom === 0) return 0;
  return (n * sumXY - sumX * sumY) / denom;
};

export const testH1 = (data: RasffData[]): HypothesisResultData => {
  const usable = getKnownSubset(data, ['date']);
  const summerDays = new Set<string>();
  const otherDays = new Set<string>();
  let summerAlerts = 0;
  let otherAlerts = 0;

  usable.forEach(row => {
    const month = new Date(`${row.date}T00:00:00`).getMonth() + 1;
    if (month >= 6 && month <= 8) {
      summerAlerts++;
      summerDays.add(row.date);
    } else {
      otherAlerts++;
      otherDays.add(row.date);
    }
  });

  const summerAvg = summerDays.size > 0 ? summerAlerts / summerDays.size : 0;
  const otherAvg = otherDays.size > 0 ? otherAlerts / otherDays.size : 0;
  const relativeGap = otherAvg > 0 ? (summerAvg - otherAvg) / otherAvg : 0;
  const sampleOk = summerDays.size >= 10 && otherDays.size >= 20;

  let verdict: HypothesisVerdict = 'incertaine';
  if (!sampleOk) verdict = 'incertaine';
  else if (relativeGap >= 0.1) verdict = 'confirmee';
  else if (relativeGap <= -0.1) verdict = 'infirmee';

  return {
    id: 'H1',
    verdict,
    confidenceScore: clamp(Math.round(Math.abs(relativeGap) * 220 + Math.min(summerDays.size + otherDays.size, 30)), 18, 92),
    summary: `Ete: ${summerAvg.toFixed(1)} alertes/jour actif sur ${summerDays.size} jours. Hors ete: ${otherAvg.toFixed(1)} sur ${otherDays.size} jours. Ecart relatif: ${relativeGap >= 0 ? '+' : ''}${(relativeGap * 100).toFixed(1)}%.`,
    chartData: [
      { name: 'Ete', value: Number(summerAvg.toFixed(1)) },
      { name: 'Hors ete', value: Number(otherAvg.toFixed(1)) },
    ],
  };
};

export const testH2 = (data: RasffData[]): HypothesisResultData => {
  const usable = getKnownSubset(data, ['origin']);
  const originRisks: Record<string, { total: number; highRisk: number }> = {};
  let totalAlerts = 0;
  let totalHighRisk = 0;

  usable.forEach(row => {
    if (!originRisks[row.origin]) originRisks[row.origin] = { total: 0, highRisk: 0 };
    originRisks[row.origin].total++;
    totalAlerts++;

    const rl = normalizeText(row.risk_level);
    if (rl.includes('serious') || rl.includes('high')) {
      originRisks[row.origin].highRisk++;
      totalHighRisk++;
    }
  });

  const minVolume = Math.max(4, Math.ceil(usable.length * 0.01));
  const chartData = Object.entries(originRisks)
    .map(([origin, stats]) => ({
      origin,
      ratio: stats.total > 0 ? stats.highRisk / stats.total : 0,
      total: stats.total,
    }))
    .filter(item => item.total >= minVolume)
    .sort((a, b) => b.ratio - a.ratio || b.total - a.total);

  const baseline = totalAlerts > 0 ? totalHighRisk / totalAlerts : 0;
  const leader = chartData[0];
  const uplift = leader ? leader.ratio - baseline : 0;

  let verdict: HypothesisVerdict = 'incertaine';
  if (!leader || chartData.length < 3) verdict = 'incertaine';
  else if (uplift >= 0.15 && leader.total >= minVolume * 2) verdict = 'confirmee';
  else if (uplift <= 0.05) verdict = 'infirmee';

  return {
    id: 'H2',
    verdict,
    confidenceScore: clamp(Math.round(Math.abs(uplift) * 280 + (leader?.total ?? 0)), 20, 94),
    summary: `Part globale de risques eleves: ${safePercent(baseline)}. Leader: ${leader?.origin ?? 'N/A'} a ${safePercent(leader?.ratio ?? 0)} sur ${leader?.total ?? 0} alertes retenues. Les origines a faible volume sont exclues.`,
    chartData: chartData.slice(0, 6).map(item => ({
      origin: item.origin,
      value: Number((item.ratio * 100).toFixed(1)),
      ratio: Number((item.ratio * 100).toFixed(1)),
      total: item.total,
    })),
  };
};

export const testH3 = (data: RasffData[]): HypothesisResultData => {
  const usable = getKnownSubset(data, ['origin', 'hazard']);
  const pairs: Record<string, number> = {};

  usable.forEach(row => {
    const key = `${row.origin} | ${row.hazard}`;
    pairs[key] = (pairs[key] || 0) + 1;
  });

  const sortedPairs = Object.entries(pairs)
    .map(([name, count]) => ({ name, count, value: count }))
    .sort((a, b) => b.count - a.count);

  const total = usable.length || 1;
  const topPair = sortedPairs[0];
  const topShare = topPair ? topPair.count / total : 0;
  const top5Share = sortedPairs.slice(0, 5).reduce((sum, item) => sum + item.count, 0) / total;

  let verdict: HypothesisVerdict = 'incertaine';
  if (topShare >= 0.08 || top5Share >= 0.25) verdict = 'confirmee';
  else if (topShare <= 0.03 && top5Share <= 0.15) verdict = 'infirmee';

  return {
    id: 'H3',
    verdict,
    confidenceScore: clamp(Math.round(topShare * 450 + top5Share * 120), 18, 90),
    summary: `Le couple dominant represente ${safePercent(topShare)} du signal exploitable. Les 5 premiers couples pesent ${safePercent(top5Share)}. Les lignes avec origine ou danger inconnus sont exclues.`,
    chartData: sortedPairs.slice(0, 6),
  };
};

export const testH4 = (data: RasffData[]): HypothesisResultData => {
  const usable = getKnownSubset(data, ['category']);
  const categories: Record<string, number> = {};

  usable.forEach(row => {
    categories[row.category] = (categories[row.category] || 0) + 1;
  });

  const entries = Object.entries(categories)
    .map(([category, count]) => ({ category, count, value: count }))
    .sort((a, b) => b.count - a.count);

  const totalAlerts = usable.length || 1;
  const topBucketSize = Math.max(1, Math.ceil(entries.length * 0.2));
  const topShare =
    entries.slice(0, topBucketSize).reduce((sum, item) => sum + item.count, 0) / totalAlerts;

  let verdict: HypothesisVerdict = 'incertaine';
  if (topShare >= 0.7) verdict = 'confirmee';
  else if (topShare <= 0.5) verdict = 'infirmee';

  return {
    id: 'H4',
    verdict,
    confidenceScore: clamp(Math.round(topShare * 100), 15, 95),
    summary: `Le top 20% des categories connues concentre ${safePercent(topShare)} des alertes. ${data.length - usable.length} lignes 'Unknown' sont sorties du calcul.`,
    chartData: entries.slice(0, 6),
  };
};

export const testH5 = (data: RasffData[]): HypothesisResultData => {
  const usable = getKnownSubset(data, ['date']);
  const weekly = getWeeklyVolumes(usable);

  if (weekly.length < 8) {
    return {
      id: 'H5',
      verdict: 'incertaine',
      confidenceScore: 10,
      summary: 'Pas assez de semaines exploitables pour estimer une tendance robuste.',
      chartData: weekly.map(item => ({ name: item.week, value: item.volume })),
    };
  }

  const recentWindow = weekly.slice(-8);
  const previousWindow = weekly.slice(-16, -8);
  const recentAvg = recentWindow.reduce((sum, item) => sum + item.volume, 0) / recentWindow.length;
  const previousAvg =
    previousWindow.length > 0
      ? previousWindow.reduce((sum, item) => sum + item.volume, 0) / previousWindow.length
      : recentAvg;
  const delta = previousAvg > 0 ? (recentAvg - previousAvg) / previousAvg : 0;
  const slope = linearRegressionSlope(weekly.slice(-16).map(item => item.volume));

  let verdict: HypothesisVerdict = 'incertaine';
  if (delta >= 0.12 && slope > 0) verdict = 'confirmee';
  else if (delta <= -0.12 && slope < 0) verdict = 'infirmee';

  return {
    id: 'H5',
    verdict,
    confidenceScore: clamp(Math.round(Math.abs(delta) * 260 + Math.abs(slope) * 12), 18, 93),
    summary: `8 dernieres semaines: ${recentAvg.toFixed(1)} alertes/semaine contre ${previousAvg.toFixed(1)} auparavant. Variation: ${delta >= 0 ? '+' : ''}${(delta * 100).toFixed(1)}%. Pente recente: ${slope >= 0 ? '+' : ''}${slope.toFixed(2)}.`,
    chartData: weekly.slice(-12).map(item => ({ name: item.week, value: item.volume })),
  };
};

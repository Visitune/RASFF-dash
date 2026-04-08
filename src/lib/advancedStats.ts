import { RasffData } from './mockData';

export interface ParetoItem {
  name: string;
  count: number;
  cumulativePercent: number;
}

export const paretoAnalysis = (data: RasffData[], dimension: keyof RasffData): ParetoItem[] => {
  const counts: Record<string, number> = {};
  data.forEach(item => {
    const val = String(item[dimension]);
    counts[val] = (counts[val] || 0) + 1;
  });

  const sorted = Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const total = sorted.reduce((sum, item) => sum + item.count, 0);
  let cumulativeSum = 0;

  return sorted.map(item => {
    cumulativeSum += item.count;
    return {
      ...item,
      cumulativePercent: total > 0 ? Math.round((cumulativeSum / total) * 100) : 0
    };
  });
};

export interface CountryRank {
  name: string;
  score: number; // 0-100
  totalAlerts: number;
  seriousAlerts: number;
  mainHazard: string;
}

export const rankCountriesAdvanced = (data: RasffData[]): CountryRank[] => {
  const countries = new Map<string, { count: number; serious: number; hazards: Record<string, number> }>();

  data.forEach(d => {
    if (!countries.has(d.origin)) {
      countries.set(d.origin, { count: 0, serious: 0, hazards: {} });
    }
    const c = countries.get(d.origin)!;
    c.count++;
    if (d.risk_level.toLowerCase().includes('serious')) c.serious++;
    c.hazards[d.hazard] = (c.hazards[d.hazard] || 0) + 1;
  });

  const allCounts = Array.from(countries.values()).map(v => v.count);
  const maxCount = allCounts.length > 0 ? Math.max(...allCounts) : 1;

  return Array.from(countries.entries()).map(([name, stats]) => {
    const volumeScore   = (stats.count / Math.max(1, maxCount)) * 40;
    const severityScore = stats.count > 0 ? (stats.serious / stats.count) * 60 : 0;
    
    const mainHazard = Object.entries(stats.hazards).sort((a,b) => b[1] - a[1])[0]?.[0] || 'Unknown';

    return {
      name,
      score: Math.round(volumeScore + severityScore),
      totalAlerts: stats.count,
      seriousAlerts: stats.serious,
      mainHazard
    };
  }).sort((a, b) => b.score - a.score);
};

// Simplified Correlation Heatmap Data (Co-occurrence of Hazards and Categories)
export const getCooccurrenceData = (data: RasffData[]) => {
  const topCategories = Object.entries(
    data.reduce((acc, d) => ({ ...acc, [d.category]: (acc[d.category] || 0) + 1 }), {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]).slice(0, 10).map(x => x[0]);

  const topHazards = Object.entries(
    data.reduce((acc, d) => ({ ...acc, [d.hazard]: (acc[d.hazard] || 0) + 1 }), {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1]).slice(0, 10).map(x => x[0]);

  const matrix = topCategories.map(cat => ({
    category: cat,
    ...topHazards.reduce((acc, haz) => ({
      ...acc,
      [haz]: data.filter(d => d.category === cat && d.hazard === haz).length
    }), {} as Record<string, number>)
  }));

  return { matrix, topCategories, topHazards };
};

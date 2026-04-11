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
// ---------- H8 : Composite Risk Scoring ----------

export interface CategoryRiskScore {
  category: string;
  frequency: number;       // Alertes sur les 8 dernières semaines
  severityRatio: number;   // Ratio alertes graves (0-1)
  trend: number;           // Pente regression normalisée (-1 à +1)
  isEmerging: boolean;     // Première apparition < 4 semaines
  compositeScore: number;  // Score final 0-100
  rawCount: number;        // Volume total
}

// Pente de régression linéaire simplifiée pour une série de valeurs
function calculateSimpleSlope(values: number[]): number {
  const n = values.length;
  if (n < 2) return 0;
  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
  values.forEach((y, x) => {
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumXX += x * x;
  });
  const denom = n * sumXX - sumX * sumX;
  if (denom === 0) return 0;
  const slope = (n * sumXY - sumX * sumY) / denom;
  const mean = sumY / n;
  // Normalisation : ramener la pente à un ratio par rapport à la moyenne
  return mean === 0 ? 0 : Math.max(-1, Math.min(1, slope / (mean * 0.5 || 1)));
}

export function computeCategoryRiskScores(data: RasffData[]): CategoryRiskScore[] {
  const now = new Date();
  
  // Fenêtres temporelles
  const eightWeeksAgo = new Date(now);
  eightWeeksAgo.setDate(now.getDate() - 56);
  const fourWeeksAgo = new Date(now);
  fourWeeksAgo.setDate(now.getDate() - 28);
  
  // Données récentes pour le calcul de fréquence et gravité
  const recentData = data.filter(d => {
    if (!d.date) return false;
    const dt = new Date(d.date);
    return !isNaN(dt.getTime()) && dt >= eightWeeksAgo;
  });
  
  // Groupement par catégorie
  const catMap = new Map<string, RasffData[]>();
  recentData.forEach(d => {
    const rows = catMap.get(d.category) || [];
    rows.push(d);
    catMap.set(d.category, rows);
  });
  
  // Volume total (toute période)
  const totalCounts: Record<string, number> = {};
  data.forEach(d => { totalCounts[d.category] = (totalCounts[d.category] || 0) + 1; });
  
  const entries = Array.from(catMap.entries());
  const maxFreq = entries.length > 0 ? Math.max(...entries.map(e => e[1].length)) : 1;
  
  const results: CategoryRiskScore[] = [];
  
  catMap.forEach((rows, category) => {
    if (rows.length < 2) return; // Signal insuffisant
    
    // 1. Fréquence normalisée (Score sur 40)
    const frequency = rows.length;
    const freqScore = (frequency / maxFreq) * 40;
    
    // 2. Gravité (Score sur 30)
    const seriousCount = rows.filter(d => 
      d.risk_level.toLowerCase().includes('serious') || 
      d.risk_level.toLowerCase().includes('high')
    ).length;
    const severityRatio = seriousCount / frequency;
    const severityScore = severityRatio * 30;
    
    // 3. Tendance (Score sur 20)
    const weekCounts: Record<string, number> = {};
    rows.forEach(d => {
      const dt = new Date(d.date);
      const wk = `${dt.getFullYear()}-W${Math.ceil((dt.getMonth() + 1) * 4)}`;
      weekCounts[wk] = (weekCounts[wk] || 0) + 1;
    });
    const trend = calculateSimpleSlope(Object.values(weekCounts));
    const trendScore = Math.max(0, trend) * 20; // Seule la hausse pénalise le score
    
    // 4. Émergence (10 points si < 4 semaines)
    const firstDate = rows.reduce((min, d) => {
      const dt = new Date(d.date);
      return dt < min ? dt : min;
    }, new Date());
    const isEmerging = firstDate >= fourWeeksAgo;
    const emergingScore = isEmerging ? 10 : 0;
    
    results.push({
      category,
      frequency,
      severityRatio: Math.round(severityRatio * 100) / 100,
      trend: Math.round(trend * 100) / 100,
      isEmerging,
      compositeScore: Math.round(freqScore + severityScore + trendScore + emergingScore),
      rawCount: totalCounts[category] || 0
    });
  });
  
  return results.sort((a, b) => b.compositeScore - a.compositeScore);
}

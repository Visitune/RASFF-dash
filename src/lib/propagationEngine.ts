import { RasffData } from './mockData';

export interface PropagationLink {
  from: string;        // Pays source
  to: string;          // Pays destination
  lagWeeks: number;    // Délai de propagation en semaines
  correlation: number; // Force du signal (0.0 à 1.0)
  confidence: 'high' | 'medium' | 'low';
}

/**
 * Convertit les données en série hebdomadaire par pays
 */
function buildWeeklySeries(data: RasffData[]): Map<string, Map<string, number>> {
  const series = new Map<string, Map<string, number>>();
  
  data.forEach(row => {
    if (!row.date || !row.notifying_country) return;
    const dt = new Date(`${row.date}T00:00:00`);
    if (isNaN(dt.getTime())) return;

    // Calcul de la clé ISO semaine
    const tmp = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()));
    const day = tmp.getUTCDay() || 7;
    tmp.setUTCDate(tmp.getUTCDate() + 4 - day);
    const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
    const week = Math.ceil(((tmp.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
    const weekKey = `${tmp.getUTCFullYear()}-${String(week).padStart(2, '0')}`;

    const country = row.notifying_country.trim();
    if (!series.has(country)) series.set(country, new Map());
    const cs = series.get(country)!;
    cs.set(weekKey, (cs.get(weekKey) ?? 0) + 1);
  });
  
  return series;
}

/**
 * Sérialise une Map en vecteur aligné sur l'échelle temporelle globale
 */
function serializeToVector(countMap: Map<string, number>, allWeeks: string[]): number[] {
  return allWeeks.map(w => countMap.get(w) ?? 0);
}

/**
 * Calcul de corrélation croisée (Pearson) avec décalage
 */
function crossCorrelation(a: number[], b: number[], lag: number): number {
  const n = a.length;
  if (n - lag < 4) return 0; // Signal trop court pour être significatif
  
  // On décale B de 'lag' semaines vers l'avenir
  const aSub = a.slice(0, n - lag);
  const bSub = b.slice(lag);
  
  const meanA = aSub.reduce((s, v) => s + v, 0) / aSub.length;
  const meanB = bSub.reduce((s, v) => s + v, 0) / bSub.length;
  
  let num = 0, denomA = 0, denomB = 0;
  aSub.forEach((vA, i) => {
    const dA = vA - meanA;
    const dB = bSub[i] - meanB;
    num += dA * dB;
    denomA += dA * dA;
    denomB += dB * dB;
  });
  
  const denom = Math.sqrt(denomA * denomB);
  return denom === 0 ? 0 : num / denom;
}

/**
 * H6 Engine : Identifie les relations de propagation temporelle entre pays
 */
export function computePropagation(data: RasffData[], maxLagWeeks = 4): PropagationLink[] {
  const seriesMap = buildWeeklySeries(data);
  
  // Récupérer toutes les semaines présentes dans le dataset
  const allWeeksSet = new Set<string>();
  seriesMap.forEach(cs => cs.forEach((_, w) => allWeeksSet.add(w)));
  const allWeeks = Array.from(allWeeksSet).sort();
  
  // Filtrer les pays ayant un volume suffisant pour l'analyse statistique
  const candidates = Array.from(seriesMap.entries())
    .filter(([, cs]) => Array.from(cs.values()).reduce((a, b) => a + b, 0) >= 15)
    .slice(0, 15) // Limitation O(n^2) pour la performance UI
    .map(([name]) => name);
  
  const links: PropagationLink[] = [];
  const THRESHOLD = 0.45;
  
  for (let i = 0; i < candidates.length; i++) {
    for (let j = 0; j < candidates.length; j++) {
      if (i === j) continue;
      
      const countryA = candidates[i];
      const countryB = candidates[j];
      
      const vA = serializeToVector(seriesMap.get(countryA)!, allWeeks);
      const vB = serializeToVector(seriesMap.get(countryB)!, allWeeks);
      
      let bestCorr = 0;
      let bestLag = 0;
      
      for (let lag = 1; lag <= maxLagWeeks; lag++) {
        const corr = crossCorrelation(vA, vB, lag);
        if (corr > bestCorr) {
          bestCorr = corr;
          bestLag = lag;
        }
      }
      
      if (bestCorr >= THRESHOLD) {
        links.push({
          from: countryA,
          to: countryB,
          lagWeeks: bestLag,
          correlation: Math.round(bestCorr * 100) / 100,
          confidence: bestCorr >= 0.7 ? 'high' : bestCorr >= 0.55 ? 'medium' : 'low'
        });
      }
    }
  }
  
  return links.sort((a, b) => b.correlation - a.correlation).slice(0, 30);
}

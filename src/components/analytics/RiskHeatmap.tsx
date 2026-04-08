import React, { useMemo } from 'react';
import { RasffData } from '../../lib/mockData';

interface RiskHeatmapProps {
  data: RasffData[];
}

// Top N by frequency
function topByCount(data: RasffData[], field: keyof RasffData, n: number): string[] {
  const counts: Record<string, number> = {};
  data.forEach(d => { const v = String(d[field]); counts[v] = (counts[v] ?? 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k]) => k);
}

export const RiskHeatmap: React.FC<RiskHeatmapProps> = ({ data }) => {
  const origins    = useMemo(() => topByCount(data, 'origin',   12), [data]);
  const categories = useMemo(() => topByCount(data, 'category',  8), [data]);

  // Weighted frequency: serious=3, medium=2, low=1
  const riskWeight = (rl: string) => {
    const l = rl.toLowerCase();
    if (l.includes('not serious')) return 1;
    if (l.includes('potentially') || l.includes('medium')) return 2;
    if (l.includes('serious') || l.includes('high')) return 3;
    return 1;
  };

  const matrix = useMemo(() => {
    const m: Record<string, Record<string, { count: number; score: number }>> = {};
    data.forEach(item => {
      if (!m[item.origin]) m[item.origin] = {};
      if (!m[item.origin][item.category]) m[item.origin][item.category] = { count: 0, score: 0 };
      m[item.origin][item.category].count++;
      m[item.origin][item.category].score += riskWeight(item.risk_level);
    });
    return m;
  }, [data]);

  // Global max score for intensity normalization
  let globalMax = 1;
  origins.forEach(o => categories.forEach(c => {
    globalMax = Math.max(globalMax, matrix[o]?.[c]?.score ?? 0);
  }));

  const cellBg = (score: number, count: number) => {
    if (count === 0) return 'transparent';
    const intensity = score / globalMax;
    // Blue → orange → red gradient based on normalized score
    if (intensity < 0.33) return `rgba(52,168,83,${0.15 + intensity * 1.2})`;   // green
    if (intensity < 0.66) return `rgba(255,109,0,${0.15 + intensity * 0.9})`;   // orange
    return `rgba(234,67,53,${0.2 + intensity * 0.75})`;                          // red
  };

  const shortCat = (c: string) => c.length > 20 ? c.slice(0, 18) + '…' : c;

  if (data.length === 0) return (
    <div className="panel p-6">
      <p className="text-xs text-muted text-center py-8 uppercase tracking-widest">Aucune donnée</p>
    </div>
  );

  return (
    <div className="panel p-6 overflow-x-auto custom-scrollbar">
      <div className="mb-4">
        <h3 className="section-title mb-1">Thermique Origine × Catégorie</h3>
        <p className="text-[10px] text-muted font-bold">
          Intensité = volume × poids du risque (grave=3, moyen=2, mineur=1). Rouge = combinaison prioritaire.
        </p>
      </div>

      <table className="text-left text-[10px] border-collapse" style={{ minWidth: 520 }}>
        <thead>
          <tr>
            <th className="p-2 border-b border-border text-[9px] font-black text-muted uppercase">Origine ↓</th>
            {categories.map(c => (
              <th key={c} className="p-2 border-b border-border text-[9px] font-black text-muted" title={c}>
                <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', height: 64, textAlign: 'left' }}>
                  {shortCat(c)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {origins.map(o => (
            <tr key={o} className="hover:bg-surface-hover transition-colors">
              <td className="p-2 border-b border-border font-bold text-primary text-[11px] whitespace-nowrap pr-3" title={o}>{o}</td>
              {categories.map(c => {
                const cell = matrix[o]?.[c];
                const count = cell?.count ?? 0;
                const score = cell?.score ?? 0;
                return (
                  <td key={c} className="p-1 border-b border-border text-center">
                    <div
                      className="w-10 h-8 flex items-center justify-center mx-auto rounded-sm text-[10px] font-black transition-all"
                      style={{
                        background: cellBg(score, count),
                        color: count > 0 ? 'var(--text-primary)' : 'var(--text-muted)',
                        opacity: count > 0 ? 1 : 0.2,
                      }}
                      title={count > 0 ? `${o} × ${c}: ${count} alertes, score ${score}` : 'Aucune alerte'}
                    >
                      {count > 0 ? count : '·'}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex gap-5 mt-4 text-[9px] font-black uppercase tracking-widest text-muted">
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(52,168,83,0.5)' }} /> Faible risque</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(255,109,0,0.6)' }} /> Risque moyen</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(234,67,53,0.8)' }} /> Risque élevé</div>
        <span className="ml-auto italic normal-case">Nombre = alertes | Couleur = intensité du risque</span>
      </div>
    </div>
  );
};

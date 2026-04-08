import React from 'react';
import { RasffData } from '../../lib/mockData';
import { crossData } from '../../lib/dataEngine';

interface CorrelationMatrixProps {
  data: RasffData[];
}

// Sort by total frequency and take top N
function topByFrequency(data: RasffData[], field: keyof RasffData, n: number): string[] {
  const counts: Record<string, number> = {};
  data.forEach(d => { const v = String(d[field]); counts[v] = (counts[v] ?? 0) + 1; });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k]) => k);
}

export const CorrelationMatrix: React.FC<CorrelationMatrixProps> = ({ data }) => {
  if (data.length === 0) return (
    <div className="panel p-6">
      <p className="text-xs text-muted text-center py-8 uppercase tracking-widest">Aucune donnée</p>
    </div>
  );

  // Top 8 origins and top 8 hazards by frequency (most relevant first)
  const origins = topByFrequency(data, 'origin', 8);
  const hazards = topByFrequency(data, 'hazard', 8);
  const matrix = crossData(data, 'origin', 'hazard');

  // Find global max for intensity scaling
  let globalMax = 1;
  origins.forEach(o => hazards.forEach(h => {
    globalMax = Math.max(globalMax, matrix[o]?.[h] ?? 0);
  }));

  // Short label for hazard (first 18 chars)
  const shortHazard = (h: string) => h.length > 22 ? h.slice(0, 20) + '…' : h;

  return (
    <div className="panel p-6 overflow-x-auto custom-scrollbar">
      <div className="mb-4">
        <h3 className="section-title mb-1">Co-occurrence Origine × Danger (Top 8)</h3>
        <p className="text-[10px] text-muted font-bold">
          Nombre de notifications combinant chaque pays d'origine et catégorie de danger.
          Plus la cellule est foncée, plus la combinaison est fréquente.
        </p>
      </div>

      <table className="text-left text-xs border-collapse" style={{ minWidth: 560 }}>
        <thead>
          <tr>
            <th className="p-2 border-b border-border text-[10px] font-black text-muted uppercase">Origine ↓ / Danger →</th>
            {hazards.map((h) => (
              <th key={h} className="p-2 border-b border-border text-[9px] font-black text-muted uppercase max-w-[80px]" title={h}>
                <div style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', height: 70, textAlign: 'left' }}>
                  {shortHazard(h)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {origins.map((o) => (
            <tr key={o} className="hover:bg-surface-hover transition-colors">
              <td className="p-2 border-b border-border font-bold text-primary text-[11px] whitespace-nowrap pr-4" title={o}>{o}</td>
              {hazards.map((h) => {
                const count = matrix[o]?.[h] ?? 0;
                const intensity = count / globalMax;
                const bg = count > 0
                  ? `rgba(var(--blue-rgb), ${Math.max(0.08, intensity * 0.9)})`
                  : 'transparent';
                const textColor = intensity > 0.55 ? '#fff' : 'var(--text-primary)';
                return (
                  <td key={h} className="p-1 border-b border-border text-center">
                    <div
                      className="w-10 h-9 flex items-center justify-center mx-auto font-black text-[11px] rounded-sm transition-all"
                      style={{ background: bg, color: count > 0 ? textColor : 'var(--text-muted)', opacity: count > 0 ? 1 : 0.3 }}
                      title={`${o} × ${h} : ${count} notifications`}
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

      <div className="mt-4 flex items-center gap-6 text-[10px] text-muted uppercase font-bold">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(var(--blue-rgb), 0.08)' }}></div> Rare
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(var(--blue-rgb), 0.5)' }}></div> Fréquent
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(var(--blue-rgb), 0.9)' }}></div> Dominant
        </div>
        <span className="ml-auto italic normal-case">Triés par fréquence globale</span>
      </div>
    </div>
  );
};

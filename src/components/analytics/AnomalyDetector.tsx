import React from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, ReferenceLine
} from 'recharts';
import { RasffData } from '../../lib/mockData';
import { StatResult } from '../../lib/statistics';
import { AlertCircle } from 'lucide-react';

interface AnomalyDetectorProps {
  data: RasffData[];
  stats: StatResult;
}

export const AnomalyDetector: React.FC<AnomalyDetectorProps> = ({ data, stats }) => {
  if (data.length === 0) return null;

  const dateMap: Record<string, { date: string; count: number }> = {};
  data.forEach(d => {
    if (!d.date) return;
    if (!dateMap[d.date]) dateMap[d.date] = { date: d.date, count: 0 };
    dateMap[d.date].count++;
  });

  const sorted = Object.values(dateMap).sort((a, b) => a.date.localeCompare(b.date));
  const all = sorted.map((v, i) => {
    const zScore = stats.stdDev > 0 ? (v.count - stats.mean) / stats.stdDev : 0;
    return { ...v, index: i, zScore, isOutlier: Math.abs(zScore) > 2 };
  });

  const normal   = all.filter(d => !d.isOutlier);
  const outliers = all.filter(d =>  d.isOutlier);

  const threshold2 = stats.mean + 2 * stats.stdDev;

  return (
    <div className="panel p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="section-title mb-1">Détection d'anomalies de volume</h3>
          <p className="text-[10px] text-muted font-bold">
            Points rouges = jours avec volume &gt; moyenne + 2× écart-type (z-score &gt; 2)
          </p>
        </div>
        {outliers.length > 0 && (
          <div className="badge badge-red flex items-center gap-1 shrink-0">
            <AlertCircle size={12} />
            {outliers.length} pic{outliers.length > 1 ? 's' : ''}
          </div>
        )}
      </div>

      <div style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 8, right: 20, bottom: 8, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis
              dataKey="index"
              type="number"
              name="Séquence"
              stroke="var(--chart-axis)"
              tick={{ fill: 'var(--chart-text)', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              label={{ value: 'Jours (chronologique)', position: 'insideBottom', offset: -4, fontSize: 9, fill: 'var(--text-muted)' }}
            />
            <YAxis
              dataKey="count"
              type="number"
              name="Alertes"
              stroke="var(--chart-axis)"
              tick={{ fill: 'var(--chart-text)', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <ZAxis dataKey="zScore" range={[40, 300]} />

            {/* Threshold line */}
            {stats.stdDev > 0 && (
              <ReferenceLine
                y={threshold2}
                stroke="var(--red)"
                strokeDasharray="4 3"
                strokeOpacity={0.5}
                label={{ value: 'Seuil anomalie', position: 'right', fontSize: 9, fill: 'var(--red)' }}
              />
            )}
            {/* Mean line */}
            <ReferenceLine
              y={stats.mean}
              stroke="var(--blue)"
              strokeDasharray="4 3"
              strokeOpacity={0.4}
              label={{ value: 'Moy.', position: 'right', fontSize: 9, fill: 'var(--blue)' }}
            />

            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                const d = payload[0].payload;
                return (
                  <div className="panel p-3 shadow-xl border" style={{ borderColor: d.isOutlier ? 'var(--red)' : 'var(--border-strong)', fontSize: 11 }}>
                    <p className="font-black text-primary mb-1">{d.date}</p>
                    <p className="text-secondary">Alertes : <span className="font-black text-primary">{d.count}</span></p>
                    <p className="text-secondary">Z-Score : <span className="font-black text-primary">{d.zScore.toFixed(2)}</span></p>
                    {d.isOutlier && <p className="font-black mt-1" style={{ color: 'var(--red)' }}>⚠ Pic anormal</p>}
                  </div>
                );
              }}
            />

            {/* Normal points */}
            <Scatter name="Normal" data={normal} fill="var(--blue)" fillOpacity={0.5} />
            {/* Anomaly points — separate Scatter = distinct color, no Cell needed */}
            <Scatter name="Anomalie" data={outliers} fill="var(--red)" fillOpacity={0.9} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {outliers.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-[10px] font-black text-muted uppercase tracking-widest mb-2">Jours anomaliques</p>
          <div className="flex flex-wrap gap-2">
            {outliers.slice(0, 8).map(o => (
              <span key={o.date} className="badge badge-red font-mono text-[9px]">
                {o.date} · {o.count} alertes
              </span>
            ))}
            {outliers.length > 8 && (
              <span className="badge badge-gray text-[9px]">+{outliers.length - 8} autres</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

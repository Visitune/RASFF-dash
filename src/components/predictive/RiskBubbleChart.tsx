import React, { useMemo } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid,
  Tooltip, ReferenceLine, ResponsiveContainer, Cell
} from 'recharts';
import { computeCategoryRiskScores, CategoryRiskScore } from '../../lib/advancedStats';
import { RasffData } from '../../lib/mockData';
import { AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  data: RasffData[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const d: CategoryRiskScore = payload[0].payload;
  
  return (
    <div className="panel p-4 shadow-2xl border border-border-strong bg-surface-3/95 backdrop-blur-md" style={{ minWidth: 220 }}>
      <p className="font-black text-primary mb-3 text-xs uppercase tracking-tight">{d.category}</p>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-muted font-bold">VOL. RÉCENT</span>
          <span className="font-black text-blue">{d.frequency} alertes</span>
        </div>
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-muted font-bold">RATIO GRAVITÉ</span>
          <span className="font-black text-red">{Math.round(d.severityRatio * 100)}%</span>
        </div>
        <div className="flex justify-between items-center text-[10px]">
          <span className="text-muted font-bold">TENDANCE</span>
          <div className="flex items-center gap-1 font-black" style={{ color: d.trend > 0 ? 'var(--red)' : 'var(--green)' }}>
            {d.trend > 0 ? '+' : ''}{Math.round(d.trend * 100)}%
            {d.trend > 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          </div>
        </div>
        
        <div className="pt-2 mt-2 border-t border-border flex justify-between items-center">
          <span className="text-[9px] font-black uppercase text-muted">Score Composite</span>
          <span className="text-lg font-black text-orange">{d.compositeScore}</span>
        </div>
        
        {d.isEmerging && (
          <div className="mt-2 text-center">
            <span className="badge badge-red text-[9px] w-full block py-1">🆕 SEGMENT ÉMERGENT</span>
          </div>
        )}
      </div>
    </div>
  );
};

export const RiskBubbleChart: React.FC<Props> = ({ data }) => {
  const scores = useMemo(() => computeCategoryRiskScores(data), [data]);

  const getBubbleColor = (d: CategoryRiskScore) => {
    if (d.trend > 0.2) return 'var(--red)';
    if (d.trend > 0) return 'var(--orange)';
    if (d.trend < -0.2) return 'var(--green)';
    return 'var(--blue)';
  };

  if (scores.length === 0) return (
    <div className="panel p-12 text-center">
      <AlertTriangle className="mx-auto text-muted mb-4 opacity-20" size={48} />
      <p className="text-muted text-xs font-bold uppercase tracking-widest">Signal insuffisant sur 8 semaines</p>
    </div>
  );

  return (
    <div className="panel p-6 mt-4">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="section-title mb-1 flex items-center gap-2">
            Radar de Risque Composite (H8)
          </h3>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 20 }}>
            Visualisation multidimensionnelle du risque. L'axe X représente la fréquence des alertes, l'axe Y la gravité moyenne, 
            et la taille des bulles indique l'accélération (tendance) sur les 30 derniers jours.
          </p>
          <p className="text-[10px] text-muted font-black uppercase tracking-widest">
            X: Volume | Y: Sévérité | Taille: Score Global | Couleur: Tendance
          </p>
        </div>
        
        <div className="flex gap-4 p-2 bg-surface-2 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--red)' }} />
            <span className="text-[9px] font-black text-muted uppercase">Hausse</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--green)' }} />
            <span className="text-[9px] font-black text-muted uppercase">Baisse</span>
          </div>
        </div>
      </div>

      <div style={{ height: 450, position: 'relative' }}>
        {/* Quadrant annotations */}
        <div className="absolute top-0 right-0 p-4 opacity-5 text-right pointer-events-none">
          <p className="text-4xl font-black uppercase">Critique</p>
        </div>
        <div className="absolute bottom-10 left-10 p-4 opacity-5 pointer-events-none">
          <p className="text-4xl font-black uppercase">Stable</p>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis 
              dataKey="frequency" 
              type="number" 
              name="Volume"
              stroke="var(--chart-axis)" 
              tick={{ fill: 'var(--chart-text)', fontSize: 10, fontWeight: 700 }}
              tickLine={false} axisLine={false}
              label={{ value: 'ALERTES RÉCENTES (VOLUME)', position: 'insideBottom', offset: -10, fontSize: 9, fill: 'var(--text-muted)', fontWeight: 900 }}
            />
            <YAxis 
              dataKey="severityRatio" 
              type="number" 
              name="Gravité" 
              domain={[0, 1]}
              stroke="var(--chart-axis)" 
              tick={{ fill: 'var(--chart-text)', fontSize: 10, fontWeight: 700 }}
              tickFormatter={(v) => `${Math.round(v * 100)}%`}
              tickLine={false} axisLine={false}
              label={{ value: 'RATIO DE GRAVITÉ (%)', angle: -90, position: 'insideLeft', offset: 10, fontSize: 9, fill: 'var(--text-muted)', fontWeight: 900 }}
            />
            <ZAxis dataKey="compositeScore" range={[100, 1500]} name="Score" />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            
            <ReferenceLine y={0.3} stroke="var(--border-strong)" strokeDasharray="3 3" opacity={0.5} />
            <ReferenceLine x={Math.max(...scores.map(s => s.frequency)) * 0.5} stroke="var(--border-strong)" strokeDasharray="3 3" opacity={0.5} />
            
            <Scatter data={scores}>
              {scores.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={getBubbleColor(entry)} 
                  fillOpacity={0.6}
                  stroke={getBubbleColor(entry)}
                  strokeWidth={2}
                  className="transition-all duration-300 hover:fill-opacity-90"
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
        {scores.slice(0, 3).map((s, i) => (
          <div key={s.category} className="panel p-3 bg-surface-2 border-l-4 border-l-orange flex items-center justify-between">
            <div>
              <p className="text-[9px] font-black text-muted uppercase">TOP PRIORITÉ #{i + 1}</p>
              <p className="text-xs font-black text-primary truncate max-w-[150px]">{s.category}</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-black text-orange">{s.compositeScore}</span>
              <p className="text-[8px] font-bold text-muted">SCORE</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

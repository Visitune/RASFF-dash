import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell
} from 'recharts';
import { RasffData } from '../../lib/mockData';
import { StatResult } from '../../lib/statistics';

interface DistributionChartProps {
  data: RasffData[];
  stats: StatResult;
}

export const DistributionChart: React.FC<DistributionChartProps> = ({ data }) => {
  if (data.length === 0) return (
    <div className="panel p-6">
      <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Aucune donnée à afficher.</p>
    </div>
  );

  // Count by risk_level
  const riskCounts: Record<string, number> = {};
  data.forEach(d => {
    const key = d.risk_level || 'Unknown';
    riskCounts[key] = (riskCounts[key] ?? 0) + 1;
  });

  const chartData = Object.entries(riskCounts)
    .map(([name, count]) => ({ name, count, pct: Math.round((count / data.length) * 100) }))
    .sort((a, b) => b.count - a.count);

  const getBarColor = (name: string) => {
    switch (name.toLowerCase()) {
      case 'serious': return 'var(--red)';
      case 'medium': 
      case 'potentially serious': return 'var(--orange)';
      case 'low': 
      case 'not serious': return 'var(--green)';
      default: return 'var(--blue)';
    }
  };

  return (
    <div className="panel p-6">
      <div style={{ marginBottom: 16 }}>
        <h3 className="section-title">Distribution par niveau de risque</h3>
        <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>
          {data.length.toLocaleString('fr-FR')} alertes analysées
        </p>
      </div>

      <div style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" horizontal={false} vertical={true} />
            <XAxis type="number" stroke="var(--chart-axis)" fontSize={11} tick={{ fill: 'var(--chart-text)' }} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="name"
              width={130}
              stroke="var(--chart-axis)"
              fontSize={11}
              tick={{ fill: 'var(--chart-text)' }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              cursor={{ fill: 'var(--surface-hover)' }}
              contentStyle={{
                background: 'var(--surface-3)',
                border: '1px solid var(--border-strong)',
                borderRadius: '8px',
                fontSize: 12,
                color: 'var(--text-primary)'
              }}
              formatter={(value: number, _name: string, props: any) => [
                `${value.toLocaleString('fr-FR')} (${props.payload.pct}%)`,
                'Alertes'
              ]}
            />
            <Bar
              dataKey="count"
              radius={[0, 4, 4, 0]}
              maxBarSize={28}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.name)} fillOpacity={0.8} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

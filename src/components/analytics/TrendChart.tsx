import React, { useMemo } from 'react';
import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine
} from 'recharts';
import { RasffData } from '../../lib/mockData';

interface TrendChartProps {
  data: RasffData[];
  title: string;
}

export const TrendChart: React.FC<TrendChartProps> = ({ data, title }) => {
  const { chartData, average } = useMemo(() => {
    if (data.length === 0) return { chartData: [], average: 0 };

    // Aggregate by date → daily alert counts
    const dateMap: Record<string, number> = {};
    data.forEach(d => {
      if (!d.date) return;
      dateMap[d.date] = (dateMap[d.date] ?? 0) + 1;
    });

    const sorted = Object.entries(dateMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count]) => ({ date: date.slice(0, 10), count }));

    // 7-day moving average
    const result = sorted.map((d, i) => {
      const window = sorted.slice(Math.max(0, i - 6), i + 1);
      const ma7 = window.reduce((s, x) => s + x.count, 0) / window.length;
      return { ...d, ma7: Math.round(ma7 * 10) / 10 };
    });

    const avg = sorted.length > 0
      ? Math.round(sorted.reduce((s, d) => s + d.count, 0) / sorted.length * 10) / 10
      : 0;

    return { chartData: result, average: avg };
  }, [data]);

  if (chartData.length === 0) return (
    <div className="panel p-6">
      <h3 className="section-title">{title}</h3>
      <p className="text-xs text-muted text-center py-10 uppercase tracking-widest">Aucune donnée</p>
    </div>
  );

  // X-axis: show 1 tick per month max
  const tickInterval = Math.max(1, Math.floor(chartData.length / 8));

  return (
    <div className="panel p-6">
      <div className="mb-4">
        <h3 className="section-title mb-1">{title}</h3>
        <p className="text-[10px] text-muted font-bold">
          Barres = alertes quotidiennes · Ligne orange = moyenne mobile 7j · Moy. globale : <span style={{ color: 'var(--blue)' }}>{average} alertes/jour</span>
        </p>
      </div>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#4285f4" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#4285f4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="var(--chart-axis)"
              tick={{ fill: 'var(--chart-text)', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              interval={tickInterval}
              tickFormatter={s => s.slice(0, 7)}
            />
            <YAxis
              stroke="var(--chart-axis)"
              tick={{ fill: 'var(--chart-text)', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              label={{ value: 'Alertes/jour', angle: -90, position: 'insideLeft', fontSize: 9, fill: 'var(--text-muted)', offset: 10 }}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--surface-3)',
                border: '1px solid var(--border-strong)',
                borderRadius: 4,
                fontSize: 11,
                color: 'var(--text-primary)',
              }}
              formatter={(val: number, name: string) => {
                const labels: Record<string, string> = { count: 'Alertes', ma7: 'Moy. 7j' };
                return [val, labels[name] ?? name];
              }}
              labelFormatter={l => `Date : ${l}`}
            />
            {/* Average reference */}
            <ReferenceLine
              y={average}
              stroke="var(--blue)"
              strokeDasharray="4 3"
              strokeOpacity={0.4}
              label={{ value: `Moy.`, position: 'right', fontSize: 9, fill: 'var(--blue)' }}
            />
            {/* Daily count as area */}
            <Area
              type="monotone"
              dataKey="count"
              stroke="var(--blue)"
              strokeWidth={1.5}
              fill="url(#gradCount)"
              name="count"
              dot={false}
            />
            {/* 7-day moving average */}
            <Line
              type="monotone"
              dataKey="ma7"
              stroke="var(--orange)"
              strokeWidth={2}
              dot={false}
              name="ma7"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

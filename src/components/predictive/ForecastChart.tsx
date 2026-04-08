import React, { useMemo } from 'react';
import {
  ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import { RasffData } from '../../lib/mockData';

interface ForecastChartProps {
  data: RasffData[];
}

// Linear regression on an array of {x, y} points
function linearRegression(points: { x: number; y: number }[]) {
  const n = points.length;
  if (n < 2) return { m: 0, b: 0 };
  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
  points.forEach(p => { sumX += p.x; sumY += p.y; sumXY += p.x * p.y; sumXX += p.x * p.x; });
  const denom = n * sumXX - sumX * sumX;
  if (denom === 0) return { m: 0, b: sumY / n };
  return { m: (n * sumXY - sumX * sumY) / denom, b: (sumY - ((n * sumXY - sumX * sumY) / denom) * sumX) / n };
}

export const ForecastChart: React.FC<ForecastChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    if (data.length === 0) return [];

    // Aggregate by week (ISO week key) to smooth noise
    const weekMap: Record<string, number> = {};
    data.forEach(d => {
      if (!d.date) return;
      const dt = new Date(d.date);
      if (isNaN(dt.getTime())) return;
      // ISO week key
      const tmp = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()));
      const day = tmp.getUTCDay() || 7;
      tmp.setUTCDate(tmp.getUTCDate() + 4 - day);
      const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
      const week = Math.ceil(((tmp.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
      const key = `${tmp.getUTCFullYear()}-S${String(week).padStart(2, '0')}`;
      weekMap[key] = (weekMap[key] ?? 0) + 1;
    });

    const historical = Object.entries(weekMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([week, count], i) => ({ week, actual: count, trend: null as number | null, lower: null as number | null, upper: null as number | null, x: i }));

    if (historical.length < 4) return historical;

    // Regression on last 20 weeks
    const last20 = historical.slice(-20);
    const { m, b } = linearRegression(last20.map(p => ({ x: p.x, y: p.actual })));
    const mean = last20.reduce((s, p) => s + p.actual, 0) / last20.length;

    // Add trend line over historical
    historical.forEach(p => {
      p.trend = Math.max(0, m * p.x + b);
    });

    // Forecast 8 weeks ahead
    const FORECAST = 8;
    const lastX = historical[historical.length - 1].x;
    const lastActual = historical[historical.length - 1].actual;

    const forecast = Array.from({ length: FORECAST }, (_, i) => {
      const x = lastX + i + 1;
      const trend = Math.max(0, m * x + b);
      const uncertainty = mean * 0.15 * (i + 1); // widens with distance
      return {
        week: `+${i + 1}S`,
        actual: null as number | null,
        trend,
        lower: Math.max(0, trend - uncertainty),
        upper: trend + uncertainty,
        x,
      };
    });

    // Connect last historical point to first forecast
    const connector = {
      week: historical[historical.length - 1].week,
      actual: lastActual,
      trend: Math.max(0, m * lastX + b),
      lower: Math.max(0, m * lastX + b),
      upper: Math.max(0, m * lastX + b),
      x: lastX,
    };

    return [...historical.slice(-24), connector, ...forecast];
  }, [data]);

  if (chartData.length === 0) return null;

  const forecastStart = chartData.findIndex(d => d.week.startsWith('+'));
  const splitWeek = forecastStart > 0 ? chartData[forecastStart].week : null;

  return (
    <div className="panel p-6">
      <div className="mb-4">
        <h3 className="section-title mb-1">Prévision sur 8 semaines — Régression linéaire</h3>
        <p className="text-[10px] text-muted font-bold">
          Basée sur le volume hebdomadaire réel des 20 dernières semaines.
          La zone grisée représente l'intervalle de confiance (±15% × distance).
        </p>
      </div>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 8, right: 24, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis
              dataKey="week"
              stroke="var(--chart-axis)"
              tick={{ fill: 'var(--chart-text)', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              interval={3}
            />
            <YAxis
              stroke="var(--chart-axis)"
              tick={{ fill: 'var(--chart-text)', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--surface-3)',
                border: '1px solid var(--border-strong)',
                borderRadius: 4,
                fontSize: 11,
                color: 'var(--text-primary)'
              }}
              formatter={(val: any, name: string) => {
                if (val === null || val === undefined) return [null, name];
                const labels: Record<string, string> = {
                  actual: 'Alertes réelles',
                  trend: 'Tendance',
                  upper: 'Borne haute',
                  lower: 'Borne basse',
                };
                return [Math.round(val), labels[name] ?? name];
              }}
            />

            {/* Confidence band (forecast zone only) */}
            <Area
              type="monotone"
              dataKey="upper"
              stroke="none"
              fill="var(--blue)"
              fillOpacity={0.08}
              legendType="none"
            />
            <Area
              type="monotone"
              dataKey="lower"
              stroke="none"
              fill="var(--bg)"
              fillOpacity={1}
              legendType="none"
            />

            {/* Actual volume */}
            <Line
              type="monotone"
              dataKey="actual"
              stroke="var(--blue)"
              strokeWidth={2}
              dot={false}
              connectNulls={false}
              name="actual"
            />

            {/* Trend line */}
            <Line
              type="monotone"
              dataKey="trend"
              stroke="var(--red)"
              strokeWidth={1.5}
              strokeDasharray="5 4"
              dot={false}
              connectNulls
              name="trend"
            />

            {/* Forecast start separator */}
            {splitWeek && (
              <ReferenceLine
                x={splitWeek}
                stroke="var(--border-strong)"
                strokeDasharray="4 3"
                label={{ value: 'Prévision →', position: 'top', fontSize: 9, fill: 'var(--text-muted)' }}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

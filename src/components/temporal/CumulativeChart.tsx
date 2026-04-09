import React, { useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, LineChart, Line, ComposedChart
} from 'recharts';
import { RasffData } from '../../lib/mockData';

interface CumulativeChartProps {
  data: RasffData[];
}

export const CumulativeChart: React.FC<CumulativeChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    const dateMap: Record<string, { total: number; serious: number; medium: number; low: number; notifications: number }> = {};
    
    data.forEach(d => {
      if (!d.date) return;
      if (!dateMap[d.date]) {
        dateMap[d.date] = { total: 0, serious: 0, medium: 0, low: 0, notifications: 0 };
      }
      dateMap[d.date].total++;
      dateMap[d.date].notifications++;
      if (d.risk_level.toLowerCase().includes('serious')) dateMap[d.date].serious++;
      else if (d.risk_level.toLowerCase().includes('medium') || d.risk_level.toLowerCase().includes('potential')) dateMap[d.date].medium++;
      else dateMap[d.date].low++;
    });

    const sorted = Object.entries(dateMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, v]) => ({ date, ...v }));

    let cumTotal = 0, cumSerious = 0;
    return sorted.map(d => {
      cumTotal += d.total;
      cumSerious += d.serious;
      return {
        ...d,
        cumulativeTotal: cumTotal,
        cumulativeSerious: cumSerious,
        dailyRate: d.notifications,
      };
    });
  }, [data]);

  if (chartData.length === 0) {
    return (
      <div className="panel p-6">
        <p style={{ color: 'var(--text-muted)' }}>Aucune donnée disponible.</p>
      </div>
    );
  }

  const maxVal = Math.max(...chartData.map(d => d.cumulativeTotal));
  const recent = chartData.slice(-7);
  const avgDaily = (recent.reduce((sum, d) => sum + d.notifications, 0) / Math.max(1, recent.length)).toFixed(1);

  return (
    <div className="panel p-6">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <h3 className="section-title mb-1">Cumul des Alertes (Vue Macro)</h3>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', margin: 0 }}>
            Évolution du volume total et du volume d'alertes graves
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: 10, color: 'var(--text-muted)', margin: 0 }}>Moyenne journalière (7j)</p>
          <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--blue)', margin: '2px 0 0' }}>{avgDaily}</p>
        </div>
      </div>

      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData}>
            <defs>
              <linearGradient id="colorCumTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4285f4" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#4285f4" stopOpacity={0.05}/>
              </linearGradient>
              <linearGradient id="colorCumSerious" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ea4335" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#ea4335" stopOpacity={0.05}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="var(--chart-axis)" 
              tick={{ fill: 'var(--chart-text)', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis 
              stroke="var(--chart-axis)" 
              tick={{ fill: 'var(--chart-text)', fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              domain={[0, maxVal * 1.1]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--surface-3)', 
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
                borderRadius: '8px',
                fontSize: 11
              }}
              labelStyle={{ color: 'var(--text-primary)', fontWeight: 600 }}
              formatter={(value: number, name: string) => [
                value.toLocaleString('fr-FR'),
                name === 'cumulativeTotal' ? 'Cumul Total' : name === 'cumulativeSerious' ? 'Cumul Graves' : name
              ]}
            />
            <Legend verticalAlign="top" height={30} iconType="circle" />
            <Area 
              name="cumulativeTotal"
              type="monotone" 
              dataKey="cumulativeTotal" 
              stroke="var(--blue)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorCumTotal)" 
            />
            <Area 
              name="cumulativeSerious"
              type="monotone" 
              dataKey="cumulativeSerious" 
              stroke="#ea4335" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorCumSerious)" 
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
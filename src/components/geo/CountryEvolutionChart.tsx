import React, { useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { RasffData } from '../../lib/mockData';
import { getWeeklyDelta } from '../../lib/temporalEngine';
import { getCountryStats } from '../../lib/geoEngine';

interface CountryEvolutionChartProps {
  data: RasffData[];
}

export const CountryEvolutionChart: React.FC<CountryEvolutionChartProps> = ({ data }) => {
  const topCountries = useMemo(() => {
    return getCountryStats(data).slice(0, 5).map(c => c.name);
  }, [data]);

  const chartData = useMemo(() => {
    const weeks = getWeeklyDelta(data);
    const results: any[] = [];

    weeks.forEach(w => {
      const entry: any = { week: w.weekKey };
      // Correct week boundaries: startDate to startDate+6 days
      const weekStart = w.startDate.toISOString().split('T')[0];
      const endMs = w.startDate.getTime() + 6 * 24 * 60 * 60 * 1000;
      const weekEnd = new Date(endMs).toISOString().split('T')[0];

      topCountries.forEach(country => {
        entry[country] = data.filter(d =>
          d.origin === country &&
          d.date >= weekStart &&
          d.date <= weekEnd
        ).length;
      });
      results.push(entry);
    });

    return results;
  }, [data, topCountries]);

  const colors = ["var(--blue)", "var(--red)", "var(--green)", "var(--orange)", "var(--purple)"];

  return (
    <div className="panel p-6">
      <h3 className="section-title">Dynamique des Alertes par Pays d'Origine</h3>
      <div style={{ height: 350 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
          <XAxis 
            dataKey="week" 
            stroke="var(--chart-axis)" 
            fontSize={10} 
            tick={{ fill: 'var(--chart-text)' }}
            tickLine={false} 
            axisLine={false}
          />
          <YAxis 
            stroke="var(--chart-axis)" 
            fontSize={10} 
            tick={{ fill: 'var(--chart-text)' }}
            tickLine={false} 
            axisLine={false} 
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--surface-3)', 
              borderColor: 'var(--border-strong)',
              borderRadius: '8px',
              fontSize: '12px',
              color: 'var(--text-primary)'
            }}
          />
          <Legend iconType="circle" wrapperStyle={{ paddingTop: 20 }} />
          {topCountries.map((country, idx) => (
            <Line 
              key={country} 
              type="monotone" 
              dataKey={country} 
              stroke={colors[idx]} 
              strokeWidth={3} 
              dot={false}
              animationDuration={1500}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

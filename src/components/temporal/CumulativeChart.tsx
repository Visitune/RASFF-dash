import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { getCumulativeSeries } from '../../lib/temporalEngine';
import { RasffData } from '../../lib/mockData';

interface CumulativeChartProps {
  data: RasffData[];
}

export const CumulativeChart: React.FC<CumulativeChartProps> = ({ data }) => {
  const chartData = getCumulativeSeries(data);

  return (
    <div className="panel p-6">
      <h3 className="section-title">Évolution Cumulative des Alertes</h3>
      <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4285f4" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#4285f4" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorSerious" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--red)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--red)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="var(--chart-axis)" 
            tick={{ fill: 'var(--chart-text)' }}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="var(--chart-axis)" 
            tick={{ fill: 'var(--chart-text)' }}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--surface-3)', 
              borderColor: 'var(--border-strong)',
              color: 'var(--text-primary)',
              borderRadius: '8px'
            }}
          />
          <Legend verticalAlign="top" height={36}/>
          <Area 
            name="Total Alertes"
            type="monotone" 
            dataKey="totalAlerts" 
            stroke="var(--blue)" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorTotal)" 
          />
          <Area 
            name="Alertes Sérieuses"
            type="monotone" 
            dataKey="seriousAlerts" 
            stroke="#ea4335" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorSerious)" 
          />
        </AreaChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

import React from 'react';
import { 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  Line,
  ComposedChart
} from 'recharts';
import { getWeeklyDelta } from '../../lib/temporalEngine';
import { RasffData } from '../../lib/mockData';

interface WeeklyDeltaChartProps {
  data: RasffData[];
}

export const WeeklyDeltaChart: React.FC<WeeklyDeltaChartProps> = ({ data }) => {
  const chartData = getWeeklyDelta(data);

  return (
    <div className="panel p-6">
      <h3 className="section-title">Nouveaux Signalements par Semaine</h3>
      <div style={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
          <XAxis 
            dataKey="weekKey" 
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
            cursor={{ fill: 'var(--surface-hover)' }}
            contentStyle={{ 
              backgroundColor: 'var(--surface-3)', 
              borderColor: 'var(--border-strong)',
              color: 'var(--text-primary)',
              borderRadius: '8px'
            }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.seriousCount > entry.count * 0.3 ? 'var(--red)' : 'var(--blue)'} 
                fillOpacity={0.8}
              />
            ))}
          </Bar>
          <Line 
            name="Tendance"
            type="monotone" 
            dataKey="count" 
            stroke="var(--orange)" 
            strokeWidth={3} 
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

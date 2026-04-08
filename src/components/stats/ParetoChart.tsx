import React from 'react';
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend 
} from 'recharts';
import { paretoAnalysis } from '../../lib/advancedStats';
import { RasffData } from '../../lib/mockData';

interface ParetoChartProps {
  data: RasffData[];
  dimension: keyof RasffData;
  title: string;
}

export const ParetoChart: React.FC<ParetoChartProps> = ({ data, dimension, title }) => {
  const chartData = paretoAnalysis(data, dimension).slice(0, 15);

  return (
    <div className="panel p-6 h-[400px]">
      <h3 className="section-title">{title} (Loi de Pareto 80/20)</h3>
      <ResponsiveContainer width="100%" height="85%">
        <ComposedChart data={chartData} margin={{ bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="var(--chart-axis)" 
            fontSize={10} 
            angle={-45} 
            textAnchor="end" 
            height={70} 
            tick={{ fill: 'var(--chart-text)' }}
            tickLine={false} 
            axisLine={false}
          />
          <YAxis 
            yAxisId="left" 
            stroke="var(--chart-axis)" 
            fontSize={10} 
            tick={{ fill: 'var(--chart-text)' }}
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            yAxisId="right" 
            orientation="right" 
            domain={[0, 100]} 
            stroke="var(--orange)" 
            fontSize={10} 
            tick={{ fill: 'var(--orange)' }}
            tickLine={false} 
            axisLine={false} 
            unit="%"
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
          <Legend wrapperStyle={{ paddingTop: 20 }} />
          <Bar 
            yAxisId="left" 
            dataKey="count" 
            fill="var(--blue)" 
            fillOpacity={0.8}
            radius={[4, 4, 0, 0]} 
            name="Nombre d'alertes" 
          />
          <Line 
            yAxisId="right" 
            type="monotone" 
            dataKey="cumulativePercent" 
            stroke="var(--orange)" 
            strokeWidth={3} 
            dot={{ fill: 'var(--orange)', r: 4 }} 
            name="% Cumulé (Pareto)" 
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

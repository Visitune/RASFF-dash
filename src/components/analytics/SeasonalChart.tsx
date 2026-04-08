import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { RasffData } from '../../lib/mockData';
import { GlassPanel } from '../ui/GlassPanel';

interface SeasonalChartProps {
  data: RasffData[];
}

export const SeasonalChart: React.FC<SeasonalChartProps> = ({ data }) => {
  // Aggregate by month
  const monthlyData: Record<string, number> = {};
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  
  months.forEach(m => monthlyData[m] = 0);

  data.forEach(d => {
    const date = new Date(d.date);
    if (!isNaN(date.getTime())) {
      const monthIdx = date.getMonth();
      monthlyData[months[monthIdx]]++;
    }
  });

  const chartData = months.map(m => ({
    month: m,
    alertes: monthlyData[m]
  }));

  return (
    <div className="panel p-6">
      <h3 className="section-title">Saisonnalité des Alertes</h3>
      <div style={{ height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="var(--chart-axis)" 
              tick={{ fill: 'var(--chart-text)' }}
              fontSize={12} 
            />
            <YAxis 
              stroke="var(--chart-axis)" 
              tick={{ fill: 'var(--chart-text)' }}
              fontSize={12} 
            />
            <Tooltip
              cursor={{ fill: 'var(--surface-hover)' }}
              contentStyle={{
                backgroundColor: 'var(--surface-3)',
                borderColor: 'var(--border-strong)',
                color: 'var(--text-primary)',
                borderRadius: '8px',
                fontSize: '12px'
              }}
            />
            <Bar dataKey="alertes" fill="var(--green)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

import React, { useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, AreaChart, Area
} from 'recharts';
import { RasffData } from '../../lib/mockData';

interface ChartProps {
  data: RasffData[];
}

const parseDate = (dateStr: string): Date | null => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d;
};

export const MovingAverageChart: React.FC<ChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    const dateMap: Record<string, number> = {};
    data.forEach(d => {
      if (d.date) dateMap[d.date] = (dateMap[d.date] || 0) + 1;
    });

    const sorted = Object.entries(dateMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count], idx, arr) => {
        const window = arr.slice(Math.max(0, idx - 6), idx + 1);
        const avg = window.reduce((s, [, c]) => s + c, 0) / window.length;
        return { date, count, movingAvg: Math.round(avg * 10) / 10 };
      });

    return sorted;
  }, [data]);

  if (chartData.length === 0) return null;

  return (
    <div style={{ height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
          <XAxis dataKey="date" stroke="var(--chart-axis)" tick={{ fill: 'var(--chart-text)', fontSize: 9 }} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--chart-axis)" tick={{ fill: 'var(--chart-text)', fontSize: 9 }} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ background: 'var(--surface-3)', border: '1px solid var(--border-strong)', borderRadius: 6, fontSize: 10 }} />
          <Legend iconType="circle" iconSize={6} />
          <Line type="monotone" dataKey="count" stroke="var(--text-muted)" strokeWidth={1} dot={false} name="Quotidien" opacity={0.4} />
          <Line type="monotone" dataKey="movingAvg" stroke="var(--green)" strokeWidth={3} dot={false} name="Moyenne 7j" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const DayOfWeekChart: React.FC<ChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const counts = [0, 0, 0, 0, 0, 0, 0];
    
    data.forEach(d => {
      const parsed = parseDate(d.date);
      if (parsed) {
        const day = parsed.getDay();
        counts[day === 0 ? 6 : day - 1]++;
      }
    });

    return days.map((name, i) => ({ name, count: counts[i] }));
  }, [data]);

  const max = Math.max(...chartData.map(d => d.count));

  return (
    <div style={{ height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
          <XAxis dataKey="name" stroke="var(--chart-axis)" tick={{ fill: 'var(--chart-text)', fontSize: 10 }} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--chart-axis)" tick={{ fill: 'var(--chart-text)', fontSize: 10 }} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ background: 'var(--surface-3)', border: '1px solid var(--border-strong)', borderRadius: 6, fontSize: 11 }} />
          {chartData.map((entry, i) => (
            <Bar key={i} dataKey="count" fill={entry.count === max ? 'var(--orange)' : 'var(--blue)'} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const MonthlyChart: React.FC<ChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    const counts = Array(12).fill(0);
    
    data.forEach(d => {
      const parsed = parseDate(d.date);
      if (parsed) {
        counts[parsed.getMonth()]++;
      }
    });

    return months.map((name, i) => ({ name, count: counts[i] }));
  }, [data]);

  return (
    <div style={{ height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorMonth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--purple)" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="var(--purple)" stopOpacity={0.05}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
          <XAxis dataKey="name" stroke="var(--chart-axis)" tick={{ fill: 'var(--chart-text)', fontSize: 10 }} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--chart-axis)" tick={{ fill: 'var(--chart-text)', fontSize: 10 }} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ background: 'var(--surface-3)', border: '1px solid var(--border-strong)', borderRadius: 6, fontSize: 11 }} />
          <Area type="monotone" dataKey="count" stroke="var(--purple)" strokeWidth={2} fill="url(#colorMonth)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const YearQuarterChart: React.FC<ChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    const qMap: Record<string, number> = {};
    
    data.forEach(d => {
      const parsed = parseDate(d.date);
      if (parsed) {
        const year = parsed.getFullYear();
        const q = Math.ceil((parsed.getMonth() + 1) / 3);
        const key = `${year} T${q}`;
        qMap[key] = (qMap[key] || 0) + 1;
      }
    });

    return Object.entries(qMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, count]) => ({ name, count }));
  }, [data]);

  return (
    <div style={{ height: 240 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
          <XAxis dataKey="name" stroke="var(--chart-axis)" tick={{ fill: 'var(--chart-text)', fontSize: 10 }} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--chart-axis)" tick={{ fill: 'var(--chart-text)', fontSize: 10 }} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ background: 'var(--surface-3)', border: '1px solid var(--border-strong)', borderRadius: 6, fontSize: 11 }} />
          <Bar dataKey="count" fill="var(--red)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const TrendDirectionChart: React.FC<ChartProps> = ({ data }) => {
  const chartData = useMemo(() => {
    const dateMap: Record<string, number> = {};
    data.forEach(d => {
      if (d.date) dateMap[d.date] = (dateMap[d.date] || 0) + 1;
    });

    const sorted = Object.entries(dateMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, count], idx, arr) => {
        if (idx < 2) return { date, count, trend: 0 };
        const prev = arr[idx - 1][1];
        const direction = count > prev ? 1 : count < prev ? -1 : 0;
        return { date, count, trend: direction };
      });

    return sorted.slice(-30);
  }, [data]);

  const up = chartData.filter(d => d.trend === 1).length;
  const down = chartData.filter(d => d.trend === -1).length;
  const flat = chartData.filter(d => d.trend === 0).length;

  return (
    <div style={{ height: 200 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
          <XAxis dataKey="date" stroke="var(--chart-axis)" tick={{ fill: 'var(--chart-text)', fontSize: 9 }} tickLine={false} axisLine={false} />
          <YAxis stroke="var(--chart-axis)" tick={{ fill: 'var(--chart-text)', fontSize: 9 }} tickLine={false} axisLine={false} />
          <Tooltip contentStyle={{ background: 'var(--surface-3)', border: '1px solid var(--border-strong)', borderRadius: 6, fontSize: 10 }} />
          <Line type="step" dataKey="count" stroke="var(--blue)" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 10, color: 'var(--text-muted)' }}>
        <span>↑ {up} jours</span>
        <span>↓ {down} jours</span>
        <span>= {flat} jours</span>
      </div>
    </div>
  );
};
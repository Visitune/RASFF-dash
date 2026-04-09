import React from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, RadialBarChart, RadialBar, Legend
} from 'recharts';
import { RasffData } from '../../lib/mockData';

interface DistributionChartsProps {
  data: RasffData[];
}

const COLORS = ['#4285f4', '#34a853', '#fbbc04', '#ea4335', '#9b59b6', '#ff6d00', '#00bcd4', '#795548'];

const ModernDonutChart = ({ data, dataKey, nameKey, title, colors = COLORS }: {
  data: { name: string; value: number }[];
  dataKey: string;
  nameKey: string;
  title: string;
  colors?: string[];
}) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  
  return (
    <div className="panel p-5">
      <h3 className="section-title mb-1">{title}</h3>
      <p style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 16 }}>{total.toLocaleString('fr-FR')} total</p>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 140, height: 140 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={65}
                paddingAngle={2}
                dataKey={dataKey}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} stroke="var(--surface-1)" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: 'var(--surface-3)',
                  border: '1px solid var(--border-strong)',
                  borderRadius: '6px',
                  fontSize: 11
                }}
                formatter={(value: number) => [value.toLocaleString('fr-FR'), '']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {data.slice(0, 5).map((item, i) => (
            <div key={item[nameKey]} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: colors[i % colors.length] }} />
              <span style={{ flex: 1, fontSize: 10, color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {item[nameKey]}
              </span>
              <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-primary)' }}>
                {Math.round(item[dataKey] / total * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DistributionCharts: React.FC<DistributionChartsProps> = ({ data }) => {
  if (data.length === 0) return (
    <div className="panel p-6">
      <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Aucune donnée à afficher.</p>
    </div>
  );

  const riskData = data.reduce((acc, d) => {
    const key = d.risk_level || 'Unknown';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const riskChartData = Object.entries(riskData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const categoryData = data.reduce((acc, d) => {
    acc[d.category] = (acc[d.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryChartData = Object.entries(categoryData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  const hazardData = data.reduce((acc, d) => {
    acc[d.hazard] = (acc[d.hazard] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const hazardChartData = Object.entries(hazardData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  const originData = data.reduce((acc, d) => {
    acc[d.origin] = (acc[d.origin] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const originChartData = Object.entries(originData)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);

  const riskColors = ['#ea4335', '#ff6d00', '#fbbc04', '#34a853', '#4285f4'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <ModernDonutChart
          data={riskChartData}
          dataKey="value"
          nameKey="name"
          title="Niveau de Risque"
          colors={riskColors}
        />
        <ModernDonutChart
          data={categoryChartData}
          dataKey="value"
          nameKey="name"
          title="Catégories de Produits"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="panel p-5">
          <h3 className="section-title mb-3">Top Hazards</h3>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hazardChartData} layout="vertical" margin={{ left: 0, right: 20 }}>
                <XAxis type="number" stroke="var(--chart-axis)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={100}
                  stroke="var(--chart-axis)"
                  fontSize={9}
                  tickLine={false}
                  axisLine={false}
                  tick={(props) => {
                    const text = props.payload?.value || '';
                    return (
                      <text x={props.x} y={props.y} dy={4} fill="var(--text-secondary)" fontSize={9} textAnchor="end">
                        {text.length > 15 ? text.slice(0, 13) + '...' : text}
                      </text>
                    );
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--surface-3)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: '6px',
                    fontSize: 11
                  }}
                  cursor={{ fill: 'var(--surface-hover)' }}
                />
                <Bar dataKey="value" fill="var(--blue)" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel p-5">
          <h3 className="section-title mb-3">Top Pays d'Origine</h3>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={originChartData} layout="vertical" margin={{ left: 0, right: 20 }}>
                <XAxis type="number" stroke="var(--chart-axis)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={80}
                  stroke="var(--chart-axis)"
                  fontSize={9}
                  tickLine={false}
                  axisLine={false}
                  tick={(props) => {
                    const text = props.payload?.value || '';
                    return (
                      <text x={props.x} y={props.y} dy={4} fill="var(--text-secondary)" fontSize={9} textAnchor="end">
                        {text.length > 12 ? text.slice(0, 10) + '...' : text}
                      </text>
                    );
                  }}
                />
                <Tooltip
                  contentStyle={{
                    background: 'var(--surface-3)',
                    border: '1px solid var(--border-strong)',
                    borderRadius: '6px',
                    fontSize: 11
                  }}
                  cursor={{ fill: 'var(--surface-hover)' }}
                />
                <Bar dataKey="value" fill="var(--purple)" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="panel p-5">
        <h3 className="section-title mb-3">Répartition par Status</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {Object.entries(data.reduce((acc, d) => {
            acc[d.status] = (acc[d.status] || 0) + 1;
            return acc;
          }, {} as Record<string, number>))
            .sort((a, b) => b[1] - a[1])
            .map(([status, count], i) => (
              <div
                key={status}
                style={{
                  flex: '1 1 150px',
                  minWidth: 120,
                  padding: 16,
                  background: 'var(--surface-2)',
                  borderRadius: 8,
                  borderLeft: `4px solid ${COLORS[i % COLORS.length]}`
                }}
              >
                <p style={{ margin: 0, fontSize: 10, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{status}</p>
                <p style={{ margin: '8px 0 0', fontSize: 24, fontWeight: 700, color: 'var(--text-primary)' }}>{count.toLocaleString('fr-FR')}</p>
                <p style={{ margin: '4px 0 0', fontSize: 10, color: COLORS[i % COLORS.length] }}>{Math.round(count / data.length * 100)}% du total</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
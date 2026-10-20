import React from 'react';
import { motion } from 'motion/react';
import { StatResult } from '../../lib/statistics';
import { BarChart3, TrendingUp, AlertTriangle, Database } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface StatsSummaryProps {
  stats: StatResult;
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  accent: string;
  index: number;
  trendData?: any[];
}

const CountUp: React.FC<{ value: number; decimals?: number }> = ({ value, decimals = 0 }) => {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const duration = 1000; // 1s
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuad = (t: number) => t * (2 - t);
      const current = progress === 1 ? value : start + (value - start) * easeOutQuad(progress);
      
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return <>{displayValue.toFixed(decimals)}</>;
};

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, accent, index, trendData }) => {
  const isNumeric = typeof value === 'number' || !isNaN(Number(value));
  const numericValue = isNumeric ? Number(value) : 0;
  const decimals = String(value).includes('.') ? String(value).split('.')[1].length : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="panel p-5 flex flex-col justify-between border-t-4 shadow-sm relative overflow-hidden"
      style={{ borderTopColor: accent }}
    >
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-2">
            {label}
          </p>
          {isNumeric ? (
            <p className="text-2xl font-black text-primary leading-none tracking-tighter">
              <CountUp value={numericValue} decimals={decimals} />
            </p>
          ) : (
            <span
              className="badge"
              style={{ background: accent === 'var(--red)' ? 'rgba(234,67,53,0.15)' : 'rgba(255,109,0,0.15)', color: accent, fontSize: 12, padding: '4px 10px' }}
            >
              {value}
            </span>
          )}
        </div>
        <div className="p-2 rounded-lg bg-surface-2" style={{ color: accent }}>
          {icon}
        </div>
      </div>

      {trendData && (
        <div className="absolute bottom-0 left-0 right-0 opacity-20 pointer-events-none" style={{ height: 48 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <Line 
                type="monotone" 
                dataKey="val" 
                stroke={accent} 
                strokeWidth={2} 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
};

interface StatsSummaryProps {
  stats: StatResult;
  trends?: Record<string, {val: number}[]>;
}

export const StatsSummary: React.FC<StatsSummaryProps> = ({ stats, trends }) => {
  const riskLabel = stats.mean > 8 ? 'Haute' : 'Modérée';

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
      <MetricCard
        index={0}
        icon={<Database size={18} />}
        label="Échantillons"
        value={stats.count}
        accent="var(--blue)"
        trendData={trends?.count}
      />
      <MetricCard
        index={1}
        icon={<TrendingUp size={18} />}
        label="Moy. / Jour actif"
        value={stats.mean.toFixed(1)}
        accent="var(--green)"
      />
      <MetricCard
        index={2}
        icon={<BarChart3 size={18} />}
        label="Écart Type (Vol)"
        value={stats.stdDev.toFixed(2)}
        accent="var(--orange)"
      />
      <MetricCard
        index={3}
        icon={<AlertTriangle size={18} />}
        label="Indice Risque"
        value={riskLabel}
        accent={stats.mean > 8 ? 'var(--red)' : 'var(--orange)'}
      />
    </div>
  );
};

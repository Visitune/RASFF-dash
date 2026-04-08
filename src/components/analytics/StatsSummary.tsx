import React from 'react';
import { motion } from 'motion/react';
import { StatResult } from '../../lib/statistics';
import { BarChart3, TrendingUp, AlertTriangle, Database } from 'lucide-react';

interface StatsSummaryProps {
  stats: StatResult;
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  accent: string;        // CSS color var or hex
  index: number;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, label, value, accent, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.2, delay: index * 0.05 }}
    className="panel p-5 flex flex-col justify-between border-t-4 shadow-sm"
    style={{ borderTopColor: accent }}
  >
    <div className="flex items-start justify-between">
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-muted mb-2">
          {label}
        </p>
        <p className="text-2xl font-black text-primary leading-none tracking-tighter">
          {value}
        </p>
      </div>
      <div className="p-2 rounded-lg bg-surface-2" style={{ color: accent }}>
        {icon}
      </div>
    </div>
  </motion.div>
);

export const StatsSummary: React.FC<StatsSummaryProps> = ({ stats }) => {
  const riskLabel = stats.mean > 8 ? 'Haute' : 'Modérée';

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <MetricCard
        index={0}
        icon={<Database size={18} />}
        label="Échantillons"
        value={stats.count}
        accent="var(--blue)"
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

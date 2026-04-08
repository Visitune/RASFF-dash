import React from 'react';
import { motion } from 'motion/react';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';
import { calculateGlobalRiskScore } from '../../lib/temporalEngine';
import { RasffData } from '../../lib/mockData';

interface GlobalScoreCardProps {
  data: RasffData[];
  recentDelta: number;
}

export const GlobalScoreCard: React.FC<GlobalScoreCardProps> = ({ data, recentDelta }) => {
  const score = calculateGlobalRiskScore(data, recentDelta);
  const isHighRisk = score > 60;
  const color = isHighRisk ? 'var(--red)' : 'var(--green)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="panel p-6 flex flex-col gap-4 border-t-4 shadow-sm"
      style={{ borderTopColor: color }}
    >
      <h3 className="section-title mb-0 flex items-center gap-2">
        <Activity size={14} className="text-muted" /> Score de Risque
      </h3>

      <div className="flex items-baseline gap-2">
        <span className="text-5xl font-black leading-none tracking-tighter" style={{ color }}>
          {isNaN(score) ? '—' : score}
        </span>
        <span className="text-sm font-bold text-muted uppercase">/ 100</span>
        <div className="ml-auto">
          {isHighRisk
            ? <TrendingUp size={24} className="text-red drop-shadow-sm" />
            : <TrendingDown size={24} className="text-green drop-shadow-sm" />
          }
        </div>
      </div>

      <p className="text-[10px] text-muted font-bold uppercase leading-relaxed tracking-wider">
        Indice composite : Volume × Vélocité × Sévérité
      </p>
    </motion.div>
  );
};

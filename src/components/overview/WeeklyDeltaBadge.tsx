import React from 'react';
import { motion } from 'motion/react';
import { Clock, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

interface WeeklyDeltaBadgeProps {
  latestStats: {
    delta: number;
    trend: number;
    currentWeek: string;
    startDate: Date;
  };
}

export const WeeklyDeltaBadge: React.FC<WeeklyDeltaBadgeProps> = ({ latestStats }) => {
  const { delta, trend, currentWeek, startDate } = latestStats;

  const formattedDate = startDate?.toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  const isUp   = trend >  5;
  const isDown = trend < -5;
  const trendColor  = isUp ? 'var(--red)' : isDown ? 'var(--green)' : 'var(--text-muted)';
  const trendBg     = isUp ? 'rgba(234,67,53,0.1)' : isDown ? 'rgba(52,168,83,0.1)' : 'var(--surface-3)';
  const TrendIcon   = isUp ? ArrowUpRight : isDown ? ArrowDownRight : Minus;

  return (
    <motion.div
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="flex flex-col gap-1.5"
    >
      <div
        className="flex items-center gap-2 text-xs font-bold"
        style={{ color: 'var(--text-muted)' }}
      >
        <Clock size={12} />
        <span>
          Semaine {currentWeek?.split('-W')[1] ?? '—'} · à jour au <strong style={{ color: 'var(--text-secondary)' }}>{formattedDate || '—'}</strong>
        </span>
      </div>

      <div
        className="flex items-center gap-3 rounded px-4 py-2 border w-fit"
        style={{ background: 'var(--surface-2)', borderColor: 'var(--border-strong)' }}
      >
        <div>
          <span className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>
            +{delta}
          </span>
          <span className="text-xs font-bold ml-1.5" style={{ color: 'var(--text-muted)' }}>
            alertes cette semaine
          </span>
        </div>

        <div
          className="flex items-center gap-1 px-2 py-1 rounded text-xs font-black"
          style={{ background: trendBg, color: trendColor }}
        >
          <TrendIcon size={12} />
          {Math.abs(trend).toFixed(1)}% vs S–1
        </div>
      </div>
    </motion.div>
  );
};

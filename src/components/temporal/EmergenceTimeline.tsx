import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, Calendar, Flag } from 'lucide-react';
import { detectEmergingHazards } from '../../lib/temporalEngine';
import { RasffData } from '../../lib/mockData';

interface EmergenceTimelineProps {
  data: RasffData[];
}

export const EmergenceTimeline: React.FC<EmergenceTimelineProps> = ({ data }) => {
  const emerging = detectEmergingHazards(data).slice(-10).reverse();

  return (
    <div className="panel p-6 overflow-hidden">
      <h3 className="section-title mb-6 flex items-center gap-2">
        <ShieldAlert size={14} style={{ color: 'var(--orange)' }} /> Nouveaux Dangers Émergents
      </h3>

      {emerging.length === 0 && (
        <p className="text-center py-10 text-muted text-xs uppercase tracking-widest font-bold">
          Aucun nouveau danger détecté sur cette période.
        </p>
      )}

      <div className="space-y-3">
        {emerging.map((item, index) => (
          <motion.div
            key={item.hazard + item.firstSeenWeek}
            initial={{ x: -12, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
            className="flex items-start gap-4 p-4 rounded-sm border border-border bg-surface-2 hover:bg-surface-hover transition-colors"
            style={{ borderLeft: '3px solid var(--orange)' }}
          >
            {/* Week dot */}
            <div
              className="flex items-center justify-center w-8 h-8 rounded shrink-0"
              style={{ background: 'rgba(255,109,0,0.12)', color: 'var(--orange)' }}
            >
              <Calendar size={14} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-1">
                <p className="text-xs font-black text-primary uppercase leading-tight">{item.hazard}</p>
                <span className="text-[9px] font-black text-muted uppercase tracking-widest shrink-0 font-mono">
                  {item.firstSeenWeek}
                </span>
              </div>
              <div className="flex items-center gap-3 text-[10px] text-secondary font-bold">
                <span className="flex items-center gap-1"><Flag size={9} /> {item.origin}</span>
                <span className="text-border-strong">|</span>
                <span className="italic text-muted">{item.category}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

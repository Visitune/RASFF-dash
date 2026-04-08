import React, { useMemo } from 'react';
import { getCooccurrenceData } from '../../lib/advancedStats';
import { RasffData } from '../../lib/mockData';
import { motion } from 'motion/react';

interface CorrelationHeatmapProps {
  data: RasffData[];
}

export const CorrelationHeatmap: React.FC<CorrelationHeatmapProps> = ({ data }) => {
  const { matrix, topCategories, topHazards } = useMemo(() => getCooccurrenceData(data), [data]);

  const maxVal = Math.max(...matrix.flatMap(row => topHazards.map(h => row[h] as number)));

  return (
    <div className="glass-panel p-6 overflow-x-auto overflow-y-hidden">
      <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">Matrice de Co-occurrence : Catégories ↔ Hazards</h3>
      
      <div className="min-w-[800px]">
        {/* Table Header with Vertical Labels */}
        <div className="flex">
          <div className="w-48 shrink-0" />
          <div className="flex gap-1 flex-grow">
            {topHazards.map(haz => (
              <div key={haz} className="w-16 flex items-end justify-center h-48 pb-2">
                <span className="transform -rotate-90 text-[10px] font-bold text-white/50 uppercase whitespace-nowrap origin-center text-center">
                  {haz}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Rows */}
        <div className="space-y-1">
          {matrix.map((row, rIdx) => (
            <div key={row.category} className="flex h-10 group">
              <div className="w-48 shrink-0 flex items-center pr-4">
                <span className="text-[10px] font-bold text-white/60 uppercase text-right w-full group-hover:text-white transition-colors leading-none">
                  {row.category}
                </span>
              </div>
              <div className="flex gap-1 flex-grow">
                {topHazards.map((haz, hIdx) => {
                  const val = row[haz] as number;
                  const ratio = maxVal > 0 ? val / maxVal : 0;
                  
                  return (
                    <motion.div 
                      key={haz}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: (rIdx * 10 + hIdx) * 0.005 }}
                      className="w-16 h-10 rounded-sm flex items-center justify-center relative cursor-help group-hover:scale-[1.02] transition-transform duration-300"
                      style={{ 
                        backgroundColor: val > 0 ? `rgba(99, 102, 241, ${0.1 + ratio * 0.9})` : 'rgba(255, 255, 255, 0.02)',
                        border: val > 0 ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.02)'
                      }}
                    >
                      <span className={`text-[10px] font-bold ${ratio > 0.6 ? 'text-white' : 'text-white/40'}`}>
                        {val > 0 ? val : ''}
                      </span>
                      {val > 0 && (
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-8 flex gap-6 items-center">
        <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest leading-none">Densité de corrélation</span>
        <div className="h-2 w-48 rounded-full bg-gradient-to-r from-white/5 via-indigo-500/40 to-indigo-500 flex justify-between relative">
           <span className="absolute -top-4 left-0 text-[8px] text-white/30">0</span>
           <span className="absolute -top-4 right-0 text-[8px] text-white/30">{maxVal}</span>
        </div>
      </div>
    </div>
  );
};

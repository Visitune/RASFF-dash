import React from 'react';
import { motion } from 'motion/react';
import { rankCountriesAdvanced } from '../../lib/advancedStats';
import { RasffData } from '../../lib/mockData';
import { Trophy, ShieldAlert } from 'lucide-react';

interface CountryRankingTableProps {
  data: RasffData[];
}

export const CountryRankingTable: React.FC<CountryRankingTableProps> = ({ data }) => {
  const rankings = rankCountriesAdvanced(data).slice(0, 10);

  return (
    <div className="panel p-6 shadow-sm border-strong">
      <div className="flex items-center justify-between mb-8">
        <h3 className="section-title mb-0 flex items-center gap-2">
          <Trophy className="text-orange" size={20} /> TOP des Origines à Risque
        </h3>
        <p className="text-[10px] text-muted italic uppercase font-bold">Volume × Sévérité</p>
      </div>

      <div className="space-y-4">
        {rankings.map((country, index) => (
          <motion.div 
            key={country.name}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="group relative flex items-center justify-between p-4 rounded-xl bg-surface-2 border border-border hover:bg-surface-hover hover:border-blue/30 transition-all cursor-default"
          >
            <div className="flex items-center gap-4">
              <span className={`text-2xl font-black italic w-8 ${index < 3 ? 'text-orange' : 'text-muted/30'}`}>
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-black text-primary uppercase tracking-tighter">{country.name}</p>
                <div className="flex items-center gap-2 text-[10px] text-muted font-bold mt-1">
                  <ShieldAlert size={10} className="text-red" />
                  <span className="truncate max-w-[150px]">{country.mainHazard}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="text-right hidden sm:block">
                <p className="text-[9px] text-muted uppercase font-black tracking-widest">Alertes</p>
                <p className="text-xs font-black text-primary">{country.totalAlerts}</p>
              </div>
              
              <div className="text-right hidden sm:block">
                <p className="text-[9px] text-muted font-black uppercase tracking-widest">Sévérité</p>
                <p className={`text-xs font-black ${country.seriousAlerts / country.totalAlerts > 0.5 ? 'text-red' : 'text-blue'}`}>
                  {Math.round((country.seriousAlerts / country.totalAlerts) * 100)}%
                </p>
              </div>

              <div className="w-12 h-12 rounded-full border-4 border-surface-3 flex items-center justify-center relative shadow-sm bg-surface-1">
                 <svg className="w-full h-full transform -rotate-90">
                   <circle
                     className="text-surface-3"
                     strokeWidth="4"
                     stroke="currentColor"
                     fill="transparent"
                     r="20"
                     cx="24"
                     cy="24"
                   />
                   <circle
                     className={`${country.score > 70 ? 'text-red' : country.score > 40 ? 'text-blue' : 'text-green'} transition-all duration-1000`}
                     strokeWidth="4"
                     strokeDasharray={2 * Math.PI * 20}
                     strokeDashoffset={2 * Math.PI * 20 * (1 - country.score / 100)}
                     strokeLinecap="round"
                     stroke="currentColor"
                     fill="transparent"
                     r="20"
                     cx="24"
                     cy="24"
                   />
                 </svg>
                 <span className="absolute text-[9px] font-black text-primary">{country.score}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 pt-4 border-t border-border flex gap-8">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red" />
          <span className="text-[9px] text-muted uppercase font-black tracking-widest">Risque Critique</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-blue" />
          <span className="text-[9px] text-muted uppercase font-black tracking-widest">A surveiller</span>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { CountryStats } from '../../lib/geoEngine';
import { X, AlertTriangle, ShieldCheck, TrendingUp, Package, ShieldAlert } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from 'recharts';

interface CountryDetailPanelProps {
  stats: CountryStats;
  onClose: () => void;
}

export const CountryDetailPanel: React.FC<CountryDetailPanelProps> = ({ stats, onClose }) => {
  const hazardData = Object.entries(stats.hazards)
    .map(([name, val]) => ({ name: name.length > 15 ? name.substring(0, 15) + '...' : name, value: Number(val) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const categoryData = Object.entries(stats.categories)
    .map(([name, val]) => ({ name: name.length > 15 ? name.substring(0, 15) + '...' : name, value: Number(val) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  return (
    <motion.div 
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      className="fixed inset-y-0 right-0 w-[450px] bg-black/90 backdrop-blur-2xl border-l border-white/10 z-[100] shadow-2xl p-8 flex flex-col overflow-y-auto"
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors"
      >
        <X size={20} />
      </button>

      <div className="mb-8">
        <h2 className="text-3xl font-black text-white tracking-tighter mb-1 uppercase">{stats.name}</h2>
        <div className="flex items-center gap-2">
            <span className="text-white/40 text-xs font-bold tracking-widest uppercase">PROFIL DE RISQUE</span>
            <div className="h-px bg-white/10 flex-grow" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-[10px] text-white/40 mb-1 font-bold uppercase tracking-widest">Score de Risque</p>
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-black ${stats.riskScore > 60 ? 'text-rose-500' : 'text-indigo-400'}`}>
              {stats.riskScore}
            </span>
            <span className="text-white/20 text-sm">/100</span>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
          <p className="text-[10px] text-white/40 mb-1 font-bold uppercase tracking-widest">Total Alertes</p>
          <div className="flex items-baseline gap-2">
             <span className="text-4xl font-black text-white">{stats.count}</span>
             <TrendingUp size={16} className="text-emerald-500 mb-1" />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Hazards Detail */}
        <div>
           <div className="flex items-center gap-2 mb-4">
              <ShieldAlert size={16} className="text-rose-400" />
              <h4 className="text-xs font-black text-white uppercase tracking-widest">Hazards Principaux</h4>
           </div>
           <div style={{ height: 200 }}>
             <ResponsiveContainer width="100%" height="100%">
               <BarChart layout="vertical" data={hazardData}>
                 <XAxis type="number" hide />
                 <YAxis type="category" dataKey="name" stroke="#ffffff40" fontSize={10} width={80} />
                 <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: 'none', color: '#fff' }}
                    cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                 />
                 <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                   {hazardData.map((_, index) => (
                      <Cell key={index} fill={index === 0 ? '#f43f5e' : '#f43f5e80'} />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>

        {/* Categories Detail */}
        <div>
           <div className="flex items-center gap-2 mb-4">
              <Package size={16} className="text-indigo-400" />
              <h4 className="text-xs font-black text-white uppercase tracking-widest">Catégories de Produits</h4>
           </div>
           <div style={{ height: 200 }}>
             <ResponsiveContainer width="100%" height="100%">
               <BarChart layout="vertical" data={categoryData}>
                 <XAxis type="number" hide />
                 <YAxis type="category" dataKey="name" stroke="#ffffff40" fontSize={10} width={80} />
                 <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: 'none', color: '#fff' }}
                    cursor={{ fill: 'rgba(255,255,255,0.1)' }}
                 />
                 <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                   {categoryData.map((_, index) => (
                      <Cell key={index} fill={index === 0 ? '#6366f1' : '#6366f180'} />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      <div className="mt-auto pt-8 border-t border-white/5 space-y-4">
        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex gap-3">
          <AlertTriangle className="text-orange-500 shrink-0" size={18} />
          <p className="text-[11px] text-orange-400/80 leading-relaxed italic">
            Ce pays est sous surveillance accrue pour le danger <strong>{hazardData[0]?.name || 'N/A'}</strong>. 
            Il est recommandé de renforcer les contrôles à réception pour les produits de type <strong>{categoryData[0]?.name || 'N/A'}</strong>.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

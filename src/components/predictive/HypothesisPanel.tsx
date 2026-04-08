import React from 'react';
import { motion } from 'motion/react';
import { Beaker, TrendingUp, AlertTriangle, ListFilter, Calendar } from 'lucide-react';

export type HypothesisType = 'H1' | 'H2' | 'H3' | 'H4' | 'H5';

interface HypothesisPanelProps {
  selectedH: HypothesisType;
  onSelect: (h: HypothesisType) => void;
}

const hypotheses = [
  {
    id: 'H1' as HypothesisType,
    icon: Calendar,
    title: 'Saisonnalité estivale',
    desc: 'Les alertes augmentent-elles en juin–août ?',
    method: 'Moy. journalière été vs hors-été'
  },
  {
    id: 'H2' as HypothesisType,
    icon: AlertTriangle,
    title: 'Concentration des risques',
    desc: 'Certains pays génèrent-ils plus de risques graves ?',
    method: 'Ratio alertes graves / total par origine'
  },
  {
    id: 'H3' as HypothesisType,
    icon: TrendingUp,
    title: 'Couples origine–danger',
    desc: 'Existe-t-il des paires pays × danger dominantes ?',
    method: 'Fréquence des couples (origine, danger)'
  },
  {
    id: 'H4' as HypothesisType,
    icon: ListFilter,
    title: 'Loi de Pareto (80/20)',
    desc: '20% des catégories génèrent-elles 80% des alertes ?',
    method: 'Cumul de fréquence par catégorie'
  },
  {
    id: 'H5' as HypothesisType,
    icon: Beaker,
    title: 'Tendance de volume',
    desc: 'Le volume hebdomadaire est-il en hausse structurelle ?',
    method: 'Régression linéaire sur volumes quotidiens'
  },
];

export const HypothesisPanel: React.FC<HypothesisPanelProps> = ({ selectedH, onSelect }) => {
  return (
    <div className="panel p-5 space-y-3">
      <div className="mb-4">
        <h3 className="section-title mb-1 flex items-center gap-2">
          <Beaker size={13} style={{ color: 'var(--blue)' }} /> Hypothèses testables
        </h3>
        <p className="text-[10px] text-muted font-bold leading-relaxed">
          Sélectionnez une hypothèse. Le modèle statistique la teste sur les données filtrées.
        </p>
      </div>

      {hypotheses.map(h => {
        const isSelected = selectedH === h.id;
        const Icon = h.icon;
        return (
          <motion.button
            key={h.id}
            onClick={() => onSelect(h.id)}
            whileTap={{ scale: 0.98 }}
            className="w-full text-left p-3 rounded border transition-all"
            style={{
              background: isSelected ? 'var(--blue-dim)' : 'var(--surface-2)',
              borderColor: isSelected ? 'var(--blue)' : 'var(--border)',
              borderWidth: isSelected ? 2 : 1,
            }}
          >
            <div className="flex items-start gap-3">
              <div
                className="shrink-0 w-7 h-7 flex items-center justify-center rounded mt-0.5"
                style={{
                  background: isSelected ? 'var(--blue)' : 'var(--surface-3)',
                  color: isSelected ? 'white' : 'var(--text-muted)',
                }}
              >
                <Icon size={13} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-[9px] font-black font-mono"
                    style={{ color: isSelected ? 'var(--blue)' : 'var(--text-muted)' }}
                  >
                    {h.id}
                  </span>
                  <span
                    className="text-[11px] font-black uppercase tracking-tight"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {h.title}
                  </span>
                </div>
                <p className="text-[10px] font-medium leading-snug" style={{ color: 'var(--text-secondary)' }}>
                  {h.desc}
                </p>
                {isSelected && (
                  <p className="text-[9px] font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--blue)' }}>
                    Méthode : {h.method}
                  </p>
                )}
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};

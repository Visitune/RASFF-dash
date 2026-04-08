import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Map, 
  TrendingUp, 
  PieChart, 
  Cpu, 
  Database,
  ArrowRight,
  Info,
  Layers,
  ChevronDown,
  ExternalLink
} from 'lucide-react';

export const GuidePanel: React.FC = () => {
  const sections = [
    {
      id: 'general',
      title: 'Vue d\'Ensemble',
      icon: <Layers className="text-indigo-400" />,
      content: 'Affiche un score de risque composite (0-100) basé sur le volume total des alertes, la sévérité (Serious/Alert) et le delta hebdomadaire. Un score élevé (>70) indique une crise systémique nécessitant une vigilance renforcée.'
    },
    {
      id: 'temporal',
      title: 'Analyse Temporelle',
      icon: <TrendingUp className="text-emerald-400" />,
      content: 'Trace l\'évolution cumulative des alertes. Le moteur détecte automatiquement les "Risques Émergents" (Hazzards avec brusque augmentation de fréquence sur 4 semaines) et les "Deltas Hebdomadaires" (variation nette d\'une semaine sur l\'autre).'
    },
    {
      id: 'geo',
      title: 'Analyse Géographique',
      icon: <Map className="text-rose-400" />,
      content: 'Cartographie choroplèthe interactive. Les pays d\'origine sont colorés selon leur Score de Risque local. Le diagramme de Flux (Chord/Sankey) révèle les chaines de contamination complexes (Origine -> Catégorie -> Danger).'
    },
    {
      id: 'stats',
      title: 'Mathématiques & Pareto',
      icon: <PieChart className="text-amber-400" />,
      content: 'Applique la Loi de Pareto (80/20) pour identifier les sources critiques de danger. La matrice de corrélation (Heatmap) montre la densité de co-occurrence entre les types de produits et les contaminants spécifiques.'
    },
    {
      id: 'ai',
      title: 'Expert IA V2',
      icon: <Cpu className="text-purple-400" />,
      content: 'Injection automatique du contexte analytique (Deltas, Pareto, Géo) dans le LLM. L\'IA fournit des synthèses exécutives et des recommandations d\'actions prioritaires basées sur les signaux faibles détectés par les moteurs.'
    }
  ];

  return (
    <div className="space-y-10 pb-20">
      {/* Hero Section */}
      <div className="glass-panel p-12 text-center bg-gradient-to-br from-indigo-500/10 via-transparent to-rose-500/10">
        <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <BookOpen className="text-indigo-400 w-10 h-10" />
        </div>
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic mb-4">Manuel de l'Analyste Stratégique</h2>
        <p className="text-white/40 max-w-2xl mx-auto uppercase font-bold tracking-[0.2em] text-xs">Comprendre les moteurs d'analyse de la version 2.0</p>
      </div>

      {/* Main Documentation Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((section, idx) => (
          <motion.div 
            key={section.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-8 group hover:border-indigo-500/30 transition-all cursor-default"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 transition-colors">
                {section.icon}
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none">{section.title}</h3>
            </div>
            <p className="text-xs text-white/50 leading-relaxed font-medium mb-6">
              {section.content}
            </p>
            <div className="flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Moteur opérationnel <ArrowRight size={12} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Ingestion & Tools */}
      <div className="glass-panel p-10 mt-12 bg-black/40">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3">
            <div className="flex items-center gap-3 mb-4">
              <Database className="text-white/20" />
              <h3 className="text-sm font-black text-white uppercase tracking-widest">Ingestion des Données</h3>
            </div>
            <p className="text-[11px] text-white/40 leading-relaxed uppercase font-bold italic">
               Les données sont parsées en temps réel à partir de fichiers TSV structurés. Le système supporte jusqu'à 100 000 lignes avec filtrage asynchrone pour préserver les performances (60 FPS).
            </p>
          </div>

          <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl border border-white/5 bg-white/5 flex items-start gap-4">
              <Info className="text-indigo-400 shrink-0" size={18} />
              <div>
                <h4 className="text-xs font-black text-white uppercase mb-2">Précision Tempo-Spatiale</h4>
                <p className="text-[10px] text-white/40 leading-relaxed font-medium">Les dates sont normalisées au format ISO pour garantir l'uniformité des deltas hebdomadaires.</p>
              </div>
            </div>
            <div className="p-6 rounded-2xl border border-white/5 bg-white/5 flex items-start gap-4">
              <ExternalLink className="text-indigo-400 shrink-0" size={18} />
              <div>
                <h4 className="text-xs font-black text-white uppercase mb-2">Sources Officielles</h4>
                <p className="text-[10px] text-white/40 leading-relaxed font-medium">Le dataset utilisé est extrait directement de la plateforme publique de la Commission Européenne.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <div className="flex items-center gap-4 px-6 py-3 rounded-full bg-indigo-500/10 border border-indigo-500/20">
          <div className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Système Opérationnel - RASFF Analytics v2.0.4</span>
        </div>
      </div>
    </div>
  );
};

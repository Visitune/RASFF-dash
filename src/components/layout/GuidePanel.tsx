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
      title: "Vue d'Ensemble",
      icon: <Layers className="guide-icon" />,
      content: 'Affiche un score de risque composite (0-100) basé sur le volume total des alertes, la sévérité (Serious/Alert) et le delta hebdomadaire. Un score élevé (>70) indique une crise systémique nécessitant une vigilance renforcée.'
    },
    {
      id: 'temporal',
      title: 'Analyse Temporelle',
      icon: <TrendingUp className="guide-icon" />,
      content: "Trace l'évolution cumulative des alertes. Le moteur détecte automatiquement les 'Risques Émergents' (Hazards avec brusque augmentation de fréquence sur 4 semaines) et les 'Deltas Hebdomadaires' (variation nette d'une semaine sur l'autre)."
    },
    {
      id: 'geo',
      title: 'Analyse Géographique',
      icon: <Map className="guide-icon" />,
      content: 'Cartographie choroplèthe interactive. Les pays d\'origine sont colorés selon leur Score de Risque local. Le diagramme de Flux (Chord/Sankey) révèle les chaines de contamination complexes (Origine -> Catégorie -> Danger).'
    },
    {
      id: 'stats',
      title: 'Mathématiques & Pareto',
      icon: <PieChart className="guide-icon" />,
      content: "Applique la Loi de Pareto (80/20) pour identifier les sources critiques de danger. La matrice de corrélation (Heatmap) montre la densité de co-occurrence entre les types de produits et les contaminants spécifiques."
    },
    {
      id: 'ai',
      title: 'Expert IA V2',
      icon: <Cpu className="guide-icon" />,
      content: 'Injection automatique du contexte analytique (Deltas, Pareto, Géo) dans le LLM. L\'IA fournit des synthèses exécutives et des recommandations d\'actions prioritaires basées sur les signaux faibles détectés par les moteurs.'
    }
  ];

  return (
    <div className="guide-container">
      {/* Hero Section */}
      <div className="guide-hero">
        <div className="guide-hero-icon">
          <BookOpen className="guide-hero-icon-inner" />
        </div>
        <h2 className="guide-hero-title">Manuel de l'Analyste Stratégique</h2>
        <p className="guide-hero-subtitle">Comprendre les moteurs d'analyse de la version 2.0</p>
      </div>

      {/* Main Documentation Sections */}
      <div className="guide-grid">
        {sections.map((section, idx) => (
          <motion.div 
            key={section.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="guide-card"
          >
            <div className="guide-card-header">
              <div className="guide-card-icon">
                {section.icon}
              </div>
              <h3 className="guide-card-title">{section.title}</h3>
            </div>
            <p className="guide-card-content">
              {section.content}
            </p>
            <div className="guide-card-footer">
              Moteur opérationnel <ArrowRight size={12} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Ingestion & Tools */}
      <div className="guide-info-section">
        <div className="guide-info-left">
          <div className="guide-info-title">
            <Database className="guide-info-icon" />
            <h3>Ingestion des Données</h3>
          </div>
          <p className="guide-info-text">
             Les données sont parsées en temps réel à partir de fichiers TSV structurés. Le système supporte jusqu'à 100 000 lignes avec filtrage asynchrone pour préserver les performances (60 FPS).
          </p>
        </div>

        <div className="guide-info-right">
          <div className="guide-info-box">
            <Info className="guide-info-box-icon" size={18} />
            <div>
              <h4>Précision Tempo-Spatiale</h4>
              <p>Les dates sont normalisées au format ISO pour garantir l'uniformité des deltas hebdomadaires.</p>
            </div>
          </div>
          <div className="guide-info-box">
            <ExternalLink className="guide-info-box-icon" size={18} />
            <div>
              <h4>Sources Officielles</h4>
              <p>Le dataset utilisé est extrait directement de la plateforme publique de la Commission Européenne.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="guide-footer">
        <div className="guide-footer-badge">
          <div className="guide-footer-dot" />
          <span>Système Opérationnel - RASFF Analytics v2.0.4</span>
        </div>
      </div>
    </div>
  );
};

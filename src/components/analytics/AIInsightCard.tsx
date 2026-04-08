import React from 'react';
import { AIInsight } from '../../lib/aiService';
import { motion } from 'motion/react';
import { AlertCircle, TrendingUp, CheckCircle, ShieldAlert, Zap } from 'lucide-react';

interface AIInsightCardProps {
  insight: AIInsight;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({ insight }) => {
  const getStyle = () => {
    switch (insight.severity) {
      case 'high': return 'border-rose-500/50 bg-rose-500/10 text-rose-400';
      case 'medium': return 'border-amber-500/50 bg-amber-500/10 text-amber-400';
      case 'low': return 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400';
      default: return 'border-white/10 bg-white/5 text-white/70';
    }
  };

  const getIcon = () => {
    switch (insight.type) {
      case 'risk': return <ShieldAlert size={20} />;
      case 'trend': return <TrendingUp size={20} />;
      case 'recommendation': return <CheckCircle size={20} />;
      case 'anomaly': return <Zap size={20} />;
      default: return <AlertCircle size={20} />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl border ${getStyle()} flex gap-4 items-start`}
    >
      <div className="shrink-0 mt-1">
        {getIcon()}
      </div>
      <div>
        <h4 className="font-bold mb-1 text-white">{insight.title}</h4>
        <p className="text-sm opacity-90 leading-relaxed">{insight.description}</p>
      </div>
    </motion.div>
  );
};

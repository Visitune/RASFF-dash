import React, { useState, useEffect } from 'react';
import { AIConfig, AIResponse, analyzeWithAI } from '../../lib/aiService';
import { RasffData } from '../../lib/mockData';
import { StatResult } from '../../lib/statistics';
import { GlassPanel } from '../ui/GlassPanel';
import { AIInsightCard } from './AIInsightCard';
import { Bot, Settings, Send, Loader2, Key, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AIPanelProps {
  data: RasffData[];
  stats: StatResult;
}

export const AIPanel: React.FC<AIPanelProps> = ({ data, stats }) => {
  const [config, setConfig] = useState<AIConfig>({
    provider: 'gemini',
    apiKey: localStorage.getItem('ai_api_key') || ''
  });
  
  const [result, setResult] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [chatInput, setChatInput] = useState('');

  // Auto trigger on data change (debounced)
  useEffect(() => {
    if (config.apiKey && data.length > 0) {
      const timer = setTimeout(() => {
        handleAnalyze();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [data, config.apiKey]);

  const handleAnalyze = async (customPrompt?: string) => {
    if (!config.apiKey) return;
    setLoading(true);

    const response = await analyzeWithAI(config, data, customPrompt);
    try {
      if (typeof response === 'string') {
        console.error('Unexpected non-JSON AI response:', response);
        setResult(null);
      } else {
        setResult(response);
      }
      if (customPrompt) setChatInput('');
    } catch (e) {
      console.error('AI analysis failed:', e);
    }

    setLoading(false);
  };

  const saveConfig = (newConfig: AIConfig) => {
    setConfig(newConfig);
    localStorage.setItem('ai_api_key', newConfig.apiKey);
    setShowConfig(false);
  };

  return (
    <GlassPanel className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bot className="text-indigo-400" size={24} />
          <h3 className="text-xl font-bold">Analyse IA Temps Réel</h3>
        </div>
        <div className="flex items-center gap-4">
          {result?.score_alerte_global !== undefined && (
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
              <span className="text-xs text-white/50 uppercase">Score d'Alerte :</span>
              <span className={`font-bold ${result.score_alerte_global > 60 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {result.score_alerte_global}/100
              </span>
            </div>
          )}
          <button 
            onClick={() => setShowConfig(!showConfig)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Settings size={20} className="text-white/60" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showConfig && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white/5 rounded-xl p-4 space-y-3"
          >
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  checked={config.provider === 'gemini'} 
                  onChange={() => saveConfig({...config, provider: 'gemini'})}
                />
                <span className="text-sm">Gemini</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  checked={config.provider === 'groq'} 
                  onChange={() => saveConfig({...config, provider: 'groq'})}
                />
                <span className="text-sm">Groq</span>
              </label>
            </div>
            <div className="relative">
              <Key className="absolute left-3 top-2.5 text-white/30" size={16} />
              <input 
                type="password"
                placeholder="Entrez votre clé API..."
                className="w-full bg-black/20 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm outline-none focus:border-indigo-500"
                value={config.apiKey}
                onChange={(e) => setConfig({...config, apiKey: e.target.value})}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center p-12 bg-black/20 rounded-xl">
            <Loader2 className="animate-spin text-indigo-400" size={32} />
          </div>
        ) : result?.insights ? (
          <div className="space-y-3">
            {result.insights.map((insight, idx) => (
              <AIInsightCard key={idx} insight={insight} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-white/30 bg-black/20 rounded-xl">
            <Bot size={48} className="mx-auto mb-4 opacity-50" />
            <p>Configurer une clé API pour activer l'analyse IA automatique.</p>
          </div>
        )}
      </div>

      <div className="relative mt-4">
        <MessageSquare className="absolute left-3 top-3 text-white/30" size={18} />
        <input 
          type="text"
          placeholder="Poser une question spécifique à l'IA sur ces données..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAnalyze(chatInput)}
          className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-10 pr-12 text-sm outline-none focus:border-indigo-500 transition-colors"
          disabled={loading || !config.apiKey}
        />
        <button 
          onClick={() => handleAnalyze(chatInput)}
          disabled={loading || !config.apiKey || !chatInput}
          className="absolute right-2 top-2 p-1.5 bg-indigo-500 rounded-lg disabled:opacity-50 hover:bg-indigo-400 transition-colors"
        >
          <Send size={16} />
        </button>
      </div>
    </GlassPanel>
  );
};

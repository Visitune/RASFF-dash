import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Zap, 
  ShieldAlert, 
  TrendingUp, 
  Lightbulb, 
  MessageSquare, 
  Loader2, 
  ChevronRight,
  Settings,
  AlertTriangle,
  CheckCircle2,
  Send,
  RotateCcw,
  User
} from 'lucide-react';
import { analyzeWithAI, chatWithAI, AIResponse, AIInsight, AIConfig } from '../../lib/aiService';
import { RasffData } from '../../lib/mockData';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

interface AIAnalysisCenterProps {
  data: RasffData[];
}

export const AIAnalysisCenter: React.FC<AIAnalysisCenterProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AIResponse | null>(null);
  const [config, setConfig] = useState<AIConfig>({
    provider: 'gemini',
    apiKey: localStorage.getItem('rasff_ai_key') || '',
    model: 'gemini-1.5-flash'
  });
  const [showConfig, setShowConfig] = useState(!config.apiKey);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const runFullAnalysis = async () => {
    setLoading(true);
    try {
      const result = await analyzeWithAI(config, data);
      if (typeof result !== 'string') {
        setAnalysis(result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!userInput.trim() || chatLoading || !config.apiKey) return;

    const newMsg: Message = { role: 'user', text: userInput };
    setChatMessages(prev => [...prev, newMsg]);
    setUserInput('');
    setChatLoading(true);

    try {
      const response = await chatWithAI(config, userInput, data);
      setChatMessages(prev => [...prev, { role: 'ai', text: response || 'Pas de réponse.' }]);
    } catch (e) {
      setChatMessages(prev => [...prev, { role: 'ai', text: "Erreur de communication avec l'IA." }]);
    } finally {
      setChatLoading(false);
    }
  };

  const resetChat = () => {
    setChatMessages([]);
  };

  const saveConfig = () => {
    localStorage.setItem('rasff_ai_key', config.apiKey);
    setShowConfig(false);
  };

  const getSeverityColor = (severity: AIInsight['severity']) => {
    switch (severity) {
      case 'high': return 'text-red bg-red/10 border-red/20';
      case 'medium': return 'text-orange bg-orange/10 border-orange/20';
      case 'low': return 'text-green bg-green/10 border-green/20';
    }
  };

  const getIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'risk': return <ShieldAlert className="w-5 h-5" />;
      case 'trend': return <TrendingUp className="w-5 h-5" />;
      case 'recommendation': return <Lightbulb className="w-5 h-5" />;
      case 'anomaly': return <Zap className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header & Controls */}
      <div className="flex items-center justify-between panel p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue/20 flex items-center justify-center border border-blue/30">
            <Bot className="text-blue w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-primary uppercase tracking-tighter italic">AI Strategist V2.1</h2>
            <p className="section-title mb-0">Moteur d'analyse prédictif & contextuel</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowConfig(!showConfig)}
            className="btn-ghost p-3"
            title="Paramètres API"
          >
            <Settings size={20} />
          </button>
          <button 
            onClick={runFullAnalysis}
            disabled={loading || !config.apiKey}
            className="btn-primary flex items-center gap-2 h-12 px-6"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Zap size={18} fill="currentColor" />}
            Lancer l'analyse complète
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showConfig && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="panel p-6 border-blue/30 bg-blue/5">
               <h3 className="section-title mb-4">Configuration des Clés API</h3>
               <div className="flex gap-4">
                 <input 
                   type="password"
                   placeholder="Google Gemini API Key..."
                   className="flex-grow bg-surface-2 border border-border rounded-lg px-4 py-3 text-primary text-sm focus:border-blue outline-none transition-colors"
                   value={config.apiKey}
                   onChange={e => setConfig({ ...config, apiKey: e.target.value })}
                 />
                 <button onClick={saveConfig} className="btn-primary">Sauvegarder</button>
               </div>
               <p className="mt-4 text-[10px] text-muted uppercase italic">Vos clés sont stockées localement sur votre navigateur.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Analysis View */}
          {!analysis && !loading && (
            <div className="panel p-20 flex flex-col items-center justify-center text-center">
               <Bot className="w-20 h-20 text-muted/20 mb-6" />
               <h3 className="section-title">En attente de contexte</h3>
               <p className="text-xs text-muted">Cliquez sur "Lancer l'analyse" pour générer des insights stratégiques.</p>
            </div>
          )}

          {loading && (
            <div className="panel p-20 flex flex-col items-center justify-center text-center">
               <Loader2 className="w-20 h-20 text-blue animate-spin mb-6" />
               <h3 className="text-xl font-bold text-primary uppercase animate-pulse">L'IA déchiffre les données...</h3>
               <p className="text-xs text-muted uppercase mt-2">Corrélation des deltas, Pareto et signaux faibles en cours.</p>
            </div>
          )}

          {analysis && (
            <div className="space-y-8">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="panel p-8 bg-gradient-to-br from-blue/10 to-transparent"
              >
                <h3 className="text-xs font-black text-blue uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                  <CheckCircle2 size={14} /> Synthèse Executive
                </h3>
                <p className="text-xl text-primary font-medium leading-relaxed italic">
                  "{analysis.summary}"
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {analysis.insights.map((insight, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-6 rounded-xl border ${getSeverityColor(insight.severity)} transition-all hover:scale-[1.02] shadow-sm`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {getIcon(insight.type)}
                      <span className="text-[10px] font-black uppercase tracking-widest">{insight.type}</span>
                      <span className="ml-auto badge badge-gray">{insight.severity}</span>
                    </div>
                    <h4 className="text-lg font-black text-primary mb-2 leading-tight uppercase tracking-tighter">{insight.title}</h4>
                    <p className="text-xs text-secondary leading-relaxed font-medium">{insight.description}</p>
                  </motion.div>
                ))}
              </div>

              <div className="panel p-6">
                <h3 className="section-title mb-6 flex items-center gap-2">
                  <ChevronRight className="text-blue" /> Actions Recommandées
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {analysis.nextSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-lg bg-surface-2 border border-border group hover:border-blue/30 transition-all">
                      <span className="w-8 h-8 shrink-0 rounded-lg bg-blue/10 text-blue flex items-center justify-center text-xs font-black">
                        {idx + 1}
                      </span>
                      <p className="text-xs text-secondary font-bold group-hover:text-primary transition-colors">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI Chat Bot Section */}
        <div className="lg:col-span-1 flex flex-col h-[700px]">
          <div className="panel flex-grow flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="text-blue w-5 h-5" />
                <h3 className="text-sm font-black uppercase tracking-wider">Expert Chat V2.1</h3>
              </div>
              <button 
                onClick={resetChat}
                className="btn-ghost p-2 rounded-lg"
                title="Réinitialiser la discussion"
              >
                <RotateCcw size={16} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {chatMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-30 select-none">
                  <Bot size={40} className="mb-4" />
                  <p className="text-xs font-bold uppercase tracking-widest">Posez une question sur<br/>les données actuelles</p>
                </div>
              ) : (
                chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-xs font-medium leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-blue text-white rounded-tr-none' 
                        : 'bg-surface-3 text-primary border border-border rounded-tl-none'
                    }`}>
                      <div className="flex items-center gap-2 mb-1 opacity-60">
                        {msg.role === 'user' ? <User size={10} /> : <Bot size={10} />}
                        <span className="uppercase text-[9px] font-black">{msg.role === 'user' ? 'Vous' : 'Strategist'}</span>
                      </div>
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-surface-3 border border-border p-3 rounded-2xl rounded-tl-none">
                    <Loader2 className="w-4 h-4 text-blue animate-spin" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="p-4 border-t border-border bg-surface-2">
              <div className="relative">
                <input 
                  type="text"
                  placeholder="Posez votre question stratégique..."
                  className="w-full bg-surface-1 border border-border rounded-xl pl-4 pr-12 py-3 text-primary text-xs outline-none focus:border-blue transition-all"
                  value={userInput}
                  onChange={e => setUserInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!userInput.trim() || chatLoading || !config.apiKey}
                  className="absolute right-2 top-1.5 p-2 bg-blue text-white rounded-lg hover:bg-blue-hover disabled:opacity-30 transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="mt-2 text-[9px] text-muted uppercase text-center font-bold">L'IA hérite du contexte métier filtré au-dessus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

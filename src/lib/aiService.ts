import { GoogleGenerativeAI } from "@google/generative-ai";
import { RasffData } from "./mockData";
import { getLatestWeekStats, detectEmergingHazards } from "./temporalEngine";
import { getCountryStats } from "./geoEngine";
import { paretoAnalysis } from "./advancedStats";

export interface AIConfig {
  provider: 'gemini' | 'groq';
  apiKey: string;
  model?: string;
}

export interface AIInsight {
  type: 'risk' | 'trend' | 'recommendation' | 'anomaly';
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface AIResponse {
  summary: string;
  insights: AIInsight[];
  nextSteps: string[];
  score_alerte_global?: number;
}

const buildEnrichedContext = (data: RasffData[]) => {
  const latest = getLatestWeekStats(data);
  const topCountries = getCountryStats(data).slice(0, 5);
  const topHazards = paretoAnalysis(data, 'hazard').slice(0, 5);
  const emerging = detectEmergingHazards(data).slice(-3);

  return `
    CONTEXTE RASFF :
    - Alertes totales : ${data.length}
    - Dernière semaine : +${latest.delta} (${latest.trend.toFixed(1)}% vs S-1)
    - Pays critiques : ${topCountries.map(c => `${c.name} (${c.riskScore}/100)`).join(', ')}
    - Dangers dominants : ${topHazards.map(h => h.name).join(', ')}
    - Nouveaux dangers : ${emerging.map(e => e.hazard).join(', ')}
  `;
};

export const analyzeWithAI = async (config: AIConfig, data: RasffData[], promptOverride?: string): Promise<AIResponse | string> => {
  if (!config.apiKey) return "Veuillez configurer votre clé API.";

  const context = buildEnrichedContext(data);
  const prompt = promptOverride || `Analyse stratégique RASFF. 
    Format JSON attendu :
    {
      "summary": "Résumé court",
      "insights": [{ "type": "risk", "title": "...", "description": "...", "severity": "high" }],
      "nextSteps": ["Action"]
    }
    Contexte : ${context}`;

  try {
    const genAI = new GoogleGenerativeAI(config.apiKey);
    const model = genAI.getGenerativeModel({ model: config.model || "gemini-1.5-flash" });
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return text;
    
    return JSON.parse(jsonMatch[0]) as AIResponse;
  } catch (error) {
    console.error("AI Error:", error);
    return "Erreur d'analyse IA.";
  }
};

export const chatWithAI = async (config: AIConfig, message: string, data: RasffData[]) => {
  if (!config.apiKey) return "Veuillez configurer votre clé API.";

  const context = buildEnrichedContext(data);
  const prompt = `Tu es un expert RASFF. Contexte : ${context}\nQuestion : ${message}`;

  try {
    const genAI = new GoogleGenerativeAI(config.apiKey);
    const model = genAI.getGenerativeModel({ model: config.model || "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    return "Erreur du chat IA.";
  }
};

import React, { useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { RasffData } from '../../lib/mockData';
import { Target } from 'lucide-react';

interface CountryRadarChartProps {
  data: RasffData[];
  selectedCountry?: string;
}

export const CountryRadarChart: React.FC<CountryRadarChartProps> = ({ data, selectedCountry }) => {
  const radarData = useMemo(() => {
    if (data.length === 0) return [];

    // Si pas de pays sélectionné, on prend le top 1 pays d'origine
    let targetCountry = selectedCountry;
    if (!targetCountry) {
      const counts: Record<string, number> = {};
      data.forEach(d => { counts[d.origin] = (counts[d.origin] || 0) + 1; });
      targetCountry = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
    }

    if (!targetCountry) return [];

    const countryData = data.filter(d => d.origin === targetCountry);
    const totalData = data;

    // Métriques calculées de 0 à 100
    
    // 1. Volume (Relatif au pays max)
    const allCounts: Record<string, number> = {};
    totalData.forEach(d => { allCounts[d.origin] = (allCounts[d.origin] || 0) + 1; });
    const maxVol = Math.max(...Object.values(allCounts));
    const volume = (countryData.length / maxVol) * 100;

    // 2. Sévérité (% de Serious)
    const serious = countryData.filter(d => d.risk_level === 'Serious').length;
    const severity = (serious / countryData.length) * 100;

    // 3. Diversité (Nombre de dangers distincts / Catégories distinctes)
    const hazards = new Set(countryData.map(d => d.hazard)).size;
    const diversity = Math.min(100, (hazards / 5) * 100); // 5+ dangers = 100%

    // 4. Constance (Nombre de pays notifiants distincts)
    const notifiers = new Set(countryData.map(d => d.notifying_country)).size;
    const consistency = Math.min(100, (notifiers / 10) * 100); // Notifié par 10+ pays = 100%

    // 5. Criticité Produit (Moyenne des niveaux de risque)
    const criticalScore = countryData.reduce((acc, d) => {
      return acc + (d.risk_level === 'Serious' ? 3 : d.risk_level === 'Medium' ? 2 : 1);
    }, 0) / countryData.length;
    const impact = (criticalScore / 3) * 100;

    return [
      { subject: 'Volume', A: volume, fullMark: 100 },
      { subject: 'Sévérité', A: severity, fullMark: 100 },
      { subject: 'Diversité', A: diversity, fullMark: 100 },
      { subject: 'Rayonnement', A: consistency, fullMark: 100 },
      { subject: 'Impact', A: impact, fullMark: 100 },
    ];
  }, [data, selectedCountry]);

  const countryName = useMemo(() => {
    if (selectedCountry) return selectedCountry;
    const counts: Record<string, number> = {};
    data.forEach(d => { counts[d.origin] = (counts[d.origin] || 0) + 1; });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Inconnu';
  }, [data, selectedCountry]);

  return (
    <div className="panel p-6">
      <h3 className="section-title mb-1 flex items-center gap-2">
        <Target size={14} style={{ color: 'var(--red)' }} /> Profil de Risque : {countryName}
      </h3>
      <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 20 }}>
        Analyse comparative sur 5 axes. Un profil large indique une source de risque systémique, 
        tandis qu'un profil piqué indique un risque localisé ou spécifique.
      </p>
      
      <div style={{ height: 300, width: '100%', position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid stroke="var(--border)" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: 'var(--text-secondary)', fontSize: 10, fontWeight: 600 }} 
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 100]} 
              tick={false} 
              axisLine={false} 
            />
            <Radar
              name={countryName}
              dataKey="A"
              stroke="var(--red)"
              fill="var(--red)"
              fillOpacity={0.3}
            />
            <Tooltip 
              contentStyle={{ 
                background: 'var(--surface-3)', 
                border: '1px solid var(--border-strong)',
                borderRadius: '8px',
                fontSize: 12
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <div className="flex items-center gap-1 text-[9px] text-muted">
           <span className="w-2 h-2 rounded-full bg-red/30 border border-red" /> Risque Estimé
        </div>
      </div>
    </div>
  );
};

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useMemo, useEffect, useCallback } from 'react';
import { RasffData } from './lib/mockData';
import { fetchAlerts, mapAlertsToRasff } from './lib/csvParser';
import { filterData, FilterOptions, exportToCSV } from './lib/dataEngine';
import { calculateStats } from './lib/statistics';
import { FilterBar } from './components/analytics/FilterBar';
import { StatsSummary } from './components/analytics/StatsSummary';
import { TrendChart } from './components/analytics/TrendChart';
import { CorrelationMatrix } from './components/analytics/CorrelationMatrix';
import { AIAnalysisCenter } from './components/ai/AIAnalysisCenter';
import { DistributionCharts } from './components/analytics/DistributionCharts';
import { NotificationsTable } from './components/analytics/NotificationsTable';
import { RiskHeatmap } from './components/analytics/RiskHeatmap';
import { AnomalyDetector } from './components/analytics/AnomalyDetector';
import { SeasonalChart } from './components/analytics/SeasonalChart';
import { HypothesisPanel, HypothesisType } from './components/predictive/HypothesisPanel';
import { HypothesisResult } from './components/predictive/HypothesisResult';
import { ForecastChart } from './components/predictive/ForecastChart';
import { testH1, testH2, testH3, testH4, testH5, testH6, testH8 } from './lib/hypothesisEngine';
import { PropagationGraph } from './components/predictive/PropagationGraph';
import { RiskBubbleChart } from './components/predictive/RiskBubbleChart';
import { computePropagation } from './lib/propagationEngine';
import { GuidePanel } from './components/layout/GuidePanel';
import { PageLayout } from './components/layout/PageLayout';
import { PageSection } from './components/navigation/NavMenu';
import { motion } from 'motion/react';
import { Zap, Download, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';
import { getLatestWeekStats } from './lib/temporalEngine';
import { GlobalScoreCard } from './components/overview/GlobalScoreCard';
import { WeeklyDeltaBadge } from './components/overview/WeeklyDeltaBadge';
import { TemporalSummary } from './components/temporal/TemporalSummary';
import { WeeklyDeltaChart } from './components/temporal/WeeklyDeltaChart';
import { EmergenceTimeline } from './components/temporal/EmergenceTimeline';
import { MovingAverageChart, DayOfWeekChart, MonthlyChart, YearQuarterChart } from './components/temporal/TemporalCharts';
import { ParetoChart } from './components/stats/ParetoChart';
import { CountryRankingTable } from './components/stats/CountryRankingTable';
import { WorldMap } from './components/geo/WorldMap';
import { CountryDetailPanel } from './components/geo/CountryDetailPanel';
import { CountryStats } from './lib/geoEngine';
import { CountryEvolutionChart } from './components/geo/CountryEvolutionChart';
import { SankeyDiagram } from './components/geo/SankeyDiagram';
import { ZoomableCirclePacking } from './components/geo/ZoomableCirclePacking';
import { CountryRadarChart } from './components/geo/CountryRadarChart';
import { ChordDiagram } from './components/geo/ChordDiagram';
import { TreemapChart } from './components/stats/TreemapChart';
import { BumpChart } from './components/temporal/BumpChart';
import { SectionIntro } from './components/layout/SectionIntro';
import { LayoutDashboard, Clock, Map, TrendingUp, FlaskConical } from 'lucide-react';
import { AnimatePresence } from 'motion/react';

// ─── Data loading ─────────────────────────────────────────────────────────────

type LoadState = 'idle' | 'loading' | 'error' | 'done';

function LoadingScreen() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      height: '100vh', gap: 16,
      background: 'var(--bg)', color: 'var(--text-secondary)',
    }}>
      <Loader2 size={32} style={{ color: 'var(--blue)', animation: 'spin 1s linear infinite' }} />
      <p style={{ margin: 0, fontSize: 14 }}>Chargement des alertes RASFF…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}

function ErrorScreen({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      height: '100vh', gap: 16,
      background: 'var(--bg)',
    }}>
      <AlertCircle size={32} style={{ color: 'var(--red)' }} />
      <p style={{ margin: 0, fontSize: 14, color: 'var(--text-secondary)' }}>
        Erreur de chargement : {message}
      </p>
      <button className="btn-primary" onClick={onRetry}>Réessayer</button>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

function App() {
  const [activeSection, setActiveSection]       = useState<PageSection>('overview');
  const [filters, setFilters]                   = useState<FilterOptions>({});
  const [selectedCountry, setSelectedCountry]   = useState<CountryStats | null>(null);
  const [selectedHypothesis, setSelectedHypothesis] = useState<HypothesisType>('H1');

  const [loadState, setLoadState]   = useState<LoadState>('idle');
  const [errorMsg, setErrorMsg]     = useState('');
  const [rasffData, setRasffData]   = useState<RasffData[]>([]);

  const load = useCallback(async (force = false) => {
    setLoadState('loading');
    setErrorMsg('');
    try {
      const alerts = await fetchAlerts(force);
      setRasffData(mapAlertsToRasff(alerts));
      setLoadState('done');
    } catch (e: any) {
      setErrorMsg(e?.message ?? 'Erreur inconnue');
      setLoadState('error');
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  // ── Derived data ────────────────────────────────────────────────────────────
  const filteredData = useMemo(() => filterData(rasffData, filters), [rasffData, filters]);
  const stats        = useMemo(() => calculateStats(filteredData), [filteredData]);
  const categories            = useMemo(() => Array.from(new Set(rasffData.map(d => d.category))).sort(), [rasffData]);
  const origins               = useMemo(() => Array.from(new Set(rasffData.map(d => d.origin))).sort(), [rasffData]);
  const notifyingCountries    = useMemo(() => Array.from(new Set(rasffData.map(d => d.notifying_country).filter(Boolean))).sort(), [rasffData]);

  const currentResult = useMemo(() => {
    switch (selectedHypothesis) {
      case 'H1': return testH1(filteredData);
      case 'H2': return testH2(filteredData);
      case 'H3': return testH3(filteredData);
      case 'H4': return testH4(filteredData);
      case 'H5': return testH5(filteredData);
      case 'H6': return testH6(filteredData);
      case 'H8': return testH8(filteredData);
      default:   return testH1(filteredData);
    }
  }, [selectedHypothesis, filteredData]);
  
  const propagationLinks = useMemo(() => computePropagation(filteredData), [filteredData]);

  // ── Loading / error guards (after all hooks) ────────────────────────────────
  if (loadState === 'idle' || loadState === 'loading') return <LoadingScreen />;
  if (loadState === 'error') return <ErrorScreen message={errorMsg} onRetry={() => load(true)} />;

  // ── Header extras ────────────────────────────────────────────────────────────
  const headerContent = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
        {rasffData.length.toLocaleString('fr-FR')} alertes
      </span>
      <button
        className="btn-ghost"
        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, padding: '5px 10px' }}
        onClick={() => load(true)}
        title="Forcer le rechargement"
      >
        <RefreshCw size={13} /> Actualiser
      </button>
      <button
        className="btn-ghost"
        style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, padding: '5px 10px' }}
        onClick={() => exportToCSV(filteredData, `rasff_${new Date().toISOString().split('T')[0]}`)}
      >
        <Download size={13} /> Export CSV
      </button>
    </div>
  );

  // ── Section renderers ────────────────────────────────────────────────────────

  const renderOverview = () => {
    const latestStats = getLatestWeekStats(filteredData);
    return (
      <div className="space-y-6">
        <SectionIntro 
          title="Vue d'Ensemble Exécutive" 
          icon={<LayoutDashboard size={20} />}
          description="Indicateurs clés et flux temps-réel. Un aperçu rapide de l'état du système d'alerte alimentaire européen."
          tips={[
            "Le Global Risk Score combine volume et sévérité pour une évaluation instantanée.",
            "Le Weekly Delta compare l'activité de la semaine en cours à la précédente.",
            "Le flux 'Dernières notifications' permet un suivi opérationnel immédiat."
          ]}
        />
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
          <FilterBar options={filters} setOptions={setFilters} availableCategories={categories} availableOrigins={origins} availableNotifyingCountries={notifyingCountries} />
          <WeeklyDeltaBadge latestStats={latestStats} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 items-start">
          <GlobalScoreCard data={filteredData} recentDelta={latestStats.delta} />
          {(() => {
            // Generate trend data for sparklines (last 30 days)
            const days = 30;
            const now = new Date();
            const trends: Record<string, {val: number}[]> = {
              count: [],
              mean: [],
              stdDev: []
            };

            for (let i = days; i >= 0; i--) {
              const d = new Date();
              d.setDate(now.getDate() - i);
              const dateStr = d.toISOString().split('T')[0];
              
              const dayData = filteredData.filter(item => item.date === dateStr);
              trends.count.push({ val: dayData.length });
            }

            return <StatsSummary stats={stats} trends={trends} />;
          })()}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start">
          <div className="lg:col-span-2"><TrendChart data={filteredData} title="Évolution des alertes" /></div>

          <div className="panel p-4">
            <p className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={13} style={{ color: 'var(--red)' }} /> Dernières notifications
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {filteredData.slice(0, 5).map((item) => (
                <div key={item.id} style={{
                  padding: '10px 12px',
                  background: 'var(--surface-2)',
                  borderRadius: 6,
                  borderLeft: `3px solid ${item.risk_level === 'Serious' ? 'var(--red)' : item.risk_level === 'Medium' ? 'var(--yellow)' : 'var(--green)'}`,
                  transition: 'transform 0.2s',
                  cursor: 'default'
                }} className="hover:translate-x-1">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                      {item.product}
                    </p>
                    <span style={{ fontSize: 10 }}>{item.risk_level === 'Serious' ? '🔴' : item.risk_level === 'Medium' ? '🟡' : '🟢'}</span>
                  </div>
                  <p style={{ margin: '0 0 2px', fontSize: 11, color: 'var(--text-secondary)', lineHeight: '1.3' }}>
                    {item.hazard.substring(0, 60)}{item.hazard.length > 60 ? '...' : ''}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 6 }}>
                    <span className="badge badge-gray" style={{ fontSize: 9 }}>📦 {item.category}</span>
                    <span className="badge badge-gray" style={{ fontSize: 9 }}>🌍 {item.origin}</span>
                    <span className={`badge ${item.risk_level === 'Serious' ? 'badge-red' : item.risk_level === 'Medium' ? 'badge-yellow' : 'badge-green'}`} style={{ fontSize: 9 }}>
                      {item.risk_level}
                    </span>
                  </div>
                  <p style={{ margin: '4px 0 0', fontSize: 9, color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    #{item.id} · {item.status}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <NotificationsTable data={filteredData} />
      </div>
    );
  };

  const renderTemporal = () => (
    <div className="space-y-6">
      <SectionIntro 
        title="Analyse Chronologique" 
        icon={<Clock size={20} />}
        color="var(--blue)"
        description="Identifiez les tendances de fond, la saisonnalité, et les signaux émergents qui pourraient indiquer une crise naissante."
        tips={[
          "La moyenne mobile 7j lisse le bruit quotidien pour révéler les vraies tendances.",
          "Le graphique mensuel détecte la saisonnalité (ex: hausse été = risques microbiens).",
          "Les dangers émergents indiquent des risques détectés pour la première fois récemment."
        ]}
      />
      <FilterBar options={filters} setOptions={setFilters} availableCategories={categories} availableOrigins={origins} availableNotifyingCountries={notifyingCountries} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
        <TemporalSummary data={filteredData} />
        <div className="panel p-6">
          <h3 className="section-title mb-1">Moyenne Mobile (7 jours)</h3>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>
            Lissage du bruit pour identifier les tendances longues
          </p>
          <MovingAverageChart data={filteredData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
        <BumpChart data={filteredData} />
        <div className="panel p-6">
          <h3 className="section-title mb-1">Jour de la Semaine</h3>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>
            Distribution des alertes par jour - identifie les pics récurrents
          </p>
          <DayOfWeekChart data={filteredData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
        <div className="panel p-6">
          <h3 className="section-title mb-1">Mois de l'Année</h3>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>
            Saisonnalité : détection des périodes haute/basse
          </p>
          <MonthlyChart data={filteredData} />
        </div>
        <div className="panel p-6">
          <h3 className="section-title mb-1">Année / Trimestre</h3>
          <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 16 }}>
            Vue macro: évolution annuelle avec trend
          </p>
          <YearQuarterChart data={filteredData} />
        </div>
      </div>

      <EmergenceTimeline data={filteredData} />
    </div>
  );

  const renderGeo = () => (
    <div className="space-y-6">
      <SectionIntro 
        title="Cartographie des Flux" 
        icon={<Map size={20} />}
        color="var(--green)"
        description="Visualisez l'origine géographique des risques et les échanges entre pays membres du réseau RASFF."
        tips={[
          "La carte choroplèthe montre l'intensité du risque par pays d'origine.",
          "Le Chord Diagram (cercle) montre les liens privilégiés entre pays sources et notifiants.",
          "Cliquez sur un pays pour accéder à son profil de risque détaillé (drill-down)."
        ]}
      />
      <FilterBar options={filters} setOptions={setFilters} availableCategories={categories} availableOrigins={origins} availableNotifyingCountries={notifyingCountries} />
      <WorldMap data={filteredData} onCountryClick={setSelectedCountry} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
        <CountryRadarChart data={filteredData} selectedCountry={selectedCountry?.name} />
        <ChordDiagram data={filteredData} />
      </div>

      <ZoomableCirclePacking data={filteredData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
        <CountryEvolutionChart data={filteredData} />
        <SankeyDiagram data={filteredData} />
      </div>
      <AnimatePresence>
        {selectedCountry && (
          <CountryDetailPanel stats={selectedCountry} onClose={() => setSelectedCountry(null)} />
        )}
      </AnimatePresence>
    </div>
  );

  const renderStatistical = () => (
    <div className="space-y-6">
      <SectionIntro 
        title="Analyse Structurelle & Statistique" 
        icon={<TrendingUp size={20} />}
        color="var(--purple)"
        description="Comprenez la distribution des risques, détectez les anomalies statistiques et identifiez les combinaisons critiques."
        tips={[
          "Les graphiques de Pareto aident à appliquer la règle des 80/20 (priorisation).",
          "L'Anomaly Detector identifie les jours atypiques (pics de volume inexpliqués).",
          "La Heatmap croise les pays et les catégories pour isoler les points de friction majeurs."
        ]}
      />
      <FilterBar options={filters} setOptions={setFilters} availableCategories={categories} availableOrigins={origins} availableNotifyingCountries={notifyingCountries} />
      
      <TreemapChart data={filteredData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
        <DistributionCharts data={filteredData} />
        <SeasonalChart data={filteredData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
        <AnomalyDetector data={filteredData} stats={stats} />
        <RiskHeatmap data={filteredData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
        <CorrelationMatrix data={filteredData} />
        <div className="panel p-6">
          <h3 className="section-title mb-3">Analyse Factorielle des Risques</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ padding: 16, background: 'var(--surface-2)', borderRadius: 4, borderLeft: '3px solid var(--green)' }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>Indice de Concentration</p>
              <p style={{ fontSize: 10, color: 'var(--text-secondary)', margin: 0 }}>Part des alertes concentrées sur le top 20% des pays d'origine</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--green)', margin: '8px 0 0' }}>
                {(() => {
                  const counts = filteredData.reduce((acc, d) => {
                    acc[d.origin] = (acc[d.origin] || 0) + 1;
                    return acc;
                  }, {} as Record<string, number>);
                  const sortedCounts = Object.values(counts).sort((a, b) => b - a);
                  const topN = Math.max(1, Math.ceil(sortedCounts.length * 0.2));
                  const topSum = sortedCounts.slice(0, topN).reduce((a, b) => a + b, 0);
                  const total = filteredData.length || 1;
                  return ((topSum / total) * 100).toFixed(1);
                })()}%
              </p>
            </div>
            <div style={{ padding: 16, background: 'var(--surface-2)', borderRadius: 4, borderLeft: '3px solid var(--orange)' }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>Score de Sévérité Moyenne</p>
              <p style={{ fontSize: 10, color: 'var(--text-secondary)', margin: 0 }}>Proportion d'alertes graves vs totales</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--orange)', margin: '8px 0 0' }}>{(filteredData.filter(d => d.risk_level === 'Serious').length / Math.max(1, filteredData.length) * 100).toFixed(1)}%</p>
            </div>
            <div style={{ padding: 16, background: 'var(--surface-2)', borderRadius: 4, borderLeft: '3px solid var(--blue)' }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>Diversité des Dangers</p>
              <p style={{ fontSize: 10, color: 'var(--text-secondary)', margin: 0 }}>Nombre de catégories de dangers différents</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--blue)', margin: '8px 0 0' }}>{new Set(filteredData.map(d => d.hazard)).size}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
        <ParetoChart data={filteredData} dimension="origin" title="Pareto des Origines (80/20)" />
        <ParetoChart data={filteredData} dimension="hazard" title="Pareto des Dangers (80/20)" />
      </div>



      <CountryRankingTable data={filteredData} />
    </div>
  );

  const renderPredictive = () => (
    <div className="space-y-6">
      <SectionIntro 
        title="Intelligence Prédictive" 
        icon={<FlaskConical size={20} />}
        color="var(--orange)"
        description="Testez des hypothèses statistiques sur les données. Chaque modèle applique une méthode mathématique rigoureuse pour valider un signal."
        tips={[
          "Sélectionnez une hypothèse à gauche pour lancer l'analyse correspondante.",
          "Le score de confiance indique la robustesse statistique du résultat.",
          "H6 et H8 utilisent des modèles avancés de propagation et de scoring multidimensionnel."
        ]}
      />
      <FilterBar options={filters} setOptions={setFilters} availableCategories={categories} availableOrigins={origins} availableNotifyingCountries={notifyingCountries} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
        <HypothesisPanel selectedH={selectedHypothesis} onSelect={setSelectedHypothesis} />
        <div className="space-y-6">
          <HypothesisResult result={currentResult} />
          {selectedHypothesis === 'H5' && <ForecastChart data={filteredData} />}
          {selectedHypothesis === 'H6' && <PropagationGraph links={propagationLinks} />}
          {selectedHypothesis === 'H8' && <RiskBubbleChart data={filteredData} />}
        </div>
      </div>
    </div>
  );

  const renderAI = () => <AIAnalysisCenter data={filteredData} />;

  const renderGuide = () => <GuidePanel />;

  // ── Layout ───────────────────────────────────────────────────────────────────
  return (
    <PageLayout
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      extraHeaderContent={headerContent}
    >
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeSection === 'overview'    && renderOverview()}
        {activeSection === 'temporal'    && renderTemporal()}
        {activeSection === 'geo'         && renderGeo()}
        {activeSection === 'statistical' && renderStatistical()}
        {activeSection === 'predictive'  && renderPredictive()}
        {activeSection === 'ai'          && renderAI()}
        {activeSection === 'guide'       && renderGuide()}
      </motion.div>
    </PageLayout>
  );
}

export default App;

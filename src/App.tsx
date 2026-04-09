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
import { testH1, testH2, testH3, testH4, testH5 } from './lib/hypothesisEngine';
import { GuidePanel } from './components/layout/GuidePanel';
import { PageLayout } from './components/layout/PageLayout';
import { PageSection } from './components/navigation/NavMenu';
import { motion } from 'motion/react';
import { Zap, Download, RefreshCw, AlertCircle, Loader2 } from 'lucide-react';
import { getLatestWeekStats } from './lib/temporalEngine';
import { GlobalScoreCard } from './components/overview/GlobalScoreCard';
import { WeeklyDeltaBadge } from './components/overview/WeeklyDeltaBadge';
import { CumulativeChart } from './components/temporal/CumulativeChart';
import { WeeklyDeltaChart } from './components/temporal/WeeklyDeltaChart';
import { EmergenceTimeline } from './components/temporal/EmergenceTimeline';
import { ParetoChart } from './components/stats/ParetoChart';
import { CountryRankingTable } from './components/stats/CountryRankingTable';
import { WorldMap } from './components/geo/WorldMap';
import { CountryDetailPanel } from './components/geo/CountryDetailPanel';
import { CountryStats } from './lib/geoEngine';
import { CountryEvolutionChart } from './components/geo/CountryEvolutionChart';
import { SankeyDiagram } from './components/geo/SankeyDiagram';
import { ChordDiagram } from './components/geo/ChordDiagram';
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

  // ── All hooks must be called before any conditional return ─────────────────
  const currentResult = useMemo(() => {
    switch (selectedHypothesis) {
      case 'H1': return testH1(filteredData);
      case 'H2': return testH2(filteredData);
      case 'H3': return testH3(filteredData);
      case 'H4': return testH4(filteredData);
      case 'H5': return testH5(filteredData);
      default:   return testH1(filteredData);
    }
  }, [selectedHypothesis, filteredData]);

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
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
          <FilterBar options={filters} setOptions={setFilters} availableCategories={categories} availableOrigins={origins} availableNotifyingCountries={notifyingCountries} />
          <WeeklyDeltaBadge latestStats={latestStats} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 12 }}>
          <GlobalScoreCard data={filteredData} recentDelta={latestStats.delta} />
          <StatsSummary stats={stats} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
          <TrendChart data={filteredData} title="Évolution des alertes" />

          <div className="panel p-4">
            <p className="section-title" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Zap size={13} style={{ color: 'var(--red)' }} /> Dernières notifications
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {filteredData.slice(0, 5).map((item) => (
                <div key={item.id} style={{
                  padding: '10px 12px',
                  background: 'var(--surface-2)',
                  borderLeft: `3px solid ${item.risk_level === 'Serious' ? 'var(--red)' : item.risk_level === 'Medium' ? 'var(--yellow)' : 'var(--green)'}`,
                }}>
                  <p style={{ margin: '0 0 4px', fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.product}
                  </p>
                  <p style={{ margin: '0 0 2px', fontSize: 11, color: 'var(--text-secondary)' }}>
                    {item.hazard.substring(0, 60)}
                  </p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                    <span className="badge badge-gray">{item.origin}</span>
                    <span className="badge badge-gray">{item.notifying_country}</span>
                    <span className={`badge ${item.risk_level === 'Serious' ? 'badge-red' : item.risk_level === 'Medium' ? 'badge-yellow' : 'badge-green'}`}>
                      {item.risk_level}
                    </span>
                  </div>
                  <p style={{ margin: '4px 0 0', fontSize: 10, color: 'var(--text-muted)' }}>
                    Réf: {item.id} · {item.status}
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
      <FilterBar options={filters} setOptions={setFilters} availableCategories={categories} availableOrigins={origins} availableNotifyingCountries={notifyingCountries} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <CumulativeChart data={filteredData} />
        <WeeklyDeltaChart data={filteredData} />
      </div>
      <EmergenceTimeline data={filteredData} />
    </div>
  );

  const renderGeo = () => (
    <div className="space-y-6">
      <FilterBar options={filters} setOptions={setFilters} availableCategories={categories} availableOrigins={origins} availableNotifyingCountries={notifyingCountries} />
      <WorldMap data={filteredData} onCountryClick={setSelectedCountry} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <CountryEvolutionChart data={filteredData} />
        <ChordDiagram data={filteredData} />
      </div>
      <SankeyDiagram data={filteredData} />
      <AnimatePresence>
        {selectedCountry && (
          <CountryDetailPanel stats={selectedCountry} onClose={() => setSelectedCountry(null)} />
        )}
      </AnimatePresence>
    </div>
  );

  const renderStatistical = () => (
    <div className="space-y-6">
      <FilterBar options={filters} setOptions={setFilters} availableCategories={categories} availableOrigins={origins} availableNotifyingCountries={notifyingCountries} />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <DistributionCharts data={filteredData} />
        <SeasonalChart data={filteredData} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <AnomalyDetector data={filteredData} stats={stats} />
        <RiskHeatmap data={filteredData} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
        <CorrelationMatrix data={filteredData} />
        <div className="panel p-6">
          <h3 className="section-title mb-3">Analyse Factorielle des Risques</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ padding: 16, background: 'var(--surface-2)', borderRadius: 4, borderLeft: '3px solid var(--green)' }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 4px' }}>Indice de Concentration</p>
              <p style={{ fontSize: 10, color: 'var(--text-secondary)', margin: 0 }}>Ratio entre les 20% de pays origines responsables de 80% des alertes</p>
              <p style={{ fontSize: 20, fontWeight: 700, color: 'var(--green)', margin: '8px 0 0' }}>78.3%</p>
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <ParetoChart data={filteredData} dimension="origin" title="Pareto des Origines (80/20)" />
        <ParetoChart data={filteredData} dimension="hazard" title="Pareto des Dangers (80/20)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <div className="panel p-5">
          <h3 className="section-title mb-3">Top 5 Pays d'Origine</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Array.from(new Set(filteredData.map(d => d.origin))).slice(0, 5).map((origin, i) => {
              const count = filteredData.filter(d => d.origin === origin).length;
              const pct = (count / filteredData.length * 100).toFixed(1);
              return (
                <div key={origin} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', width: 16 }}>{i + 1}</span>
                  <span style={{ flex: 1, fontSize: 11, fontWeight: 500, color: 'var(--text-primary)' }}>{origin}</span>
                  <span style={{ fontSize: 10, color: 'var(--blue)' }}>{count} ({pct}%)</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="panel p-5">
          <h3 className="section-title mb-3">Top 5 Dangers</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Array.from(new Set(filteredData.map(d => d.hazard))).slice(0, 5).map((hazard, i) => {
              const count = filteredData.filter(d => d.hazard === hazard).length;
              const pct = (count / filteredData.length * 100).toFixed(1);
              return (
                <div key={hazard} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', width: 16 }}>{i + 1}</span>
                  <span style={{ flex: 1, fontSize: 11, fontWeight: 500, color: 'var(--text-primary)' }}>{hazard.length > 25 ? hazard.slice(0, 23) + '...' : hazard}</span>
                  <span style={{ fontSize: 10, color: 'var(--orange)' }}>{count} ({pct}%)</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="panel p-5">
          <h3 className="section-title mb-3">Top 5 Catégories</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Array.from(new Set(filteredData.map(d => d.category))).slice(0, 5).map((cat, i) => {
              const count = filteredData.filter(d => d.category === cat).length;
              const pct = (count / filteredData.length * 100).toFixed(1);
              return (
                <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-muted)', width: 16 }}>{i + 1}</span>
                  <span style={{ flex: 1, fontSize: 11, fontWeight: 500, color: 'var(--text-primary)' }}>{cat.length > 25 ? cat.slice(0, 23) + '...' : cat}</span>
                  <span style={{ fontSize: 10, color: 'var(--purple)' }}>{count} ({pct}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <CountryRankingTable data={filteredData} />
    </div>
  );

  const renderPredictive = () => (
    <div className="space-y-6">
      <FilterBar options={filters} setOptions={setFilters} availableCategories={categories} availableOrigins={origins} availableNotifyingCountries={notifyingCountries} />
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 12 }}>
        <HypothesisPanel selectedH={selectedHypothesis} onSelect={setSelectedHypothesis} />
        <div className="space-y-6">
          <HypothesisResult result={currentResult} />
          {selectedHypothesis === 'H5' && <ForecastChart data={filteredData} />}
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

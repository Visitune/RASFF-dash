import React, { useMemo } from 'react';
import { Calendar, Activity, Zap, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { RasffData } from '../../lib/mockData';

interface TemporalSummaryProps {
  data: RasffData[];
}

export const TemporalSummary: React.FC<TemporalSummaryProps> = ({ data }) => {
  const stats = useMemo(() => {
    if (data.length === 0) return null;

    const dates = data.map(d => new Date(d.date)).filter(d => !isNaN(d.getTime()));
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
    const daysDiff = Math.max(1, Math.ceil((maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)));

    const dateCounts: Record<string, number> = {};
    data.forEach(d => {
      if (d.date) dateCounts[d.date] = (dateCounts[d.date] || 0) + 1;
    });

    const entries = Object.entries(dateCounts);
    const sortedEntries = entries.sort((a, b) => b[1] - a[1]);
    const peakDay = sortedEntries[0] || ['-', 0];

    // Tendance : 4 dernières semaines vs 4 précédentes
    const sortedDates = Object.keys(dateCounts).sort();
    const lastDate = new Date(sortedDates[sortedDates.length - 1]);
    const fourWeeksAgo = new Date(lastDate);
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);
    const eightWeeksAgo = new Date(fourWeeksAgo);
    eightWeeksAgo.setDate(eightWeeksAgo.getDate() - 28);

    let recentCount = 0;
    let previousCount = 0;

    data.forEach(d => {
      const dDate = new Date(d.date);
      if (dDate >= fourWeeksAgo) recentCount++;
      else if (dDate >= eightWeeksAgo) previousCount++;
    });

    const trend = previousCount > 0 ? ((recentCount - previousCount) / previousCount) * 100 : 0;

    return {
      period: `${minDate.toLocaleDateString('fr-FR')} → ${maxDate.toLocaleDateString('fr-FR')}`,
      days: daysDiff,
      total: data.length,
      avg: (data.length / daysDiff).toFixed(1),
      peak: peakDay[1],
      peakDate: peakDay[0],
      trend: Math.round(trend)
    };
  }, [data]);

  if (!stats) return null;

  return (
    <div className="panel p-6">
      <h3 className="section-title mb-6 flex items-center gap-2">
        <Activity size={14} style={{ color: 'var(--blue)' }} /> Synthèse Temporelle
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="p-4 rounded-lg bg-surface-2 border border-border">
          <div className="flex items-center gap-2 mb-2 text-muted uppercase text-[9px] font-black tracking-widest">
            <Calendar size={12} /> Période couverte
          </div>
          <p className="text-sm font-bold text-primary m-0">{stats.period}</p>
          <p className="text-[10px] text-muted mt-1 m-0">{stats.days} jours analysés</p>
        </div>

        <div className="p-4 rounded-lg bg-surface-2 border border-border">
          <div className="flex items-center gap-2 mb-2 text-muted uppercase text-[9px] font-black tracking-widest">
            <Zap size={12} /> Moyenne journalière
          </div>
          <p className="text-2xl font-black text-blue m-0">{stats.avg}</p>
          <p className="text-[10px] text-muted mt-1 m-0">alertes / jour</p>
        </div>

        <div className="p-4 rounded-lg bg-surface-2 border border-border">
          <div className="flex items-center gap-2 mb-2 text-muted uppercase text-[9px] font-black tracking-widest">
            <Activity size={12} /> Jour record
          </div>
          <p className="text-sm font-bold text-primary m-0">{stats.peakDate}</p>
          <p className="text-[10px] text-muted mt-1 m-0">{stats.peak} alertes en 24h</p>
        </div>

        <div className="p-4 rounded-lg bg-surface-2 border border-border">
          <div className="flex items-center gap-2 mb-2 text-muted uppercase text-[9px] font-black tracking-widest">
            <TrendingUp size={12} /> Tendance
          </div>
          <div className="flex items-center gap-2">
            <p className="text-lg font-black m-0" style={{ color: stats.trend > 0 ? 'var(--red)' : stats.trend < 0 ? 'var(--green)' : 'var(--text-muted)' }}>
              {stats.trend > 0 ? '+' : ''}{stats.trend}%
            </p>
            {stats.trend > 5 ? <TrendingUp size={16} color="var(--red)" /> : stats.trend < -5 ? <TrendingDown size={16} color="var(--green)" /> : <Minus size={16} color="var(--text-muted)" />}
          </div>
          <p className="text-[10px] text-muted mt-1 m-0">vs 4 semaines précédentes</p>
        </div>
      </div>

      <div className="mt-6 p-3 bg-blue/5 rounded border border-blue/10 flex gap-3 italic text-[11px] text-secondary">
        <span className="shrink-0 text-blue font-bold">ℹ</span>
        Ce panneau résume l'activité globale. Une hausse de la tendance peut indiquer l'émergence d'une nouvelle crise ou un renforcement des contrôles.
      </div>
    </div>
  );
};

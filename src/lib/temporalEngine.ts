import { RasffData } from './mockData';

export interface WeeklyStats {
  weekKey: string;     // e.g., "2026-W12" 
  startDate: Date;
  count: number;
  seriousCount: number;
  hazards: Set<string>;
  countries: Set<string>;
}

export interface CumulativePoint {
  date: string;
  totalAlerts: number;
  seriousAlerts: number;
}

export interface EmergingHazard {
  hazard: string;
  firstSeenWeek: string;
  category: string;
  origin: string;
}

// Helper: Get ISO Week string
export const getWeekString = (date: Date): string => {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
  return `${d.getUTCFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
};

export const getWeeklyDelta = (alerts: RasffData[]): WeeklyStats[] => {
  const weeksMap = new Map<string, WeeklyStats>();

  // Sort by date ascending to ensure proper timeline
  const sorted = [...alerts].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  sorted.forEach(alert => {
    const d = new Date(alert.date);
    if (isNaN(d.getTime())) return;
    
    // Default to a Monday of that week
    const day = d.getDay() || 7;
    const startDate = new Date(d);
    startDate.setDate(d.getDate() - day + 1);
    startDate.setHours(0,0,0,0);

    const weekKey = getWeekString(d);

    if (!weeksMap.has(weekKey)) {
      weeksMap.set(weekKey, {
        weekKey,
        startDate,
        count: 0,
        seriousCount: 0,
        hazards: new Set(),
        countries: new Set()
      });
    }

    const w = weeksMap.get(weekKey)!;
    w.count++;
    if (alert.risk_level.toLowerCase().includes('serious')) w.seriousCount++;
    w.hazards.add(alert.hazard);
    w.countries.add(alert.origin);
  });

  return Array.from(weeksMap.values()).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
};

export const getCumulativeSeries = (alerts: RasffData[]): CumulativePoint[] => {
  const weekly = getWeeklyDelta(alerts);
  let total = 0;
  let serious = 0;

  return weekly.map(w => {
    total += w.count;
    serious += w.seriousCount;
    return {
      date: w.weekKey,
      totalAlerts: total,
      seriousAlerts: serious
    };
  });
};

export const getLatestWeekStats = (alerts: RasffData[]) => {
  const weekly = getWeeklyDelta(alerts);
  if (weekly.length === 0) return { delta: 0, previousDelta: 0, trend: 0, currentWeek: '', seriousPercent: 0, startDate: new Date() };
  
  const latest = weekly[weekly.length - 1];
  const previous = weekly.length > 1 ? weekly[weekly.length - 2] : null;

  const trend = previous && previous.count > 0 
    ? ((latest.count - previous.count) / previous.count) * 100 
    : 0;

  return {
    delta: latest.count,
    previousDelta: previous ? previous.count : 0,
    trend,
    currentWeek: latest.weekKey,
    startDate: latest.startDate,
    seriousPercent: latest.count > 0 ? (latest.seriousCount / latest.count) * 100 : 0
  };
};

export const getWeeklyAcceleration = (alerts: RasffData[]) => {
  const weekly = getWeeklyDelta(alerts);
  return weekly.map((w, i) => {
    if (i === 0) return { week: w.weekKey, acceleration: 0 };
    const prev = weekly[i - 1];
    return {
      week: w.weekKey,
      acceleration: w.count - prev.count
    };
  });
};

export const detectEmergingHazards = (alerts: RasffData[]): EmergingHazard[] => {
  const seenHazards = new Set<string>();
  const emerging: EmergingHazard[] = [];

  const sorted = [...alerts].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  sorted.forEach(alert => {
    const hazardKey = alert.hazard.toLowerCase().trim();
    if (!seenHazards.has(hazardKey) && hazardKey !== '' && hazardKey !== 'unknown') {
      seenHazards.add(hazardKey);
      
      const d = new Date(alert.date);
      if (!isNaN(d.getTime())) {
        emerging.push({
          hazard: alert.hazard,
          firstSeenWeek: getWeekString(d),
          category: alert.category,
          origin: alert.origin
        });
      }
    }
  });

  return emerging;
};

export const calculateGlobalRiskScore = (alerts: RasffData[], recentDelta: number): number => {
  if (!alerts || alerts.length === 0) return 50;

  const seriousCount = alerts.filter(a => a.risk_level.toLowerCase().includes('serious')).length;
  const seriousRatio = seriousCount / alerts.length;

  let score = 50;
  score += seriousRatio * 30;
  if (recentDelta > 0) score += Math.min(20, recentDelta / 2);

  return Math.min(100, Math.max(0, Math.round(score)));
};

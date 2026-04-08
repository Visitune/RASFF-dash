import { RasffData } from './mockData';

export interface StatResult {
  mean: number;
  median: number;
  stdDev: number;
  count: number;
  q1: number;
  q3: number;
  iqr: number;
}

export const getPercentile = (sortedValues: number[], p: number) => {
  if (sortedValues.length === 0) return 0;
  const index = (sortedValues.length - 1) * p;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index % 1;
  if (lower === upper) return sortedValues[lower];
  return sortedValues[lower] * (1 - weight) + sortedValues[upper] * weight;
};

export const calculateStats = (data: RasffData[]): StatResult => {
  const count = data.length;
  if (count === 0) return { mean: 0, median: 0, stdDev: 0, count: 0, q1: 0, q3: 0, iqr: 0 };

  // Group by date to get volume stats
  const dateMap: Record<string, number> = {};
  data.forEach(d => {
    dateMap[d.date] = (dateMap[d.date] ?? 0) + 1;
  });

  const values = Object.values(dateMap);
  const sum = values.reduce((a, b) => a + b, 0);
  const mean = sum / Math.max(1, values.length);

  const sorted = [...values].sort((a, b) => a - b);
  const median = getPercentile(sorted, 0.5);
  const q1 = getPercentile(sorted, 0.25);
  const q3 = getPercentile(sorted, 0.75);
  const iqr = q3 - q1;

  const squareDiffs = values.map((v) => Math.pow(v - mean, 2));
  const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / Math.max(1, values.length);
  const stdDev = Math.sqrt(avgSquareDiff);

  return { mean, median, stdDev, count, q1, q3, iqr };
};

export const detectOutliers = (data: RasffData[], stats: StatResult) => {
  // Using 1.5 * IQR rule
  const lowerBound = Math.max(0, stats.q1 - 1.5 * stats.iqr);
  const upperBound = stats.q3 + 1.5 * stats.iqr;
  
  return data.map(d => ({
    ...d,
    isOutlier: d.value < lowerBound || d.value > upperBound,
    zScore: stats.stdDev > 0 ? (d.value - stats.mean) / stats.stdDev : 0
  }));
};

export const calculateMovingAverage = (data: RasffData[], windowSize: number = 3) => {
  // Simple moving average
  const result = [];
  for (let i = 0; i < data.length; i++) {
    if (i < windowSize - 1) continue; // Not enough data points
    let sum = 0;
    for (let j = 0; j < windowSize; j++) {
      sum += data[i - j].value;
    }
    result.push({
      date: data[i].date,
      movingAvg: sum / windowSize
    });
  }
  return result;
};

export const predictTrend = (data: RasffData[], periodsAhead: number) => {
  const points = data.map((d, index) => ({ x: index, y: d.value }));
  const n = points.length;
  if (n < 2) return [];

  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
  points.forEach((p) => {
    sumX += p.x;
    sumY += p.y;
    sumXY += p.x * p.y;
    sumXX += p.x * p.x;
  });

  const denom = n * sumXX - sumX * sumX;
  if (denom === 0) return []; // all x identical, no regression possible
  const m = (n * sumXY - sumX * sumY) / denom;
  const b = (sumY - m * sumX) / n;

  const prediction = [];
  for (let i = 1; i <= periodsAhead; i++) {
    const nextX = n + i - 1;
    prediction.push({
      date: `Future ${i}`,
      value: m * nextX + b,
      isPrediction: true
    });
  }

  return prediction;
};

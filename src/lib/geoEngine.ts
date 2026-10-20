import { RasffData } from './mockData';

export interface CountryStats {
  id: string;
  name: string;
  count: number;
  seriousCount: number;
  hazards: Record<string, number>;
  categories: Record<string, number>;
  riskScore: number;
  trend: number;
}

const COUNTRY_ALIASES: Record<string, string> = {
  USA: 'United States',
  Türkiye: 'Turkey',
  Czechia: 'Czech Republic',
  'Republic of North Macedonia': 'North Macedonia',
  'United Kingdom (Northern Ireland)': 'United Kingdom',
  'unknown origin': 'Unknown',
};

// Names used by the world-atlas topojson (map side) → our data names
export const GEO_TOPO_ALIASES: Record<string, string> = {
  'United States of America': 'United States',
  'Dem. Rep. Congo': 'Democratic Republic of the Congo',
  'Central African Rep.': 'Central African Republic',
  'Dominican Rep.': 'Dominican Republic',
  'Eq. Guinea': 'Equatorial Guinea',
  'eSwatini': 'Eswatini',
  'S. Sudan': 'South Sudan',
  'Solomon Is.': 'Solomon Islands',
  'Bosnia and Herz.': 'Bosnia and Herzegovina',
  'Czechia': 'Czech Republic',
  'Macedonia': 'North Macedonia',
  'Turkey': 'Turkey',
};

const normalizeCountryName = (value: string) => COUNTRY_ALIASES[value] || value;

const extractOrigins = (origin: string) =>
  origin
    .split(',')
    .map(part => normalizeCountryName(part.trim()))
    .filter(part => part && part !== 'Unknown');

export const COUNTRY_ISO_MAP: Record<string, string> = {
  Argentina: 'ARG',
  Australia: 'AUS',
  Austria: 'AUT',
  Belgium: 'BEL',
  'Bosnia and Herzegovina': 'BIH',
  Brazil: 'BRA',
  Bulgaria: 'BGR',
  Cambodia: 'KHM',
  China: 'CHN',
  Cyprus: 'CYP',
  'Czech Republic': 'CZE',
  Denmark: 'DNK',
  Egypt: 'EGY',
  Estonia: 'EST',
  Finland: 'FIN',
  France: 'FRA',
  Georgia: 'GEO',
  Germany: 'DEU',
  Greece: 'GRC',
  Hungary: 'HUN',
  India: 'IND',
  Indonesia: 'IDN',
  Iran: 'IRN',
  Ireland: 'IRL',
  Italy: 'ITA',
  Japan: 'JPN',
  Lithuania: 'LTU',
  Luxembourg: 'LUX',
  Malaysia: 'MYS',
  Mexico: 'MEX',
  Morocco: 'MAR',
  Netherlands: 'NLD',
  'New Zealand': 'NZL',
  'North Macedonia': 'MKD',
  Norway: 'NOR',
  Pakistan: 'PAK',
  Poland: 'POL',
  Portugal: 'PRT',
  Romania: 'ROU',
  Russia: 'RUS',
  Rwanda: 'RWA',
  Serbia: 'SRB',
  Slovakia: 'SVK',
  Slovenia: 'SVN',
  'South Korea': 'KOR',
  Spain: 'ESP',
  Sweden: 'SWE',
  Switzerland: 'CHE',
  Taiwan: 'TWN',
  Thailand: 'THA',
  Turkey: 'TUR',
  Ukraine: 'UKR',
  'United Kingdom': 'GBR',
  'United States': 'USA',
  Uruguay: 'URY',
  Vietnam: 'VNM',
};

export const getCountryStats = (alerts: RasffData[]): CountryStats[] => {
  const statsMap = new Map<string, CountryStats>();

  alerts.forEach(alert => {
    extractOrigins(alert.origin?.trim() || 'Unknown').forEach(country => {
      if (!statsMap.has(country)) {
        statsMap.set(country, {
          id: COUNTRY_ISO_MAP[country] || country,
          name: country,
          count: 0,
          seriousCount: 0,
          hazards: {},
          categories: {},
          riskScore: 0,
          trend: 0,
        });
      }

      const stats = statsMap.get(country)!;
      stats.count++;
      if (alert.risk_level.toLowerCase().includes('serious')) stats.seriousCount++;
      stats.hazards[alert.hazard] = (stats.hazards[alert.hazard] || 0) + 1;
      stats.categories[alert.category] = (stats.categories[alert.category] || 0) + 1;
    });
  });

  const results = Array.from(statsMap.values());
  const maxVolume = results.length > 0 ? Math.max(...results.map(r => r.count)) : 1;

  results.forEach(stats => {
    const volumeScore = (stats.count / Math.max(1, maxVolume)) * 40;
    const severityScore = stats.count > 0 ? (stats.seriousCount / stats.count) * 60 : 0;
    stats.riskScore = Math.round(volumeScore + severityScore);
  });

  return results.sort((a, b) => b.riskScore - a.riskScore);
};

export interface GeoFlow {
  origin: string;
  destination: string;
  value: number;
}

export const getOriginToNotifyingFlows = (alerts: RasffData[]): GeoFlow[] => {
  const flowsMap = new Map<string, number>();

  alerts.forEach(alert => {
    const destination = normalizeCountryName(alert.notifying_country?.trim() || 'Unknown');
    extractOrigins(alert.origin?.trim() || 'Unknown').forEach(origin => {
      const key = `${origin} -> ${destination}`;
      flowsMap.set(key, (flowsMap.get(key) || 0) + 1);
    });
  });

  return Array.from(flowsMap.entries())
    .map(([key, value]) => {
      const [origin, destination] = key.split(' -> ');
      return { origin, destination, value };
    })
    .sort((a, b) => b.value - a.value);
};

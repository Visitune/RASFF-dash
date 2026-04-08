import { RasffData } from './mockData';

export interface FilterOptions {
  category?:          string;
  hazard?:            string;
  origin?:            string;
  notifying_country?: string;
  risk_level?:        string;
  dateFrom?:          string;   // ISO "YYYY-MM-DD"
  dateTo?:            string;   // ISO "YYYY-MM-DD"
  search?:            string;   // free text
}

export const filterData = (data: RasffData[], options: FilterOptions): RasffData[] => {
  const searchLower = options.search?.toLowerCase().trim() ?? '';

  return data.filter(item => {
    if (options.category          && item.category          !== options.category)          return false;
    if (options.hazard            && !item.hazard.toLowerCase().includes(options.hazard.toLowerCase())) return false;
    if (options.origin            && item.origin            !== options.origin)            return false;
    if (options.notifying_country && item.notifying_country !== options.notifying_country) return false;
    if (options.risk_level        && !item.risk_level.toLowerCase().includes(options.risk_level.toLowerCase())) return false;

    if (options.dateFrom && item.date < options.dateFrom) return false;
    if (options.dateTo   && item.date > options.dateTo)   return false;

    if (searchLower) {
      const hay = [item.product, item.hazard, item.origin, item.category, item.id, item.status]
        .join(' ').toLowerCase();
      if (!hay.includes(searchLower)) return false;
    }

    return true;
  });
};

export const exportToCSV = (data: RasffData[], filename: string) => {
  if (data.length === 0) return;
  const headers = Object.keys(data[0]).join(';');
  const rows = data.map(row =>
    Object.values(row).map(val => `"${String(val).replace(/"/g, '""')}"`).join(';')
  );
  const csvContent = 'data:text/csv;charset=utf-8,' + headers + '\n' + rows.join('\n');
  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(csvContent));
  link.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const crossData = (data: RasffData[], xAxis: keyof RasffData, yAxis: keyof RasffData) => {
  const result: Record<string, Record<string, number>> = {};
  data.forEach(item => {
    const x = String(item[xAxis]);
    const y = String(item[yAxis]);
    if (!result[x]) result[x] = {};
    result[x][y] = (result[x][y] ?? 0) + 1;
  });
  return result;
};

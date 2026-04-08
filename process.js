import fs from 'fs';
  const lines = fs.readFileSync('rasff_data.tsv', 'utf-8').split('\n').filter(l => l.trim().length > 0);
  const headers = lines[0].split('\t').map(h => h.trim());
  const headerIndex = (name) => headers.findIndex(h => h.toLowerCase() === name.toLowerCase());
  const readByHeader = (cols, name) => {
    const idx = headerIndex(name);
    return idx >= 0 && cols[idx] ? cols[idx].trim() : '';
  };

  const data = [];
  for (let i = 1; i < lines.length && data.length < 500; i++) {
    const cols = lines[i].split('\t');
    if (cols.length < 5) continue;
    
    // Clean values
    const id = cols[0] ? cols[0].trim() : '';
    const category = cols[1] ? cols[1].trim() : 'Unknown';
    const subject = cols[3] ? cols[3].trim() : 'Unknown';
    const rawDate = cols[4] ? cols[4].trim() : '';
    
    let formattedDate = new Date().toISOString().split('T')[0];
    if (rawDate) {
      const parts = rawDate.split(' ')[0].split('-'); // DD, MM, YYYY
      if (parts.length === 3) {
        formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }

    const notifying_country = cols[5] ? cols[5].trim() : 'Unknown';
    const status = cols[6] ? cols[6].trim() : 'notification';
    const risk_level = cols[7] ? cols[7].trim() : 'undecided';
    const notification_id =
      readByHeader(cols, 'notification_id') ||
      readByHeader(cols, 'notificationId') ||
      readByHeader(cols, 'rasff_notification_id') ||
      readByHeader(cols, 'detail_id');
    const notification_url =
      readByHeader(cols, 'notification_url') ||
      readByHeader(cols, 'notificationUrl') ||
      readByHeader(cols, 'detail_url') ||
      readByHeader(cols, 'url') ||
      (notification_id
        ? `https://webgate.ec.europa.eu/rasff-window/screen/notification/${notification_id}`
        : '');
    
    // Origin and Hazard are at varying positions at the end
    const lastColId = cols.length - 1;
    const origin = (cols[lastColId - 1] || cols[lastColId - 2] || 'Unknown').trim();
    const hazard = (cols[lastColId] || cols[lastColId - 1] || subject).trim();

    data.push({
      id,
      date: formattedDate,
      category,
      product: subject.substring(0, 80) + (subject.length > 80 ? '...' : ''),
      hazard: hazard.substring(0, 80) + (hazard.length > 80 ? '...' : ''),
      origin,
      notifying_country,
      risk_level,
      status,
      notification_id,
      notification_url,
      // Keep a random value so that heatmaps/trend charts render nice continuous visual gradients correctly out of the box if they rely on it
      value: Math.floor(Math.random() * 80 + 20) 
    });
  }

  const outStr = `export interface RasffData {
  id: string;
  date: string;
  category: string;
  product: string;
  hazard: string;
  origin: string;
  notifying_country: string;
  risk_level: string;
  status: string;
  value: number;
  notification_id?: string;
  notification_url?: string;
}

export const mockRasffData: RasffData[] = ${JSON.stringify(data, null, 2)};
`;

  fs.writeFileSync('src/lib/mockData.ts', outStr);
  console.log('Real data injected! ' + data.length + ' rows parsed.');

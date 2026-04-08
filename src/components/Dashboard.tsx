import React, { useState, useMemo } from 'react';
import { Alert } from '../lib/csvParser';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { AlertTriangle, ShieldAlert, FileText, Globe, Search, Filter, Settings, TrendingUp, BarChart2, Languages, Calendar } from 'lucide-react';
import { fetchAlerts } from '../lib/csvParser';

const COLORS = ['#FF6321', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6321'];

const translations = {
  fr: {
    title: "Tableau de Bord RASFF",
    subtitle: "Analyses avancées et prédictions.",
    search: "Rechercher...",
    totalAlerts: "Total Alertes",
    seriousRisks: "Risques Sérieux",
    categories: "Catégories",
    countries: "Pays Notifiants",
    topCategories: "Top 10 Catégories",
    riskDist: "Répartition par Risque",
    dashboard: "Tableau de Bord",
    analysis: "Analyses Statistiques",
    prediction: "Tendances & Prédictions",
    startDate: "Date Début",
    endDate: "Date Fin"
  },
  en: {
    title: "RASFF Dashboard",
    subtitle: "Advanced analytics and predictions.",
    search: "Search...",
    totalAlerts: "Total Alerts",
    seriousRisks: "Serious Risks",
    categories: "Categories",
    countries: "Notifying Countries",
    topCategories: "Top 10 Categories",
    riskDist: "Risk Distribution",
    dashboard: "Dashboard",
    analysis: "Statistical Analysis",
    prediction: "Trends & Predictions",
    startDate: "Start Date",
    endDate: "End Date"
  }
};

export default function Dashboard() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Tous');
  const [countryFilter, setCountryFilter] = useState('Tous');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  const [activePage, setActivePage] = useState('dashboard');

  const t = translations[lang];

  React.useEffect(() => {
    fetchAlerts().then((data) => {
      setAlerts(data);
      setLoading(false);
    });
  }, []);

  const categories = useMemo(() => ['Tous', ...Array.from(new Set(alerts.map(a => a.category)))], [alerts]);
  const countries = useMemo(() => ['Tous', ...Array.from(new Set(alerts.map(a => a.notifying_country)))], [alerts]);

  const filteredAlerts = useMemo(() => {
    return alerts.filter(alert => {
      const matchesSearch = alert.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            alert.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'Tous' || alert.category === categoryFilter;
      const matchesCountry = countryFilter === 'Tous' || alert.notifying_country === countryFilter;
      const matchesDate = (!startDate || alert.parsedDate >= new Date(startDate)) &&
                          (!endDate || alert.parsedDate <= new Date(endDate));
      return matchesSearch && matchesCategory && matchesCountry && matchesDate;
    });
  }, [alerts, searchTerm, categoryFilter, countryFilter, startDate, endDate]);

  if (loading) return <div className="p-8 text-center text-gray-500">Chargement...</div>;

  const categoryData = filteredAlerts.reduce((acc, alert) => {
    acc[alert.category] = (acc[alert.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topCategories = Object.entries(categoryData)
    .sort((a, b) => Number(b[1]) - Number(a[1]))
    .slice(0, 10)
    .map(([name, value]) => ({ name, value }));

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col">
        <h1 className="text-xl font-bold mb-10">RASFF Analytics</h1>
        <nav className="flex flex-col gap-4">
          <button onClick={() => setActivePage('dashboard')} className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded"><BarChart2 size={20}/> {t.dashboard}</button>
          <button onClick={() => setActivePage('analysis')} className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded"><Filter size={20}/> {t.analysis}</button>
          <button onClick={() => setActivePage('prediction')} className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded"><TrendingUp size={20}/> {t.prediction}</button>
        </nav>
        <div className="mt-auto flex items-center justify-between">
          <button onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')} className="flex items-center gap-2"><Languages size={20}/> {lang.toUpperCase()}</button>
          <Settings size={20} />
        </div>
      </aside>

      <main className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </header>

        {/* Advanced Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 grid grid-cols-1 md:grid-cols-5 gap-4">
          <input type="text" placeholder={t.search} className="p-2 border rounded-lg" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <select className="p-2 border rounded-lg" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select>
          <select className="p-2 border rounded-lg" value={countryFilter} onChange={(e) => setCountryFilter(e.target.value)}>{countries.map(c => <option key={c} value={c}>{c}</option>)}</select>
          <input type="date" className="p-2 border rounded-lg" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <input type="date" className="p-2 border rounded-lg" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>

        {activePage === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title={t.totalAlerts} value={filteredAlerts.length} icon={<AlertTriangle className="text-orange-500" />} />
            <StatCard title={t.seriousRisks} value={filteredAlerts.filter(a => a.risk_decision === 'serious').length} icon={<ShieldAlert className="text-red-500" />} />
            <StatCard title={t.categories} value={Object.keys(categoryData).length} icon={<FileText className="text-blue-500" />} />
            <StatCard title={t.countries} value={new Set(filteredAlerts.map(a => a.notifying_country)).size} icon={<Globe className="text-green-500" />} />
          </div>
        )}

        {activePage === 'analysis' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">{t.topCategories}</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topCategories} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Bar dataKey="value" fill="#FF6321" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        
        {activePage === 'prediction' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-4">{t.prediction}</h2>
            <p className="text-gray-500">Analyse de tendance basée sur les données historiques...</p>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: number | string, icon: React.ReactNode }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
      <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

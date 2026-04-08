import React, { useState } from 'react';
import { FilterOptions } from '../../lib/dataEngine';
import { Search, Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterBarProps {
  options: FilterOptions;
  setOptions: (options: FilterOptions) => void;
  availableOrigins:           string[];
  availableCategories:        string[];
  availableNotifyingCountries?: string[];
}

const selectStyle: React.CSSProperties = {
  background: 'var(--surface-2)',
  border: '1px solid var(--border)',
  color: 'var(--text-primary)',
  borderRadius: 4,
  padding: '6px 10px',
  fontSize: 12,
  outline: 'none',
  cursor: 'pointer',
  minWidth: 160,
};

const inputStyle: React.CSSProperties = {
  ...selectStyle,
  minWidth: 220,
};

const dateStyle: React.CSSProperties = {
  ...selectStyle,
  minWidth: 130,
  // colorScheme adapts to body class — set in CSS instead
};

export const FilterBar: React.FC<FilterBarProps> = ({
  options,
  setOptions,
  availableOrigins,
  availableCategories,
  availableNotifyingCountries = [],
}) => {
  const [expanded, setExpanded] = useState(false);

  const activeCount = Object.values(options).filter(v => v !== undefined && v !== '').length;

  const set = (key: keyof FilterOptions, value: string) =>
    setOptions({ ...options, [key]: value || undefined });

  const reset = () => setOptions({});

  return (
    <div className="panel" style={{ padding: '12px 16px', marginBottom: 16 }}>
      {/* Row 1 — always visible */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}>
          <Filter size={14} />
          <span style={{ fontSize: 12, fontWeight: 600 }}>Filtres</span>
          {activeCount > 0 && (
            <span style={{
              background: 'var(--blue)', color: 'white',
              borderRadius: 10, padding: '1px 6px', fontSize: 10, fontWeight: 700,
            }}>{activeCount}</span>
          )}
        </div>

        {/* Free text search */}
        <div style={{ position: 'relative', flex: '1 1 220px' }}>
          <Search size={13} style={{
            position: 'absolute', left: 8, top: '50%',
            transform: 'translateY(-50%)', color: 'var(--text-muted)',
          }} />
          <input
            type="text"
            placeholder="Recherche libre : produit, hazard, pays, référence…"
            value={options.search ?? ''}
            onChange={e => set('search', e.target.value)}
            style={{ ...inputStyle, paddingLeft: 28, width: '100%' }}
          />
        </div>

        {/* Category */}
        <select value={options.category ?? ''} onChange={e => set('category', e.target.value)} style={selectStyle}>
          <option value="">Toutes les catégories</option>
          {availableCategories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        {/* Origin */}
        <select value={options.origin ?? ''} onChange={e => set('origin', e.target.value)} style={selectStyle}>
          <option value="">Origine : Toutes</option>
          {availableOrigins.map(o => <option key={o} value={o}>{o}</option>)}
        </select>

        {/* Toggle more */}
        <button
          className="btn-ghost"
          style={{ fontSize: 12, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 4 }}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {expanded ? 'Moins' : 'Plus de filtres'}
        </button>

        {activeCount > 0 && (
          <button
            onClick={reset}
            style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <X size={12} /> Réinitialiser
          </button>
        )}
      </div>

      {/* Row 2 — expanded filters */}
      {expanded && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--border)' }}>

          {/* Notifying country */}
          {availableNotifyingCountries.length > 0 && (
            <select value={options.notifying_country ?? ''} onChange={e => set('notifying_country', e.target.value)} style={selectStyle}>
              <option value="">Pays notifiant : Tous</option>
              {availableNotifyingCountries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          )}

          {/* Risk level */}
          <select value={options.risk_level ?? ''} onChange={e => set('risk_level', e.target.value)} style={selectStyle}>
            <option value="">Niveau de risque : Tous</option>
            <option value="serious">Serious</option>
            <option value="potentially serious">Potentially serious</option>
            <option value="potential risk">Potential risk</option>
            <option value="not serious">Not serious</option>
          </select>

          {/* Date from */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Du</span>
            <input
              type="date"
              value={options.dateFrom ?? ''}
              onChange={e => set('dateFrom', e.target.value)}
              style={dateStyle}
            />
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>au</span>
            <input
              type="date"
              value={options.dateTo ?? ''}
              onChange={e => set('dateTo', e.target.value)}
              style={dateStyle}
            />
          </div>

          {/* Quick date presets */}
          {[
            { label: '7 jours',  days: 7  },
            { label: '30 jours', days: 30 },
            { label: '90 jours', days: 90 },
            { label: '1 an',     days: 365 },
          ].map(({ label, days }) => {
            const to   = new Date().toISOString().split('T')[0];
            const from = new Date(Date.now() - days * 86400000).toISOString().split('T')[0];
            return (
              <button
                key={label}
                className="btn-ghost"
                style={{ fontSize: 11, padding: '4px 8px' }}
                onClick={() => setOptions({ ...options, dateFrom: from, dateTo: to })}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

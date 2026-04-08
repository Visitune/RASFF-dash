import React, { useState, useMemo, useEffect } from 'react';
import { RasffData } from '../../lib/mockData';
import { exportToCSV } from '../../lib/dataEngine';
import { Download, ChevronUp, ChevronDown, LayoutGrid, List, ExternalLink, X } from 'lucide-react';

interface NotificationsTableProps {
  data: RasffData[];
}

type SortKey = 'date' | 'origin' | 'category' | 'risk_level' | 'notifying_country';
type ViewMode = 'table' | 'cards';

// ─── Portal URL ─────────────────────────────────────────────────────────────
// The RASFF portal detail page uses an internal numeric ID (e.g. 835271),
// NOT the reference number (e.g. 2026.2847). There is no public mapping.
// The search URL below opens the portal filtered by reference — the user
// clicks the result to reach the full detail page.
const buildPortalUrl = (row: RasffData) => {
  if (row.notification_url) return row.notification_url;
  if (row.notification_id) {
    return `https://webgate.ec.europa.eu/rasff-window/screen/notification/${row.notification_id}`;
  }
  return `https://webgate.ec.europa.eu/rasff-window/screen/search?query=${encodeURIComponent(row.id)}`;
};

// ─── Risk helpers ────────────────────────────────────────────────────────────
const getRiskBadgeClass = (rl: string) => {
  const l = rl.toLowerCase();
  if (l.includes('not serious')) return 'badge-green';
  if (l.includes('serious')) return 'badge-red';
  if (l.includes('potentially') || l.includes('potential')) return 'badge-orange';
  if (l.includes('high')) return 'badge-red';
  if (l.includes('low')) return 'badge-green';
  return 'badge-gray';
};

const riskBorderColor = (rl: string) => {
  const l = rl.toLowerCase();
  if (l.includes('not serious')) return 'var(--green)';
  if (l.includes('serious')) return 'var(--red)';
  if (l.includes('potentially') || l.includes('potential')) return 'var(--orange)';
  if (l.includes('high')) return 'var(--red)';
  if (l.includes('low')) return 'var(--green)';
  return 'var(--border-strong)';
};

// ─── Flip Card ───────────────────────────────────────────────────────────────
const FlipCard: React.FC<{ row: RasffData }> = ({ row }) => {
  const [flipped, setFlipped] = useState(false);
  const borderColor = riskBorderColor(row.risk_level);

  return (
    <div
      className={`flip-card-container${flipped ? ' flipped' : ''}`}
      style={{ height: 220 }}
      onClick={() => setFlipped(f => !f)}
      title={flipped ? 'Cliquer pour revenir' : 'Cliquer pour voir les détails'}
    >
      <div className="flip-card-inner">
        {/* ── FRONT ── */}
        <div
          className="flip-card-front panel border"
          style={{ borderTopWidth: 3, borderTopColor: borderColor, borderTopStyle: 'solid' }}
        >
          <div className="p-4 flex flex-col h-full gap-3">
            {/* Header row */}
            <div className="flex items-start justify-between gap-2">
              <span className="text-[9px] font-black font-mono text-muted uppercase tracking-widest leading-tight">
                {row.id}
              </span>
              <span className={`badge ${getRiskBadgeClass(row.risk_level)} shrink-0`} style={{ fontSize: 9 }}>
                {row.risk_level}
              </span>
            </div>

            {/* Product */}
            <div className="flex-1 min-h-0">
              <p className="text-xs font-black text-primary uppercase leading-tight line-clamp-2 mb-1">
                {row.product}
              </p>
              <p className="text-[10px] text-secondary leading-snug line-clamp-2">
                {row.hazard}
              </p>
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-1.5 pt-2 border-t border-border">
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-1 flex-wrap">
                  <span className="badge badge-gray" style={{ fontSize: 9 }}>{row.origin}</span>
                  {row.notifying_country && row.notifying_country !== row.origin && (
                    <span className="badge badge-blue" style={{ fontSize: 9 }}>→ {row.notifying_country}</span>
                  )}
                </div>
                <span className="text-[9px] text-muted font-mono shrink-0">{row.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-muted italic truncate">{row.category}</span>
                <span className="text-[9px] text-muted/50 font-bold uppercase ml-2 shrink-0">Détails →</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="flip-card-back panel border"
          style={{ borderTopWidth: 3, borderTopColor: borderColor, borderTopStyle: 'solid' }}
        >
          <div className="p-4 flex flex-col h-full gap-2 overflow-hidden">
            {/* Back header */}
            <div className="flex items-center justify-between gap-2 shrink-0">
              <span className="text-[9px] font-black font-mono text-muted uppercase tracking-widest">{row.id}</span>
              <div className="flex items-center gap-1">
                <span className={`badge ${getRiskBadgeClass(row.risk_level)}`} style={{ fontSize: 9 }}>
                  {row.risk_level}
                </span>
              </div>
            </div>

            {/* Details list */}
            <div className="flex-1 min-h-0 overflow-hidden space-y-1.5">
              <DetailRow label="Produit" value={row.product} />
              <DetailRow label="Danger" value={row.hazard} />
              <DetailRow label="Catégorie" value={row.category} />
              <DetailRow label="Statut" value={row.status} />
              <DetailRow label="Origine" value={row.origin} />
              <DetailRow label="Notifié par" value={row.notifying_country} />
              <DetailRow label="Date" value={row.date} />
            </div>

            {/* Portal link */}
            <div className="shrink-0 pt-2 border-t border-border flex items-center justify-between gap-2">
              <span className="text-[9px] text-muted/50 font-bold uppercase">← Revenir</span>
              <a
                href={buildPortalUrl(row)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-black uppercase tracking-wide text-blue hover:bg-blue/10 transition-colors border border-blue/20"
              >
                <ExternalLink size={10} /> Portail RASFF
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex gap-2 items-start">
    <span className="text-[9px] font-black uppercase tracking-widest text-muted shrink-0 w-16 pt-0.5">{label}</span>
    <span className="text-[10px] text-primary leading-snug line-clamp-2">{value || '—'}</span>
  </div>
);

// ─── Table Sort Icon ─────────────────────────────────────────────────────────
const SortIcon: React.FC<{ k: SortKey; sortKey: SortKey; sortDir: 'asc' | 'desc' }> = ({ k, sortKey, sortDir }) => {
  if (sortKey !== k) return <ChevronUp size={12} className="opacity-20" />;
  return sortDir === 'asc'
    ? <ChevronUp size={12} className="text-blue" />
    : <ChevronDown size={12} className="text-blue" />;
};

// ─── Main Component ──────────────────────────────────────────────────────────
export const NotificationsTable: React.FC<NotificationsTableProps> = ({ data }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(0);
  const PAGE_SIZE = viewMode === 'cards' ? 30 : 50;

  useEffect(() => {
    setPage(0);
  }, [data.length]);

  const sorted = useMemo(() => {
    return [...data].sort((a, b) => {
      const va = String(a[sortKey] ?? '');
      const vb = String(b[sortKey] ?? '');
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    });
  }, [data, sortKey, sortDir]);

  const pageData = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);

  const toggleSort = (key: SortKey) => {
    setPage(0);
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const toggleAll = () => {
    if (selected.size === pageData.length) setSelected(new Set());
    else setSelected(new Set(pageData.map(d => d.id)));
  };

  const toggleRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const s = new Set(selected);
    s.has(id) ? s.delete(id) : s.add(id);
    setSelected(s);
  };

  const downloadSelected = () => {
    const rows = data.filter(d => selected.has(d.id));
    if (rows.length > 0) exportToCSV(rows, `rasff_selection_${new Date().toISOString().split('T')[0]}`);
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="panel overflow-hidden border-strong shadow-sm">
      {/* Toolbar */}
      <div className="p-4 border-b border-border bg-surface-1 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-black uppercase tracking-wider text-primary">
            Journal des Alertes ({data.length.toLocaleString('fr-FR')})
          </h3>
          {selected.size > 0 && (
            <span className="badge badge-blue font-black">
              {selected.size} sélectionnées
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex border border-border rounded-lg overflow-hidden">
            <button
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-black uppercase transition-colors ${
                viewMode === 'table' ? 'bg-blue text-white' : 'text-muted hover:text-primary'
              }`}
              onClick={() => { setViewMode('table'); setPage(0); }}
            >
              <List size={13} /> Tableau
            </button>
            <button
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-black uppercase transition-colors ${
                viewMode === 'cards' ? 'bg-blue text-white' : 'text-muted hover:text-primary'
              }`}
              onClick={() => { setViewMode('cards'); setPage(0); }}
            >
              <LayoutGrid size={13} /> Cartes
            </button>
          </div>

          {selected.size > 0 && (
            <>
              <button
                className="btn-primary h-9 px-4 text-xs flex items-center gap-2"
                onClick={downloadSelected}
              >
                <Download size={14} /> Télécharger ({selected.size})
              </button>
              <button
                className="btn-ghost h-9 px-3 text-xs flex items-center gap-2"
                onClick={() => setSelected(new Set())}
              >
                <X size={14} /> Désélectionner
              </button>
            </>
          )}
          <button
            className="btn-ghost h-9 px-3 text-xs flex items-center gap-2"
            onClick={() => exportToCSV(data, `rasff_complet_${new Date().toISOString().split('T')[0]}`)}
          >
            <Download size={14} /> Tout Exporter
          </button>
        </div>
      </div>

      {/* ── CARDS VIEW ── */}
      {viewMode === 'cards' && (
        <div className="p-4">
          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
            {pageData.map(row => (
              <FlipCard key={row.id} row={row} />
            ))}
          </div>
          {pageData.length === 0 && (
            <p className="text-center text-muted text-xs py-12 uppercase tracking-widest">
              Aucune notification pour ces filtres
            </p>
          )}
        </div>
      )}

      {/* ── TABLE VIEW ── */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-2">
                <th className="p-3 w-10 border-b border-border">
                  <input
                    type="checkbox"
                    className="rounded border-border text-blue focus:ring-blue"
                    checked={selected.size === pageData.length && pageData.length > 0}
                    onChange={toggleAll}
                  />
                </th>
                <th className="p-3 border-b border-border cursor-pointer select-none" onClick={() => toggleSort('date')}>
                  <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-muted">
                    Date <SortIcon k="date" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                </th>
                <th className="p-3 border-b border-border min-w-[200px]">
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted">Produit / Contexte</div>
                </th>
                <th className="p-3 border-b border-border min-w-[150px]">
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted">Nature du Danger</div>
                </th>
                <th className="p-3 border-b border-border cursor-pointer select-none" onClick={() => toggleSort('origin')}>
                  <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-muted">
                    Origine <SortIcon k="origin" sortKey={sortKey} sortDir={sortDir} />
                  </div>
                </th>
                <th className="p-3 border-b border-border">
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted">Risque</div>
                </th>
                <th className="p-3 border-b border-border">
                  <div className="text-[10px] font-black uppercase tracking-widest text-muted text-right">Réf. / Portail</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pageData.map((row) => (
                <tr
                  key={row.id}
                  className={`transition-colors cursor-pointer group ${
                    selected.has(row.id) ? 'bg-blue/5' : 'hover:bg-surface-hover'
                  }`}
                  onClick={(e) => toggleRow(row.id, e)}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      className="rounded border-border text-blue"
                      checked={selected.has(row.id)}
                      onChange={() => {}}
                      onClick={e => { e.stopPropagation(); toggleRow(row.id, e as any); }}
                    />
                  </td>
                  <td className="p-3 text-[11px] font-bold text-muted whitespace-nowrap">{row.date}</td>
                  <td className="p-3 py-4">
                    <div className="text-xs font-black text-primary leading-tight uppercase group-hover:text-blue transition-colors">
                      {row.product}
                    </div>
                    <div className="text-[10px] mt-1 text-muted font-bold flex gap-2">
                      <span>{row.category}</span>
                      <span className="opacity-40">|</span>
                      <span className="italic">{row.status}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="text-[11px] font-medium text-secondary leading-normal max-w-[250px] line-clamp-2">
                      {row.hazard}
                    </div>
                  </td>
                  <td className="p-3">
                    <div className="flex flex-col gap-1">
                      <span className="badge badge-gray font-black">{row.origin}</span>
                      {row.notifying_country && row.notifying_country !== row.origin && (
                        <span className="badge badge-blue font-black" style={{ fontSize: 9 }}>→ {row.notifying_country}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`badge ${getRiskBadgeClass(row.risk_level)} font-black`}>
                      {row.risk_level}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-black font-mono text-muted">{row.id}</span>
                      <a
                        href={buildPortalUrl(row)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="flex items-center gap-1 text-[9px] font-bold text-blue hover:underline uppercase"
                        title="Voir sur le portail RASFF"
                      >
                        <ExternalLink size={9} /> Portail
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pageData.length === 0 && (
            <p className="text-center text-muted text-xs py-12 uppercase tracking-widest">
              Aucune notification pour ces filtres
            </p>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-4 bg-surface-2 border-t border-border flex items-center justify-between flex-wrap gap-3">
          <p className="text-[10px] font-black text-muted uppercase tracking-widest">
            {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, sorted.length)} / {sorted.length.toLocaleString('fr-FR')} notifications
          </p>
          <div className="flex gap-1">
            <button className="btn-ghost w-8 h-8 flex items-center justify-center p-0" disabled={page === 0} onClick={() => setPage(0)}>«</button>
            <button className="btn-ghost px-3 h-8 text-[11px] font-black" disabled={page === 0} onClick={() => setPage(p => p - 1)}>PRÉC.</button>
            <span className="flex items-center px-3 text-[11px] font-black text-muted">
              {page + 1} / {totalPages}
            </span>
            <button className="btn-ghost px-3 h-8 text-[11px] font-black" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>SUIV.</button>
            <button className="btn-ghost w-8 h-8 flex items-center justify-center p-0" disabled={page >= totalPages - 1} onClick={() => setPage(totalPages - 1)}>»</button>
          </div>
        </div>
      )}
    </div>
  );
};

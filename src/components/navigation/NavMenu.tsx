import React from 'react';
import {
  LayoutDashboard,
  Clock,
  Map,
  TrendingUp,
  FlaskConical,
  BrainCircuit,
  BookOpen,
  ShieldCheck,
  Activity,
  ChevronLeft
} from 'lucide-react';

export type PageSection = 'overview' | 'temporal' | 'geo' | 'statistical' | 'predictive' | 'ai' | 'guide';

interface NavMenuProps {
  activeSection: PageSection;
  onSectionChange: (section: PageSection) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const sections = [
  { id: 'overview'    as PageSection, label: 'Vue générale',          icon: LayoutDashboard },
  { id: 'temporal'    as PageSection, label: 'Analyse temporelle',    icon: Clock },
  { id: 'geo'         as PageSection, label: 'Analyse géographique',  icon: Map },
  { id: 'statistical' as PageSection, label: 'Analyse statistique',   icon: TrendingUp },
  { id: 'predictive'  as PageSection, label: 'Analyse prédictive',    icon: FlaskConical },
  { id: 'ai'          as PageSection, label: 'Analyse IA',            icon: BrainCircuit },
  { id: 'guide'       as PageSection, label: 'Guide & méthodes',      icon: BookOpen },
];

export const NavMenu: React.FC<NavMenuProps> = ({ activeSection, onSectionChange, collapsed, onToggleCollapse }) => {
  return (
    <aside
      className="sidebar shrink-0 flex flex-col"
      style={{ 
        width: collapsed ? 60 : 220, 
        minHeight: '100vh',
        transition: 'width 0.2s ease'
      }}
    >
      {/* Logo */}
      <div style={{ padding: collapsed ? '20px 12px' : '20px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            background: 'var(--blue)',
            borderRadius: 4,
            width: 28, height: 28,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0
          }}>
            <ShieldCheck size={16} color="white" />
          </div>
          {!collapsed && (
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                RASFF
              </p>
              <p style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                DASHBOARD
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <div style={{ padding: '8px', display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end' }}>
        <button
          onClick={onToggleCollapse}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 28, height: 28,
            border: '1px solid var(--border)',
            borderRadius: 4,
            background: 'var(--surface-2)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            transform: collapsed ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }}
          title={collapsed ? 'Déplier la sidebar' : 'Replier la sidebar'}
        >
          <ChevronLeft size={14} />
        </button>
      </div>

      {/* Nav */}
      <nav style={{ padding: collapsed ? '12px 6px' : '12px 8px', flex: 1 }}>
        {!collapsed && <p className="section-title" style={{ padding: '0 8px' }}>Modules</p>}

        {sections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSectionChange(id)}
            className={`nav-item ${activeSection === id ? 'active' : ''}`}
            style={{ 
              justifyContent: collapsed ? 'center' : 'flex-start',
              padding: collapsed ? '10px' : '10px 16px'
            }}
            title={collapsed ? label : undefined}
          >
            <Icon size={16} style={{ flexShrink: 0 }} />
            {!collapsed && <span>{label}</span>}
          </button>
        ))}
      </nav>

      {/* Status footer */}
      <div style={{
        padding: collapsed ? '12px 8px' : '12px 16px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        justifyContent: collapsed ? 'center' : 'flex-start',
        flexDirection: collapsed ? 'column' : 'row'
      }}>
        <Activity size={13} style={{ color: 'var(--green)', flexShrink: 0 }} />
        {!collapsed && (
          <div>
            <p style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)' }}>Moteur analytique</p>
            <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
              Opérationnel · v1.1
            </p>
          </div>
        )}
      </div>
    </aside>
  );
};

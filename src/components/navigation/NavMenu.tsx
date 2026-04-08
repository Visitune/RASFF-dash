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
  Activity
} from 'lucide-react';

export type PageSection = 'overview' | 'temporal' | 'geo' | 'statistical' | 'predictive' | 'ai' | 'guide';

interface NavMenuProps {
  activeSection: PageSection;
  onSectionChange: (section: PageSection) => void;
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

export const NavMenu: React.FC<NavMenuProps> = ({ activeSection, onSectionChange }) => {
  return (
    <aside
      className="sidebar shrink-0 flex flex-col"
      style={{ width: 220, minHeight: '100vh' }}
    >
      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid var(--border)' }}>
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
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              RASFF
            </p>
            <p style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              DASHBOARD
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: '12px 8px', flex: 1 }}>
        <p className="section-title" style={{ padding: '0 8px' }}>Modules</p>

        {sections.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onSectionChange(id)}
            className={`nav-item ${activeSection === id ? 'active' : ''}`}
          >
            <Icon size={16} style={{ flexShrink: 0 }} />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      {/* Status footer */}
      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
        <Activity size={13} style={{ color: 'var(--green)', flexShrink: 0 }} />
        <div>
          <p style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)' }}>Moteur analytique</p>
          <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>
            Opérationnel · v1.1
          </p>
        </div>
      </div>
    </aside>
  );
};

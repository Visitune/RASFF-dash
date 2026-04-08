import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { NavMenu, PageSection } from '../navigation/NavMenu';
import { Sun, Moon } from 'lucide-react';

interface PageLayoutProps {
  activeSection: PageSection;
  onSectionChange: (section: PageSection) => void;
  children: React.ReactNode;
  extraHeaderContent?: React.ReactNode;
}

const sectionLabels: Record<PageSection, string> = {
  overview:    "Vue générale",
  temporal:    "Analyse temporelle",
  geo:         "Analyse géographique",
  statistical: "Analyse statistique",
  predictive:  "Analyse prédictive & Hypothèses",
  ai:          "Analyse IA & Insights",
  guide:       "Guide & Méthodes",
};

export const PageLayout: React.FC<PageLayoutProps> = ({
  activeSection,
  onSectionChange,
  children,
  extraHeaderContent,
}) => {
  const [light, setLight] = useState(() => localStorage.getItem('theme') === 'light');

  useEffect(() => {
    document.body.classList.toggle('light', light);
    localStorage.setItem('theme', light ? 'light' : 'dark');
  }, [light]);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
      <NavMenu activeSection={activeSection} onSectionChange={onSectionChange} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top header */}
        <header style={{
          background: 'var(--surface-1)',
          borderBottom: '1px solid var(--border)',
          padding: '0 24px',
          height: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}>
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          >
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>RASFF Dash</span>
            <span style={{ color: 'var(--border-strong)', fontSize: 12 }}>/</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
              {sectionLabels[activeSection]}
            </span>
          </motion.div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {extraHeaderContent}

            {/* Light / Dark toggle */}
            <button
              onClick={() => setLight(l => !l)}
              title={light ? 'Passer en mode sombre' : 'Passer en mode clair'}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 32, height: 32,
                border: '1px solid var(--border-strong)',
                borderRadius: 4,
                background: 'var(--surface-2)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              {light ? <Moon size={15} /> : <Sun size={15} />}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ display: 'inline-block', width: 7, height: 7, borderRadius: '50%', background: 'var(--green)' }} />
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Synchronisé</span>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          <div style={{ maxWidth: 1400, margin: '0 auto' }}>
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

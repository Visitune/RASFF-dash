import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { NavMenu, PageSection } from '../navigation/NavMenu';
import { Sun, Moon, Menu, X } from 'lucide-react';

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem('sidebarCollapsed') === 'true');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('light', light);
    localStorage.setItem('theme', light ? 'light' : 'dark');
  }, [light]);

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg)' }}>
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(2px)',
            zIndex: 40,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              width: 'min(280px, 80vw)',
              height: '100%',
              background: 'var(--surface-1)',
              borderRight: '1px solid var(--border)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <NavMenu
              activeSection={activeSection}
              onSectionChange={(s) => { onSectionChange(s); setMobileMenuOpen(false); }}
              collapsed={false}
              onToggleCollapse={() => {}}
            />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <div
        style={{
          display: window.innerWidth > 768 ? 'block' : 'none',
          flexShrink: 0,
        }}
      >
        <NavMenu
          activeSection={activeSection}
          onSectionChange={onSectionChange}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(c => !c)}
        />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top header */}
         <header className="px-4 sm:px-6 lg:px-10 2xl:px-16" style={{
          background: 'var(--surface-1)',
          borderBottom: '1px solid var(--border)',
          boxShadow: 'var(--shadow-1)',
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
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              style={{
                display: window.innerWidth > 768 ? 'none' : 'flex',
                alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36,
                border: '1px solid var(--border-strong)',
                borderRadius: 4,
                background: 'var(--surface-2)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                flexShrink: 0,
              }}
            >
              <Menu size={18} />
            </button>

            <span className="hidden md:inline" style={{ fontSize: 12, color: 'var(--text-muted)' }}>RASFF Dash</span>
            <span className="hidden md:inline" style={{ color: 'var(--border-strong)', fontSize: 12 }}>/</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
              {sectionLabels[activeSection]}
            </span>
          </motion.div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
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
              <span className="hidden sm:inline" style={{ fontSize: 11, color: 'var(--text-muted)' }}>Synchronisé</span>
            </div>
          </div>
        </header>

        {/* Main content — responsive padding + full width */}
        <main style={{ flex: 1, overflowY: 'auto' }}>
          <div className="p-4 sm:px-6 sm:py-5 lg:px-10 2xl:px-16 w-full">
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

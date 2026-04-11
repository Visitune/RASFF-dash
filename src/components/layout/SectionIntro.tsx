import React, { useState } from 'react';
import { HelpCircle, ChevronRight, ChevronDown, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SectionIntroProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tips?: string[];
  color?: string;
}

export const SectionIntro: React.FC<SectionIntroProps> = ({ title, description, icon, tips, color = 'var(--blue)' }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="panel overflow-hidden" style={{ borderLeft: `4px solid ${color}`, marginBottom: 24 }}>
      <div 
        style={{ 
          padding: '16px 20px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          cursor: 'pointer',
          background: isOpen ? 'linear-gradient(90deg, var(--surface-2), transparent)' : 'transparent'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ color: color }}>{icon}</div>
          <div>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
              {title}
            </h2>
            {!isOpen && (
              <p style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)' }}>{description.substring(0, 80)}...</p>
            )}
          </div>
        </div>
        <div style={{ color: 'var(--text-muted)' }}>
          {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div style={{ padding: '0 20px 20px', borderTop: '0px solid var(--border)' }}>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 16px', maxWidth: '800px' }}>
                {description}
              </p>
              
              {tips && tips.length > 0 && (
                <div style={{ 
                  background: 'var(--surface-2)', 
                  padding: '12px 16px', 
                  borderRadius: 8,
                  border: '1px solid var(--border)'
                }}>
                  <p style={{ margin: '0 0 10px', fontSize: 10, fontWeight: 900, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <HelpCircle size={12} /> Conseil d'interprétation
                  </p>
                  <ul style={{ margin: 0, paddingLeft: 16, listStyleType: 'circle', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {tips.map((tip, i) => (
                      <li key={i} style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

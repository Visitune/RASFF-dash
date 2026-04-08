import React from 'react';
import { motion } from 'motion/react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
}

// Flat panel — replaces glassmorphism with clean Google-style surface
export const GlassPanel: React.FC<GlassPanelProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`panel p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

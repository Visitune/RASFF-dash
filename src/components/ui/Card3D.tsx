import React from 'react';
import { motion } from 'motion/react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
}

// Flat metric card — no 3D tilt, clean Google-style elevation on hover
export const Card3D: React.FC<Card3DProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`metric-card p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
};

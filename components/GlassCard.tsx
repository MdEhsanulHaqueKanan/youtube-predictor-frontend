
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
}

const GlassCard: React.FC<GlassCardProps> = ({ children }) => {
  return (
    <div className="bg-glass-bg backdrop-blur-lg rounded-2xl border border-glass-border p-6 md:p-8 shadow-2xl transition-all duration-300 hover:border-white/30">
      {children}
    </div>
  );
};

export default GlassCard;

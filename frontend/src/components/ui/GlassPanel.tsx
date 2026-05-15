import React from 'react';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export default function GlassPanel({ children, className = '', glow = false, ...props }: GlassPanelProps) {
  return (
    <div 
      className={`glass rounded-2xl relative overflow-hidden group ${className}`} 
      {...props}
    >
      {/* Optional ambient glow effect inside the glass panel */}
      {glow && (
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50" />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

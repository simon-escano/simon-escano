import React from 'react';

export interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  borderRadius?: number;
  borderWidth?: number;
  backdropBlur?: number;
  glow?: boolean;
}

export const GlassSurface: React.FC<GlassSurfaceProps> = ({
  children,
  className = '',
  borderRadius = 20,
  backdropBlur = 12,
  glow = false,
  style,
  ...props
}) => {
  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 ${
        glow ? 'border border-brand-cobalt/40 shadow-lg shadow-brand-cobalt/10' : 'border border-white/10 dark:border-white/5'
      } bg-slate-100/60 dark:bg-slate-900/40 ${className}`}
      style={{
        borderRadius: `${borderRadius}px`,
        backdropFilter: `blur(${backdropBlur}px)`,
        WebkitBackdropFilter: `blur(${backdropBlur}px)`,
        ...style,
      }}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default GlassSurface;

import React from 'react'

export function GlassSurface({
  children,
  className = '',
  blur = 'backdrop-blur-md',
  opacity = 'bg-base-900/40',
  border = 'border-white/10',
  hoverEffect = true,
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${border} ${opacity} ${blur} shadow-xl shadow-black/10 transition-all duration-300 ${
        hoverEffect ? 'hover:border-white/20 hover:bg-base-900/60' : ''
      } ${className}`}
    >
      {/* Subtle top-edge light catch */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {children}
    </div>
  )
}

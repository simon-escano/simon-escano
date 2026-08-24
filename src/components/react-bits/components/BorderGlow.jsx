import React from 'react'

export function BorderGlow({
  children,
  className = '',
  glowColor = 'from-primary-500 via-accent-500 to-primary-500',
  glowSize = 2,
  duration = 4,
}) {
  return (
    <div className={`relative inline-block rounded-2xl p-[1px] ${className}`}>
      {/* Animated gradient perimeter glow */}
      <div
        className={`absolute -inset-[${glowSize}px] rounded-2xl bg-gradient-to-r ${glowColor} opacity-75 blur-sm transition-opacity duration-500 animate-gradient-flow`}
        style={{
          backgroundSize: '200% 200%',
          animationDuration: `${duration}s`,
        }}
      />

      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${glowColor} animate-gradient-flow`}
        style={{
          backgroundSize: '200% 200%',
          animationDuration: `${duration}s`,
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 h-full w-full rounded-2xl bg-base-950/90 backdrop-blur-xl">
        {children}
      </div>
    </div>
  )
}

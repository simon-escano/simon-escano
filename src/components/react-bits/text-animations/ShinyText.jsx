import React from 'react'

export function ShinyText({
  children,
  className = '',
  shimmerWidth = 100,
  speed = 3,
}) {
  return (
    <span
      className={`relative inline-block overflow-hidden bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(120deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.4) 40%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.4) 60%, rgba(255, 255, 255, 0.4) 100%)`,
        backgroundSize: `${shimmerWidth * 2}% 100%`,
        animation: `shimmer ${speed}s infinite linear`,
      }}
    >
      {children}
    </span>
  )
}

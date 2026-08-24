import React from 'react'

export function GradientText({
  children,
  className = '',
  colors = ['#3b82f6', '#f97316', '#60a5fa', '#fb923c', '#3b82f6'],
  animationSpeed = 8,
  showBorder = false,
}) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`,
  }

  return (
    <span
      className={`relative inline-flex items-center justify-center font-bold transition-shadow ${
        showBorder ? 'rounded-full border border-white/10 px-3 py-1 backdrop-blur-sm' : ''
      } ${className}`}
    >
      <span
        className="inline-block bg-[length:300%_100%] bg-clip-text text-transparent animate-gradient-flow"
        style={gradientStyle}
      >
        {children}
      </span>
    </span>
  )
}

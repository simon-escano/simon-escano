import React from 'react'

export function StrokeText({
  text = '',
  className = '',
  strokeColor = 'currentColor',
  strokeWidth = 2,
  fillColor = 'transparent',
  hoverFillColor = null,
}) {
  return (
    <span
      className={`relative inline-block transition-all duration-500 select-none ${className}`}
      style={{
        WebkitTextStroke: `${strokeWidth}px ${strokeColor}`,
        color: fillColor,
      }}
      onMouseEnter={(e) => {
        if (hoverFillColor) {
          e.currentTarget.style.color = hoverFillColor
        }
      }}
      onMouseLeave={(e) => {
        if (hoverFillColor) {
          e.currentTarget.style.color = fillColor
        }
      }}
    >
      {text}
    </span>
  )
}

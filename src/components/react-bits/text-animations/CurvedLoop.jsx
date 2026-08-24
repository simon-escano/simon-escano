import React from 'react'

export function CurvedLoop({
  text = 'SIMON ESCAÑO • FULL-STACK DEVELOPER • AI & GAME ARCHITECT • ',
  speed = 15,
  className = '',
}) {
  return (
    <div className={`relative w-full overflow-hidden select-none py-6 ${className}`}>
      <div
        className="flex w-fit whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
        }}
      >
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-base-500 opacity-60">
          {text.repeat(6)}
        </span>
      </div>
    </div>
  )
}

import React, { useState } from 'react'

export function LogoLoop({
  items = [],
  speed = 25,
  direction = 'left',
  pauseOnHover = true,
  className = '',
}) {
  const [activeTooltip, setActiveTooltip] = useState(null)

  const animationName = direction === 'left' ? 'marquee' : 'marquee-reverse'

  return (
    <div
      className={`relative w-full overflow-hidden py-3 select-none ${className}`}
    >
      {/* Side gradient fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-base-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-base-950 to-transparent" />

      <div
        className={`flex w-fit gap-4 ${
          pauseOnHover ? 'hover:[animation-play-state:paused]' : ''
        }`}
        style={{
          animation: `${animationName} ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {/* Render 3 copies for continuous seamless scrolling */}
        {[0, 1, 2].map((copyIndex) => (
          <div key={copyIndex} className="flex gap-4 shrink-0">
            {items.map((item, index) => {
              const uniqueKey = `${copyIndex}-${index}-${item.title || item.name}`
              const isHovered = activeTooltip === uniqueKey

              return (
                <div
                  key={uniqueKey}
                  onMouseEnter={() => setActiveTooltip(uniqueKey)}
                  onMouseLeave={() => setActiveTooltip(null)}
                  className="group relative flex items-center gap-2.5 rounded-xl border border-base-800/60 bg-base-900/60 px-4 py-2 backdrop-blur-sm transition-all duration-200 hover:border-primary-500/60 hover:bg-base-800/80 hover:shadow-md hover:shadow-primary-500/10 cursor-pointer"
                >
                  {item.icon && (
                    <span className="text-base-400 transition-colors group-hover:text-accent-400">
                      {item.icon}
                    </span>
                  )}

                  <span className="font-mono text-xs font-semibold text-base-200 group-hover:text-white transition-colors whitespace-nowrap">
                    {item.title || item.name}
                  </span>

                  {item.role && (
                    <span className="rounded-full bg-primary-950/60 border border-primary-800/40 px-2 py-0.5 font-mono text-[10px] text-primary-300">
                      {item.role}
                    </span>
                  )}

                  {/* Tooltip / Popover for Proficiency */}
                  {item.proficiency !== undefined && isHovered && (
                    <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 z-30 rounded-lg border border-base-700 bg-base-900/95 px-3 py-1 text-center shadow-xl backdrop-blur-md animate-in fade-in duration-150">
                      <div className="flex items-center gap-1.5 whitespace-nowrap">
                        <span className="font-mono text-[10px] text-base-400">
                          Proficiency:
                        </span>
                        <span className="font-mono text-[10px] font-bold text-accent-400">
                          {item.proficiency}/10
                        </span>
                      </div>
                      {/* Arrow */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 border-b border-r border-base-700 bg-base-900" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

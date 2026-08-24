import React, { useState } from 'react'
import { m, AnimatePresence } from 'motion/react'
import { Trophy, ChevronRight, Award, ExternalLink } from 'lucide-react'

export function AccordionGallery({ items = [], className = '' }) {
  const [expandedIndex, setExpandedIndex] = useState(0)

  return (
    <div className={`flex flex-col lg:flex-row gap-4 w-full h-[520px] ${className}`}>
      {items.map((item, index) => {
        const isExpanded = expandedIndex === index

        return (
          <m.div
            key={item.id || index}
            onClick={() => setExpandedIndex(index)}
            layout
            transition={{
              type: 'spring',
              stiffness: 250,
              damping: 25,
            }}
            className={`relative overflow-hidden rounded-2xl border transition-all duration-300 cursor-pointer ${
              isExpanded
                ? 'flex-[4] border-accent-500/50 bg-base-900/90 shadow-2xl shadow-accent-500/10'
                : 'flex-[1] border-base-800/60 bg-base-900/40 hover:border-base-700/80 hover:bg-base-850/60'
            }`}
          >
            {/* Ambient background glow when expanded */}
            {isExpanded && (
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-500/10 blur-3xl" />
            )}

            <div className="relative z-10 flex h-full flex-col justify-between p-6">
              {/* Header / Icon */}
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                    isExpanded
                      ? 'bg-accent-500/20 text-accent-400 border border-accent-500/40'
                      : 'bg-base-800/60 text-base-400 border border-base-700/40'
                  }`}
                >
                  <Trophy size={18} />
                </div>

                <span className="font-mono text-xs text-base-500">
                  0{index + 1}
                </span>
              </div>

              {/* Title & Body */}
              <div className="mt-6">
                <h4
                  className={`font-bold transition-colors ${
                    isExpanded
                      ? 'text-lg text-white'
                      : 'text-sm text-base-300 line-clamp-2'
                  }`}
                >
                  {item.title}
                </h4>

                <AnimatePresence>
                  {isExpanded && (
                    <m.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 overflow-hidden"
                    >
                      <p className="text-sm leading-relaxed text-base-300">
                        {item.description}
                      </p>

                      {item.tag && (
                        <span className="mt-4 inline-block rounded-full bg-primary-950/80 border border-primary-800/50 px-3 py-1 font-mono text-xs text-primary-300">
                          {item.tag}
                        </span>
                      )}
                    </m.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Expand Indicator */}
              <div className="mt-4 flex items-center justify-end">
                <ChevronRight
                  size={18}
                  className={`transition-transform duration-300 ${
                    isExpanded ? 'rotate-90 text-accent-400' : 'text-base-600'
                  }`}
                />
              </div>
            </div>
          </m.div>
        )
      })}
    </div>
  )
}

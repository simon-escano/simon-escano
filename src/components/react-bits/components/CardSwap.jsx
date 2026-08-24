import React, { useState } from 'react'
import { m, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { SpecularButton } from './SpecularButton'

export function CardSwap({ cards = [], className = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length)
  }

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Cards Deck */}
      <div className="relative h-[480px] w-full max-w-xl">
        <AnimatePresence mode="popLayout">
          {cards.map((card, index) => {
            // Calculate offset relative to currentIndex
            const offset = (index - currentIndex + cards.length) % cards.length

            // Only render top 3 visible cards in deck
            if (offset > 2) return null

            const isTop = offset === 0

            return (
              <m.div
                key={card.id}
                layout
                initial={{ scale: 0.9, y: 30, opacity: 0 }}
                animate={{
                  scale: 1 - offset * 0.05,
                  y: offset * 20,
                  zIndex: cards.length - offset,
                  opacity: 1 - offset * 0.25,
                }}
                exit={{
                  x: 300,
                  opacity: 0,
                  scale: 0.8,
                  transition: { duration: 0.35, ease: 'easeOut' },
                }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 24,
                }}
                className={`absolute inset-0 overflow-hidden rounded-3xl border border-base-800/80 bg-base-900/90 p-8 shadow-2xl backdrop-blur-xl ${
                  isTop ? 'border-primary-500/40 shadow-primary-500/10' : ''
                }`}
              >
                {/* Image Preview */}
                {card.gallery?.[0] && (
                  <div className="relative mb-6 h-48 w-full overflow-hidden rounded-2xl bg-base-950">
                    <img
                      src={`/data/images/${card.gallery[0].replace('/images/', '')}`}
                      alt={card.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-base-900 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-base-950/80 border border-white/10 px-3 py-1 font-mono text-[11px] text-accent-400 backdrop-blur-md">
                      Featured #{index + 1}
                    </span>
                  </div>
                )}

                {/* Card Content */}
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl font-bold text-white">
                      {card.title}
                    </h3>
                    <span className="font-mono text-xs text-primary-400">
                      {card.contributions}
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm text-base-400">
                    {card.one_liner}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {card.tech_stack.slice(0, 3).map((t) => (
                        <span
                          key={t.name}
                          className="rounded-full bg-base-800/80 px-2.5 py-0.5 font-mono text-[10px] text-base-300"
                        >
                          {t.name}
                        </span>
                      ))}
                    </div>

                    <Link
                      to={`/projects/${card.id}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent-400 transition-colors hover:text-accent-300"
                    >
                      View Case Study
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </m.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Deck Controls */}
      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={handlePrev}
          aria-label="Previous card"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-base-800 bg-base-900/80 text-base-300 backdrop-blur-sm transition-all hover:border-accent-500/50 hover:text-white active:scale-95"
        >
          <ChevronLeft size={20} />
        </button>

        <span className="font-mono text-xs text-base-500">
          <span className="font-bold text-accent-400">{currentIndex + 1}</span> / {cards.length}
        </span>

        <button
          onClick={handleNext}
          aria-label="Next card"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-base-800 bg-base-900/80 text-base-300 backdrop-blur-sm transition-all hover:border-accent-500/50 hover:text-white active:scale-95"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

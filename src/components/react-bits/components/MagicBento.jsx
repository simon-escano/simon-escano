import React from 'react'
import { SpotlightCard } from './SpotlightCard'

export function MagicBento({ children, className = '' }) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full ${className}`}
    >
      {children}
    </div>
  )
}

export function BentoCard({
  children,
  colSpan = 'col-span-1',
  rowSpan = 'row-span-1',
  className = '',
  spotlightColor,
  borderColor,
}) {
  return (
    <div className={`${colSpan} ${rowSpan} h-full`}>
      <SpotlightCard
        className={`h-full flex flex-col justify-between ${className}`}
        spotlightColor={spotlightColor}
        borderColor={borderColor}
      >
        {children}
      </SpotlightCard>
    </div>
  )
}

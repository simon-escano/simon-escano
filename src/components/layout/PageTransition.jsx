import { m } from 'motion/react'

/**
 * Wraps page content with enter/exit transitions.
 * Uses GPU-accelerated transforms only (opacity + y).
 */
export default function PageTransition({ children, className = '' }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={className}
    >
      {children}
    </m.div>
  )
}

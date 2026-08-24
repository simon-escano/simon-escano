import React, { useRef, useState } from 'react'
import { m } from 'motion/react'

export function SpecularButton({
  children,
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary', // 'primary' | 'outline' | 'glow'
}) {
  const buttonRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const baseStyles =
    'relative overflow-hidden rounded-full font-semibold transition-all duration-300 select-none flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-lg shadow-accent-500/25 hover:shadow-accent-500/40 hover:scale-[1.02] active:scale-[0.98]',
    outline:
      'border border-base-700/60 bg-base-900/40 text-base-200 backdrop-blur-md hover:border-primary-500/50 hover:bg-base-800/60 hover:text-white',
    glow:
      'border border-accent-500/40 bg-accent-950/40 text-accent-300 backdrop-blur-md shadow-lg shadow-accent-500/10 hover:shadow-accent-500/30 hover:border-accent-400',
  }

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
    >
      {/* Specular light spot */}
      {isHovered && (
        <span
          className="pointer-events-none absolute -inset-px rounded-full opacity-60 transition-opacity duration-300"
          style={{
            background: `radial-gradient(120px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.4), transparent 80%)`,
          }}
        />
      )}

      {/* Sheen sweep animation */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  )
}

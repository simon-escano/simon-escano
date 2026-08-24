import React, { useRef, useState, useEffect } from 'react'
import { m } from 'motion/react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export function Lanyard({
  name = 'Simon Escaño',
  role = 'Full-Stack Developer',
  avatar = '/data/images/Escano_Business-Profile-Image_Transparent.png',
  className = '',
}) {
  const { ref: containerRef, isInView } = useIntersectionObserver({ threshold: 0.1 })
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef({ x: 0, y: 0 })

  const handleMouseDown = (e) => {
    setIsDragging(true)
    dragStartRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    const deltaX = e.clientX - dragStartRef.current.x
    const deltaY = e.clientY - dragStartRef.current.y

    setRotation({
      x: Math.max(-25, Math.min(25, -deltaY * 0.3)),
      y: Math.max(-30, Math.min(30, deltaX * 0.3)),
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setRotation({ x: 0, y: 0 })
  }

  useEffect(() => {
    if (!isDragging) {
      const timer = setTimeout(() => setRotation({ x: 0, y: 0 }), 100)
      return () => clearTimeout(timer)
    }
  }, [isDragging])

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className={`relative flex flex-col items-center justify-center select-none ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* Lanyard Ribbon / Strap */}
      <div className="relative flex flex-col items-center">
        {/* Lanyard Neck Clip */}
        <div className="h-8 w-16 rounded-b-xl border-t border-base-700 bg-gradient-to-b from-base-800 to-base-900 shadow-md" />

        {/* Lanyard Fabric Strap */}
        <div className="h-24 w-8 bg-gradient-to-b from-primary-600 via-primary-700 to-primary-800 shadow-inner">
          <div className="flex h-full flex-col justify-around py-2 opacity-40">
            <div className="h-px w-full bg-white" />
            <div className="h-px w-full bg-white" />
            <div className="h-px w-full bg-white" />
          </div>
        </div>

        {/* Metal Carabiner Clip */}
        <div className="relative -mt-1 h-8 w-6 rounded-full border-2 border-base-400 bg-base-800 shadow-sm">
          <div className="absolute inset-1 rounded-full bg-base-950" />
        </div>
      </div>

      {/* Physics Interactive ID Badge Card */}
      <m.div
        onMouseDown={handleMouseDown}
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          rotateZ: rotation.y * 0.2,
        }}
        transition={{
          type: 'spring',
          stiffness: 220,
          damping: 18,
          mass: 0.8,
        }}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'top center',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        className="relative -mt-2 w-72 overflow-hidden rounded-3xl border border-base-700/80 bg-base-900/95 p-6 shadow-2xl backdrop-blur-2xl transition-shadow duration-300 hover:shadow-primary-500/20"
      >
        {/* Holographic Badge Header */}
        <div className="flex items-center justify-between border-b border-base-800/80 pb-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent-500 shadow-sm shadow-accent-500" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-base-300">
              Dev Pass
            </span>
          </div>
          <span className="font-mono text-[10px] text-base-500">2026</span>
        </div>

        {/* Profile Avatar Frame */}
        <div className="relative mx-auto mt-5 h-44 w-44 overflow-hidden rounded-2xl border-2 border-primary-500/40 bg-gradient-to-b from-primary-950/60 to-base-950">
          <img
            src={avatar}
            alt={name}
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-950 via-transparent to-transparent opacity-60" />
        </div>

        {/* Badge Metadata */}
        <div className="mt-5 text-center">
          <h3 className="font-display text-xl font-bold text-white">
            {name}
          </h3>
          <p className="mt-0.5 font-mono text-xs font-semibold text-accent-400">
            {role}
          </p>

          {/* Barcode Strip */}
          <div className="mt-4 flex items-center justify-center gap-1 opacity-70">
            {[2, 4, 1, 3, 5, 2, 1, 4, 2, 3, 1, 5, 3, 2, 4, 1].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-base-400 rounded-sm"
                style={{ height: `${h * 4 + 8}px` }}
              />
            ))}
          </div>
          <span className="font-mono text-[9px] text-base-600">SE-2026-FULLSTACK</span>
        </div>

        {/* Specular glare reflection across the badge plastic */}
        <div className="pointer-events-none absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45 opacity-60" />
      </m.div>
    </div>
  )
}

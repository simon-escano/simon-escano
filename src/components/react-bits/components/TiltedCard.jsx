import React, { useRef, useState } from 'react'
import { m } from 'motion/react'

export function TiltedCard({
  children,
  className = '',
  maxTilt = 12,
  perspective = 1000,
  scaleOnHover = 1.02,
  glare = true,
}) {
  const cardRef = useRef(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const tiltX = ((y - centerY) / centerY) * -maxTilt
    const tiltY = ((x - centerX) / centerX) * maxTilt

    setRotateX(tiltX)
    setRotateY(tiltY)

    if (glare) {
      setGlarePos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
      })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <div
      style={{ perspective: `${perspective}px` }}
      className={`relative inline-block w-full ${className}`}
    >
      <m.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? scaleOnHover : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          mass: 0.5,
        }}
        style={{
          transformStyle: 'preserve-3d',
        }}
        className="relative h-full w-full overflow-hidden rounded-2xl"
      >
        {children}

        {/* Dynamic Specular Glare */}
        {glare && isHovered && (
          <div
            className="pointer-events-none absolute -inset-full opacity-40 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.35) 0%, transparent 60%)`,
            }}
          />
        )}
      </m.div>
    </div>
  )
}

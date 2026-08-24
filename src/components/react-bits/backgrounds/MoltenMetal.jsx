import React, { useEffect, useRef } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'

export function MoltenMetal({
  className = '',
  colorA = [9, 13, 22],      // #090d16
  colorB = [29, 57, 216],    // Cobalt blue #1d39d8
  colorC = [249, 115, 22],   // Electric orange #f97316
  speed = 0.0015,
}) {
  const canvasRef = useRef(null)
  const { ref: containerRef, isInView } = useIntersectionObserver({ threshold: 0.05 })
  const animationFrameRef = useRef(null)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth)
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight)

    const handleResize = () => {
      if (!canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }

    window.addEventListener('resize', handleResize, { passive: true })

    // Noise/flow wave simulation
    const render = () => {
      if (!isInView) {
        // Pause animation when out of view per performance tips
        return
      }

      timeRef.current += speed
      const t = timeRef.current

      // Create rich fluid molten gradients
      const gradient1 = ctx.createRadialGradient(
        width * 0.3 + Math.sin(t * 1.2) * (width * 0.25),
        height * 0.4 + Math.cos(t * 0.9) * (height * 0.25),
        50,
        width * 0.3,
        height * 0.4,
        Math.max(width, height) * 0.8
      )

      gradient1.addColorStop(0, `rgba(${colorB[0]}, ${colorB[1]}, ${colorB[2]}, 0.35)`)
      gradient1.addColorStop(0.5, `rgba(${colorB[0]}, ${colorB[1]}, ${colorB[2]}, 0.1)`)
      gradient1.addColorStop(1, `rgba(${colorA[0]}, ${colorA[1]}, ${colorA[2]}, 0)`)

      const gradient2 = ctx.createRadialGradient(
        width * 0.7 + Math.cos(t * 1.1) * (width * 0.3),
        height * 0.6 + Math.sin(t * 1.3) * (height * 0.3),
        30,
        width * 0.7,
        height * 0.6,
        Math.max(width, height) * 0.7
      )

      gradient2.addColorStop(0, `rgba(${colorC[0]}, ${colorC[1]}, ${colorC[2]}, 0.22)`)
      gradient2.addColorStop(0.6, `rgba(${colorC[0]}, ${colorC[1]}, ${colorC[2]}, 0.05)`)
      gradient2.addColorStop(1, `rgba(${colorA[0]}, ${colorA[1]}, ${colorA[2]}, 0)`)

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = `rgb(${colorA[0]}, ${colorA[1]}, ${colorA[2]})`
      ctx.fillRect(0, 0, width, height)

      ctx.globalCompositeOperation = 'screen'
      ctx.fillStyle = gradient1
      ctx.fillRect(0, 0, width, height)

      ctx.fillStyle = gradient2
      ctx.fillRect(0, 0, width, height)

      // Ambient overlay
      ctx.globalCompositeOperation = 'source-over'

      animationFrameRef.current = requestAnimationFrame(render)
    }

    if (isInView) {
      animationFrameRef.current = requestAnimationFrame(render)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isInView, colorA, colorB, colorC, speed])

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full opacity-70" />
      {/* Subtle top/bottom mesh overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-950/20 via-transparent to-base-950/80" />
      <div className="absolute inset-0 bg-base-950/30 backdrop-blur-[80px]" />
    </div>
  )
}

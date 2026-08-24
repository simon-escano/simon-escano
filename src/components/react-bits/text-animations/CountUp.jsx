import React, { useEffect, useState, useRef } from 'react'
import { useInView } from 'motion/react'

export function CountUp({
  to = 0,
  from = 0,
  duration = 2,
  separator = ',',
  className = '',
  suffix = '',
  prefix = '',
}) {
  const [count, setCount] = useState(from)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (!isInView) return

    let startTime = null
    let animationFrameId = null

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      // Ease out expo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      
      const current = Math.floor(from + (to - from) * easeProgress)
      setCount(current)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      } else {
        setCount(to)
      }
    }

    animationFrameId = requestAnimationFrame(step)

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [isInView, from, to, duration])

  const formatted = count.toLocaleString().replace(/,/g, separator)

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

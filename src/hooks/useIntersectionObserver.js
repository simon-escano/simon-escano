import { useEffect, useRef, useState } from 'react'

/**
 * Custom hook wrapping IntersectionObserver.
 * Returns a ref to attach to the target element and an isInView boolean.
 * Used to pause heavy canvas/WebGL renders when off-screen.
 */
export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px',
} = {}) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold, rootMargin }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin])

  return { ref, isInView }
}

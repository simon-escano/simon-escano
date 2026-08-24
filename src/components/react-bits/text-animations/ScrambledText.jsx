import React, { useEffect, useState, useRef } from 'react'

const GLYPHS = '01!@#$%^&*()_+~|}{[]:;?><,./-=qwertyuiopasdfghjklzxcvbnm'

export function ScrambledText({
  text = '',
  speed = 40,
  maxIterations = 10,
  sequential = true,
  revealDelay = 100,
  className = '',
  triggerOnHover = true,
}) {
  const [displayText, setDisplayText] = useState(text)
  const isScramblingRef = useRef(false)
  const intervalRef = useRef(null)

  const scramble = () => {
    if (isScramblingRef.current) return
    isScramblingRef.current = true

    let iteration = 0
    const chars = text.split('')
    const targetLength = chars.length

    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      setDisplayText(
        chars
          .map((char, index) => {
            if (char === ' ') return ' '
            if (sequential) {
              if (index < iteration / maxIterations * targetLength) {
                return char
              }
            } else {
              if (iteration >= maxIterations) {
                return char
              }
            }
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          })
          .join('')
      )

      iteration += 1

      if (iteration > (sequential ? maxIterations * 1.5 : maxIterations)) {
        clearInterval(intervalRef.current)
        setDisplayText(text)
        isScramblingRef.current = false
      }
    }, speed)
  }

  useEffect(() => {
    scramble()
    return () => clearInterval(intervalRef.current)
  }, [text])

  return (
    <span
      className={`inline-block cursor-default select-none ${className}`}
      onMouseEnter={triggerOnHover ? scramble : undefined}
    >
      {displayText}
    </span>
  )
}

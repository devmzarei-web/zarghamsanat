'use client'

import { useEffect, useRef, useState, RefObject } from 'react'

interface UseCountUpOptions {
  end: number
  duration?: number
  start?: number
  once?: boolean
}

export function useCountUp(
  options: UseCountUpOptions
): [number, RefObject<HTMLElement | null>] {
  const { end, duration = 2000, start = 0, once = true } = options
  const [count, setCount] = useState(start)
  const ref = useRef<HTMLElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !(once && hasAnimated.current)) {
            hasAnimated.current = true

            const startTime = performance.now()
            const range = end - start

            const tick = (now: number) => {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              // Ease out expo
              const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
              setCount(Math.round(start + range * eased))

              if (progress < 1) requestAnimationFrame(tick)
            }

            requestAnimationFrame(tick)

            if (once) observer.unobserve(el)
          }
        })
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration, start, once])

  return [count, ref]
}

'use client'

import { useEffect, useRef, RefObject } from 'react'

type RevealVariant = 'up' | 'left' | 'right' | 'scale' | 'fade'

interface UseRevealOptions {
  variant?: RevealVariant
  delay?: number
  threshold?: number
  once?: boolean
}

export function useReveal<T extends HTMLElement>(
  options: UseRevealOptions = {}
): RefObject<T | null> {
  const {
    variant = 'up',
    delay = 0,
    threshold = 0.15,
    once = true,
  } = options

  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Set initial state
    const getInitialStyle = () => {
      switch (variant) {
        case 'left': return { opacity: '0', transform: 'translateX(-40px)' }
        case 'right': return { opacity: '0', transform: 'translateX(40px)' }
        case 'scale': return { opacity: '0', transform: 'scale(0.9)' }
        case 'fade': return { opacity: '0', transform: 'none' }
        default: return { opacity: '0', transform: 'translateY(30px)' }
      }
    }

    const initial = getInitialStyle()
    Object.assign(el.style, initial)
    el.style.transition = `opacity 0.75s ease ${delay}ms, transform 0.75s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.style.opacity = '1'
            el.style.transform = 'none'
            if (once) observer.unobserve(el)
          } else if (!once) {
            Object.assign(el.style, getInitialStyle())
          }
        })
      },
      { threshold }
    )

    // Small delay to ensure initial paint
    const timer = setTimeout(() => observer.observe(el), 50)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [variant, delay, threshold, once])

  return ref
}

// Stagger hook for containers of children
export function useStaggerReveal<T extends HTMLElement>(
  staggerMs: number = 80,
  options: Omit<UseRevealOptions, 'delay'> = {}
): RefObject<T | null> {
  const { variant = 'up', threshold = 0.1, once = true } = options
  const ref = useRef<T>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const children = Array.from(container.children) as HTMLElement[]

    const getInitialStyle = () => {
      switch (variant) {
        case 'left': return { opacity: '0', transform: 'translateX(-40px)' }
        case 'right': return { opacity: '0', transform: 'translateX(40px)' }
        case 'scale': return { opacity: '0', transform: 'scale(0.9)' }
        case 'fade': return { opacity: '0', transform: 'none' }
        default: return { opacity: '0', transform: 'translateY(30px)' }
      }
    }

    children.forEach((child, i) => {
      Object.assign(child.style, getInitialStyle())
      child.style.transition = `opacity 0.7s ease ${i * staggerMs}ms, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${i * staggerMs}ms`
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child) => {
              child.style.opacity = '1'
              child.style.transform = 'none'
            })
            if (once) observer.unobserve(container)
          }
        })
      },
      { threshold }
    )

    const timer = setTimeout(() => observer.observe(container), 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [staggerMs, variant, threshold, once])

  return ref
}

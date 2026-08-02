'use client'

import { useEffect, useRef, useState } from 'react'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'zoom-in'
  duration?: number
  delay?: number
  threshold?: number
}

export default function ScrollReveal({
  children,
  className = '',
  animation = 'fade-up',
  duration = 700,
  delay = 0,
  threshold = 0.1,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = domRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold])

  const baseStyle = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionProperty: 'opacity, transform',
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    opacity: isVisible ? 1 : 0,
  }

  const getTransform = () => {
    if (isVisible) return 'none'
    switch (animation) {
      case 'fade-up':
        return 'translateY(40px)'
      case 'slide-left':
        return 'translateX(40px)'
      case 'slide-right':
        return 'translateX(-40px)'
      case 'zoom-in':
        return 'scale(0.95)'
      case 'fade-in':
      default:
        return 'none'
    }
  }

  const style = {
    ...baseStyle,
    transform: getTransform(),
  }

  return (
    <div ref={domRef} className={className} style={style}>
      {children}
    </div>
  )
}

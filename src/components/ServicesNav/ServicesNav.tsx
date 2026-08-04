'use client'

import { useState, useEffect } from 'react'
import styles from './ServicesNav.module.css'

interface ServiceNavItem {
  id: string
  title: string
  slug: string
}

interface ServicesNavProps {
  services: ServiceNavItem[]
}

export default function ServicesNav({ services }: ServicesNavProps) {
  const [activeSlug, setActiveSlug] = useState<string>(services[0]?.slug || '')

  useEffect(() => {
    if (typeof window === 'undefined' || services.length === 0) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (let i = services.length - 1; i >= 0; i--) {
        const service = services[i]
        const element = document.getElementById(`service-${service.slug}`)
        if (element) {
          const top = element.offsetTop
          if (scrollPosition >= top) {
            setActiveSlug(service.slug)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [services])

  const scrollToService = (slug: string) => {
    setActiveSlug(slug)
    const element = document.getElementById(`service-${slug}`)
    if (element) {
      const headerOffset = 130
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className={styles.stickyWrapper}>
      <div className="container">
        <nav className={styles.navBar} aria-label="فهرست خدمات">
          <div className={styles.navHeader}>
            <span className={styles.navTitle}>دسترسی سریع به خدمات:</span>
          </div>
          <div className={styles.pillsScrollContainer}>
            {services.map((svc) => {
              const isActive = activeSlug === svc.slug
              return (
                <button
                  key={svc.slug}
                  onClick={() => scrollToService(svc.slug)}
                  className={`${styles.pillBtn} ${isActive ? styles.pillBtnActive : ''}`}
                >
                  <span className={styles.pillDot} />
                  <span>{svc.title}</span>
                </button>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}

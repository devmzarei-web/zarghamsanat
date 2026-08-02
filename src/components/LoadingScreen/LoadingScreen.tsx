'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const overlayRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only show on first visit
    const shown = sessionStorage.getItem('zs-loading-shown')
    if (shown) {
      setVisible(false)
      return
    }

    sessionStorage.setItem('zs-loading-shown', 'true')

    const overlay = overlayRef.current
    const logo = logoRef.current
    const progress = progressRef.current
    if (!overlay || !logo || !progress) return

    // Animate progress bar
    let start: number | null = null
    const duration = 1800

    const animateProgress = (timestamp: number) => {
      if (!start) start = timestamp
      const elapsed = timestamp - start
      const pct = Math.min((elapsed / duration) * 100, 100)
      progress.style.width = `${pct}%`
      if (pct < 100) requestAnimationFrame(animateProgress)
    }
    requestAnimationFrame(animateProgress)

    // Logo entrance
    setTimeout(() => {
      logo.style.opacity = '1'
      logo.style.transform = 'translateY(0) scale(1)'
    }, 100)

    // Exit animation
    const exitTimer = setTimeout(() => {
      overlay.style.clipPath = 'inset(0 0 100% 0)'
      overlay.style.transition = 'clip-path 0.7s cubic-bezier(0.76, 0, 0.24, 1)'
      setTimeout(() => setVisible(false), 700)
    }, duration + 400)

    return () => clearTimeout(exitTimer)
  }, [])

  if (!visible) return null

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <div className={styles.inner}>
        <div ref={logoRef} className={styles.logoWrap}>
          {/* Z mark */}
          <div className={styles.zMark}>
            <img
              src="/images/Zargham-Logo.png"
              alt="ضرغام صنعت اروند"
              width={90}
              height={90}
              style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            />
          </div>
          <div className={styles.companyName}>
            <span className={styles.nameMain}>ضرغام صنعت</span>
            <span className={styles.nameSub}>اروند</span>
          </div>
        </div>

        <div className={styles.progressBar}>
          <div ref={progressRef} className={styles.progressFill} />
        </div>

        <p className={styles.tagline}>در حال بارگذاری...</p>
      </div>
    </div>
  )
}

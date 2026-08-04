'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import styles from './BackToTopButton.module.css'

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      className={styles.backToTopBtn}
      aria-label="بازگشت به بالای صفحه"
      title="بازگشت به بالای صفحه"
    >
      <ArrowUp size={20} />
      <span className={styles.btnText}>بالای صفحه</span>
    </button>
  )
}

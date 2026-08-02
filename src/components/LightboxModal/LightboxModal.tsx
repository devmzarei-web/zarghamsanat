'use client'

import { useEffect, useState } from 'react'
// @ts-ignore
import { createPortal } from 'react-dom'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './LightboxModal.module.css'

export interface LightboxImage {
  url: string
  title: string
  issuer?: string
}

interface LightboxModalProps {
  isOpen: boolean
  onClose: () => void
  images: LightboxImage[]
  currentIndex: number
  onNavigate: (index: number) => void
}

export default function LightboxModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}: LightboxModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNavigate((currentIndex + 1) % images.length)
      if (e.key === 'ArrowRight') onNavigate((currentIndex - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, currentIndex, images.length, onClose, onNavigate])

  if (!isOpen || images.length === 0 || !mounted) return null

  const current = images[currentIndex] || images[0]

  return createPortal(
    <div className={styles.backdrop} onClick={onClose} aria-modal="true" role="dialog">
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose} aria-label="بستن">
          <X size={24} />
        </button>

        {/* Previous Button */}
        {images.length > 1 && (
          <button
            className={`${styles.navBtn} ${styles.prevBtn}`}
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            aria-label="عکس قبلی"
          >
            <ChevronRight size={28} />
          </button>
        )}

        {/* Image Preview Box */}
        <div className={styles.imageWrap}>
          <img src={current.url} alt={current.title} className={styles.img} />

          {/* Info Footer */}
          <div className={styles.infoFooter}>
            <div className={styles.infoText}>
              <h3 className={styles.title}>{current.title}</h3>
              {current.issuer && <p className={styles.issuer}>{current.issuer}</p>}
            </div>
            <div className={styles.counter}>
              {currentIndex + 1} از {images.length}
            </div>
          </div>
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            className={`${styles.navBtn} ${styles.nextBtn}`}
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            aria-label="عکس بعدی"
          >
            <ChevronLeft size={28} />
          </button>
        )}
      </div>
    </div>,
    document.body
  )
}

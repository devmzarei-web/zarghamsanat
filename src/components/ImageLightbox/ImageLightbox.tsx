'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import styles from './ImageLightbox.module.css'

interface ImageLightboxProps {
  src: string
  alt?: string
  caption?: string
  onClose: () => void
}

export default function ImageLightbox({ src, alt, caption, onClose }: ImageLightboxProps) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <button className={styles.closeBtn} onClick={onClose} aria-label="بستن">
        <X size={24} />
      </button>

      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt || 'تصویر پروژه'} className={styles.image} />
        {caption && <p className={styles.caption}>{caption}</p>}
      </div>
    </div>
  )
}

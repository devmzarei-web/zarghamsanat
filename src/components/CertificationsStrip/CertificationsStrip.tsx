'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, Award, ChevronLeft } from 'lucide-react'
import LightboxModal from '@/components/LightboxModal/LightboxModal'
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal'
import styles from './CertificationsStrip.module.css'

interface DocumentScanItem {
  id?: string
  title: string
  issuer?: string
  url: string
}

interface CertificationsStripProps {
  certificates?: any[]
}

export default function CertificationsStrip({ certificates = [] }: CertificationsStripProps = {}) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const cmsDocs: DocumentScanItem[] = certificates
    ? certificates
        .map((c: any) => ({
          id: c.id,
          title: c.name || c.title,
          issuer: c.issuer,
          url: typeof c.image === 'object' && c.image?.url ? c.image.url : c.url,
          order: c.order ?? 0,
        }))
        .filter((d) => Boolean(d.url))
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : []

  if (cmsDocs.length === 0) return null

  const openLightbox = (index: number) => {
    setLightboxIndex(index % cmsDocs.length)
    setLightboxOpen(true)
  }

  // Repeat items if necessary to ensure a smooth loop
  const tickerItems = cmsDocs.length < 10 ? [...cmsDocs, ...cmsDocs, ...cmsDocs, ...cmsDocs] : [...cmsDocs, ...cmsDocs]

  return (
    <>
      <section className={styles.section} aria-label="گواهینامه‌ها و رضایت‌نامه‌ها">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className={styles.header}>
              <div>
                <span className="section-label">اعتبار و حسن انجام کار</span>
                <h2 className="section-title section-title--white">گواهینامه‌های قانونی و رضایت‌نامه‌های کارفرمایان</h2>
                <div className="orange-divider" />
              </div>
              <Link href="/certificates" className="btn btn--outline">
                <Award size={18} />
                مشاهده تمامی اسناد
                <ChevronLeft size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* 100% Full Unbroken Infinite Ticker */}
        <div className={styles.tickerWrapper}>
          <div className={styles.tickerTrack}>
            {tickerItems.map((doc, idx) => (
              <div
                key={`doc-ticker-${idx}`}
                className={styles.imageItem}
                onClick={() => openLightbox(idx)}
                title={`${doc.title} — ${doc.issuer}`}
              >
                <img src={doc.url} alt={doc.title} className={styles.docImg} />
                <div className={styles.overlay}>
                  <Eye size={32} className={styles.zoomIcon} />
                  <span className={styles.zoomText}>{doc.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={cmsDocs.map(d => ({ url: d.url, title: d.title, issuer: d.issuer }))}
        currentIndex={lightboxIndex}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </>
  )
}

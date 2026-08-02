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

// All official certificates & satisfaction letters combined from PowerPoint catalogue
const ALL_DOCUMENTS: DocumentScanItem[] = [
  { title: 'گواهینامه رتبه‌بندی و صلاحیت پیمانکاری', issuer: 'سازمان مدیریت و برنامه‌ریزی کشور', url: '/media/image2.png' },
  { title: 'گواهینامه صلاحیت ایمنی پیمانکاران (HSE)', issuer: 'وزارت تعاون، کار و رفاه اجتماعی', url: '/media/image3.jpg' },
  { title: 'گواهینامه عضویت انجمن شرکت‌های ساختمانی خوزستان', issuer: 'انجمن شرکت‌های ساختمانی', url: '/media/image4.jpg' },
  { title: 'گواهینامه صلاحیت رتبه‌بندی ۵ نفت و گاز', issuer: 'معاونت برنامه‌ریزی و نظارت راهبردی', url: '/media/image5.jpg' },
  { title: 'گواهینامه سیستم مدیریت کیفیت ISO 9001:2015', issuer: 'مرکز بین‌المللی ISO', url: '/media/image6.jpg' },
  { title: 'گواهینامه ایمنی و بهداشت شغلی ISO 45001:2018', issuer: 'مرکز بین‌المللی ISO', url: '/media/image7.jpg' },
  { title: 'رضایت‌نامه و تاییدیه حسن انجام کار', issuer: 'مهندسی و ساختمان تیو انرژی', url: '/media/image47.png' },
  { title: 'رضایت‌نامه و تاییدیه حسن انجام کار', issuer: 'شرکت صنعتی پیشگامان فولاد شرق و عمراب', url: '/media/image48.png' },
  { title: 'رضایت‌نامه و تاییدیه حسن انجام کار', issuer: 'شرکت پالایش نفت آبادان', url: '/media/image49.png' },
  { title: 'رضایت‌نامه و تاییدیه حسن انجام کار', issuer: 'شرکت جهان فولاد سیرجان', url: '/media/image50.jpg' },
  { title: 'رضایت‌نامه و تاییدیه حسن انجام کار', issuer: 'شرکت ماشین‌سازی ویژه', url: '/media/image51.jpg' },
  { title: 'رضایت‌نامه و تاییدیه حسن انجام کار', issuer: 'شرکت کمک‌صنعتگران جنوب', url: '/media/image52.jpg' },
  { title: 'رضایت‌نامه و تاییدیه حسن انجام کار', issuer: 'شرکت طراحی و مهندسی عالی‌نام', url: '/media/image53.jpg' },
]

interface CertificationsStripProps {
  certificates?: any[]
}

export default function CertificationsStrip({ certificates }: CertificationsStripProps = {}) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxIndex(index % ALL_DOCUMENTS.length)
    setLightboxOpen(true)
  }

  // Multiply documents 3 times for a 100% full, unbroken infinite loop circle
  const tickerItems = [...ALL_DOCUMENTS, ...ALL_DOCUMENTS, ...ALL_DOCUMENTS]

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
        images={ALL_DOCUMENTS.map(d => ({ url: d.url, title: d.title, issuer: d.issuer }))}
        currentIndex={lightboxIndex}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </>
  )
}

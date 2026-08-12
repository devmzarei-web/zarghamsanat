'use client'

import { useState, useEffect } from 'react'
import { Eye } from 'lucide-react'
import PageHero from '@/components/PageHero/PageHero'
import LightboxModal from '@/components/LightboxModal/LightboxModal'

const DEFAULT_OFFICIAL_CERTS = [
  { id: '1', name: 'گواهینامه رتبه‌بندی و صلاحیت پیمانکاری', type: 'iso-9001', issuer: 'سازمان مدیریت و برنامه‌ریزی کشور', url: '/media/image2.png' },
  { id: '2', name: 'گواهینامه صلاحیت ایمنی پیمانکاران (HSE)', type: 'hse', issuer: 'وزارت تعاون، کار و رفاه اجتماعی', url: '/media/image3.jpg' },
  { id: '3', name: 'گواهینامه عضویت انجمن شرکت‌های ساختمانی خوزستان', type: 'inspection', issuer: 'انجمن شرکت‌های ساختمانی و تاسیساتی', url: '/media/image4.jpg' },
  { id: '4', name: 'گواهینامه صلاحیت رتبه‌بندی ۵ نفت و گاز', type: 'iso-9001', issuer: 'معاونت برنامه‌ریزی و نظارت راهبردی', url: '/media/image5.jpg' },
  { id: '5', name: 'گواهینامه سیستم مدیریت کیفیت ISO 9001:2015', type: 'iso-9001', issuer: 'مرکز صدور گواهینامه‌های بین‌المللی', url: '/media/image6.jpg' },
  { id: '6', name: 'گواهینامه سیستم مدیریت ایمنی و بهداشت ISO 45001:2018', type: 'iso-45001', issuer: 'مرکز صدور گواهینامه‌های بین‌المللی', url: '/media/image7.jpg' },
]

export default function CertificatesPage() {
  const [certs, setCerts] = useState<any[]>(DEFAULT_OFFICIAL_CERTS)
  const [pageMeta, setPageMeta] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const [certsRes, pageRes] = await Promise.all([
          fetch('/api/certificates?limit=50').then((r) => r.json()),
          fetch('/api/pages?where[slug][equals]=certificates').then((r) => r.json()),
        ])
        if (certsRes?.docs && certsRes.docs.length > 0) {
          setCerts(certsRes.docs)
        }
        if (pageRes?.docs?.[0]) {
          setPageMeta(pageRes.docs[0])
        }
      } catch (_) {}
      setLoading(false)
    }
    fetchData()
  }, [])

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  // Format official certificates for display
  const formattedCerts = certs.map((c) => ({
    id: c.id,
    name: c.name,
    issuer: c.issuer,
    url: typeof c.image === 'object' && c.image?.url ? c.image.url : c.url || '/media/image2.png',
  }))

  return (
    <>
      <PageHero
        title={pageMeta?.heroTitle || 'گواهینامه‌ها و صلاحیت‌های قانونی'}
        badge={pageMeta?.heroBadge || 'اعتبارسنجی و رتبه‌بندی'}
        subtitle={pageMeta?.heroSubtitle || 'گواهینامه‌های صلاحیت پیمانکاری، ایمنی (HSE) و استانداردهای بین‌المللی مدیریت کیفیت ISO شرکت ضرغام صنعت اروند'}
        breadcrumbs={[{ label: 'گواهینامه‌ها' }]}
        bgImage={pageMeta?.heroImage?.url || '/images/hero-slide-1.png'}
      />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {formattedCerts.map((cert, index) => (
              <div
                key={cert.id}
                className="card"
                onClick={() => openLightbox(index)}
                style={{
                  padding: '1.5rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                  background: '#ffffff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: '240px',
                  background: '#f8fafc',
                  borderRadius: '0.5rem',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <img src={cert.url} alt={cert.name} style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }} />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(15,37,69,0.85)',
                    opacity: 0,
                    transition: 'opacity 0.25s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    color: '#ffffff',
                  }}
                  className="cert-overlay"
                  >
                    <Eye size={28} style={{ color: '#f97316' }} />
                    <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>بزرگ‌نمایی گواهینامه</span>
                  </div>
                </div>
                <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f2545', fontFamily: 'var(--font-heading)' }}>
                  {cert.name}
                </h2>
                {cert.issuer && <p style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: 500 }}>{cert.issuer}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Gallery Modal */}
      {formattedCerts.length > 0 && (
        <LightboxModal
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          images={formattedCerts.map(c => ({ url: c.url, title: c.name, issuer: c.issuer }))}
          currentIndex={lightboxIndex}
          onNavigate={(idx) => setLightboxIndex(idx)}
        />
      )}
    </>
  )
}

'use client'

import { useState } from 'react'
import { Eye, Award, CheckCircle2 } from 'lucide-react'
import LightboxModal from '@/components/LightboxModal/LightboxModal'

interface ProjectSatisfactionCardProps {
  imageUrl: string
  clientName: string
  projectTitle: string
  notes?: string
}

export default function ProjectSatisfactionCard({
  imageUrl,
  clientName,
  projectTitle,
  notes,
}: ProjectSatisfactionCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div style={{
        background: 'var(--gray-50)',
        border: '1.5px solid var(--gray-200)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        marginTop: '2.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(201,146,42,0.12)', border: '1.5px solid rgba(201,146,42,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold-500)',
          }}>
            <Award size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--navy-900)', fontFamily: 'var(--font-heading)' }}>
              رضایت‌نامه و تاییدیه حسن انجام کار کارفرما
            </h3>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-500)' }}>
              صادر شده توسط {clientName}
            </span>
          </div>
        </div>

        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
          {notes || `شرکت ${clientName} طی این رضایت‌نامه رسمی، کیفیت اجرا، مدیریت زمان‌بندی و رعایت کامل الزامات فنی و ایمنی در پروژه ${projectTitle} توسط شرکت ضرغام صنعت اروند را تایید نموده است.`}
        </p>

        {/* Thumbnail viewer trigger */}
        <div
          onClick={() => setIsOpen(true)}
          style={{
            position: 'relative',
            maxWidth: '380px',
            height: '240px',
            background: 'var(--white)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--gray-300)',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-md)',
          }}
          className="card"
        >
          <img
            src={imageUrl}
            alt={`رضایت‌نامه ${clientName}`}
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '0.5rem' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(13,21,41,0.75)',
            opacity: 0, transition: 'opacity 0.25s ease',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: '0.5rem', color: 'var(--white)',
          }}
          className="cert-overlay"
          >
            <Eye size={32} style={{ color: 'var(--gold-400)' }} />
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>مشاهده نسخه کامل رضایت‌نامه</span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        images={[{ url: imageUrl, title: `رضایت‌نامه و تاییدیه حسن انجام کار — ${clientName}`, issuer: clientName }]}
        currentIndex={0}
        onNavigate={() => {}}
      />
    </>
  )
}

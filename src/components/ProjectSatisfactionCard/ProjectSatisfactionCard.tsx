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
      <div style={{ marginTop: '1rem' }}>
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

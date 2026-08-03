'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, Building2, MapPin, ArrowUpLeft, Briefcase } from 'lucide-react'
import { getProjectUrl } from '@/lib/utils'
import styles from './EmployerModal.module.css'

export interface Client {
  id: string
  name: string
  order?: number
  logo?: { url: string; alt?: string }
}

export interface Project {
  id: string
  title: string
  slug: string
  client?: string
  clientRelation?: any
  location?: string
  serviceDescription?: string
  coverImage?: { url: string; alt?: string }
  status?: string
}

interface EmployerModalProps {
  client: Client
  projects: Project[]
  onClose: () => void
}

export default function EmployerModal({ client, projects, onClose }: EmployerModalProps) {
  // Lock body scroll when modal is open
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

  const logoUrl = typeof client.logo === 'object' && client.logo?.url ? client.logo.url : null

  // Filter projects matching this employer (by clientRelation ID or client string match)
  const matchedProjects = projects.filter((p) => {
    if (!p) return false
    // 1. Check clientRelation (relationship field in Payload)
    if (p.clientRelation) {
      const rel = p.clientRelation
      if (Array.isArray(rel)) {
        if (rel.some((r: any) => (typeof r === 'object' ? String(r.id) === String(client.id) : String(r) === String(client.id)))) {
          return true
        }
      } else if (typeof rel === 'object' && rel !== null) {
        if (String(rel.id) === String(client.id) || String(rel.name) === String(client.name)) {
          return true
        }
      } else if (String(rel) === String(client.id)) {
        return true
      }
    }
    // 2. Check text field match / substring match
    if (p.client && client.name) {
      const pClientClean = p.client.trim().toLowerCase()
      const clientNameClean = client.name.trim().toLowerCase()
      if (pClientClean === clientNameClean || pClientClean.includes(clientNameClean) || clientNameClean.includes(pClientClean)) {
        return true
      }
    }
    return false
  })

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <div className={styles.employerLogoWrap}>
              {logoUrl ? (
                <img src={logoUrl} alt={client.name} className={styles.employerLogo} />
              ) : (
                <Building2 size={24} className={styles.employerIcon} />
              )}
            </div>
            <div className={styles.titleGroup}>
              <h2 className={styles.employerTitle}>{client.name}</h2>
              <span className={styles.projectCountBadge}>
                <Briefcase size={13} />
                {matchedProjects.length} پروژه ثبت شده
              </span>
            </div>
          </div>

          <button className={styles.closeBtn} onClick={onClose} aria-label="بستن پنجره">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className={styles.body}>
          {matchedProjects.length > 0 ? (
            <div className={styles.projectGrid}>
              {matchedProjects.map((proj) => {
                const coverUrl = proj.coverImage?.url
                return (
                  <Link
                    key={proj.id || proj.slug}
                    href={getProjectUrl(proj.slug)}
                    className={styles.projectCard}
                    onClick={onClose}
                  >
                    <div className={styles.cardImageWrap}>
                      {coverUrl ? (
                        <img src={coverUrl} alt={proj.title} className={styles.cardImage} />
                      ) : (
                        <div className={styles.cardPlaceholder}>
                          <Building2 size={32} />
                        </div>
                      )}
                      <span
                        className={`${styles.statusBadge} ${
                          proj.status === 'completed' ? styles.statusCompleted : styles.statusInProgress
                        }`}
                      >
                        {proj.status === 'completed' ? 'تکمیل شده' : 'در حال اجرا'}
                      </span>
                    </div>

                    <div className={styles.cardContent}>
                      <h3 className={styles.projectTitle}>{proj.title}</h3>
                      {proj.serviceDescription && (
                        <p className={styles.projectDesc}>{proj.serviceDescription}</p>
                      )}

                      <div className={styles.cardFooter}>
                        {proj.location ? (
                          <span className={styles.locationInfo}>
                            <MapPin size={13} />
                            {proj.location}
                          </span>
                        ) : <span />}

                        <span className={styles.viewLink}>
                          جزئیات پروژه
                          <ArrowUpLeft size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <Briefcase size={44} className={styles.emptyIcon} />
              <p>در حال حاضر پروژه‌ای برای کارفرمای «{client.name}» در سامانه انتخاب نشده است.</p>
              <Link href="/projects" className="btn btn--primary btn--sm" onClick={onClose}>
                مشاهده لیست تمامی پروژه‌ها
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

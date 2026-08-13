'use client'

import { User, Quote, Mail, Phone } from 'lucide-react'
import styles from './TeamSection.module.css'
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal'

interface TeamMember {
  id?: string
  name: string
  role: string
  isCeo?: boolean
  photo?: { url: string; alt?: string }
  bio?: string
  quote?: string
  email?: string
  phone?: string
}

interface TeamSectionProps {
  badge?: string
  title?: string
  members?: TeamMember[]
}

export default function TeamSection({
  badge = 'سرمایه انسانی و رهبری',
  title = 'مدیریت ارشد و تیم متخصصین',
  members = [],
}: TeamSectionProps) {
  const list = members

  if (!list || list.length === 0) return null

  return (
    <section className={styles.section} aria-label="مدیریت و اعضای تیم">
      <div className="container">
        <ScrollReveal animation="fade-up">
          <div className={styles.header}>
            <span className="section-label">{badge}</span>
            <h2 className="section-title">{title}</h2>
            <div className="gold-divider gold-divider--center" />
          </div>
        </ScrollReveal>

        {/* Compact & Uniform Members Grid */}
        <div className={styles.teamGrid}>
          {list.map((member, idx) => (
            <ScrollReveal key={member.id || idx} animation="fade-up" delay={150 + idx * 80}>
              <div className={`${styles.memberCard} ${member.isCeo ? styles.ceoCardAccent : ''}`}>
                <div className={styles.cardHeader}>
                  <div className={styles.photoWrap}>
                    {member.photo?.url ? (
                      <img src={member.photo.url} alt={member.name} className={styles.photo} />
                    ) : (
                      <div className={styles.placeholder}>
                        <User size={32} className={styles.userIcon} />
                      </div>
                    )}
                  </div>

                  <div className={styles.nameGroup}>
                    <span className={styles.roleBadge}>{member.role}</span>
                    <h3 className={styles.memberName}>{member.name}</h3>
                  </div>
                </div>

                {member.quote && (
                  <div className={styles.quoteBox}>
                    <Quote size={16} className={styles.quoteIcon} />
                    <p className={styles.quoteText}>{member.quote}</p>
                  </div>
                )}

                {member.bio && <p className={styles.memberBio}>{member.bio}</p>}

                {(member.email || member.phone) && (
                  <div className={styles.cardFooter}>
                    {member.email && (
                      <a href={`mailto:${member.email}`} className={styles.contactLink} title="ایمیل">
                        <Mail size={14} />
                        <span>{member.email}</span>
                      </a>
                    )}
                    {member.phone && (
                      <a href={`tel:${member.phone}`} className={styles.contactLink} title="تلفن">
                        <Phone size={14} />
                        <span>{member.phone}</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

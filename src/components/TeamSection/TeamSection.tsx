'use client'

import { User, Quote, Mail, Phone, ShieldCheck, Briefcase } from 'lucide-react'
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
  members?: TeamMember[]
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    name: 'مدیریت ارشد اجرایی شرکت',
    role: 'مدیرعامل و رئیس هیئت مدیره',
    isCeo: true,
    bio: 'با بیش از ۱۵ سال سابقه راهبری پروژه‌های کلان پایپینگ، نصب تجهیزات مکانیکی و مخازن ذخیره در صنایع نفت، گاز و پتروشیمی خوزستان و جنوب کشور.',
    quote: 'ارتقای مستمر کیفیت فنی، تعهد دقیق به جدول زمان‌بندی و اولویت‌بخشی کامل به ایمنی (HSE)، منشور اخلاقی و نقشه راه ضرغام صنعت اروند است.',
    email: 'info@zarghamsanat.ir',
  },
  {
    name: 'مدیریت پروژه‌ها و برنامه‌ریزی',
    role: 'مدیر پروژه‌ها',
    bio: 'سرپرستی تیم‌های اجرایی سایت و کنترل دقیق زمان‌بندی و تحویل پروژه‌ها طبق بودجه.',
  },
  {
    name: 'سرپرست ارشد مهندسی و جوشکاری',
    role: 'مدیر کنترل کیفیت (QC)',
    bio: 'بازرسی فنی، نظارت بر تست‌های NDT و انطباق پروژه‌ها با کدهای ASME Sec IX و NACE.',
  },
  {
    name: 'سرمهندس نصب تجهیزات مکانیکال',
    role: 'سرپرست اجرایی سایت',
    bio: 'هدایت تیم‌های فیتر، جوشکاران ۶G و تراز لیزری فونداسیون تجهیزات سنگین پالایشگاهی.',
  },
]

export default function TeamSection({ members = [] }: TeamSectionProps) {
  const list = members.length > 0 ? members : DEFAULT_MEMBERS
  const ceo = list.find((m) => m.isCeo) || list[0]
  const staffList = list.filter((m) => m !== ceo)

  return (
    <section className={styles.section} aria-label="مدیریت و اعضای تیم">
      <div className="container">
        <ScrollReveal animation="fade-up">
          <div className={styles.header}>
            <span className="section-label">سرمایه انسانی و رهبری</span>
            <h2 className="section-title">مدیریت ارشد و تیم متخصصین</h2>
            <div className="gold-divider gold-divider--center" />
          </div>
        </ScrollReveal>

        {/* CEO Spotlight Card */}
        {ceo && (
          <ScrollReveal animation="fade-up" delay={150}>
            <div className={styles.ceoCard}>
              <div className={styles.ceoGrid}>
                {/* Photo / Portrait */}
                <div className={styles.ceoPhotoWrap}>
                  {ceo.photo?.url ? (
                    <img src={ceo.photo.url} alt={ceo.photo.alt || ceo.name} className={styles.ceoPhoto} />
                  ) : (
                    <div className={styles.ceoPhotoPlaceholder}>
                      <User size={64} className={styles.userIcon} />
                      <span className={styles.badgeLabel}>CEO</span>
                    </div>
                  )}
                </div>

                {/* CEO Bio & Quote Content */}
                <div className={styles.ceoContent}>
                  <div className={styles.ceoHeader}>
                    <div className={styles.ceoTitleGroup}>
                      <span className={styles.ceoRoleBadge}>{ceo.role}</span>
                      <h3 className={styles.ceoName}>{ceo.name}</h3>
                    </div>
                  </div>

                  {ceo.quote && (
                    <div className={styles.quoteBox}>
                      <Quote size={24} className={styles.quoteIcon} />
                      <p className={styles.quoteText}>{ceo.quote}</p>
                    </div>
                  )}

                  {ceo.bio && <p className={styles.ceoBio}>{ceo.bio}</p>}

                  <div className={styles.ceoContact}>
                    {ceo.email && (
                      <a href={`mailto:${ceo.email}`} className={styles.contactItem}>
                        <Mail size={16} />
                        <span>{ceo.email}</span>
                      </a>
                    )}
                    {ceo.phone && (
                      <a href={`tel:${ceo.phone}`} className={styles.contactItem}>
                        <Phone size={16} />
                        <span>{ceo.phone}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Staff & Directors Grid */}
        {staffList.length > 0 && (
          <div className={styles.staffGrid}>
            {staffList.map((staff, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={200 + idx * 100}>
                <div className={styles.staffCard}>
                  <div className={styles.staffPhotoWrap}>
                    {staff.photo?.url ? (
                      <img src={staff.photo.url} alt={staff.name} className={styles.staffPhoto} />
                    ) : (
                      <div className={styles.staffPlaceholder}>
                        <User size={36} className={styles.staffUserIcon} />
                      </div>
                    )}
                  </div>

                  <div className={styles.staffBody}>
                    <span className={styles.staffRole}>{staff.role}</span>
                    <h4 className={styles.staffName}>{staff.name}</h4>
                    {staff.bio && <p className={styles.staffBio}>{staff.bio}</p>}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

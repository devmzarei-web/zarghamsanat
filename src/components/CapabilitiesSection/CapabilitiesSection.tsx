'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Workflow, Wrench, ShieldCheck, Container, Building2, Flame, Layers, Users, ArrowUpLeft, ArrowLeft } from 'lucide-react'
import styles from './CapabilitiesSection.module.css'
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal'

const CAPABILITIES = [
  {
    num: '#1',
    icon: Workflow,
    category: 'پایپینگ و عایق‌کاری',
    title: 'پایپینگ صنعتی و عایق‌کاری',
    desc: 'طراحی، پیش‌ساخت و اجرای خطوط لوله صنعتی تحت فشار بر اساس استانداردهای ASME B31.3 و NACE.',
    slug: 'industrial-piping',
  },
  {
    num: '#2',
    icon: Wrench,
    category: 'نصب مکانیکال',
    title: 'نصب تجهیزات مکانیکی',
    desc: 'نصب و تراز دقیق تجهیزات دوار و ثابت، پمپ‌های سنگین، کمپرسورها، برج‌ها و مبدل‌های حرارتی.',
    slug: 'mechanical-equipment',
  },
  {
    num: '#3',
    icon: Flame,
    category: 'جوشکاری ۶G',
    title: 'جوشکاری تخصصی صنعتی',
    desc: 'جوشکاری تخصصی CS، SS، دوبلکس و آلیاژی توسط جوشکاران دارای کد بین‌المللی ۶G و WPS/PQR.',
    slug: 'welding',
  },
  {
    num: '#4',
    icon: Container,
    category: 'مخازن ذخیره‌سازی',
    title: 'ساخت و نصب انواع مخازن',
    desc: 'ساخت و مونتاژ مخازن کروی، سقف ثابت و دو جداره بر اساس استانداردهای API 650 و API 620.',
    slug: 'storage-tanks',
  },
  {
    num: '#1',
    icon: Building2,
    category: 'استراکچر سنگین',
    title: 'سازه فلزی و پایپ ساپورت',
    desc: 'ساخت و نصب استراکچر فلزی سنگین صنعتی، پایپ‌رک‌ها، گالری‌ها و ساپورت‌های لوله‌کشی.',
    slug: 'steel-structure',
  },
  {
    num: '#2',
    icon: Layers,
    category: 'سیویل و زیربنایی',
    title: 'عملیات سیویل و ساختمانی',
    desc: 'اجرای فونداسیون‌های فوق سنگین، ترنچ و ترانشه‌های صنعتی، دایک‌وال و سازه‌های بتنی پتروشیمی.',
    slug: 'civil-works',
  },
  {
    num: '#3',
    icon: ShieldCheck,
    category: 'پوشش‌های صنعتی',
    title: 'سندبلاست و پوشش‌های مقاوم',
    desc: 'سندبلاست سطوح فلزی و اعمال پوشش‌های اپوکسی و ضد خوردگی بر اساس استانداردهای SSPC و NACE.',
    slug: 'sandblast-painting',
  },
  {
    num: '#4',
    icon: Users,
    category: 'نیروی انسانی',
    title: 'تأمین نیروی فنی تخصصی',
    desc: 'اعزام تیم‌های فنی مجرب، فیتر، جوشکار ۶G و کارشناسان کنترل کیفیت (QC) جهت پروژه‌های صنعتی.',
    slug: 'manpower',
  },
]

const getMediaUrl = (mediaObj: any): string | null => {
  if (!mediaObj) return null
  if (typeof mediaObj === 'string') return mediaObj
  if (typeof mediaObj === 'object' && mediaObj !== null) {
    if (mediaObj.url) return mediaObj.url
    if (mediaObj.sizes?.card?.url) return mediaObj.sizes.card.url
    if (mediaObj.sizes?.thumbnail?.url) return mediaObj.sizes.thumbnail.url
  }
  return null
}

interface CapabilitiesSectionProps {
  services?: any[]
}

export default function CapabilitiesSection({ services = [] }: CapabilitiesSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  
  // Use CMS services if available, otherwise fallback to hardcoded list
  const activeItems = services && services.length > 0 ? services : CAPABILITIES

  return (
    <section className={styles.section} aria-label="توانمندی‌های شرکت">
      <div className="container">
        <ScrollReveal animation="fade-up">
          <div className={styles.header}>
            <span className="section-label">دامنه فعالیت و تخصص صنعتی</span>
            <h2 className="section-title section-title--white">توانمندی‌های تخصصی ضرغام صنعت اروند</h2>
            <div className="orange-divider orange-divider--center" />
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {activeItems.map((item, index) => {
            const isActive = activeIndex === index
            
            // Handle CMS data structure vs Fallback data
            const iconUrl = getMediaUrl(item.icon)
            const IconComponent = typeof item.icon === 'function' ? item.icon : null
            const title = item.title
            const desc = item.shortDescription || item.desc || ''
            const num = `#${index + 1}`

            // Smart fallback icon selection based on index or slug
            const FallbackIcons = [Workflow, Wrench, Flame, Container, Building2, Layers, ShieldCheck, Users]
            const FallbackIcon = FallbackIcons[index % FallbackIcons.length]

            return (
              <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                <div
                  className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {/* Top Metallic Angle Badge */}
                  <div className={styles.topBar}>
                    <div className={styles.numBadge}>{num}</div>
                    <div className={styles.iconCircle}>
                      {iconUrl ? (
                        <img src={iconUrl} alt={title} className={styles.cmsIcon} />
                      ) : IconComponent ? (
                        <IconComponent size={22} className={styles.icon} />
                      ) : (
                        <FallbackIcon size={22} className={styles.icon} />
                      )}
                    </div>
                  </div>

                  {/* Card Main Body */}
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{title}</h3>
                    <p className={styles.cardDesc}>{desc}</p>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className={styles.cardFooter}>
                    <Link href={`/services#${item.slug}`} className={styles.detailsBtn}>
                      <span>مشاهده جزئیات</span>
                      <ArrowUpLeft size={14} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

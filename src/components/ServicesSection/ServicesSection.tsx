'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ArrowUpLeft } from 'lucide-react'
import styles from './ServicesSection.module.css'
import ContactForm from '@/components/ContactForm/ContactForm'
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal'

interface Service {
  id: string
  title: string
  slug: string
  shortDescription: string
  coverImage?: { url: string; alt?: string }
}

interface Project {
  id: string
  title: string
  slug: string
  serviceDescription: string
  relatedService?: string | { id: string }
  coverImage?: { url: string; alt?: string }
}

// Default services if none in CMS yet
const DEFAULT_SERVICES: Service[] = [
  { id: '1', title: 'اجرای پایپینگ صنعتی', slug: 'industrial-piping', shortDescription: 'طراحی، تهیه و نصب سیستم‌های لوله‌کشی صنعتی.' },
  { id: '2', title: 'نصب تجهیزات مکانیکی', slug: 'mechanical-equipment', shortDescription: 'نصب و راه‌اندازی انواع تجهیزات مکانیکی صنعتی.' },
  { id: '3', title: 'جوشکاری تخصصی (CS، SS و آلیاژی)', slug: 'welding', shortDescription: 'اجرای جوشکاری تخصصی با استانداردهای بین‌المللی.' },
]

interface ServicesSectionProps {
  services?: Service[]
  projects?: Project[]
}

export default function ServicesSection({ services, projects = [] }: ServicesSectionProps) {
  const list = services && services.length > 0 ? services : DEFAULT_SERVICES
  const [active, setActive] = useState(0)

  const activeService = list[active]

  // Find a project related to the active service
  const relatedProject = projects.find(p => {
    if (!p.relatedService) return false;
    if (typeof p.relatedService === 'string') return p.relatedService === activeService.id;
    return p.relatedService.id === activeService.id;
  }) || projects[active % projects.length] // fallback to any project for visual filler if none matched

  // Data to display in the center pane (Project > Fallback Service)
  const displayImage = relatedProject?.coverImage || activeService.coverImage
  const displayTitle = relatedProject?.title || activeService.title
  const displayDesc = relatedProject?.serviceDescription || activeService.shortDescription
  const displayLink = relatedProject ? `/projects/${relatedProject.slug}` : `/services/${activeService.slug}`
  const linkLabel = relatedProject ? 'مشاهده پروژه' : 'اطلاعات بیشتر'

  return (
    <section className={styles.section} aria-label="خدمات و پروژه‌ها">
      <div className="container">
        <div className={styles.grid}>
          {/* Right: Service list */}
          <ScrollReveal animation="slide-left" delay={100} className={styles.sidebarWrapper}>
            <aside className={styles.sidebar}>
              <div className={styles.sidebarHeader}>
                <span className="section-label">تخصص ما</span>
                <h2 className={styles.sidebarTitle}>خدمات ما</h2>
                <div className="gold-divider" />
              </div>
              <ul className={styles.serviceList} role="tablist">
                {list.map((svc, i) => (
                  <li key={svc.id} role="presentation">
                    <button
                      className={`${styles.serviceItem} ${i === active ? styles.serviceItemActive : ''}`}
                      onClick={() => setActive(i)}
                      role="tab"
                      aria-selected={i === active}
                      id={`service-tab-${i}`}
                      aria-controls={`service-panel-${i}`}
                    >
                      <span className={styles.serviceItemDot} />
                      {svc.title}
                      <ChevronLeft size={16} className={styles.serviceItemChevron} />
                    </button>
                  </li>
                ))}
              </ul>
              <Link href="/services" className={`btn btn--primary ${styles.allServicesBtn}`}>
                مشاهده همه خدمات
              </Link>
            </aside>
          </ScrollReveal>

          {/* Center: Active Project/Service display with slide-in animation wrapper */}
          <ScrollReveal animation="fade-up" delay={200} className={styles.detailWrapperOut}>
            <div
              className={styles.detailWrapper}
              role="tabpanel"
              id={`service-panel-${active}`}
              aria-labelledby={`service-tab-${active}`}
            >
              {/* The key prop forces React to unmount and remount this element when 'active' changes, triggering CSS animations */}
              <div key={`anim-${active}`} className={styles.detailAnimContainer}>
                <div className={styles.detail}>
                  {displayImage ? (
                    <div className={styles.detailImage}>
                      <img
                        src={displayImage.url}
                        alt={displayImage.alt || displayTitle}
                      />
                      <div className={styles.detailImageOverlay} />
                    </div>
                  ) : (
                    <div className={styles.detailImagePlaceholder}>
                      <div className={styles.placeholderContent}>
                        <span className={styles.placeholderIcon}>⚙️</span>
                        <span>{displayTitle}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className={styles.detailBody}>
                    {relatedProject && <span className={styles.projectBadge}>پروژه مرتبط</span>}
                    <h3 className={styles.detailTitle}>{displayTitle}</h3>
                    <p className={styles.detailDesc}>{displayDesc}</p>
                    <Link href={displayLink} className={styles.detailLink}>
                      {linkLabel}
                      <ArrowUpLeft size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Left: Collaboration form */}
          <ScrollReveal animation="slide-right" delay={300} className={styles.formPanelWrapper}>
            <div className={styles.formPanel}>
              <div className={styles.formHeader}>
                <h3 className={styles.formTitle}>درخواست همکاری</h3>
                <p className={styles.formSubtitle}>پیام خود را ثبت کنید، کارشناسان ما در اسرع وقت با شما تماس می‌گیرند</p>
              </div>
              <ContactForm />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

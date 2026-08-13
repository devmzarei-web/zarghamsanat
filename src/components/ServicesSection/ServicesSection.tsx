'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowUpLeft, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'
import { getProjectUrl, getServiceUrl } from '@/lib/utils'
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
  relatedService?: any
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
  const list = services && services.length > 0 ? services : []
  const [active, setActive] = useState(0)
  const [projectSlideIndex, setProjectSlideIndex] = useState(0)
  const [isFormExpanded, setIsFormExpanded] = useState(false)
  const detailRef = useRef<HTMLDivElement>(null)

  const activeService = list[active] || list[0]

  // Find ALL projects related to the active service (by ID or Slug)
  const linkedProjects = projects.filter((p) => {
    if (!activeService) return false
    const sId = String(activeService.id)
    const sSlug = activeService.slug ? String(activeService.slug) : ''

    const rels: any[] = []
    if ((p as any).relatedServices) {
      if (Array.isArray((p as any).relatedServices)) {
        rels.push(...(p as any).relatedServices)
      } else {
        rels.push((p as any).relatedServices)
      }
    }
    if (p.relatedService) {
      if (Array.isArray(p.relatedService)) {
        rels.push(...p.relatedService)
      } else {
        rels.push(p.relatedService)
      }
    }

    return rels.some((item: any) =>
      typeof item === 'object' && item !== null
        ? String(item.id) === sId || (item.slug && String(item.slug) === sSlug)
        : String(item) === sId || String(item) === sSlug
    )
  })

  const currentProject = linkedProjects[projectSlideIndex] || linkedProjects[0]

  const handleServiceSelect = (index: number) => {
    setActive(index)
    setProjectSlideIndex(0)
    if (typeof window !== 'undefined' && window.innerWidth <= 1024) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 50)
    }
  }

  // Data to display in the center pane
  const displayImage = currentProject?.coverImage || activeService?.coverImage
  const displayTitle = currentProject?.title || activeService?.title
  const displayDesc = currentProject?.serviceDescription || activeService?.shortDescription
  const displayLink = currentProject ? getProjectUrl(currentProject.slug) : (activeService ? getServiceUrl(activeService.slug) : '/services')
  const linkLabel = currentProject ? 'مشاهده پروژه' : 'اطلاعات بیشتر'

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
              {/* Mobile Service Dropdown Selector (visible on mobile/tablet) */}
              <div className={styles.mobileSelectWrapper}>
                <div className={styles.mobileSelectHeader}>
                  <span className="section-label">تخصص ما</span>
                  <h3 className={styles.mobileSelectTitle}>انتخاب خدمت مورد نظر:</h3>
                </div>
                <div className={styles.mobileSelectBox}>
                  <select
                    id="mobile-service-select"
                    value={active}
                    onChange={(e) => handleServiceSelect(Number(e.target.value))}
                    className={styles.mobileSelectInput}
                    aria-label="انتخاب خدمت"
                  >
                    {list.map((svc, i) => (
                      <option key={svc.id} value={i}>
                        {svc.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={20} className={styles.mobileSelectArrow} />
                </div>
              </div>

              {/* Desktop Service List (visible on desktop) */}
              <ul className={styles.serviceList} role="tablist">
                {list.map((svc, i) => (
                  <li key={svc.id} role="presentation">
                    <button
                      className={`${styles.serviceItem} ${i === active ? styles.serviceItemActive : ''}`}
                      onClick={() => handleServiceSelect(i)}
                      role="tab"
                      aria-selected={i === active}
                      id={`service-tab-${i}`}
                      aria-controls={`service-panel-${i}`}
                    >
                      <span className={styles.serviceItemDot} />
                      <span className={styles.serviceItemText}>{svc.title}</span>
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
              ref={detailRef}
              className={styles.detailWrapper}
              role="tabpanel"
              id={`service-panel-${active}`}
              aria-labelledby={`service-tab-${active}`}
            >
              {/* Mobile Active Service Indicator Header */}
              {activeService && (
                <div className={styles.mobileSelectedIndicator}>
                  <Sparkles size={14} className={styles.sparkleIcon} />
                  <span>خدمت انتخاب شده: <strong>{activeService.title}</strong></span>
                </div>
              )}

              {/* The key prop forces React to unmount and remount this element when 'active' or 'projectSlideIndex' changes */}
              <div key={`anim-${active}-${projectSlideIndex}`} className={styles.detailAnimContainer}>
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
                    {currentProject && (
                      <div className={styles.projectBadgeRow}>
                        <span className={styles.projectBadge}>
                          پروژه مرتبط {linkedProjects.length > 1 ? `(${projectSlideIndex + 1} از ${linkedProjects.length})` : ''}
                        </span>
                        {linkedProjects.length > 1 && (
                          <div className={styles.sliderControls}>
                            <button
                              type="button"
                              className={styles.sliderArrow}
                              onClick={() => setProjectSlideIndex((prev) => (prev - 1 + linkedProjects.length) % linkedProjects.length)}
                              aria-label="پروژه قبلی"
                            >
                              <ChevronRight size={16} />
                            </button>
                            <button
                              type="button"
                              className={styles.sliderArrow}
                              onClick={() => setProjectSlideIndex((prev) => (prev + 1) % linkedProjects.length)}
                              aria-label="پروژه بعدی"
                            >
                              <ChevronLeft size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
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
            <div className={`${styles.formPanel} ${isFormExpanded ? styles.formPanelExpanded : ''}`}>
              <div
                className={styles.formHeader}
                onClick={() => setIsFormExpanded(prev => !prev)}
                role="button"
                tabIndex={0}
              >
                <div className={styles.formHeaderTitleGroup}>
                  <h3 className={styles.formTitle}>درخواست همکاری</h3>
                  <span className={styles.formToggleBadge}>
                    {isFormExpanded ? (
                      <>بستن <ChevronUp size={14} /></>
                    ) : (
                      <>ارسال پیام <ChevronDown size={14} /></>
                    )}
                  </span>
                </div>
                <p className={styles.formSubtitle}>پیام خود را ثبت کنید، کارشناسان ما در اسرع وقت با شما تماس می‌گیرند</p>
              </div>

              <div className={styles.formBodyWrapper}>
                <ContactForm />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}

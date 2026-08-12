'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Building, ChevronLeft, Layers, Image as ImageIcon, Award, ZoomIn, Briefcase } from 'lucide-react'
import ProjectSatisfactionCard from '@/components/ProjectSatisfactionCard/ProjectSatisfactionCard'
import ProjectSignboard from '@/components/ProjectSignboard/ProjectSignboard'
import ImageLightbox from '@/components/ImageLightbox/ImageLightbox'
import { toPersianDigits } from '@/lib/utils'
import styles from './ProjectDetailView.module.css'

interface ProjectDetailViewProps {
  project: any
}

export default function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const [activeLightbox, setActiveLightbox] = useState<{ src: string; caption?: string } | null>(null)

  const satisfactionImgUrl = typeof project.satisfactionLetter === 'object' && project.satisfactionLetter?.url
    ? project.satisfactionLetter.url
    : (typeof project.satisfactionLetter === 'string' ? project.satisfactionLetter : null)

  const coverUrl = typeof project.coverImage === 'object' && project.coverImage?.url
    ? project.coverImage.url
    : (typeof project.coverImage === 'string' ? project.coverImage : null)

  return (
    <div className={styles.pageWrapper}>
      {/* Lightbox Modal */}
      {activeLightbox && (
        <ImageLightbox
          src={activeLightbox.src}
          caption={activeLightbox.caption}
          onClose={() => setActiveLightbox(null)}
        />
      )}

      {/* Hero Header */}
      <div className={styles.heroBanner}>
        {coverUrl && (
          <>
            <img src={coverUrl} alt={project.title} className={styles.heroBgImg} />
            <div className={styles.heroOverlay} />
          </>
        )}
        <div className={`container ${styles.heroInner}`}>
          <span className={`${styles.statusBadge} ${project.status === 'completed' ? styles.badgeCompleted : styles.badgeInProgress}`}>
            {project.status === 'completed' ? 'تکمیل شده / تحویل داده شده' : 'در حال اجرا'}
          </span>
          <h1 className={styles.heroTitle}>{project.title}</h1>
        </div>
      </div>

      {/* Fluid Content Section */}
      <section className={styles.contentSection}>
        <div className="container">
          <div className={styles.mainGrid}>
            {/* Right Column: Flowing Main Content */}
            <div className={styles.flowContent}>
              {/* 1. Project Description */}
              <div className={styles.sectionBlock}>
                <div className={styles.blockTitleGroup}>
                  <Layers className={styles.titleIcon} size={22} />
                  <h2 className={styles.blockTitle}>شرح خدمات و توضیحات پروژه</h2>
                </div>
                <div className={styles.flowingParagraph}>
                  <p>{toPersianDigits(project.serviceDescription)}</p>
                </div>
              </div>

              {/* 2. Before & After Images (Before on Left, After on Right) */}
              {project.beforeAfterImages && project.beforeAfterImages.length > 0 && (
                <div className={styles.sectionBlock}>
                  <div className={styles.blockTitleGroup}>
                    <ImageIcon className={styles.titleIcon} size={22} />
                    <h2 className={styles.blockTitle}>مقایسه قبل و بعد از اجرای پروژه</h2>
                  </div>

                  <div className={styles.beforeAfterList}>
                    {project.beforeAfterImages.map((item: any, idx: number) => (
                      <div key={idx} className={styles.beforeAfterItem}>
                        <div className={styles.beforeAfterFlex}>
                          {/* BEFORE Image (On Left in layout) */}
                          {item.before?.url && (
                            <div
                              className={styles.imageCard}
                              onClick={() => setActiveLightbox({ src: item.before.url, caption: item.caption ? `قبل از اجرا — ${item.caption}` : 'قبل از اجرا' })}
                            >
                              <span className={`${styles.imageBadge} ${styles.badgeBefore}`}>قبل از اجرا</span>
                              <img src={item.before.url} alt={item.before.alt || 'قبل از اجرا'} className={styles.cardImg} />
                              <div className={styles.hoverZoomOverlay}>
                                <ZoomIn size={24} />
                              </div>
                            </div>
                          )}

                          {/* AFTER Image (On Right in layout) */}
                          {item.after?.url && (
                            <div
                              className={styles.imageCard}
                              onClick={() => setActiveLightbox({ src: item.after.url, caption: item.caption ? `بعد از اجرا — ${item.caption}` : 'بعد از اجرا' })}
                            >
                              <span className={`${styles.imageBadge} ${styles.badgeAfter}`}>بعد از اجرا</span>
                              <img src={item.after.url} alt={item.after.alt || 'بعد از اجرا'} className={styles.cardImg} />
                              <div className={styles.hoverZoomOverlay}>
                                <ZoomIn size={24} />
                              </div>
                            </div>
                          )}
                        </div>
                        {item.caption && <p className={styles.imageCaption}>{item.caption}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Photo Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div className={styles.sectionBlock}>
                  <div className={styles.blockTitleGroup}>
                    <ImageIcon className={styles.titleIcon} size={22} />
                    <h2 className={styles.blockTitle}>گالری تصاویر اختصاصی پروژه</h2>
                  </div>

                  <div className={styles.galleryGrid}>
                    {project.gallery.map((item: any, idx: number) => {
                      const imgUrl = typeof item.image === 'object' && item.image?.url ? item.image.url : null
                      if (!imgUrl) return null
                      return (
                        <div
                          key={idx}
                          className={styles.galleryCard}
                          onClick={() => setActiveLightbox({ src: imgUrl, caption: item.caption })}
                        >
                          <img src={imgUrl} alt={item.caption || `تصویر ${idx + 1}`} className={styles.galleryImg} />
                          <div className={styles.hoverZoomOverlay}>
                            <ZoomIn size={22} />
                          </div>
                          {item.caption && <span className={styles.galleryCardCaption}>{item.caption}</span>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* 4. Satisfaction Letter (Placed AFTER images as requested) */}
              {satisfactionImgUrl && (
                <div className={styles.sectionBlock}>
                  <div className={styles.blockTitleGroup}>
                    <Award className={styles.titleIcon} size={22} />
                    <h2 className={styles.blockTitle}>تاییدیه حسن انجام کار و رضایت‌نامه کارفرما</h2>
                  </div>

                  <div
                    className={styles.satisfactionClickWrap}
                    onClick={() => setActiveLightbox({ src: satisfactionImgUrl, caption: project.satisfactionNotes || `رضایت‌نامه کارفرمای پروژه ${project.title}` })}
                  >
                    <ProjectSatisfactionCard
                      imageUrl={satisfactionImgUrl}
                      clientName={project.client}
                      projectTitle={project.title}
                      notes={project.satisfactionNotes}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Left Column: Nostalgic Construction Site Signboard */}
            <aside className={styles.sidebarColumn}>
              <ProjectSignboard
                title={project.title}
                client={project.client}
                location={project.location}
                status={project.status}
                startDate={project.startDate}
                completionDate={project.completionDate}
                durationMonths={project.durationMonths}
                supervisor={project.supervisor}
              />

              <div className={styles.ctaBox}>
                <p className={styles.ctaText}>نیاز به اجرای پروژه مشابه با بالاترین استانداردهای صنعتی دارید؟</p>
                <Link href="/contact" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Briefcase size={16} />
                  درخواست مشاوره و استعلام
                </Link>
              </div>
            </aside>
          </div>

          {/* Back button */}
          <div className={styles.backFooter}>
            <Link href="/projects" className={styles.backBtn}>
              <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
              بازگشت به لیست پروژه‌ها
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

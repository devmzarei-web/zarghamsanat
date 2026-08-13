import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Building, ChevronLeft } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import { getProjectUrl } from '@/lib/utils'
import PageHero from '@/components/PageHero/PageHero'
import styles from './ProjectsPage.module.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getProjectsPageData() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'projects' } },
      limit: 1,
    })
    return result?.docs?.[0] ? JSON.parse(JSON.stringify(result.docs[0])) : null
  } catch (_) {
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getProjectsPageData()
  return {
    title: page?.metaTitle || 'پروژه‌ها | ضرغام صنعت اروند',
    description: page?.metaDescription || 'سوابق و نمونه پروژه‌های اجرا شده توسط شرکت ضرغام صنعت اروند در صنایع نفت، گاز، پتروشیمی و فولاد',
  }
}

export default async function ProjectsPage() {
  const cmsPage = await getProjectsPageData()
  let projects: any[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'projects', sort: 'order', limit: 100 })
    projects = JSON.parse(JSON.stringify(result?.docs ?? []))
  } catch (_) {}

  return (
    <>
      <PageHero
        title={cmsPage?.heroTitle || 'پروژه‌های ما'}
        badge={cmsPage?.heroBadge || 'نمونه کارها'}
        subtitle={cmsPage?.heroSubtitle || 'سابقه درخشان در اجرای پروژه‌های بزرگ پالایشگاهی، پتروشیمی، فولاد و تأسیسات زیربنایی کشور'}
        breadcrumbs={[{ label: 'پروژه‌ها' }]}
        bgImage={cmsPage?.heroImage?.url || '/images/hero-slide-3.png'}
      />

      <section className="section">
        <div className="container">
          {projects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--white)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--gray-200)' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--navy-900)', fontWeight: 800 }}>پروژه‌ای یافت نشد</h3>
              <p style={{ color: 'var(--gray-600)', marginTop: '0.5rem' }}>در حال حاضر پروژه‌ای در سامانه ثبت نشده است.</p>
            </div>
          ) : (
            <div className={styles.projectsGrid}>
              {projects.map((project: any) => {
                const clientName = typeof project.clientRelation === 'object' && project.clientRelation?.name
                  ? project.clientRelation.name
                  : project.client

                return (
                  <Link
                    key={project.id}
                    href={getProjectUrl(project.slug)}
                    style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                  >
                    <article
                      style={{
                        background: '#ffffff',
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                        height: '100%',
                        cursor: 'pointer',
                      }}
                      className="card"
                    >
                      <div style={{ position: 'relative', height: '220px', background: '#0f2545' }}>
                        {project.coverImage ? (
                          <img
                            src={typeof project.coverImage === 'object' ? project.coverImage.url : project.coverImage}
                            alt={typeof project.coverImage === 'object' ? (project.coverImage.alt || project.title) : project.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '3rem' }}>
                            🏗️
                          </div>
                        )}
                      </div>
                      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#0f2545', fontFamily: 'var(--font-heading)' }}>
                          {project.title}
                        </h2>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                          {clientName && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: '#6b7280' }}>
                              <Building size={12} style={{ color: '#f97316' }} />
                              {clientName}
                            </span>
                          )}
                          {project.location && (
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', color: '#6b7280' }}>
                              <MapPin size={12} style={{ color: '#f97316' }} />
                              {project.location}
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: '0.875rem', color: '#4b5563', lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {project.serviceDescription}
                        </p>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', fontWeight: 700, color: '#f97316', paddingTop: '0.75rem', borderTop: '1px solid #f3f4f6' }}>
                          مشاهده جزئیات <ChevronLeft size={14} />
                        </span>
                      </div>
                    </article>
                  </Link>
                )})}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

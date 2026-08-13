import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft, User, Clock } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import PageHero from '@/components/PageHero/PageHero'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getArticlesPageData() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'articles' } },
      limit: 1,
    })
    return result?.docs?.[0] ? JSON.parse(JSON.stringify(result.docs[0])) : null
  } catch (_) {
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getArticlesPageData()
  return {
    title: page?.metaTitle || 'مقالات و اخبار تخصصی | ضرغام صنعت اروند',
    description: page?.metaDescription || 'مرکز مقالات تخصصی، اخبار پروژه‌ها، تحلیل‌های مهندسی و اطلاعیه‌های رسمی شرکت ضرغام صنعت اروند',
  }
}

const CATEGORY_MAP: Record<string, string> = {
  technical: 'مقالات تخصصی',
  company: 'اخبار شرکت',
  projects: 'پروژه‌های جدید',
  certificates: 'گواهینامه‌ها',
  industry: 'صنعت نفت و گاز',
}

export default async function ArticlesPage() {
  const cmsPage = await getArticlesPageData()
  let articles: any[] = []
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'articles', sort: '-createdAt', limit: 20 })
    articles = JSON.parse(JSON.stringify(result?.docs ?? []))
  } catch (_) {}

  return (
    <>
      <PageHero
        title={cmsPage?.heroTitle || 'مقالات و دانش تخصصی'}
        badge={cmsPage?.heroBadge || 'مرکز مقالات مهندسی'}
        subtitle={cmsPage?.heroSubtitle || 'آخرین مقالات تخصصی مهندسی، تحلیلهای استانداردهای صنعتی و اخبار پروژه‌های نفت و گاز'}
        breadcrumbs={[{ label: 'مقالات' }]}
        bgImage={cmsPage?.heroImage?.url || '/images/hero-slide-1.png'}
      />

      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          {articles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--white)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--gray-200)' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--navy-900)', fontWeight: 800 }}>مقاله‌ای یافت نشد</h3>
              <p style={{ color: 'var(--gray-600)', marginTop: '0.5rem' }}>در حال حاضر مقاله‌ای در سامانه ثبت نشده است.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
              {articles.map((item: any) => {
                const coverUrl = item.coverImage?.url || '/images/hero-slide-1.png'
                const categoryLabel = CATEGORY_MAP[item.category] || 'مقاله تخصصی'
                const authorText = item.author || 'تیم فنی ضرغام صنعت'
                const timeText = item.readingTime || '۵ دقیقه مطالعه'

                return (
                  <article key={item.id} className="card" style={{ background: 'var(--white)', borderRadius: 'var(--radius-2xl)', overflow: 'hidden', border: '1.5px solid var(--gray-200)', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                    <div style={{ height: 210, overflow: 'hidden', position: 'relative' }}>
                      <img src={coverUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span className="badge badge--gold" style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'var(--navy-900)', color: 'var(--white)', border: '1px solid var(--gold-500)', fontSize: '0.75rem' }}>
                        {categoryLabel}
                      </span>
                    </div>

                    <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem', flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: 'var(--text-xs)', color: 'var(--gray-500)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <User size={14} style={{ color: 'var(--gold-500)' }} />
                          {authorText}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <Clock size={14} style={{ color: 'var(--gold-500)' }} />
                          {timeText}
                        </span>
                      </div>

                      <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--navy-900)', lineHeight: 1.45, fontFamily: 'var(--font-heading)' }}>
                        {item.title}
                      </h2>

                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)', lineHeight: 1.75, flex: 1 }}>
                        {item.summary}
                      </p>

                      <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--gray-100)', marginTop: 'auto' }}>
                        <Link href={`/articles/${item.slug}`} className="btn btn--outline btn--sm" style={{ width: '100%', justifyContent: 'center' }}>
                          <span>مطالعه مقاله کامل</span>
                          <ChevronLeft size={14} />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

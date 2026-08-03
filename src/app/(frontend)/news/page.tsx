import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, ChevronLeft } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import PageHero from '@/components/PageHero/PageHero'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getNewsPageData() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'news' } },
      limit: 1,
    })
    return result?.docs?.[0] ? JSON.parse(JSON.stringify(result.docs[0])) : null
  } catch (_) {
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getNewsPageData()
  return {
    title: page?.metaTitle || 'اخبار و اطلاع‌رسانی | ضرغام صنعت اروند',
    description: page?.metaDescription || 'آخرین اخبار، گزارشات پیشرفت پروژه و اطلاعیه‌های رسمی شرکت ضرغام صنعت اروند',
  }
}

export default async function NewsPage() {
  const cmsPage = await getNewsPageData()
  let newsList: any[] = []
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'news', sort: '-createdAt', limit: 20 })
    newsList = JSON.parse(JSON.stringify(result?.docs ?? []))
  } catch (_) {}

  return (
    <>
      <PageHero
        title={cmsPage?.heroTitle || 'اخبار و اطلاع‌رسانی'}
        badge={cmsPage?.heroBadge || 'اخبار شرکت'}
        subtitle={cmsPage?.heroSubtitle || 'آخرین اخبار، گزارشات پیشرفت پروژه و اطلاعیه‌های رسمی شرکت ضرغام صنعت اروند'}
        breadcrumbs={[{ label: 'اخبار' }]}
        bgImage={cmsPage?.heroImage?.url || '/images/hero-slide-1.png'}
      />

      <section className="section">
        <div className="container">
          {newsList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p style={{ fontSize: 'var(--text-lg)', color: 'var(--gray-500)' }}>در حال حاضر خبری ثبت نشده است.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
              {newsList.map((item: any) => (
                <article key={item.id} className="card" style={{ background: 'var(--white)', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--gray-200)', display: 'flex', flexDirection: 'column' }}>
                  {item.coverImage && (
                    <div style={{ height: 200, overflow: 'hidden', position: 'relative' }}>
                      <img src={item.coverImage.url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                    {item.category && <span className="badge badge--gold" style={{ alignSelf: 'flex-start' }}>{item.category}</span>}
                    <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--navy-900)' }}>{item.title}</h2>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)', lineHeight: 1.7, flex: 1 }}>{item.summary}</p>
                    <Link href={`/news/${item.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--gold-500)', fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                      ادامه مطلب <ChevronLeft size={14} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

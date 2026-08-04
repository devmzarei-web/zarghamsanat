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

const DEFAULT_ARTICLES = [
  {
    id: '1',
    title: 'استانداردهای بین‌المللی ASME B31.3 در اجرای خطوط لوله صنعتی تحت فشار',
    slug: 'asme-b31-3-piping-standards',
    summary: 'بررسی الزامات طراحی، انتخاب متریال، جوشکاری تخصصی و تست‌های غیرمخرب (NDT) در سیستم‌های لوله‌کشی صنایع نفت و پتروشیمی.',
    category: 'technical',
    author: 'واحد مهندسی و کنترل کیفیت (QC)',
    readingTime: '۷ دقیقه مطالعه',
    publishDate: '2026-05-15',
    coverImage: { url: '/images/hero-slide-2.png' },
  },
  {
    id: '2',
    title: 'تکنیک‌های جوشکاری تخصصی آلیاژهای SS و Duplex با گواهینامه ۶G',
    slug: 'duplex-welding-techniques',
    summary: 'معرفی دستورالعمل‌های WPS/PQR، كنترل حرارت ورودی (Heat Input) و عایق‌کاری گازی در جوشکاری فولادهای زنگ‌نزدیک و دو فازی.',
    category: 'technical',
    author: 'سرپرست بازرسی فنی و جوش',
    readingTime: '۵ دقیقه مطالعه',
    publishDate: '2026-04-10',
    coverImage: { url: '/images/hero-slide-1.png' },
  },
  {
    id: '3',
    title: 'اصول ساخت و مونتاژ مخازن ذخیره‌سازی نفت بر اساس استاندارد API 650',
    slug: 'api-650-storage-tanks-construction',
    summary: 'تحلیل مراحل فونداسیون، مونتاژ بدنه با جک‌های هیدرولیکی، عایق‌کاری سقف شناور و بازرسی انحراف عمودی مخازن صنعتی.',
    category: 'industry',
    author: 'واحد دیسپچینگ و پروژه‌ها',
    readingTime: '۶ دقیقه مطالعه',
    publishDate: '2026-03-20',
    coverImage: { url: '/images/hero-slide-3.png' },
  },
]

const CATEGORY_MAP: Record<string, string> = {
  technical: 'مقالات تخصصی',
  company: 'اخبار شرکت',
  projects: 'پروژه‌های جدید',
  certificates: 'گواهینامه‌ها',
  industry: 'صنعت نفت و گاز',
}

export default async function ArticlesPage() {
  const cmsPage = await getArticlesPageData()
  let articles: any[] = DEFAULT_ARTICLES
  try {
    const payload = await getPayloadClient()
    // Fetch from articles or fallback to news collection
    const result = await payload.find({ collection: 'articles' as any, sort: '-createdAt', limit: 20 })
    const docs = JSON.parse(JSON.stringify(result?.docs ?? []))
    if (docs.length > 0) articles = docs
    else {
      const newsRes = await payload.find({ collection: 'news', sort: '-createdAt', limit: 20 })
      const newsDocs = JSON.parse(JSON.stringify(newsRes?.docs ?? []))
      if (newsDocs.length > 0) articles = newsDocs
    }
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
        </div>
      </section>
    </>
  )
}

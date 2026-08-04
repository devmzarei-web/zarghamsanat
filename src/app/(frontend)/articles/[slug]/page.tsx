import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, ChevronRight, User, Clock } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import PageHero from '@/components/PageHero/PageHero'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface ArticlePageProps {
  params: Promise<{ slug: string }>
}

async function getArticle(slug: string) {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'articles' as any,
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (result?.docs?.[0]) return JSON.parse(JSON.stringify(result.docs[0]))
    return null
  } catch (_) {
    return null
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params
  const article = await getArticle(resolvedParams.slug)
  if (!article) return { title: 'مقاله یافت نشد | ضرغام صنعت اروند' }

  return {
    title: `${article.title} | ضرغام صنعت اروند`,
    description: article.summary || article.title,
  }
}

export default async function ArticleDetailPage({ params }: ArticlePageProps) {
  const resolvedParams = await params
  const article = await getArticle(resolvedParams.slug)

  if (!article) {
    // If not found in DB, check fallback demo article
    if (resolvedParams.slug === 'asme-b31-3-piping-standards') {
      return (
        <>
          <PageHero
            title="استانداردهای بین‌المللی ASME B31.3 در اجرای خطوط لوله صنعتی تحت فشار"
            badge="مقاله تخصصی"
            subtitle="بررسی الزامات طراحی، انتخاب متریال، جوشکاری تخصصی و تست‌های غیرمخرب (NDT) در سیستم‌های لوله‌کشی صنایع نفت و پتروشیمی"
            breadcrumbs={[{ label: 'مقالات', href: '/articles' }, { label: 'جزئیات مقاله' }]}
          />
          <section className="section" style={{ background: 'var(--white)' }}>
            <div className="container" style={{ maxWidth: 880 }}>
              <p style={{ lineHeight: 1.9, fontSize: 'var(--text-lg)', color: 'var(--gray-700)' }}>
                استاندارد ASME B31.3 یکی از جامع‌ترین و معتبرترین مرجع‌های بین‌المللی برای طراحی، ساخت، نصب و بازرسی خطوط لوله فرآیندی (Process Piping) در مجتمع‌های پالایشگاهی، پتروشیمی و واحدهای صنعتی به شمار می‌رود...
              </p>
            </div>
          </section>
        </>
      )
    }
    notFound()
  }

  const coverUrl = article.coverImage?.url || '/images/hero-slide-1.png'
  const authorText = article.author || 'تیم فنی ضرغام صنعت اروند'
  const timeText = article.readingTime || '۵ دقیقه مطالعه'

  return (
    <>
      <PageHero
        title={article.title}
        badge="مقالات تخصصی"
        subtitle={article.summary}
        breadcrumbs={[{ label: 'مقالات', href: '/articles' }, { label: article.title }]}
        bgImage={coverUrl}
      />

      <section className="section" style={{ background: 'var(--white)' }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--gray-200)', color: 'var(--gray-600)', fontSize: 'var(--text-sm)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <User size={16} style={{ color: 'var(--gold-500)' }} />
              {authorText}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Clock size={16} style={{ color: 'var(--gold-500)' }} />
              {timeText}
            </span>
          </div>

          <div style={{ fontSize: 'var(--text-base)', color: 'var(--gray-800)', lineHeight: 1.95 }}>
            <p style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--navy-900)', marginBottom: '1.5rem' }}>
              {article.summary}
            </p>
          </div>

          <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--gray-200)' }}>
            <Link href="/articles" className="btn btn--outline">
              <ChevronRight size={16} />
              <span>بازگشت به فهرست مقالات</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

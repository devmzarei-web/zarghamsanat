import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Params { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'news', where: { slug: { equals: slug } }, limit: 1 })
    const article = result?.docs?.[0] ? JSON.parse(JSON.stringify(result.docs[0])) : null
    if (!article) return { title: 'خبر یافت نشد' }
    return { title: `${article.title} | ضرغام صنعت اروند`, description: article.summary }
  } catch (_) { return { title: 'خبر | ضرغام صنعت اروند' } }
}

export default async function NewsDetailPage({ params }: Params) {
  const { slug } = await params
  let article: any = null
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'news', where: { slug: { equals: slug } }, limit: 1 })
    if (result?.docs?.[0]) {
      article = JSON.parse(JSON.stringify(result.docs[0]))
    }
  } catch (_) {}

  if (!article) {
    return (
      <div style={{ paddingTop: 'var(--header-height)', padding: '8rem 2rem', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--navy-900)', fontSize: 'var(--text-3xl)' }}>خبر مورد نظر یافت نشد</h1>
        <Link href="/news" className="btn btn--primary" style={{ marginTop: '1.5rem' }}>بازگشت به اخبار</Link>
      </div>
    )
  }

  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      {article.coverImage && (
        <div style={{ height: '45vh', overflow: 'hidden', position: 'relative' }}>
          <img src={article.coverImage.url} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,8,15,0.85) 0%, transparent 70%)' }} />
        </div>
      )}

      <section className="section">
        <div className="container container--narrow">
          {article.category && <span className="badge badge--gold" style={{ marginBottom: '1rem', display: 'inline-block' }}>{article.category}</span>}
          <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 800, color: 'var(--navy-900)', lineHeight: 1.3, marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
            {article.title}
          </h1>
          <div className="gold-divider" style={{ marginBottom: '2rem' }} />

          <div style={{ fontSize: 'var(--text-base)', color: 'var(--gray-700)', lineHeight: '2' }}>
            <p>{article.summary}</p>
          </div>

          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--gray-100)' }}>
            <Link href="/news" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-500)', fontWeight: 600, textDecoration: 'none' }}>
              <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
              بازگشت به اخبار
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

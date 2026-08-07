import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import PageHero from '@/components/PageHero/PageHero'
import TeamSection from '@/components/TeamSection/TeamSection'
import { toPersianDigits } from '@/lib/utils'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getAboutData() {
  try {
    const payload = await getPayloadClient()
    const [cmsPage, stats, teamRes] = await Promise.all([
      payload.find({
        collection: 'pages',
        where: { slug: { equals: 'about' } },
        limit: 1,
      }),
      payload.findGlobal({ slug: 'stats' }),
      payload.find({
        collection: 'team' as any,
        sort: 'order',
        limit: 50,
      }),
    ])

    return JSON.parse(
      JSON.stringify({
        cmsPage: cmsPage?.docs?.[0] ?? null,
        stats,
        teamMembers: teamRes?.docs ?? [],
      })
    )
  } catch (_) {
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getAboutData()
  const cmsPage = data?.cmsPage
  return {
    title: cmsPage?.metaTitle || 'درباره ما | ضرغام صنعت اروند',
    description: cmsPage?.metaDescription || 'درباره شرکت ضرغام صنعت اروند — مجری پروژه‌های نفت، گاز، پتروشیمی و صنایع مختلف، توانمندی‌ها و ارزش‌های سازمانی',
  }
}

export default async function AboutPage() {
  const data = await getAboutData()
  const cmsPage = data?.cmsPage
  const stats = data?.stats
  const teamMembers = data?.teamMembers ?? []

  const foundedYear = stats?.foundedYear ?? 1390
  const projectsCompleted = stats?.projectsCompleted ?? 150
  const specialists = stats?.specialists ?? 80
  const trustedClients = stats?.trustedClients ?? 40

  const defaultBodyContent = `شرکت ضرغام صنعت اروند، یکی از شرکت‌های پیمانکاری در اجرای پروژه‌های نفت، گاز، پتروشیمی و صنایع مختلف می‌باشد که از بدو تأسیس تاکنون، با اتکا به ظرفیت بالای نیروی انسانی متخصص تلاش کرده است تا تعهدات قراردادی خود با کارفرمایان را به نحو احسن انجام داده و ضمن مدیریت هزینه‌ها، کیفیت و زمان‌بندی پروژه‌ها را سرلوحه کارهای خود قرار دهد.`

  return (
    <>
      <PageHero
        title={cmsPage?.heroTitle || 'درباره ما'}
        badge={cmsPage?.heroBadge || 'شناسنامه و سوابق شرکت'}
        subtitle={cmsPage?.heroSubtitle || 'مجری تخصصی پروژه‌های نفت، گاز، پتروشیمی و صنایع مختلف با اتکا به ظرفیت بالای نیروی انسانی متخصص، کیفیت عالی و مدیریت زمان‌بندی'}
        breadcrumbs={[{ label: 'درباره ما' }]}
        bgImage={cmsPage?.heroImage?.url || '/images/hero-slide-1.png'}
      />

      {/* Story (Dynamic from CMS) */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span className="section-label">تعهد و کیفیت</span>
              <h2 className="section-title">{cmsPage?.storyTitle || 'معرفی و تاریخچه شرکت'}</h2>
              <div className="gold-divider" />
              <p style={{ color: 'var(--gray-600)', lineHeight: '1.9', marginBottom: '1.5rem', fontSize: 'var(--text-base)' }}>
                {cmsPage?.bodyContent || defaultBodyContent}
              </p>
              <p style={{ color: 'var(--gray-600)', lineHeight: '1.9', fontSize: 'var(--text-base)' }}>
                رضایت مشتریان از انجام پروژه‌ها باعث گردیده است تا سفارشات بعدی خود را با اطمینان خاطر در اختیار ضرغام صنعت اروند قرار دهند و این موضوع جزء افتخارات و دستاوردهای مهم شرکت محسوب می‌شود.
              </p>
            </div>

            {/* Dynamic Stats from CMS Stats Global */}
            <div style={{
              background: 'var(--navy-900)',
              borderRadius: 'var(--radius-2xl)',
              padding: '3rem',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '2.5rem',
              border: '1px solid rgba(201,146,42,0.2)',
              boxShadow: 'var(--shadow-xl)',
            }}>
              {[
                { label: 'سال تأسیس', value: toPersianDigits(foundedYear) },
                { label: 'پروژه انجام شده', value: `${toPersianDigits(projectsCompleted)}+` },
                { label: 'نیروی متخصص', value: `${toPersianDigits(specialists)}+` },
                { label: 'کارفرمای معتبر', value: `${toPersianDigits(trustedClients)}+` },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 'var(--text-4xl)', fontWeight: 900, color: 'var(--gold-400)', fontFamily: 'var(--font-heading)' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.75)', marginTop: '0.5rem', fontWeight: 500 }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Team Section */}
      <TeamSection
        badge={cmsPage?.teamSectionBadge || 'سرمایه انسانی و رهبری'}
        title={cmsPage?.teamSectionTitle || 'مدیریت ارشد و تیم متخصصین'}
        members={teamMembers}
      />
    </>
  )
}

import type { Metadata } from 'next'
import { CheckCircle2 } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import PageHero from '@/components/PageHero/PageHero'

import { toPersianDigits } from '@/lib/utils'

export const revalidate = 60

async function getAboutData() {
  try {
    const payload = await getPayloadClient()
    const [cmsPage, stats, services] = await Promise.all([
      payload.find({
        collection: 'pages',
        where: { slug: { equals: 'about' } },
        limit: 1,
      }),
      payload.findGlobal({ slug: 'stats' }),
      payload.find({
        collection: 'services',
        sort: 'order',
        limit: 20,
      }),
    ])

    return JSON.parse(
      JSON.stringify({
        cmsPage: cmsPage?.docs?.[0] ?? null,
        stats,
        services: services?.docs ?? [],
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

const DEFAULT_CAPABILITIES = [
  'اجرای کامل عملیات پایپینگ، عایق‌کاری، سندبلاست و رنگ‌آمیزی صنعتی',
  'نصب تجهیزات مکانیکی ثابت و دوار در پلنت‌های پالایشگاهی و پتروشیمی',
  'انجام عملیات‌های سیویل، فونداسیون‌های سنگین، ترنچ و ساختمانی',
  'طراحی، ساخت و نصب انواع مخازن ذخیره و تحت فشار',
  'ساخت و نصب انواع سازه‌های فلزی صنعتی شامل استراکچر و پایپ ساپورت',
  'اجرای عملیات برق، کابل‌کشی و ابزار دقیق',
  'تأمین کلیه متریال‌های صنعتی شامل انواع ورق، لوله، اتصالات و تجهیزات',
  'تکمیل، رفع پانچ، پیش‌راه‌اندازی و کمک در راه‌اندازی پروژه‌ها',
]

export default async function AboutPage() {
  const data = await getAboutData()
  const cmsPage = data?.cmsPage
  const stats = data?.stats
  const servicesList = data?.services ?? []

  // Dynamic capabilities list from CMS services or default
  const capabilities = servicesList.length > 0
    ? servicesList.map((s: any) => s.title)
    : DEFAULT_CAPABILITIES

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

      {/* Dynamic Capabilities from CMS Services collection */}
      <section className="section" style={{ background: 'var(--gray-100)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-label">خدمات و دامنه فعالیت</span>
            <h2 className="section-title">توانمندی‌های اجرایی شرکت (مدیریت‌شده در CMS)</h2>
            <div className="gold-divider gold-divider--center" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {capabilities.map((capTitle: string, i: number) => (
              <div key={i} style={{
                background: 'var(--white)',
                padding: '1.5rem 2rem',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid var(--gray-200)',
              }}>
                <CheckCircle2 size={24} style={{ color: 'var(--gold-500)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: 'var(--text-base)', color: 'var(--navy-900)', fontWeight: 600, lineHeight: 1.7 }}>
                  {capTitle}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

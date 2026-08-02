import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import { toPersianDigits } from '@/lib/utils'
import PageHero from '@/components/PageHero/PageHero'

export const revalidate = 60

async function getServicesPageData() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'services' } },
      limit: 1,
    })
    return result?.docs?.[0] ? JSON.parse(JSON.stringify(result.docs[0])) : null
  } catch (_) {
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicesPageData()
  return {
    title: page?.metaTitle || 'خدمات تخصصی | ضرغام صنعت اروند',
    description: page?.metaDescription || 'خدمات تخصصی شرکت ضرغام صنعت اروند در حوزه پایپینگ، نصب تجهیزات مکانیکی، ساخت مخازن و سیویل صنعتی',
  }
}

const DEFAULT_SERVICES = [
  { id: '1', title: 'اجرای پایپینگ صنعتی و عایق‌کاری', slug: 'industrial-piping', shortDescription: 'طراحی، تهیه، اجرا و عایق‌کاری سیستم‌های لوله‌کشی صنعتی در صنایع نفت، گاز و پتروشیمی با بالاترین استانداردهای ASME و NACE.' },
  { id: '2', title: 'نصب تجهیزات مکانیکی (ثابت و دوار)', slug: 'mechanical-equipment', shortDescription: 'نصب و راه‌اندازی انواع تجهیزات مکانیکی صنعتی شامل پمپ‌ها، کمپرسورها، مبدل‌های حرارتی، برج‌ها و پکیج‌های صنعتی.' },
  { id: '3', title: 'جوشکاری تخصصی (CS، SS و آلیاژی)', slug: 'welding', shortDescription: 'اجرای جوشکاری تخصصی خطوط لوله و تجهیزات تحت فشار توسط جوشکاران دارای گواهینامه‌های بین‌المللی ۶G و WPS/PQR.' },
  { id: '4', title: 'ساخت و نصب انواع مخازن ذخیره', slug: 'storage-tanks', shortDescription: 'طراحی، ساخت و نصب مخازن ذخیره سقف ثابت، کروی و دو جداره بر اساس استانداردهای API 650 و API 620.' },
  { id: '5', title: 'ساخت و نصب استراکچر فلزی و ساپورت', slug: 'steel-structure', shortDescription: 'ساخت و نصب انواع سازه‌های فلزی سنگین صنعتی، استراکچر پالت‌ها، گالری‌ها و پایپ ساپورت‌ها.' },
  { id: '6', title: 'عملیات سیویل، بتن‌ریزی و ساختمانی', slug: 'civil-works', shortDescription: 'اجرای فونداسیون سنگین تجهیزات، ترنچ و ترانشه‌های صنعتی، دایک‌وال مخازن و عملیات سیویل پلنت‌ها.' },
  { id: '7', title: 'سندبلاست و رنگ‌آمیزی صنعتی', slug: 'sandblast-painting', shortDescription: 'اجرای سندبلاست سطوح فلزی و اعمال پوشش‌های اپوکسی و ضد خوردگی بر اساس استانداردهای SSPC و NACE.' },
  { id: '8', title: 'تأمین نیروی فنی و اجرایی', slug: 'manpower', shortDescription: 'تأمین و اعزام تیم‌های متخصص فنی، جوشکاران، فیترها و کارشناسان کنترل کیفیت جهت اجرای پروژه‌ها.' },
]

export default async function ServicesPage() {
  const cmsPage = await getServicesPageData()
  let services = DEFAULT_SERVICES

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'services', sort: 'order', limit: 50 })
    const docs = JSON.parse(JSON.stringify(result?.docs ?? []))
    if (docs.length > 0) services = docs
  } catch (_) {}

  return (
    <>
      <PageHero
        title={cmsPage?.heroTitle || 'خدمات تخصصی'}
        badge={cmsPage?.heroBadge || 'حوزه فعالیت‌ها'}
        subtitle={cmsPage?.heroSubtitle || 'ارائه کامل‌ترین خدمات مهندسی، تامین متریال، اجرا و نصب تجهیزات در صنایع نفت، گاز، پتروشیمی و فولاد'}
        breadcrumbs={[{ label: 'خدمات' }]}
        bgImage={cmsPage?.heroImage?.url || '/images/hero-slide-2.png'}
      />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {services.map((svc: any, i: number) => (
              <div key={svc.id} className="card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--white)', border: '1px solid var(--gray-200)' }}>
                <span style={{ fontSize: 'var(--text-3xl)', fontWeight: 900, color: 'var(--gold-500)', fontFamily: 'var(--font-heading)' }}>
                  {toPersianDigits(i + 1 < 10 ? `۰${i + 1}` : i + 1)}
                </span>
                <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--navy-900)' }}>{svc.title}</h2>
                <div className="gold-divider" style={{ marginBlock: '0.25rem' }} />
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)', lineHeight: 1.8, flex: 1 }}>{svc.shortDescription}</p>
                <Link href="/contact" className="btn btn--outline btn--sm" style={{ alignSelf: 'flex-start', marginTop: '1rem' }}>
                  استعلام خدمات
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

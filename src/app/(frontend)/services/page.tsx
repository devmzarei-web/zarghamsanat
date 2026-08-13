import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import PageHero from '@/components/PageHero/PageHero'
import ServicesNav from '@/components/ServicesNav/ServicesNav'
import ServiceSectionBlock from '@/components/ServiceSectionBlock/ServiceSectionBlock'
import BackToTopButton from '@/components/BackToTopButton/BackToTopButton'

export const dynamic = 'force-dynamic'
export const revalidate = 0

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

export default async function ServicesPage() {
  const cmsPage = await getServicesPageData()
  let services: any[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'services', sort: 'order', limit: 50 })
    services = JSON.parse(JSON.stringify(result?.docs ?? []))
  } catch (_) {}

  const navItems = services.map((s: any) => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
  }))

  return (
    <>
      <PageHero
        title={cmsPage?.heroTitle || 'خدمات تخصصی'}
        badge={cmsPage?.heroBadge || 'حوزه فعالیت‌ها'}
        subtitle={cmsPage?.heroSubtitle || 'ارائه کامل‌ترین خدمات مهندسی، تامین متریال، اجرا و نصب تجهیزات در صنایع نفت، گاز، پتروشیمی و فولاد'}
        breadcrumbs={[{ label: 'خدمات' }]}
        bgImage={cmsPage?.heroImage?.url || '/images/hero-slide-2.png'}
      />

      {/* Sticky Navigation Bar */}
      {navItems.length > 0 && <ServicesNav services={navItems} />}

      {/* Main Content Area: Detailed Services Blocks */}
      <main className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          {services.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--white)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--gray-200)' }}>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--navy-900)', fontWeight: 800 }}>خدمتی یافت نشد</h3>
              <p style={{ color: 'var(--gray-600)', marginTop: '0.5rem' }}>در حال حاضر خدمتی در سامانه ثبت نشده است.</p>
            </div>
          ) : (
            services.map((svc: any, i: number) => (
              <ServiceSectionBlock key={svc.id || svc.slug} service={svc} index={i} />
            ))
          )}
        </div>
      </main>

      {/* Floating Back to Top Button */}
      <BackToTopButton />
    </>
  )
}

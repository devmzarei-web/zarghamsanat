import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import HeroSection from '@/components/HeroSection/HeroSection'
import FeaturesBar from '@/components/FeaturesBar/FeaturesBar'
import CapabilitiesSection from '@/components/CapabilitiesSection/CapabilitiesSection'
import StatsSection from '@/components/StatsSection/StatsSection'
import ServicesSection from '@/components/ServicesSection/ServicesSection'
import ClientLogos from '@/components/ClientLogos/ClientLogos'
import CertificationsStrip from '@/components/CertificationsStrip/CertificationsStrip'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getHomePageData() {
  try {
    const payload = await getPayloadClient()

    const [servicesRes, siteSettings, stats, projects, clients, certificates, homePageDoc] = await Promise.all([
      payload.find({
        collection: 'services',
        sort: 'order',
        limit: 100,
      }),
      payload.findGlobal({ slug: 'site-settings' }),
      payload.findGlobal({ slug: 'stats' }),
      payload.find({
        collection: 'projects',
        sort: 'order',
        limit: 100,
      }),
      payload.find({
        collection: 'clients',
        sort: 'order',
        limit: 100,
      }),
      payload.find({
        collection: 'certificates',
        limit: 100,
      }),
      payload.find({
        collection: 'pages',
        where: { slug: { equals: 'home' } },
        limit: 1,
      }),
    ])

    return JSON.parse(
      JSON.stringify({
        siteSettings,
        stats,
        services: servicesRes?.docs ?? [],
        projects: projects?.docs ?? [],
        clients: clients?.docs ?? [],
        certificates: certificates?.docs ?? [],
        cmsPage: homePageDoc?.docs?.[0] ?? null,
      })
    )
  } catch (e) {
    console.error('Error fetching homepage CMS data:', e)
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getHomePageData()
  const cmsPage = data?.cmsPage
  return {
    title: cmsPage?.metaTitle || 'صفحه اصلی | ضرغام صنعت اروند',
    description: cmsPage?.metaDescription || 'ضرغام صنعت اروند — مجری تخصصی پروژه‌های نفت، گاز، پتروشیمی، پایپینگ صنعتی، نصب تجهیزات مکانیکی و ساخت مخازن',
  }
}

export default async function HomePage() {
  const data = await getHomePageData()

  const siteSettings = data?.siteSettings
  const stats = data?.stats
  const services = data?.services ?? []
  const projects = data?.projects ?? []
  const clients = data?.clients ?? []
  const certificates = data?.certificates ?? []
  const cmsPage = data?.cmsPage

  return (
    <>
      <HeroSection
        type={(siteSettings?.heroType as 'video' | 'slider' | 'presentation') ?? 'slider'}
        videoUrl={
          typeof siteSettings?.heroVideo === 'object' && siteSettings?.heroVideo
            ? (siteSettings.heroVideo as { url: string }).url
            : undefined
        }
        presentationVideoUrl={
          siteSettings?.presentationVideoUrl ||
          (typeof siteSettings?.presentationVideo === 'object' && siteSettings?.presentationVideo
            ? (siteSettings.presentationVideo as { url: string }).url
            : undefined)
        }
        presentationVideoCoverUrl={
          typeof siteSettings?.presentationVideoCover === 'object' && siteSettings?.presentationVideoCover
            ? (siteSettings.presentationVideoCover as { url: string }).url
            : undefined
        }
        presentationBgImageUrl={
          typeof siteSettings?.presentationBgImage === 'object' && siteSettings?.presentationBgImage
            ? (siteSettings.presentationBgImage as { url: string }).url
            : undefined
        }
        presentationBadge={siteSettings?.presentationBadge}
        presentationTitle={siteSettings?.presentationTitle}
        presentationSubtitle={siteSettings?.presentationSubtitle}
        presentationPrimaryBtnText={siteSettings?.presentationPrimaryBtnText}
        presentationPrimaryBtnLink={siteSettings?.presentationPrimaryBtnLink}
        presentationSecondaryBtnText={siteSettings?.presentationSecondaryBtnText}
        presentationSecondaryBtnLink={siteSettings?.presentationSecondaryBtnLink}
        slides={
          siteSettings?.heroSlides?.map((slide: any) => ({
            image: typeof slide.image === 'object' ? slide.image : { url: '' },
            title: slide.title,
            subtitle: slide.subtitle,
          })) ?? []
        }
        title={cmsPage?.heroTitle || siteSettings?.heroTitle || 'مجری پروژه‌های نفت، گاز، پتروشیمی و صنایع مختلف'}
        subtitle={
          cmsPage?.heroSubtitle ||
          siteSettings?.heroSubtitle ||
          'اجرای عملیات پایپینگ، نصب تجهیزات مکانیکی، سیویل و ساخت مخازن با بالاترین استانداردهای کیفی'
        }
        tagline={cmsPage?.heroBadge || siteSettings?.heroTagline || 'کیفیت، ایمنی، تعهد: پایه‌های اعتماد'}
      />

      <FeaturesBar />

      <CapabilitiesSection services={services} />

      <StatsSection
        foundedYear={stats?.foundedYear ?? 1390}
        projectsCompleted={stats?.projectsCompleted ?? 150}
        specialists={stats?.specialists ?? 80}
        trustedClients={stats?.trustedClients ?? 40}
        showPlusSign={stats?.showPlusSign ?? true}
      />

      <ServicesSection services={services} projects={projects} />

      <ClientLogos clients={clients} projects={projects} />

      <CertificationsStrip certificates={certificates} />
    </>
  )
}

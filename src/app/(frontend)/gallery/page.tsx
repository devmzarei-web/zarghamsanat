import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import PageHero from '@/components/PageHero/PageHero'
import GalleryView, { GalleryItem } from '@/components/GalleryView/GalleryView'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getGalleryData() {
  try {
    const payload = await getPayloadClient()
    const [cmsPage, galleryRes] = await Promise.all([
      payload.find({
        collection: 'pages',
        where: { slug: { equals: 'gallery' } },
        limit: 1,
      }),
      payload.find({
        collection: 'crew-gallery' as any,
        sort: 'order',
        limit: 100,
      }),
    ])

    return JSON.parse(
      JSON.stringify({
        cmsPage: cmsPage?.docs?.[0] ?? null,
        items: galleryRes?.docs ?? [],
      })
    )
  } catch (err) {
    console.error('Error fetching gallery data:', err)
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getGalleryData()
  const cmsPage = data?.cmsPage
  return {
    title: cmsPage?.metaTitle || 'گالری تصاویر و نیروهای متخصص | ضرغام صنعت اروند',
    description:
      cmsPage?.metaDescription ||
      'گالری تصاویر نیروهای متخصص، تخصص‌های جوشکاری ۶G، فیترها، تجهیزات مکانیکی و پروژه‌های شرکت ضرغام صنعت اروند',
  }
}

export default async function GalleryPage() {
  const data = await getGalleryData()
  const cmsPage = data?.cmsPage
  const items: GalleryItem[] = data?.items ?? []

  return (
    <>
      <PageHero
        title={cmsPage?.heroTitle || 'گالری تصاویر و نیروهای متخصص'}
        badge={cmsPage?.heroBadge || 'سرمایه انسانی و توانمندی‌های اجرایی'}
        subtitle={
          cmsPage?.heroSubtitle ||
          'تصاویر مستند از تیم‌های تخصصی جوشکاری ۶G، فیترها، نصب تجهیزات مکانیکی، پایپینگ صنعتی و عملیات اجرایی در سایت پروژه‌ها'
        }
        breadcrumbs={[{ label: 'گالری تصاویر و نیروها' }]}
        bgImage={cmsPage?.heroImage?.url || '/images/hero-slide-2.png'}
      />

      <GalleryView items={items} />
    </>
  )
}

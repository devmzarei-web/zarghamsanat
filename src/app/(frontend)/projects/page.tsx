import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Building, ChevronLeft } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import { getProjectUrl } from '@/lib/utils'
import PageHero from '@/components/PageHero/PageHero'
import styles from './ProjectsPage.module.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getProjectsPageData() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'projects' } },
      limit: 1,
    })
    return result?.docs?.[0] ? JSON.parse(JSON.stringify(result.docs[0])) : null
  } catch (_) {
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getProjectsPageData()
  return {
    title: page?.metaTitle || 'پروژه‌ها | ضرغام صنعت اروند',
    description: page?.metaDescription || 'سوابق و نمونه پروژه‌های اجرا شده توسط شرکت ضرغام صنعت اروند در صنایع نفت، گاز، پتروشیمی و فولاد',
  }
}

const DEFAULT_PROJECTS = [
  {
    id: '1',
    title: 'سیویل، سندبلاست و رنگ مخازن پتروشیمی مارون',
    slug: 'marun-petrochemical-tanks',
    client: 'مهندسی و ساختمان تیو انرژی',
    location: 'ماهشهر، پتروشیمی مارون',
    serviceDescription: 'رنگ‌آمیزی ۱۵ هزار متر مربع داخل و خارج مخازن، اجرای فونداسیون سوپراستراکچر مخازن و دایک‌وال‌های اطراف.',
    coverImage: { url: '/media/image9.png', alt: 'پتروشیمی مارون' },
  },
  {
    id: '2',
    title: 'نصب و پایپینگ تجهیزات تصفیه آب فولاد شادگان',
    slug: 'shadgan-steel-water-treatment',
    client: 'شرکت عمراب',
    location: 'شادگان',
    serviceDescription: 'عملیات پایپینگ ۱۰۰ هزار اینچ، نصب ۳۰۰ تن تجهیزات ثابت، ۲۵۰ تن تجهیزات دوار و ۱۰ هزار متر مربع رنگ.',
    coverImage: { url: '/media/image22.jpeg', alt: 'فولاد شادگان' },
  },
  {
    id: '3',
    title: 'پایپینگ مخازن کروی پالایشگاه آبادان',
    slug: 'abadan-refinery-spherical-tanks',
    client: 'مهندسی و ساختمان تیو انرژی',
    location: 'پالایش نفت آبادان',
    serviceDescription: 'پایپینگ ۲۴ هزار اینچ، ساخت و نصب ۸۰ تن ساپورت و استراکچر، کابل‌کشی و سندبلاست و رنگ‌آمیزی.',
    coverImage: { url: '/media/image30.jpg', alt: 'مخازن کروی پالایشگاه آبادان' },
  },
  {
    id: '4',
    title: 'احداث مجتمع ذخیره‌سازی پالایشگاه آبادان',
    slug: 'abadan-refinery-storage-complex',
    client: 'پارس تابلو / تیو انرژی',
    location: 'پالایشگاه آبادان',
    serviceDescription: 'پایپینگ ۱۰ هزار اینچ، ساخت مخزن ذخیره ۱۳۵ تن، استراکچر ۱۰۰ تن، بتن‌ریزی ۱۵۰۰ متر مکعب.',
    coverImage: { url: '/media/image35.jpg', alt: 'مجتمع ذخیره‌سازی پالایشگاه آبادان' },
  },
  {
    id: '5',
    title: 'نصب تجهیزات مکانیکال یوتیلیتی پتروشیمی گچساران',
    slug: 'gachsaran-petrochemical-utility',
    client: 'ماشین‌سازی ویژه',
    location: 'گچساران',
    serviceDescription: 'نصب تجهیزات پکیج بلودان و RO ۷۸ تن، تجهیزات ثابت ۲۸۶ تن، دوار ۱۲۸ تن (۱۱۲ عدد ثابت، ۸۵ عدد دوار).',
    coverImage: { url: '/media/image40.jpeg', alt: 'پتروشیمی گچساران' },
  },
  {
    id: '6',
    title: 'بازسازی کامل واحد ۶۰۰ پتروشیمی آبادان',
    slug: 'abadan-petrochemical-unit-600',
    client: 'کمک‌صنعتگران جنوب',
    location: 'پتروشیمی آبادان',
    serviceDescription: 'عملیات پایپینگ ۳۰ هزار اینچ، ساخت و نصب ساپورت ۵۰ تن، سندبلاست و رنگ‌آمیزی ۵۰۰۰ متر مربع.',
    coverImage: { url: '/media/image42.jpg', alt: 'واحد ۶۰۰ پتروشیمی آبادان' },
  },
  {
    id: '7',
    title: 'جمع‌آوری گازهای فلر پالایش نفت آبادان',
    slug: 'abadan-refinery-flare-gas-recovery',
    client: 'طراحی و مهندسی عالی‌نام',
    location: 'پالایشگاه نفت آبادان',
    serviceDescription: 'اجرای پایپینگ ۱۱ هزار اینچ، ساخت و نصب ساپورت ۳۵ تن، سندبلاست و رنگ ۳۰۰۰ متر مربع و پیش‌راه‌اندازی.',
    coverImage: { url: '/media/image45.jpg', alt: 'پروژه جمع‌آوری گازهای فلر' },
  },
  {
    id: '8',
    title: 'ترنچ و ترانشه آب و نیروی مکران چابهار',
    slug: 'chabahar-makran-water-power-trench',
    client: 'مهندسی و ساختمان تیو انرژی',
    location: 'چابهار، مکران',
    serviceDescription: 'بتن‌ریزی ۳۰۰۰ متر مکعب، قالب‌بندی ۲۰ هزار متر مربع، آرماتوربندی ۲۴۰ تن، ورق‌گذاری ۵۷ تن.',
    coverImage: { url: '/media/image33.jpg', alt: 'آب و نیروی مکران چابهار' },
  },
]

export default async function ProjectsPage() {
  const cmsPage = await getProjectsPageData()
  let projects: any[] = DEFAULT_PROJECTS

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'projects', sort: 'order', limit: 100 })
    const docs = JSON.parse(JSON.stringify(result?.docs ?? []))
    if (docs.length > 0) projects = docs
  } catch (_) {}

  return (
    <>
      <PageHero
        title={cmsPage?.heroTitle || 'پروژه‌های ما'}
        badge={cmsPage?.heroBadge || 'نمونه کارها'}
        subtitle={cmsPage?.heroSubtitle || 'سابقه درخشان در اجرای پروژه‌های بزرگ پالایشگاهی، پتروشیمی، فولاد و تأسیسات زیربنایی کشور'}
        breadcrumbs={[{ label: 'پروژه‌ها' }]}
        bgImage={cmsPage?.heroImage?.url || '/images/hero-slide-3.png'}
      />

      <section className="section">
        <div className="container">
          <div className={styles.projectsGrid}>
            {projects.map((project: any) => {
              const clientName = typeof project.clientRelation === 'object' && project.clientRelation?.name
                ? project.clientRelation.name
                : project.client

              return (
                <Link
                  key={project.id}
                  href={getProjectUrl(project.slug)}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <article
                    style={{
                      background: 'var(--white)',
                      borderRadius: 'var(--radius-xl)',
                      overflow: 'hidden',
                      boxShadow: 'var(--shadow-md)',
                      border: '1px solid var(--gray-100)',
                      transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                      height: '100%',
                      cursor: 'pointer',
                    }}
                    className="card"
                  >
                    <div style={{ position: 'relative', height: '220px', background: 'var(--navy-800)' }}>
                      {project.coverImage ? (
                        <img
                          src={project.coverImage.url}
                          alt={project.coverImage.alt || project.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '3rem' }}>
                          🏗️
                        </div>
                      )}
                    </div>
                    <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--navy-900)' }}>
                        {project.title}
                      </h2>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                        {clientName && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: 'var(--text-xs)', color: 'var(--gray-500)' }}>
                            <Building size={12} style={{ color: 'var(--gold-500)' }} />
                            {clientName}
                          </span>
                        )}
                        {project.location && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: 'var(--text-xs)', color: 'var(--gray-500)' }}>
                            <MapPin size={12} style={{ color: 'var(--gold-500)' }} />
                            {project.location}
                          </span>
                        )}
                      </div>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--gray-600)', lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {project.serviceDescription}
                      </p>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--gold-500)', paddingTop: '0.75rem', borderTop: '1px solid var(--gray-100)' }}>
                        مشاهده جزئیات <ChevronLeft size={14} />
                      </span>
                    </div>
                  </article>
                </Link>
              )})}
          </div>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Building, ChevronLeft, Calendar, Award, FileCheck } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import ProjectSatisfactionCard from '@/components/ProjectSatisfactionCard/ProjectSatisfactionCard'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Params { params: Promise<{ slug: string }> }

const DEFAULT_PROJECTS = [
  {
    id: '1',
    title: 'سیویل، سندبلاست و رنگ مخازن پتروشیمی مارون',
    slug: 'marun-petrochemical-tanks',
    client: 'مهندسی و ساختمان تیو انرژی',
    location: 'ماهشهر، پتروشیمی مارون',
    serviceDescription: 'رنگ‌آمیزی ۱۵ هزار متر مربع داخل و خارج مخازن، اجرای فونداسیون سوپراستراکچر مخازن و دایک‌وال‌های اطراف.',
    coverImage: { url: '/media/image9.png', alt: 'پتروشیمی مارون' },
    status: 'in-progress',
    satisfactionLetter: { url: '/media/image47.png', alt: 'رضایت‌نامه تیو انرژی' },
    satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت مهندسی و ساختمان تیو انرژی',
  },
  {
    id: '2',
    title: 'نصب و پایپینگ تجهیزات تصفیه آب فولاد شادگان',
    slug: 'shadgan-steel-water-treatment',
    client: 'شرکت عمراب',
    location: 'شادگان',
    serviceDescription: 'عملیات پایپینگ ۱۰۰ هزار اینچ، نصب ۳۰۰ تن تجهیزات ثابت، ۲۵۰ تن تجهیزات دوار و ۱۰ هزار متر مربع رنگ.',
    coverImage: { url: '/media/image22.jpeg', alt: 'فولاد شادگان' },
    status: 'completed',
    satisfactionLetter: { url: '/media/image48.png', alt: 'رضایت‌نامه شادگان' },
    satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت صنعتی پیشگامان فولاد شرق و شرکت عمراب',
  },
  {
    id: '3',
    title: 'پایپینگ مخازن کروی پالایشگاه آبادان',
    slug: 'abadan-refinery-spherical-tanks',
    client: 'مهندسی و ساختمان تیو انرژی',
    location: 'پالایش نفت آبادان',
    serviceDescription: 'پایپینگ ۲۴ هزار اینچ، ساخت و نصب ۸۰ تن ساپورت و استراکچر، کابل‌کشی و سندبلاست و رنگ‌آمیزی.',
    coverImage: { url: '/media/image30.jpg', alt: 'مخازن کروی پالایشگاه آبادان' },
    status: 'completed',
    satisfactionLetter: { url: '/media/image49.png', alt: 'رضایت‌نامه پالایش نفت آبادان' },
    satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت پالایش نفت آبادان',
  },
  {
    id: '4',
    title: 'احداث مجتمع ذخیره‌سازی پالایشگاه آبادان',
    slug: 'abadan-refinery-storage-complex',
    client: 'پارس تابلو / تیو انرژی',
    location: 'پالایشگاه آبادان',
    serviceDescription: 'پایپینگ ۱۰ هزار اینچ، ساخت مخزن ذخیره ۱۳۵ تن، استراکچر ۱۰۰ تن، بتن‌ریزی ۱۵۰۰ متر مکعب.',
    coverImage: { url: '/media/image35.jpg', alt: 'مجتمع ذخیره‌سازی پالایشگاه آبادان' },
    status: 'completed',
    satisfactionLetter: { url: '/media/image49.png', alt: 'رضایت‌نامه پالایش نفت آبادان' },
    satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت پارس تابلو و پالایشگاه آبادان',
  },
  {
    id: '5',
    title: 'نصب تجهیزات مکانیکال یوتیلیتی پتروشیمی گچساران',
    slug: 'gachsaran-petrochemical-utility',
    client: 'ماشین‌سازی ویژه',
    location: 'گچساران',
    serviceDescription: 'نصب تجهیزات پکیج بلودان و RO ۷۸ تن، تجهیزات ثابت ۲۸۶ تن، دوار ۱۲۸ تن (۱۱۲ عدد ثابت، ۸۵ عدد دوار).',
    coverImage: { url: '/media/image40.jpeg', alt: 'پتروشیمی گچساران' },
    status: 'completed',
    satisfactionLetter: { url: '/media/image51.jpg', alt: 'رضایت‌نامه ماشین‌سازی ویژه' },
    satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت ماشین‌سازی ویژه',
  },
  {
    id: '6',
    title: 'بازسازی کامل واحد ۶۰۰ پتروشیمی آبادان',
    slug: 'abadan-petrochemical-unit-600',
    client: 'کمک‌صنعتگران جنوب',
    location: 'پتروشیمی آبادان',
    serviceDescription: 'عملیات پایپینگ ۳۰ هزار اینچ، ساخت و نصب ساپورت ۵۰ تن، سندبلاست و رنگ‌آمیزی ۵۰۰۰ متر مربع.',
    coverImage: { url: '/media/image42.jpg', alt: 'واحد ۶۰۰ پتروشیمی آبادان' },
    status: 'completed',
    satisfactionLetter: { url: '/media/image52.jpg', alt: 'رضایت‌نامه کمک‌صنعتگران جنوب' },
    satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت کمک‌صنعتگران جنوب',
  },
  {
    id: '7',
    title: 'جمع‌آوری گازهای فلر پالایش نفت آبادان',
    slug: 'abadan-refinery-flare-gas-recovery',
    client: 'طراحی و مهندسی عالی‌نام',
    location: 'پالایشگاه نفت آبادان',
    serviceDescription: 'اجرای پایپینگ ۱۱ هزار اینچ، ساخت و نصب ساپورت ۳۵ تن، سندبلاست و رنگ ۳۰۰۰ متر مربع و پیش‌راه‌اندازی.',
    coverImage: { url: '/media/image45.jpg', alt: 'پروژه جمع‌آوری گازهای فلر' },
    status: 'completed',
    satisfactionLetter: { url: '/media/image53.jpg', alt: 'رضایت‌نامه عالی‌نام' },
    satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت طراحی و مهندسی عالی‌نام',
  },
  {
    id: '8',
    title: 'ترنچ و ترانشه آب و نیروی مکران چابهار',
    slug: 'chabahar-makran-water-power-trench',
    client: 'مهندسی و ساختمان تیو انرژی',
    location: 'چابهار، مکران',
    serviceDescription: 'بتن‌ریزی ۳۰۰۰ متر مکعب، قالب‌بندی ۲۰ هزار متر مربع، آرماتوربندی ۲۴۰ تن، ورق‌گذاری ۵۷ تن.',
    coverImage: { url: '/media/image33.jpg', alt: 'آب و نیروی مکران چابهار' },
    status: 'completed',
    satisfactionLetter: { url: '/media/image47.png', alt: 'رضایت‌نامه تیو انرژی' },
    satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت مهندسی و ساختمان تیو انرژی',
  },
]

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    const project = (result?.docs?.[0] ? JSON.parse(JSON.stringify(result.docs[0])) : null) || DEFAULT_PROJECTS.find(p => p.slug === slug)
    if (!project) return { title: 'پروژه یافت نشد' }
    return {
      title: `${project.title} | ضرغام صنعت اروند`,
      description: project.serviceDescription,
    }
  } catch (_) {
    const fallback = DEFAULT_PROJECTS.find(p => p.slug === slug)
    return { title: fallback ? fallback.title : 'پروژه | ضرغام صنعت اروند' }
  }
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params
  let project: any = null

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (result?.docs?.[0]) {
      project = JSON.parse(JSON.stringify(result.docs[0]))
    }
  } catch (_) {}

  if (!project) {
    project = DEFAULT_PROJECTS.find(p => p.slug === slug)
  }

  if (!project) notFound()

  const satisfactionImgUrl = typeof project.satisfactionLetter === 'object' && project.satisfactionLetter?.url
    ? project.satisfactionLetter.url
    : (typeof project.satisfactionLetter === 'string' ? project.satisfactionLetter : null)

  return (
    <div style={{ paddingTop: 'var(--header-height)' }}>
      {/* Hero image */}
      {project.coverImage && (
        <div style={{ height: '48vh', position: 'relative', overflow: 'hidden' }}>
          <img
            src={project.coverImage.url}
            alt={project.coverImage.alt || project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(6,8,15,0.95) 0%, rgba(13,21,41,0.6) 60%, transparent 100%)',
          }} />
          <div className="container" style={{ position: 'absolute', bottom: '2.5rem', right: 0, left: 0 }}>
            <span className="badge badge--gold" style={{ marginBottom: '0.75rem' }}>پروژه تکمیلی</span>
            <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 800, color: 'var(--white)', fontFamily: 'var(--font-heading)' }}>
              {project.title}
            </h1>
          </div>
        </div>
      )}

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem', alignItems: 'start' }}>
            {/* Main content */}
            <div>
              {!project.coverImage && (
                <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>
                  {project.title}
                </h1>
              )}
              <h2 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '1rem' }}>
                شرح و مشخصات پروژه
              </h2>
              <div className="gold-divider" />
              <p style={{ fontSize: 'var(--text-lg)', color: 'var(--gray-700)', lineHeight: 1.9, marginBottom: '3rem' }}>
                {project.serviceDescription}
              </p>

              {/* Dedicated Client Satisfaction Letter Block */}
              {satisfactionImgUrl && (
                <ProjectSatisfactionCard
                  imageUrl={satisfactionImgUrl}
                  clientName={project.client}
                  projectTitle={project.title}
                  notes={project.satisfactionNotes}
                />
              )}
            </div>

            {/* Meta sidebar */}
            <div style={{ background: 'var(--navy-900)', borderRadius: 'var(--radius-xl)', padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem', border: '1px solid rgba(201,146,42,0.2)' }}>
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--gold-400)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
                اطلاعات پروژه
              </h3>
              {[
                { icon: Building, label: 'کارفرما', value: project.client },
                { icon: MapPin, label: 'محل اجرا', value: project.location },
                { icon: Calendar, label: 'وضعیت قرارداد', value: project.status === 'completed' ? 'خاتمه یافته / تکمیلی' : 'در حال اجرا' },
                { icon: FileCheck, label: 'تاییدیه حسن انجام کار', value: satisfactionImgUrl ? 'دارای رضایت‌نامه کارفرما' : 'تکمیل شده' },
              ].map(({ icon: Icon, label, value }) => value && (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
                  <Icon size={20} style={{ color: 'var(--gold-400)', flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.5)', marginBottom: '0.25rem' }}>{label}</div>
                    <div style={{ fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--white)' }}>{value}</div>
                  </div>
                </div>
              ))}
              <Link href="/contact" className="btn btn--primary" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
                درخواست خدمات مشابه
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        <Link href="/projects" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gold-500)', fontWeight: 600, fontSize: 'var(--text-sm)', textDecoration: 'none' }}>
          <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
          بازگشت به همه پروژه‌ها
        </Link>
      </div>
    </div>
  )
}

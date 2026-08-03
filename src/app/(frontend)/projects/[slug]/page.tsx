import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Building, ChevronLeft, Calendar, FileCheck, Layers, Image as ImageIcon, Award } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import ProjectSatisfactionCard from '@/components/ProjectSatisfactionCard/ProjectSatisfactionCard'
import styles from './ProjectDetail.module.css'

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
  const cleanSlug = slug.replace(/^\/+/, '').replace(/^projects\//, '').replace(/^services\//, '')

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      where: {
        or: [
          { slug: { equals: slug } },
          { slug: { equals: cleanSlug } },
          { slug: { equals: `/${cleanSlug}` } },
          { slug: { equals: `projects/${cleanSlug}` } },
        ],
      },
      limit: 1,
    })
    const project = (result?.docs?.[0] ? JSON.parse(JSON.stringify(result.docs[0])) : null) || DEFAULT_PROJECTS.find(p => p.slug === cleanSlug || p.slug === slug)
    if (!project) return { title: 'پروژه یافت نشد' }
    return {
      title: `${project.title} | ضرغام صنعت اروند`,
      description: project.serviceDescription,
    }
  } catch (_) {
    const fallback = DEFAULT_PROJECTS.find(p => p.slug === cleanSlug || p.slug === slug)
    return { title: fallback ? fallback.title : 'پروژه | ضرغام صنعت اروند' }
  }
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params
  const cleanSlug = slug.replace(/^\/+/, '').replace(/^projects\//, '').replace(/^services\//, '')

  let project: any = null

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      where: {
        or: [
          { slug: { equals: slug } },
          { slug: { equals: cleanSlug } },
          { slug: { equals: `/${cleanSlug}` } },
          { slug: { equals: `projects/${cleanSlug}` } },
        ],
      },
      limit: 1,
    })
    if (result?.docs?.[0]) {
      project = JSON.parse(JSON.stringify(result.docs[0]))
    }
  } catch (_) {}

  if (!project) {
    project = DEFAULT_PROJECTS.find(p => p.slug === cleanSlug || p.slug === slug)
  }

  if (!project) notFound()

  const satisfactionImgUrl = typeof project.satisfactionLetter === 'object' && project.satisfactionLetter?.url
    ? project.satisfactionLetter.url
    : (typeof project.satisfactionLetter === 'string' ? project.satisfactionLetter : null)

  const coverUrl = typeof project.coverImage === 'object' && project.coverImage?.url
    ? project.coverImage.url
    : (typeof project.coverImage === 'string' ? project.coverImage : null)

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Banner */}
      {coverUrl ? (
        <div className={styles.hero}>
          <img
            src={coverUrl}
            alt={project.coverImage?.alt || project.title}
            className={styles.heroImg}
          />
          <div className={styles.heroOverlay} />
          <div className={`container ${styles.heroContent}`}>
            <span className={`${styles.statusBadge} ${project.status === 'completed' ? styles.badgeCompleted : styles.badgeInProgress}`}>
              {project.status === 'completed' ? 'تکمیل شده / خاتمه یافته' : 'در حال اجرا'}
            </span>
            <h1 className={styles.heroTitle}>{project.title}</h1>
          </div>
        </div>
      ) : (
        <div style={{ background: 'var(--navy-900)', padding: '5rem 0 3rem 0', color: '#fff' }}>
          <div className="container">
            <span className={`${styles.statusBadge} ${project.status === 'completed' ? styles.badgeCompleted : styles.badgeInProgress}`} style={{ marginBottom: '1rem' }}>
              {project.status === 'completed' ? 'تکمیل شده / خاتمه یافته' : 'در حال اجرا'}
            </span>
            <h1 className={styles.heroTitle}>{project.title}</h1>
          </div>
        </div>
      )}

      {/* Main Section */}
      <section className={styles.mainSection}>
        <div className="container">
          <div className={styles.grid}>
            {/* Right Main Body */}
            <div className={styles.contentBody}>
              {/* Description Box */}
              <div>
                <div className={styles.sectionHeader}>
                  <h2 className={styles.sectionTitle}>
                    <Layers size={22} className={styles.sectionTitleIcon} />
                    شرح و مشخصات پروژه
                  </h2>
                  <div className={styles.divider} />
                </div>
                <div className={styles.descCard}>
                  <p>{project.serviceDescription}</p>
                </div>
              </div>

              {/* Dedicated Satisfaction Letter Block */}
              {satisfactionImgUrl && (
                <div>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                      <Award size={22} className={styles.sectionTitleIcon} />
                      تاییدیه حسن انجام کار کارفرما
                    </h2>
                    <div className={styles.divider} />
                  </div>
                  <ProjectSatisfactionCard
                    imageUrl={satisfactionImgUrl}
                    clientName={project.client}
                    projectTitle={project.title}
                    notes={project.satisfactionNotes}
                  />
                </div>
              )}

              {/* Before & After Images */}
              {project.beforeAfterImages && project.beforeAfterImages.length > 0 && (
                <div className={styles.beforeAfterBlock}>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                      <ImageIcon size={22} className={styles.sectionTitleIcon} />
                      تصاویر قبل و بعد از اجرا
                    </h2>
                    <div className={styles.divider} />
                  </div>

                  {project.beforeAfterImages.map((item: any, idx: number) => (
                    <div key={idx} className={styles.beforeAfterCard}>
                      <div className={styles.beforeAfterGrid}>
                        {item.before?.url && (
                          <div className={styles.imgBox}>
                            <span className={`${styles.imgTag} ${styles.tagBefore}`}>قبل از اجرا</span>
                            <img src={item.before.url} alt={item.before.alt || 'قبل از اجرا'} className={styles.imgItem} />
                          </div>
                        )}
                        {item.after?.url && (
                          <div className={styles.imgBox}>
                            <span className={`${styles.imgTag} ${styles.tagAfter}`}>بعد از اجرا</span>
                            <img src={item.after.url} alt={item.after.alt || 'بعد از اجرا'} className={styles.imgItem} />
                          </div>
                        )}
                      </div>
                      {item.caption && <p className={styles.caption}>{item.caption}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* Project Gallery */}
              {project.gallery && project.gallery.length > 0 && (
                <div>
                  <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                      <ImageIcon size={22} className={styles.sectionTitleIcon} />
                      گالری تصاویر پروژه
                    </h2>
                    <div className={styles.divider} />
                  </div>

                  <div className={styles.galleryGrid}>
                    {project.gallery.map((item: any, idx: number) => {
                      const imgUrl = typeof item.image === 'object' && item.image?.url ? item.image.url : null
                      if (!imgUrl) return null
                      return (
                        <div key={idx} className={styles.galleryItem}>
                          <div className={styles.galleryImgBox}>
                            <img src={imgUrl} alt={item.image?.alt || `تصویر ${idx + 1}`} className={styles.imgItem} />
                          </div>
                          {item.caption && <p className={styles.galleryCaption}>{item.caption}</p>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Left Sticky Sidebar */}
            <aside className={styles.sidebar}>
              <h3 className={styles.sidebarTitle}>مشخصات کلی قرارداد</h3>

              <div className={styles.metaItem}>
                <Building size={20} className={styles.metaIcon} />
                <div>
                  <div className={styles.metaLabel}>کارفرما / پیمانکار اصلی</div>
                  <div className={styles.metaValue}>{project.client || '—'}</div>
                </div>
              </div>

              <div className={styles.metaItem}>
                <MapPin size={20} className={styles.metaIcon} />
                <div>
                  <div className={styles.metaLabel}>محل اجرا</div>
                  <div className={styles.metaValue}>{project.location || '—'}</div>
                </div>
              </div>

              <div className={styles.metaItem}>
                <Calendar size={20} className={styles.metaIcon} />
                <div>
                  <div className={styles.metaLabel}>وضعیت پروژه</div>
                  <div className={styles.metaValue}>
                    {project.status === 'completed' ? 'تکمیل شده / تحویل داده شده' : 'در حال اجرا'}
                  </div>
                </div>
              </div>

              <div className={styles.metaItem}>
                <FileCheck size={20} className={styles.metaIcon} />
                <div>
                  <div className={styles.metaLabel}>رضایت‌نامه کارفرما</div>
                  <div className={styles.metaValue}>
                    {satisfactionImgUrl ? 'دارای رضایت‌نامه رسمی' : 'ثبت شده در سامانه'}
                  </div>
                </div>
              </div>

              <Link href="/contact" className="btn btn--primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.75rem' }}>
                درخواست خدمات مشابه
              </Link>
            </aside>
          </div>

          <div style={{ marginTop: '3.5rem' }}>
            <Link href="/projects" className={styles.backLink}>
              <ChevronLeft size={16} style={{ transform: 'rotate(180deg)' }} />
              بازگشت به لیست پروژه‌ها
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

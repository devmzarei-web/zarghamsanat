import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Building, ChevronLeft } from 'lucide-react'
import styles from './FeaturedProjects.module.css'

interface Project {
  id: string
  title: string
  slug: string
  client: string
  location: string
  serviceDescription: string
  coverImage?: { url: string; alt?: string }
}

interface FeaturedProjectsProps {
  projects: Project[]
}

const DEFAULT_PROJECTS: Project[] = [
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
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      <div className={styles.cardImage}>
        {project.coverImage ? (
          <Image
            src={project.coverImage.url}
            alt={project.coverImage.alt || project.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={styles.img}
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <Building size={48} />
          </div>
        )}
        <div className={styles.imageOverlay} />
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{project.title}</h3>

        <div className={styles.cardMeta}>
          <span className={styles.metaItem}>
            <Building size={13} />
            {project.client}
          </span>
          <span className={styles.metaItem}>
            <MapPin size={13} />
            {project.location}
          </span>
        </div>

        <p className={styles.cardDesc}>{project.serviceDescription}</p>

        <Link href={`/projects/${project.slug}`} className={styles.cardLink}>
          مشاهده جزئیات
          <ChevronLeft size={14} />
        </Link>
      </div>
    </article>
  )
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const displayProjects = projects && projects.length > 0 ? projects : DEFAULT_PROJECTS

  return (
    <section className={styles.section} aria-label="پروژه‌های شاخص">
      <div className="container">
        <div className={styles.header}>
          <div>
            <span className="section-label">نمونه کارها</span>
            <h2 className="section-title">پروژه‌های شاخص</h2>
            <div className="gold-divider" />
          </div>
          <Link href="/projects" className="btn btn--outline">
            مشاهده همه پروژه‌ها
          </Link>
        </div>

        <div className={styles.grid}>
          {displayProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Building, ChevronLeft } from 'lucide-react'
import { getProjectUrl } from '@/lib/utils'
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
          {project.client && (
            <span className={styles.metaItem}>
              <Building size={13} />
              {project.client}
            </span>
          )}
          {project.location && (
            <span className={styles.metaItem}>
              <MapPin size={13} />
              {project.location}
            </span>
          )}
        </div>

        <p className={styles.cardDesc}>{project.serviceDescription}</p>

        <Link href={getProjectUrl(project.slug)} className={styles.cardLink}>
          مشاهده جزئیات
          <ChevronLeft size={14} />
        </Link>
      </div>
    </article>
  )
}

export default function FeaturedProjects({ projects = [] }: FeaturedProjectsProps) {
  const displayProjects = projects

  if (!displayProjects || displayProjects.length === 0) return null

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

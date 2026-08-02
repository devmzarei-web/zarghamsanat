import Link from 'next/link'
import { ChevronLeft, Home } from 'lucide-react'
import styles from './PageHero.module.css'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeroProps {
  title: string
  subtitle?: string
  badge?: string
  breadcrumbs?: BreadcrumbItem[]
  bgImage?: string
}

export default function PageHero({
  title,
  subtitle,
  badge,
  breadcrumbs = [],
  bgImage,
}: PageHeroProps) {
  return (
    <section className={styles.hero} aria-label={title}>
      {/* Background Image / Overlay */}
      {bgImage && (
        <div
          className={styles.bgImage}
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className={styles.overlay} />

      <div className={`container ${styles.container}`}>
        {/* Breadcrumbs */}
        <nav aria-label="مسیر صفحه" className={styles.breadcrumbsNav}>
          <ol className={styles.breadcrumbsList}>
            <li>
              <Link href="/" className={styles.breadcrumbLink}>
                <Home size={14} />
                صفحه اصلی
              </Link>
            </li>
            {breadcrumbs.map((item, index) => (
              <li key={index} className={styles.breadcrumbItem}>
                <ChevronLeft size={14} className={styles.breadcrumbSep} />
                {item.href ? (
                  <Link href={item.href} className={styles.breadcrumbLink}>
                    {item.label}
                  </Link>
                ) : (
                  <span className={styles.breadcrumbCurrent}>{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Badge */}
        {badge && <span className={styles.badge}>{badge}</span>}

        {/* Title & Subtitle */}
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.goldDivider} />

        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </section>
  )
}

'use client'

import Link from 'next/link'
import { useCountUp } from '@/hooks/useCountUp'
import styles from './StatsSection.module.css'
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal'
import { Calendar, BarChart2, Users, Building2, ArrowUpLeft } from 'lucide-react'
import { toPersianDigits } from '@/lib/utils'

interface StatsSectionProps {
  foundedYear: number
  projectsCompleted: number
  specialists: number
  trustedClients: number
  showPlusSign: boolean
}

function StatCard({
  icon: Icon,
  end,
  label,
  suffix,
  href,
}: {
  icon: React.ElementType
  end: number
  label: string
  suffix: string
  href: string
}) {
  const [count, ref] = useCountUp({ end, duration: 2200 })
  const formattedDigits = toPersianDigits(count)

  return (
    <Link href={href} className={styles.card} title={`${label} - مشاهده جزئیات`}>
      <div className={styles.cardHeader}>
        <div className={styles.cardIcon}>
          <Icon size={28} aria-hidden="true" />
        </div>
        <div className={styles.arrowIcon}>
          <ArrowUpLeft size={16} />
        </div>
      </div>
      <div className={styles.cardNumber} ref={ref as React.RefObject<HTMLDivElement>}>
        {formattedDigits}
        <span className={styles.cardSuffix}>{suffix}</span>
      </div>
      <div className={styles.cardLabel}>{label}</div>
    </Link>
  )
}

export default function StatsSection({
  foundedYear,
  projectsCompleted,
  specialists,
  trustedClients,
  showPlusSign,
}: StatsSectionProps) {
  const suffix = showPlusSign ? '+' : ''

  return (
    <section className={styles.section} aria-label="آمار شرکت">
      <div className="container">
        <ScrollReveal animation="fade-up">
          <div className={styles.grid}>
            <StatCard
              icon={Calendar}
              end={foundedYear}
              label="سال تأسیس"
              suffix=""
              href="/about"
            />
            <StatCard
              icon={BarChart2}
              end={projectsCompleted}
              label="پروژه انجام شده"
              suffix={suffix}
              href="/projects"
            />
            <StatCard
              icon={Users}
              end={specialists}
              label="نیروی متخصص"
              suffix={suffix}
              href="/crew"
            />
            <StatCard
              icon={Building2}
              end={trustedClients}
              label="کارفرمای معتبر"
              suffix={suffix}
              href="/#clients"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

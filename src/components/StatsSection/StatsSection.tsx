'use client'

import { useCountUp } from '@/hooks/useCountUp'
import styles from './StatsSection.module.css'
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal'
import { Calendar, BarChart2, Users, Building2 } from 'lucide-react'

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
}: {
  icon: React.ElementType
  end: number
  label: string
  suffix: string
}) {
  const [count, ref] = useCountUp({ end, duration: 2200 })

  return (
    <div className={styles.card}>
      <div className={styles.cardIcon}>
        <Icon size={32} aria-hidden="true" />
      </div>
      <div className={styles.cardNumber} ref={ref as React.RefObject<HTMLDivElement>}>
        {count.toLocaleString('fa-IR')}
        <span className={styles.cardSuffix}>{suffix}</span>
      </div>
      <div className={styles.cardLabel}>{label}</div>
    </div>
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
            />
            <StatCard
              icon={BarChart2}
              end={projectsCompleted}
              label="پروژه انجام شده"
              suffix={suffix}
            />
            <StatCard
              icon={Users}
              end={specialists}
              label="نیروی متخصص"
              suffix={suffix}
            />
            <StatCard
              icon={Building2}
              end={trustedClients}
              label="کارفرمای معتبر"
              suffix={suffix}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

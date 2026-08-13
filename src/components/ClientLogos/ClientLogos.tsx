'use client'

import { useState } from 'react'
import { Building2, ShieldCheck } from 'lucide-react'
import styles from './ClientLogos.module.css'
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal'
import EmployerModal, { Client, Project } from '@/components/EmployerModal/EmployerModal'

interface ClientLogosProps {
  clients?: Client[]
  projects?: Project[]
}

const getMediaUrl = (mediaObj: any): string | null => {
  if (!mediaObj) return null
  if (typeof mediaObj === 'string') return mediaObj
  if (typeof mediaObj === 'object' && mediaObj !== null) {
    if (mediaObj.url) return mediaObj.url
    if (mediaObj.filename) return `/media/${mediaObj.filename}`
    if (mediaObj.sizes?.card?.url) return mediaObj.sizes.card.url
    if (mediaObj.sizes?.thumbnail?.url) return mediaObj.sizes.thumbnail.url
  }
  return null
}

export default function ClientLogos({ clients = [], projects = [] }: ClientLogosProps) {
  const displayClients = clients
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  if (!displayClients || displayClients.length === 0) return null

  // Prioritize clients with uploaded logos so they appear first
  const sortedClients = [...displayClients].sort((a, b) => {
    const hasLogoA = Boolean(getMediaUrl(a.logo))
    const hasLogoB = Boolean(getMediaUrl(b.logo))
    if (hasLogoA && !hasLogoB) return -1
    if (!hasLogoA && hasLogoB) return 1
    return (a.order ?? 0) - (b.order ?? 0)
  })

  return (
    <>
      <section id="clients" className={styles.section} aria-label="کارفرمایان">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className={styles.header}>
              <span className="section-label">اعتماد و اعتبار صنعتی</span>
              <h2 className="section-title">کارفرمایان و شرکای تجاری کلیدی</h2>
              <div className="orange-divider orange-divider--center" />
            </div>
          </ScrollReveal>

          <div className={styles.grid}>
            {sortedClients.map((client, i) => {
              const logoUrl = getMediaUrl(client.logo)

              return (
                <ScrollReveal key={client.id || i} animation="zoom-in" delay={i * 50}>
                  <div
                    className={styles.card}
                    onClick={() => setSelectedClient(client)}
                    title={`مشاهده پروژه‌های ${client.name}`}
                  >
                    <div className={styles.iconWrap}>
                      {logoUrl ? (
                        <img src={logoUrl} alt={client.name} className={styles.logoImg} />
                      ) : (
                        <Building2 size={22} />
                      )}
                    </div>
                    <div className={styles.cardContent}>
                      <h3 className={styles.clientName}>{client.name}</h3>
                      <span className={styles.clientStatus}>
                        <ShieldCheck size={14} style={{ color: 'var(--safety-orange-500)' }} />
                        مشاهده پروژه‌ها
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </section>

      {selectedClient && (
        <EmployerModal
          client={selectedClient}
          projects={projects}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </>
  )
}

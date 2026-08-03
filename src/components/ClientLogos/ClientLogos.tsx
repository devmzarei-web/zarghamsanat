'use client'

import { useState } from 'react'
import { Building2, ShieldCheck } from 'lucide-react'
import styles from './ClientLogos.module.css'
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal'
import EmployerModal, { Client, Project } from '@/components/EmployerModal/EmployerModal'

const DEFAULT_CLIENTS: Client[] = [
  { id: '1', name: 'مهندسی و ساختمان تیو انرژی' },
  { id: '2', name: 'شرکت پتروشیمی مارون' },
  { id: '3', name: 'پالایش نفت آبادان' },
  { id: '4', name: 'پیشگامان فولاد شرق (فولاد شادگان)' },
  { id: '5', name: 'شرکت صنعتی عمراب' },
  { id: '6', name: 'شرکت جهان فولاد سیرجان' },
  { id: '7', name: 'شرکت ماشین‌سازی ویژه' },
  { id: '8', name: 'شرکت کمک‌صنعتگران جنوب' },
  { id: '9', name: 'طراحی و مهندسی عالی‌نام' },
  { id: '10', name: 'کنسرسیوم سابیک-پترو ODCC' },
]

interface ClientLogosProps {
  clients?: Client[]
  projects?: Project[]
}

const getMediaUrl = (mediaObj: any): string | null => {
  if (!mediaObj) return null
  if (typeof mediaObj === 'string') return mediaObj
  if (typeof mediaObj === 'object' && mediaObj !== null) {
    if (mediaObj.url) return mediaObj.url
    if (mediaObj.sizes?.card?.url) return mediaObj.sizes.card.url
    if (mediaObj.sizes?.thumbnail?.url) return mediaObj.sizes.thumbnail.url
  }
  return null
}

export default function ClientLogos({ clients, projects = [] }: ClientLogosProps) {
  const displayClients = clients && clients.length > 0 ? clients : DEFAULT_CLIENTS
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  return (
    <>
      <section className={styles.section} aria-label="کارفرمایان">
        <div className="container">
          <ScrollReveal animation="fade-up">
            <div className={styles.header}>
              <span className="section-label">اعتماد و اعتبار صنعتی</span>
              <h2 className="section-title">کارفرمایان و شرکای تجاری کلیدی</h2>
              <div className="orange-divider orange-divider--center" />
            </div>
          </ScrollReveal>

          <div className={styles.grid}>
            {displayClients.map((client, i) => {
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

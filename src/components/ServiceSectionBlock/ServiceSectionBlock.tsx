'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, ChevronDown, ArrowUpLeft, HelpCircle, Layers } from 'lucide-react'
import { toPersianDigits } from '@/lib/utils'
import styles from './ServiceSectionBlock.module.css'
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal'

interface FAQ {
  question: string
  answer: string
}

interface Feature {
  feature: string
}

interface ServiceData {
  id: string
  title: string
  slug: string
  shortDescription: string
  description?: any
  coverImage?: { url: string; alt?: string }
  features?: Feature[]
  faqs?: FAQ[]
  ctaText?: string
}

interface ServiceSectionBlockProps {
  service: ServiceData
  index: number
}

export default function ServiceSectionBlock({ service, index }: ServiceSectionBlockProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const toggleFaq = (i: number) => {
    setOpenFaq(openFaq === i ? null : i)
  }

  const numStr = toPersianDigits(index + 1 < 10 ? `۰${index + 1}` : index + 1)
  const coverUrl = service.coverImage?.url || '/images/hero-slide-1.png'
  const featuresList = service.features && service.features.length > 0
    ? service.features
    : [
        { feature: 'طراحی و اجرای دقیق بر اساس آخرین استانداردهای ASME، NACE و API' },
        { feature: 'به‌کارگیری تیم‌های جوشکاری دارای کد بین‌المللی ۶G و کنترل کیفیت (QC)' },
        { feature: 'تست‌های غیرمخرب (NDT) و صدور تاییدیه رسمی کیفیت' },
        { feature: 'برنامه‌ریزی دقیق زمان‌بندی و تحویل به‌موقع در سخت‌ترین شرایط محیطی' },
      ]

  const faqsList = service.faqs && service.faqs.length > 0
    ? service.faqs
    : [
        {
          question: `استاندارد‌های مرجع در ${service.title} چیست؟`,
          answer: 'کلیه عملیات‌های اجرایی و ساخت بر اساس استانداردهای بین‌المللی ASME B31.3، NACE MR0175 و دستورالعمل‌های کنترل کیفیت کارفرما به دقت پیاده‌سازی و بازرسی می‌شوند.',
        },
        {
          question: 'نحوه استعلام قیمت و ثبت سفارش به چه صورت است؟',
          answer: 'شما می‌توانید از طریق فرم تماس با ما یا تماس مستقیم با واحد فنی کارشناسی، اسناد مناقصه و نقشه‌های اجرایی را ارسال فرمایید تا برآورد مالی و زمان‌بندی ارائه شود.',
        },
      ]

  return (
    <section id={`service-${service.slug}`} className={styles.serviceSection}>
      <ScrollReveal animation="fade-up">
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div className={styles.headerBadge}>
            <span className={styles.numText}>{numStr}</span>
          </div>
          <div className={styles.headerTitles}>
            <span className={styles.categoryLabel}>حوزه تخصصی ضرغام صنعت</span>
            <h2 className={styles.title}>{service.title}</h2>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={styles.grid}>
          {/* Cover Photo Pane */}
          <div className={styles.imageCard}>
            <div className={styles.imageWrap}>
              <img src={coverUrl} alt={service.coverImage?.alt || service.title} className={styles.image} />
              <div className={styles.imageOverlay} />
              <div className={styles.imageBadge}>
                <Layers size={16} />
                <span>واحد اجرایی تخصصی</span>
              </div>
            </div>
          </div>

          {/* Description & Features Pane */}
          <div className={styles.infoCard}>
            <p className={styles.shortDesc}>{service.shortDescription}</p>

            {/* Features List */}
            <div className={styles.featuresBox}>
              <h3 className={styles.featuresTitle}>ویژگی‌ها و قابلیت‌های کلیدی:</h3>
              <ul className={styles.featuresList}>
                {featuresList.map((item, i) => (
                  <li key={i} className={styles.featureItem}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span>{item.feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className={styles.ctaWrap}>
              <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className={styles.ctaBtn}>
                <span>{service.ctaText || 'استعلام و مشاوره تخصصی'}</span>
                <ArrowUpLeft size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Service FAQs Accordion */}
        {faqsList.length > 0 && (
          <div className={styles.faqSection}>
            <div className={styles.faqHeader}>
              <HelpCircle size={20} className={styles.faqIcon} />
              <h3 className={styles.faqTitle}>سوالات متداول درباره {service.title}</h3>
            </div>

            <div className={styles.faqContainer}>
              {faqsList.map((faq, i) => {
                const isOpen = openFaq === i
                return (
                  <div key={i} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ''}`}>
                    <button onClick={() => toggleFaq(i)} className={styles.faqQuestionBtn}>
                      <span className={styles.faqQuestionText}>{faq.question}</span>
                      <ChevronDown size={18} className={`${styles.chevron} ${isOpen ? styles.chevronRotated : ''}`} />
                    </button>
                    {isOpen && (
                      <div className={styles.faqAnswerBody}>
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </ScrollReveal>
    </section>
  )
}

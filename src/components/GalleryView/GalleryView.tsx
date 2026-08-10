'use client'

import { useState } from 'react'
import { Eye, MapPin, X, ChevronLeft, ChevronRight, Layers, Tag, Wrench, Sparkles } from 'lucide-react'
import Link from 'next/link'
import styles from './GalleryView.module.css'
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal'
import CoverflowSlider from '@/components/CoverflowSlider/CoverflowSlider'

export interface GalleryItem {
  id?: string
  title: string
  category: string
  customCategory?: string
  image?: { url: string; alt?: string } | string
  caption?: string
  location?: string
  relatedService?: { title: string; slug: string } | string | null
  relatedProject?: { title: string; slug: string } | string | null
  featured?: boolean
  order?: number
}

interface GalleryViewProps {
  items: GalleryItem[]
}

const CATEGORY_LABELS: Record<string, string> = {
  all: 'همه تصاویر و فعالیت‌ها',
  welders: 'جوشکاران تخصصی (۶G)',
  fitters: 'فیترها و مونتاژکاران',
  piping: 'پایپینگ و عایق‌کاری صنعتی',
  mechanical: 'نصب تجهیزات مکانیکال',
  tanks: 'ساخت و مونتاژ مخازن ذخیره',
  sandblast: 'سندبلاست و رنگ‌آمیزی',
  civil: 'عملیات سیویل و بتن‌ریزی',
  hse: 'ایمنی و HSE کارگاه',
  team: 'تیم اجرایی و مدیریت کارگاه',
}

const DEMO_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'عملیات جوشکاری تخصصی ۶G آلیاژی و استنلس استیل',
    category: 'welders',
    location: 'پتروشیمی مارون - ماهشهر',
    caption: 'اجرای جوشکاری تخصصی TIG/SMAW بر اساس WPS/PQR تایید شده با گواهی رادیوگرافی ۱۰۰٪.',
    image: { url: '/images/hero-slide-1.png' },
    relatedService: { title: 'پایپینگ صنعتی', slug: 'piping-and-pipeline' },
    featured: true,
  },
  {
    id: '2',
    title: 'مونتاژ و فیتینگ اسپول‌های پایپینگ فشار قوی',
    category: 'fitters',
    location: 'پالایش نفت آبادان',
    caption: 'پیش‌ساخت و آماده‌سازی اسپول‌های ۲۴ اینچ کلاس ۱۵۰۰ با رعایت کامل تلرانس‌های ASME B31.3.',
    image: { url: '/images/hero-slide-2.png' },
    relatedService: { title: 'پایپینگ صنعتی', slug: 'piping-and-pipeline' },
    featured: true,
  },
  {
    id: '3',
    title: 'نصب و تراز دقیق لیزری پمپ‌های سنگین پالایشگاهی',
    category: 'mechanical',
    location: 'فولاد شادگان',
    caption: 'نصب و گروت‌ریزی پکیج‌های پمپاژ صنعتی و کمپرسورهای دوار فوق سنگین.',
    image: { url: '/images/hero-slide-3.png' },
    relatedService: { title: 'نصب تجهیزات مکانیکال', slug: 'mechanical-installation' },
    featured: true,
  },
  {
    id: '4',
    title: 'مونتاژ بدنه مخازن کروی ذخیره‌سازی نفت خام',
    category: 'tanks',
    location: 'پالایش نفت آبادان',
    caption: 'مونتاژ ورق‌های بدنه مخزن با جک‌های هیدرولیکی اتوماتیک و بازرسی انحراف عمودی API 650.',
    image: { url: '/images/hero-slide-1.png' },
    relatedService: { title: 'ساخت و مونتاژ مخازن', slug: 'storage-tanks' },
    featured: true,
  },
  {
    id: '5',
    title: 'سندبلاست تا درجه Sa 2.5 و اعمال پوشش اپوکسی',
    category: 'sandblast',
    location: 'پتروشیمی مارون',
    caption: 'آماده‌سازی سطح فلزی و اعمال سه لایه رنگ صنعتی زینک‌ریچ و پلی‌اوراتان بر اساس استاندارد SSPC.',
    image: { url: '/images/hero-slide-2.png' },
    relatedService: { title: 'سندبلاست و پوشش‌های صنعتی', slug: 'sandblast-coating' },
    featured: true,
  },
  {
    id: '6',
    title: 'نظارت مستمر کارشناسان HSE و ایمنی در سایت عملیاتی',
    category: 'hse',
    location: 'سایت پروژه آبادان',
    caption: 'کنترل دقیق تجهیزات حفاظت فردی، صدور مجوز کار (Permit to Work) و پایش سلامت کارگاه.',
    image: { url: '/images/hero-slide-3.png' },
    featured: true,
  },
]

export default function GalleryView({ items = [] }: GalleryViewProps) {
  const displayItems = items.length > 0 ? items : DEMO_ITEMS
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null)

  // Featured slider items
  const featuredSliderItems = displayItems.filter((i) => i.featured ?? true)
  const sliderList = featuredSliderItems.length > 0 ? featuredSliderItems : displayItems

  // Filter categories
  const categories = ['all', ...Array.from(new Set(displayItems.map((item) => item.category)))]

  // Filtered list
  const filteredItems =
    activeCategory === 'all'
      ? displayItems
      : displayItems.filter((item) => item.category === activeCategory)

  const getImageUrl = (imgObj: any): string => {
    if (!imgObj) return '/images/hero-slide-1.png'
    if (typeof imgObj === 'string') return imgObj
    if (typeof imgObj === 'object' && imgObj.url) return imgObj.url
    return '/images/hero-slide-1.png'
  }

  const handleLightboxNav = (direction: 'next' | 'prev') => {
    if (!lightboxItem) return
    const currentIdx = filteredItems.findIndex((i) => (i.id || i.title) === (lightboxItem.id || lightboxItem.title))
    if (currentIdx === -1) return

    if (direction === 'next') {
      const nextIdx = (currentIdx + 1) % filteredItems.length
      setLightboxItem(filteredItems[nextIdx])
    } else {
      const prevIdx = (currentIdx - 1 + filteredItems.length) % filteredItems.length
      setLightboxItem(filteredItems[prevIdx])
    }
  }

  return (
    <section className={styles.section}>
      {/* 1. Coverflow 3D Showcase Slider */}
      <div className="container">
        <ScrollReveal animation="fade-up">
          <div className={styles.showcaseHeader}>
            <span className={styles.showcaseBadge}>
              <Sparkles size={15} />
              <span>نمایش سه‌بعدی آلبوم‌های برتر</span>
            </span>
            <h2 className={styles.showcaseTitle}>گالری تصویری پروژه‌ها و توانمندی‌های اجرایی</h2>
            <p className={styles.showcaseSubtitle}>
              برای مشاهده جزئیات هر بخش، تصاویر را ورق بزنید یا روی کلید بزرگ‌نمایی کلیک کنید.
            </p>
          </div>

          <CoverflowSlider
            items={sliderList}
            onOpenLightbox={(item) => setLightboxItem(item)}
            categoryLabels={CATEGORY_LABELS}
          />
        </ScrollReveal>

        {/* 2. Category & Service Filter Tabs */}
        <ScrollReveal animation="fade-up">
          <div className={styles.filterSection}>
            <div className={styles.filterBar}>
              {categories.map((catKey) => (
                <button
                  key={catKey}
                  onClick={() => setActiveCategory(catKey)}
                  className={`${styles.filterTab} ${activeCategory === catKey ? styles.filterTabActive : ''}`}
                >
                  <Tag size={14} />
                  <span>{CATEGORY_LABELS[catKey] || catKey}</span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 3. Filtered Grid Gallery */}
        <div className={styles.grid}>
          {filteredItems.map((item, idx) => {
            const imgUrl = getImageUrl(item.image)
            const catLabel = CATEGORY_LABELS[item.category] || item.customCategory || item.category

            const sTitle =
              typeof item.relatedService === 'object' && item.relatedService
                ? item.relatedService.title
                : null

            const sSlug =
              typeof item.relatedService === 'object' && item.relatedService
                ? item.relatedService.slug
                : null

            return (
              <ScrollReveal key={item.id || idx} animation="fade-up" delay={idx * 50}>
                <div
                  className={styles.card}
                  onClick={() => setLightboxItem(item)}
                  role="button"
                  tabIndex={0}
                  aria-label={`مشاهده ${item.title}`}
                >
                  <div className={styles.imageWrap}>
                    <img src={imgUrl} alt={item.title} className={styles.image} />
                    <div className={styles.overlay}>
                      <div className={styles.zoomBtn}>
                        <Eye size={22} />
                        <span>بزرگ‌نمایی</span>
                      </div>
                    </div>
                    <span className={styles.categoryBadge}>{catLabel}</span>
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>

                    <div className={styles.cardMetaRow}>
                      {sTitle && (
                        <Link
                          href={sSlug ? `/services/${sSlug}` : '/services'}
                          className={styles.serviceLinkTag}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Wrench size={13} />
                          <span>{sTitle}</span>
                        </Link>
                      )}

                      {item.location && (
                        <div className={styles.locationTag}>
                          <MapPin size={13} />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>

                    {item.caption && <p className={styles.caption}>{item.caption}</p>}
                  </div>
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        {filteredItems.length === 0 && (
          <div className={styles.emptyState}>
            <Layers size={48} />
            <p>تصویری در این دسته‌بندی یافت نشد.</p>
          </div>
        )}
      </div>

      {/* 4. Fullscreen Lightbox Modal */}
      {lightboxItem && (
        <div className={styles.lightboxOverlay} onClick={() => setLightboxItem(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setLightboxItem(null)}
              aria-label="بستن"
            >
              <X size={24} />
            </button>

            {filteredItems.length > 1 && (
              <>
                <button
                  className={`${styles.navBtn} ${styles.prevBtn}`}
                  onClick={() => handleLightboxNav('prev')}
                  aria-label="تصویر قبلی"
                >
                  <ChevronRight size={28} />
                </button>
                <button
                  className={`${styles.navBtn} ${styles.nextBtn}`}
                  onClick={() => handleLightboxNav('next')}
                  aria-label="تصویر بعدی"
                >
                  <ChevronLeft size={28} />
                </button>
              </>
            )}

            <div className={styles.lightboxImageWrap}>
              <img
                src={getImageUrl(lightboxItem.image)}
                alt={lightboxItem.title}
                className={styles.lightboxImage}
              />
            </div>

            <div className={styles.lightboxDetails}>
              <div className={styles.lightboxBadgesRow}>
                <span className={styles.lightboxCategory}>
                  {CATEGORY_LABELS[lightboxItem.category] ||
                    lightboxItem.customCategory ||
                    lightboxItem.category}
                </span>

                {typeof lightboxItem.relatedService === 'object' && lightboxItem.relatedService && (
                  <Link
                    href={`/services/${lightboxItem.relatedService.slug}`}
                    className={styles.lightboxServiceLink}
                  >
                    <Wrench size={14} />
                    <span>{lightboxItem.relatedService.title}</span>
                  </Link>
                )}

                {lightboxItem.location && (
                  <span className={styles.lightboxLocation}>
                    <MapPin size={15} />
                    <span>{lightboxItem.location}</span>
                  </span>
                )}
              </div>

              <h2 className={styles.lightboxTitle}>{lightboxItem.title}</h2>

              {lightboxItem.caption && (
                <p className={styles.lightboxCaption}>{lightboxItem.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

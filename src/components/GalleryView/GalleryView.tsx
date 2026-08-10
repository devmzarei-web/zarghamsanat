'use client'

import { useState } from 'react'
import { MapPin, X, ChevronLeft, ChevronRight, Layers, Tag, Wrench } from 'lucide-react'
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
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null)

  // Unique categories
  const categories = ['all', ...Array.from(new Set(displayItems.map((item) => item.category)))]

  const getImageUrl = (imgObj: any): string => {
    if (!imgObj) return '/images/hero-slide-1.png'
    if (typeof imgObj === 'string') return imgObj
    if (typeof imgObj === 'object' && imgObj.url) return imgObj.url
    return '/images/hero-slide-1.png'
  }

  const handleCategorySelect = (catKey: string) => {
    setSelectedCategory(catKey)
    setActiveCategory(catKey)
  }

  const handleLightboxNav = (direction: 'next' | 'prev') => {
    if (!lightboxItem) return
    const currentIdx = displayItems.findIndex(
      (i) => (i.id || i.title) === (lightboxItem.id || lightboxItem.title)
    )
    if (currentIdx === -1) return

    if (direction === 'next') {
      const nextIdx = (currentIdx + 1) % displayItems.length
      setLightboxItem(displayItems[nextIdx])
    } else {
      const prevIdx = (currentIdx - 1 + displayItems.length) % displayItems.length
      setLightboxItem(displayItems[prevIdx])
    }
  }

  return (
    <section className={styles.section}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {/* Single-Line Scrollable Category Filter Navigation Bar */}
        <ScrollReveal animation="fade-up">
          <div className={styles.filterSection}>
            <div className={styles.filterBar}>
              {categories.map((catKey) => (
                <button
                  key={catKey}
                  onClick={() => handleCategorySelect(catKey)}
                  className={`${styles.filterTab} ${activeCategory === catKey ? styles.filterTabActive : ''}`}
                >
                  <Tag size={14} />
                  <span>{CATEGORY_LABELS[catKey] || catKey}</span>
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 3D Coverflow Showcase Slider & Details Box */}
        {displayItems.length > 0 ? (
          <ScrollReveal animation="fade-up">
            <CoverflowSlider
              items={displayItems}
              targetCategory={selectedCategory}
              onActiveCategoryChange={(cat) => setActiveCategory(cat)}
              onOpenLightbox={(item) => setLightboxItem(item)}
              categoryLabels={CATEGORY_LABELS}
            />
          </ScrollReveal>
        ) : (
          <div className={styles.emptyState}>
            <Layers size={48} />
            <p>تصویری در این دسته‌بندی یافت نشد.</p>
          </div>
        )}
      </div>

      {/* Sleek High-Res Lightbox Modal */}
      {lightboxItem && (
        <div className={styles.lightboxOverlay} onClick={() => setLightboxItem(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setLightboxItem(null)}
              aria-label="بستن"
            >
              <X size={22} />
            </button>

            {displayItems.length > 1 && (
              <>
                <button
                  className={`${styles.navBtn} ${styles.prevBtn}`}
                  onClick={() => handleLightboxNav('prev')}
                  aria-label="تصویر قبلی"
                >
                  <ChevronRight size={26} />
                </button>
                <button
                  className={`${styles.navBtn} ${styles.nextBtn}`}
                  onClick={() => handleLightboxNav('next')}
                  aria-label="تصویر بعدی"
                >
                  <ChevronLeft size={26} />
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
                    <Wrench size={13} />
                    <span>{lightboxItem.relatedService.title}</span>
                  </Link>
                )}

                {lightboxItem.location && (
                  <span className={styles.lightboxLocation}>
                    <MapPin size={14} />
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

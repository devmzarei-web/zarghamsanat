'use client'

import { useState } from 'react'
import { Eye, MapPin, X, ChevronLeft, ChevronRight, Layers, Tag } from 'lucide-react'
import styles from './GalleryView.module.css'
import ScrollReveal from '@/components/ScrollReveal/ScrollReveal'

export interface GalleryItem {
  id?: string
  title: string
  category: string
  customCategory?: string
  image?: { url: string; alt?: string } | string
  caption?: string
  location?: string
  featured?: boolean
  order?: number
}

interface GalleryViewProps {
  items: GalleryItem[]
}

const CATEGORY_LABELS: Record<string, string> = {
  all: 'همه تخصص‌ها',
  welders: 'جوشکاران تخصصی (۶G)',
  fitters: 'فیترها و مونتاژکاران',
  piping: 'پایپینگ و عایق‌کاری',
  mechanical: 'تجهیزات مکانیکال',
  tanks: 'ساخت و مونتاژ مخازن',
  sandblast: 'سندبلاست و رنگ‌آمیزی',
  civil: 'عملیات سیویل و بتن',
  hse: 'ایمنی و HSE',
  team: 'تیم اجرایی سایت',
}

const DEMO_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'عملیات جوشکاری تخصصی ۶G آلیاژی و استنلس استیل',
    category: 'welders',
    location: 'پتروشیمی مارون - ماهشهر',
    caption: 'اجرای جوشکاری تخصصی TIG/SMAW بر اساس WPS/PQR تایید شده با گواهی رادیوگرافی ۱۰۰٪.',
    image: { url: '/images/hero-slide-1.png' },
  },
  {
    id: '2',
    title: 'مونتاژ و فیتینگ اسپول‌های پایپینگ فشار قوی',
    category: 'fitters',
    location: 'پالایش نفت آبادان',
    caption: 'پیش‌ساخت و آماده‌سازی اسپول‌های ۲۴ اینچ کلاس ۱۵۰۰ با رعایت کامل تلرانس‌های ASME B31.3.',
    image: { url: '/images/hero-slide-2.png' },
  },
  {
    id: '3',
    title: 'نصب و تراز دقیق لیزری پمپ‌های سنگین پالایشگاهی',
    category: 'mechanical',
    location: 'فولاد شادگان',
    caption: 'نصب و گروت‌ریزی پکیج‌های پمپاژ صنعتی و کمپرسورهای دوار فوق سنگین.',
    image: { url: '/images/hero-slide-3.png' },
  },
  {
    id: '4',
    title: 'مونتاژ بدنه مخازن کروی ذخیره‌سازی نفت خام',
    category: 'tanks',
    location: 'پالایش نفت آبادان',
    caption: 'مونتاژ ورق‌های بدنه مخزن با جک‌های هیدرولیکی اتوماتیک و بازرسی انحراف عمودی API 650.',
    image: { url: '/images/hero-slide-1.png' },
  },
  {
    id: '5',
    title: 'سندبلاست تا درجه Sa 2.5 و اعمال پوشش اپوکسی',
    category: 'sandblast',
    location: 'پتروشیمی مارون',
    caption: 'آماده‌سازی سطح فلزی و اعمال سه لایه رنگ صنعتی زینک‌ریچ و پلی‌اوراتان بر اساس استاندارد SSPC.',
    image: { url: '/images/hero-slide-2.png' },
  },
  {
    id: '6',
    title: 'نظارت مستمر کارشناسان HSE و ایمنی در سایت عملیاتی',
    category: 'hse',
    location: 'سایت پروژه آبادان',
    caption: 'کنترل دقیق تجهیزات حفاظت فردی، صدور مجوز کار (Permit to Work) و پایش سلامت کارگاه.',
    image: { url: '/images/hero-slide-3.png' },
  },
]

export default function GalleryView({ items = [] }: GalleryViewProps) {
  const displayItems = items.length > 0 ? items : DEMO_ITEMS
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  // Collect unique categories
  const categories = ['all', ...Array.from(new Set(displayItems.map((item) => item.category)))]

  // Filtered list
  const filteredItems =
    activeCategory === 'all'
      ? displayItems
      : displayItems.filter((item) => item.category === activeCategory)

  const currentItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null

  const getImageUrl = (imgObj: any): string => {
    if (!imgObj) return '/images/hero-slide-1.png'
    if (typeof imgObj === 'string') return imgObj
    if (typeof imgObj === 'object' && imgObj.url) return imgObj.url
    return '/images/hero-slide-1.png'
  }

  const handleNext = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length)
  }

  const handlePrev = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length)
  }

  return (
    <section className={styles.section}>
      <div className="container">
        {/* Category Filter Tabs */}
        <ScrollReveal animation="fade-up">
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
        </ScrollReveal>

        {/* Gallery Grid */}
        <div className={styles.grid}>
          {filteredItems.map((item, idx) => {
            const imgUrl = getImageUrl(item.image)
            const catLabel = CATEGORY_LABELS[item.category] || item.customCategory || item.category

            return (
              <ScrollReveal key={item.id || idx} animation="fade-up" delay={idx * 60}>
                <div
                  className={styles.card}
                  onClick={() => setLightboxIndex(idx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`مشاهده ${item.title}`}
                >
                  <div className={styles.imageWrap}>
                    <img src={imgUrl} alt={item.title} className={styles.image} />
                    <div className={styles.overlay}>
                      <div className={styles.zoomBtn}>
                        <Eye size={24} />
                        <span>مشاهده تصویر</span>
                      </div>
                    </div>
                    <span className={styles.categoryBadge}>{catLabel}</span>
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    {item.location && (
                      <div className={styles.location}>
                        <MapPin size={14} />
                        <span>{item.location}</span>
                      </div>
                    )}
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

      {/* Lightbox Modal */}
      {currentItem && (
        <div className={styles.lightboxOverlay} onClick={() => setLightboxIndex(null)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.closeBtn}
              onClick={() => setLightboxIndex(null)}
              aria-label="بستن"
            >
              <X size={24} />
            </button>

            {filteredItems.length > 1 && (
              <>
                <button
                  className={`${styles.navBtn} ${styles.prevBtn}`}
                  onClick={handlePrev}
                  aria-label="تصویر قبلی"
                >
                  <ChevronRight size={28} />
                </button>
                <button
                  className={`${styles.navBtn} ${styles.nextBtn}`}
                  onClick={handleNext}
                  aria-label="تصویر بعدی"
                >
                  <ChevronLeft size={28} />
                </button>
              </>
            )}

            <div className={styles.lightboxImageWrap}>
              <img
                src={getImageUrl(currentItem.image)}
                alt={currentItem.title}
                className={styles.lightboxImage}
              />
            </div>

            <div className={styles.lightboxDetails}>
              <span className={styles.lightboxCategory}>
                {CATEGORY_LABELS[currentItem.category] || currentItem.customCategory || currentItem.category}
              </span>
              <h2 className={styles.lightboxTitle}>{currentItem.title}</h2>
              {currentItem.location && (
                <div className={styles.lightboxLocation}>
                  <MapPin size={16} />
                  <span>{currentItem.location}</span>
                </div>
              )}
              {currentItem.caption && (
                <p className={styles.lightboxCaption}>{currentItem.caption}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

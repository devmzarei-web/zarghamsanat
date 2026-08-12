'use client'

import { useState, useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper'
import { ChevronRight, ChevronLeft, Maximize2, MapPin, Tag, Wrench, Sparkles } from 'lucide-react'
import Link from 'next/link'
import styles from './CoverflowSlider.module.css'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export interface CoverflowItem {
  id?: string
  title: string
  category: string
  customCategory?: string
  image?: { url: string; alt?: string } | string
  caption?: string
  location?: string
  relatedService?: { title: string; slug: string } | string | null
  relatedProject?: { title: string; slug: string } | string | null
}

interface CoverflowSliderProps {
  items: CoverflowItem[]
  onOpenLightbox: (item: CoverflowItem) => void
  categoryLabels: Record<string, string>
  targetCategory?: string
  onActiveCategoryChange?: (category: string) => void
}

export default function CoverflowSlider({
  items = [],
  onOpenLightbox,
  categoryLabels,
  targetCategory,
  onActiveCategoryChange,
}: CoverflowSliderProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const isInternalSlide = useRef<boolean>(false)

  if (!items || items.length === 0) return null

  const activeItem = items[activeIndex] || items[0]

  // Slide directly to matching image when targetCategory changes
  useEffect(() => {
    if (!swiperInstance || !targetCategory || targetCategory === 'all') return
    const targetIdx = items.findIndex((item) => item.category === targetCategory)
    if (targetIdx !== -1 && targetIdx !== activeIndex) {
      isInternalSlide.current = true
      if (items.length > 2) {
        swiperInstance.slideToLoop(targetIdx)
      } else {
        swiperInstance.slideTo(targetIdx)
      }
    }
  }, [targetCategory, swiperInstance, items])

  const getImageUrl = (imgObj: any): string => {
    if (!imgObj) return '/images/hero-slide-1.png'
    if (typeof imgObj === 'string') return imgObj
    if (typeof imgObj === 'object' && imgObj.url) return imgObj.url
    return '/images/hero-slide-1.png'
  }

  const catLabel =
    categoryLabels[activeItem.category] || activeItem.customCategory || activeItem.category

  const serviceTitle =
    typeof activeItem.relatedService === 'object' && activeItem.relatedService
      ? activeItem.relatedService.title
      : null

  const serviceSlug =
    typeof activeItem.relatedService === 'object' && activeItem.relatedService
      ? activeItem.relatedService.slug
      : null

  const handleSlideChange = (swiper: SwiperClass) => {
    const realIdx = swiper.realIndex
    setActiveIndex(realIdx)
    const currentItem = items[realIdx]
    if (currentItem && onActiveCategoryChange) {
      onActiveCategoryChange(currentItem.category)
    }
  }

  const initialIndex = Math.floor(items.length / 2)
  const activeBgUrl = getImageUrl(activeItem.image)

  return (
    <div className={styles.sliderContainer}>
      {/* Dynamic Ambient Background Blur */}
      <div
        className={styles.ambientBackdrop}
        style={{ backgroundImage: `url(${activeBgUrl})` }}
      />
      <div className={styles.ambientOverlay} />

      {/* Floating Side Navigation Controls for Edge-to-Edge viewports */}
      <button
        className={`${styles.floatingNavBtn} ${styles.floatingNavPrev}`}
        onClick={() => swiperInstance?.slidePrev()}
        aria-label="تصویر قبلی"
      >
        <ChevronRight size={26} />
      </button>

      <button
        className={`${styles.floatingNavBtn} ${styles.floatingNavNext}`}
        onClick={() => swiperInstance?.slideNext()}
        aria-label="تصویر بعدی"
      >
        <ChevronLeft size={26} />
      </button>

      <div className={styles.swiperWrapper}>
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          initialSlide={initialIndex}
          loop={items.length > 2}
          loopAdditionalSlides={items.length}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 1.25,
            slideShadows: false,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSwiper={setSwiperInstance}
          onSlideChange={handleSlideChange}
          modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
          className={styles.swiper}
        >
          {items.map((item, idx) => {
            const imgUrl = getImageUrl(item.image)
            const itemCat = categoryLabels[item.category] || item.customCategory || item.category
            const isActive = idx === activeIndex

            return (
              <SwiperSlide key={item.id || idx} className={styles.slide}>
                <div
                  className={`${styles.card} ${isActive ? styles.activeCard : ''}`}
                  onClick={() => onOpenLightbox(item)}
                  role="button"
                  tabIndex={0}
                >
                  <img src={imgUrl} alt={item.title} className={styles.cardImage} />
                  <div className={styles.cardGradientOverlay} />
                  
                  <span className={styles.slideCategoryBadge}>
                    <Sparkles size={12} />
                    <span>{itemCat}</span>
                  </span>

                  <button
                    className={styles.quickExpandBtn}
                    onClick={(e) => {
                      e.stopPropagation()
                      onOpenLightbox(item)
                    }}
                    title="مشاهده تصویر بزرگ"
                  >
                    <Maximize2 size={18} />
                  </button>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>

      {/* Dynamic Animated Glassmorphism Caption Panel */}
      <div className={styles.detailBox}>
        <div key={activeItem.id || activeIndex} className={styles.activeDetailsContent}>
          <div className={styles.badgeGroup}>
            <span className={styles.catBadge}>
              <Tag size={13} />
              <span>{catLabel}</span>
            </span>

            {serviceTitle && (
              <Link
                href={serviceSlug ? `/services/${serviceSlug}` : '/services'}
                className={styles.serviceBadge}
              >
                <Wrench size={13} />
                <span>{serviceTitle}</span>
              </Link>
            )}

            {activeItem.location && (
              <span className={styles.locationBadge}>
                <MapPin size={13} />
                <span>{activeItem.location}</span>
              </span>
            )}
          </div>

          <h2 className={styles.activeTitle}>{activeItem.title}</h2>

          {activeItem.caption && <p className={styles.activeCaption}>{activeItem.caption}</p>}
        </div>

        {/* Counter & Progress Bar */}
        <div className={styles.controlsRow}>
          <button
            className={styles.navCircleBtn}
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="اسلاید قبلی"
          >
            <ChevronRight size={18} />
          </button>

          <div className={styles.progressTrack}>
            <div
              className={styles.progressBar}
              style={{ width: `${((activeIndex + 1) / items.length) * 100}%` }}
            />
          </div>

          <span className={styles.slideCounter}>
            <span className={styles.currentNum}>{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className={styles.sep}>/</span>
            <span className={styles.totalNum}>{String(items.length).padStart(2, '0')}</span>
          </span>

          <button
            className={styles.navCircleBtn}
            onClick={() => swiperInstance?.slideNext()}
            aria-label="اسلاید بعدی"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}


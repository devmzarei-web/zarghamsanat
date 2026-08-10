'use client'

import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules'
import type { Swiper as SwiperClass } from 'swiper'
import { ChevronRight, ChevronLeft, Maximize2, MapPin, Tag, Wrench } from 'lucide-react'
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
}

export default function CoverflowSlider({
  items = [],
  onOpenLightbox,
  categoryLabels,
}: CoverflowSliderProps) {
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  if (!items || items.length === 0) return null

  const activeItem = items[activeIndex] || items[0]

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

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.swiperWrapper}>
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          initialSlide={0}
          loop={items.length > 2}
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 180,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
          className={styles.swiper}
        >
          {items.map((item, idx) => {
            const imgUrl = getImageUrl(item.image)
            const itemCat = categoryLabels[item.category] || item.customCategory || item.category

            return (
              <SwiperSlide key={item.id || idx} className={styles.slide}>
                <div
                  className={styles.card}
                  onClick={() => onOpenLightbox(item)}
                  role="button"
                  tabIndex={0}
                >
                  <img src={imgUrl} alt={item.title} className={styles.cardImage} />
                  <div className={styles.cardGradientOverlay} />
                  <span className={styles.slideCategoryBadge}>{itemCat}</span>
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

      {/* Dynamic Detail Info Card & Navigation Controls */}
      <div className={styles.detailBox}>
        <div className={styles.controlsRow}>
          <button
            className={styles.navCircleBtn}
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="اسلاید قبلی"
          >
            <ChevronRight size={22} />
          </button>

          <span className={styles.slideCounter}>
            {activeIndex + 1} / {items.length}
          </span>

          <button
            className={styles.navCircleBtn}
            onClick={() => swiperInstance?.slideNext()}
            aria-label="اسلاید بعدی"
          >
            <ChevronLeft size={22} />
          </button>
        </div>

        <div className={styles.activeDetails}>
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
      </div>
    </div>
  )
}

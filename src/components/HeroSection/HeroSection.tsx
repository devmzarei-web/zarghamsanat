'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react'
import styles from './HeroSection.module.css'

export interface HeroSlide {
  image: { url: string; alt?: string }
  title?: string
  subtitle?: string
  tagline?: string
}

interface HeroSectionProps {
  type: 'video' | 'slider'
  videoUrl?: string
  slides?: HeroSlide[]
  title: string
  subtitle: string
  tagline: string
}

// 3 Default generated hero slides with custom text per slide
const DEFAULT_SLIDES: HeroSlide[] = [
  {
    image: { url: '/images/hero-slide-1.png', alt: 'پایپینگ و پالایشگاه' },
    tagline: 'کیفیت، ایمنی، تعهد: پایه‌های اعتماد',
    title: 'مجری پروژه‌های نفت، گاز، پتروشیمی و صنایع مختلف',
    subtitle: 'اجرای عملیات پایپینگ صنعتی، عایق‌کاری، سندبلاست و رنگ‌آمیزی بر اساس استانداردهای بین‌المللی ASME و NACE',
  },
  {
    image: { url: '/images/hero-slide-2.png', alt: 'تجهیزات مکانیکی' },
    tagline: 'نصب و راه‌اندازی تجهیزات پیشرفته',
    title: 'نصب تخصصی تجهیزات مکانیکی ثابت و دوار',
    subtitle: 'نصب انواع پمپ‌ها، کمپرسورها، مبدل‌های حرارتی، برج‌ها و پکیج‌های صنعتی در سراسر کشور',
  },
  {
    image: { url: '/images/hero-slide-3.png', alt: 'مخازن ذخیره و استراکچر' },
    tagline: 'سازه‌ها و مخازن صنعتی',
    title: 'ساخت و نصب انواع مخازن ذخیره و استراکچر فلزی',
    subtitle: 'طراحی، ساخت و نصب مخازن کروی، سقف ثابت و دو جداره بر اساس استانداردهای API 650 و API 620',
  },
]

export default function HeroSection({
  type,
  videoUrl,
  slides,
  title: defaultTitle,
  subtitle: defaultSubtitle,
  tagline: defaultTagline,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const activeSlides = slides && slides.length > 0 ? slides : DEFAULT_SLIDES
  const activeSlide = activeSlides[currentSlide] || activeSlides[0]

  const currentTitle = activeSlide.title || defaultTitle
  const currentSubtitle = activeSlide.subtitle || defaultSubtitle
  const currentTagline = activeSlide.tagline || defaultTagline

  // Auto-advance slider
  useEffect(() => {
    if (type !== 'slider' || activeSlides.length <= 1) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [type, activeSlides.length])

  // Handle transition state
  useEffect(() => {
    setIsTransitioning(true)
    const t = setTimeout(() => setIsTransitioning(false), 600)
    return () => clearTimeout(t)
  }, [currentSlide])

  const goToSlide = (index: number) => {
    if (isTransitioning) return
    setCurrentSlide(index)
  }

  const goToNext = () => {
    if (isTransitioning) return
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length)
  }

  const goToPrev = () => {
    if (isTransitioning) return
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)
  }

  const scrollToContent = () => {
    const next = heroRef.current?.nextElementSibling as HTMLElement
    next?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={heroRef} className={styles.hero} aria-label="بخش اصلی">
      {/* Background Media */}
      <div className={styles.media}>
        {type === 'video' && videoUrl ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            className={styles.video}
            aria-hidden="true"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          activeSlides.map((slide, i) => {
            const slideImgUrl =
              typeof slide.image === 'object' && slide.image?.url
                ? slide.image.url
                : (typeof slide.image === 'string' && slide.image
                    ? slide.image
                    : `/images/hero-slide-${(i % 3) + 1}.png`)
            return (
              <div
                key={i}
                className={`${styles.slide} ${i === currentSlide ? styles.slideActive : ''}`}
                aria-hidden={i !== currentSlide}
              >
                <div
                  className={styles.slideImage}
                  style={{ backgroundImage: `url("${slideImgUrl}")` }}
                />
              </div>
            )
          })
        )}

        {/* Gradient overlays designed for left-side objects and right-side text */}
        <div className={styles.overlayBottom} />
        <div className={styles.overlayTop} />
        <div className={styles.overlayRight} />
      </div>

      {/* Content - Positioned on the right */}
      <div className={`container ${styles.content}`}>
        <div className={styles.textBlock}>
          <p className={styles.tagline}>{currentTagline}</p>

          <h1 className={styles.title}>
            <span className={styles.titleCompany}>ضرغام صنعت اروند</span>
            <span className={styles.titleMain}>{currentTitle}</span>
          </h1>

          <p className={styles.subtitle}>{currentSubtitle}</p>

          <div className={styles.ctas}>
            <Link href="/about" className="btn btn--primary btn--lg">
              درباره ما
            </Link>
            <Link href="/projects" className="btn btn--ghost btn--lg">
              مشاهده پروژه‌ها
            </Link>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      {type === 'slider' && activeSlides.length > 1 && (
        <>
          <button
            className={`${styles.sliderBtn} ${styles.sliderBtnPrev}`}
            onClick={goToPrev}
            aria-label="اسلاید قبلی"
          >
            <ChevronRight size={24} />
          </button>
          <button
            className={`${styles.sliderBtn} ${styles.sliderBtnNext}`}
            onClick={goToNext}
            aria-label="اسلاید بعدی"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Dots */}
          <div className={styles.dots} role="tablist" aria-label="انتخاب اسلاید">
            {activeSlides.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === currentSlide ? styles.dotActive : ''}`}
                onClick={() => goToSlide(i)}
                role="tab"
                aria-selected={i === currentSlide}
                aria-label={`اسلاید ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Scroll indicator */}
      <button
        className={styles.scrollIndicator}
        onClick={scrollToContent}
        aria-label="رفتن به محتوا"
      >
        <ChevronDown size={24} />
      </button>
    </section>
  )
}

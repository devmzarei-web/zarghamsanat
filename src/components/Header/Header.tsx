'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { toPersianDigits } from '@/lib/utils'
import styles from './Header.module.css'

const DEFAULT_NAV_LINKS = [
  { label: 'صفحه اصلی', href: '/' },
  { label: 'درباره ما', href: '/about' },
  { label: 'خدمات', href: '/services' },
  { label: 'پروژه‌ها', href: '/projects' },
  { label: 'گالری تصاویر', href: '/gallery' },
  { label: 'گواهی‌نامه‌ها', href: '/certificates' },
  { label: 'مقالات', href: '/articles' },
  { label: 'تماس با ما', href: '/contact' },
]

interface HeaderProps {
  settings?: {
    companyName?: string
    tagline?: string
    phone1?: string
    logo?: { url?: string; filename?: string } | string
    navItems?: Array<{ label: string; href: string; order?: number }>
  }
}

export default function Header({ settings }: HeaderProps) {
  const phone = settings?.phone1 || '061-53328646'
  const companyName = settings?.companyName || 'ضرغام صنعت اروند'
  const tagline = settings?.tagline || 'پیمانکاری، صنعتی، پایپینگ و مکانیکال'
  let logoUrl = '/images/Zargham-Logo.png'
  if (settings?.logo && typeof settings.logo === 'object') {
    if (settings.logo.url) logoUrl = settings.logo.url
    else if (settings.logo.filename) logoUrl = `/media/${settings.logo.filename}`
  } else if (typeof settings?.logo === 'string') {
    if (settings.logo.includes('/')) {
      logoUrl = settings.logo
    } else {
      logoUrl = `/media/${settings.logo}`
    }
  }

  // Dynamic Navigation Links from CMS or Fallback
  const cmsNav = settings?.navItems ?? []
  const navLinks = cmsNav.length > 0
    ? cmsNav.sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    : DEFAULT_NAV_LINKS

  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const isInterior = pathname !== '/'
  const isScrolledOrInterior = scrolled || isInterior

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-close menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        ref={headerRef}
        className={`${styles.header} ${isScrolledOrInterior ? styles.headerScrolled : ''}`}
      >
        <div className={`container ${styles.inner}`}>
          {/* Logo */}
          <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
            <div className={styles.logoMark}>
              <img
                src={logoUrl}
                alt={companyName}
                width={72}
                height={72}
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = '/images/Zargham-Logo.png'
                }}
              />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoMain}>{companyName}</span>
              <span className={styles.logoSub}>{tagline}</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav} aria-label="ناوبری اصلی">
            <ul className={styles.navList}>
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* CTA + Hamburger */}
          <div className={styles.actions}>
            <a href={`tel:${phone.replace(/-/g, '')}`} className={`${styles.phoneBtn}`} aria-label="تماس با ما">
              <Phone size={16} />
              <span>{toPersianDigits(phone)}</span>
            </a>
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'بستن منو' : 'باز کردن منو'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Overlay Menu */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileMenuInner}>
          <nav>
            <ul className={styles.mobileNavList}>
              {navLinks.map((link, i) => (
                <li
                  key={link.href}
                  className={styles.mobileNavItem}
                  style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
                >
                  <Link
                    href={link.href}
                    className={styles.mobileNavLink}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.mobileContact}>
            <a href="tel:+986153328646" className="btn btn--primary">
              <Phone size={16} />
              تماس با ما
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

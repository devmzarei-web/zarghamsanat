'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'
import { toPersianDigits } from '@/lib/utils'
import styles from './Header.module.css'

const NAV_LINKS = [
  { label: 'صفحه اصلی', href: '/' },
  { label: 'درباره ما', href: '/about' },
  { label: 'خدمات', href: '/services' },
  { label: 'پروژه‌ها', href: '/projects' },
  { label: 'گواهینامه‌ها', href: '/certificates' },
  { label: 'اخبار', href: '/news' },
  { label: 'تماس با ما', href: '/contact' },
]

interface HeaderProps {
  settings?: {
    companyName?: string
    tagline?: string
    phone1?: string
  }
}

export default function Header({ settings }: HeaderProps) {
  const phone = settings?.phone1 || '061-53328646'
  const companyName = settings?.companyName || 'ضرغام صنعت اروند'
  const tagline = settings?.tagline || 'پیمانکاری، صنعتی، پایپینگ و مکانیکال'
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
                src="/images/Zargham-Logo.png"
                alt="ضرغام صنعت اروند"
                width={72}
                height={72}
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoMain}>ضرغام صنعت اروند</span>
              <span className={styles.logoSub}>پیمانکاری، صنعتی، پایپینگ و مکانیکال</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.nav} aria-label="ناوبری اصلی">
            <ul className={styles.navList}>
              {NAV_LINKS.map((link) => {
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
              {NAV_LINKS.map((link, i) => (
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

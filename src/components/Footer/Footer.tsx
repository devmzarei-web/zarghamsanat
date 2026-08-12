import Link from 'next/link'
import { Phone, Mail, MapPin, ChevronLeft, Hash } from 'lucide-react'
import { toPersianDigits } from '@/lib/utils'
import styles from './Footer.module.css'

const SERVICES = [
  'اجرای پایپینگ صنعتی و عایق‌کاری',
  'نصب تجهیزات مکانیکی (ثابت و دوار)',
  'جوشکاری تخصصی CS، SS و آلیاژی',
  'ساخت و نصب انواع مخازن ذخیره',
  'ساخت و نصب استراکچر و ساپورت',
  'عملیات سیویل، بتن‌ریزی و ساختمانی',
  'سندبلاست و رنگ‌آمیزی صنعتی',
]

const QUICK_LINKS = [
  { label: 'صفحه اصلی', href: '/' },
  { label: 'درباره ما', href: '/about' },
  { label: 'خدمات', href: '/services' },
  { label: 'پروژه‌ها', href: '/projects' },
  { label: 'گالری تصاویر', href: '/gallery' },
  { label: 'گواهی‌نامه‌ها', href: '/certificates' },
  { label: 'مقالات', href: '/articles' },
  { label: 'تماس با ما', href: '/contact' },
]

interface FooterProps {
  settings?: {
    companyName?: string
    tagline?: string
    phone1?: string
    email?: string
    address?: string
    postalCode?: string
    logo?: { url?: string; filename?: string } | string
  }
  services?: Array<{
    id?: string
    title: string
    slug: string
  }>
}

export default function Footer({ settings, services = [] }: FooterProps) {
  const currentYear = new Date().getFullYear()

  const companyName = settings?.companyName || 'ضرغام صنعت اروند'
  const tagline = settings?.tagline || 'پیمانکاری، صنعتی، پایپینگ و مکانیکال'
  const phone1 = settings?.phone1 || '061-53328646'
  const email = settings?.email || 'info@zarghamsanat.ir'
  const address = settings?.address || 'آبادان، کوی قدس، خیابان بهار ۲۷، پلاک ۵'
  const postalCode = settings?.postalCode || '6317814564'
  let logoUrl = '/images/Zargham-Logo.png'
  if (settings?.logo && typeof settings.logo === 'object') {
    if (settings.logo.url) logoUrl = settings.logo.url
    else if (settings.logo.filename) logoUrl = `/media/${settings.logo.filename}`
  } else if (typeof settings?.logo === 'string') {
    logoUrl = settings.logo
  }

  // Dynamic services list from CMS or fallback
  const displayServices = services.length > 0
    ? services.map(s => ({ label: s.title, href: `/services#${s.slug}` }))
    : SERVICES.map(title => ({ label: title, href: '/services' }))

  return (
    <footer className={styles.footer}>
      <div className={styles.topBorder} />

      <div className={`container ${styles.grid}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logoWrap}>
            <div className={styles.logoMark}>
              <img
                src={logoUrl}
                alt={companyName}
                width={76}
                height={76}
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              />
            </div>
            <div>
              <div className={styles.brandName}>{companyName}</div>
              <div className={styles.brandSub}>ZARGHAM SANAT ARVAND CO.</div>
            </div>
          </div>
          <p className={styles.brandDesc}>
            شرکت ضرغام صنعت اروند مجری تخصصی پروژه‌های نفت، گاز، پتروشیمی و صنایع مختلف، با اتکا به نیروی انسانی متخصص، کیفیت عالی و برنامه‌ریزی دقیق زمان‌بندی در سطح کشور فعالیت می‌کند.
          </p>
          <div className={styles.goldDivider} />
          <p className={styles.brandMotto}>{tagline}</p>
        </div>

        {/* Quick Links (Sub-grid layout) */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>لینک‌های سریع</h3>
          <ul className={styles.linkGrid}>
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.footerLink}>
                  <ChevronLeft size={14} />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services (Sub-grid layout dynamically populated from CMS) */}
        <div className={styles.colLarge}>
          <h3 className={styles.colTitle}>خدمات ما</h3>
          <ul className={styles.servicesGrid}>
            {displayServices.map((svc, idx) => (
              <li key={idx}>
                <Link href={svc.href} className={styles.footerLink}>
                  <ChevronLeft size={14} />
                  {svc.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact (Dynamic from CMS) */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>دفتر مرکزی</h3>
          <ul className={styles.contactList}>
            <li>
              <Phone size={16} className={styles.contactIcon} />
              <div>
                <a href={`tel:${phone1.replace(/-/g, '')}`} className={styles.contactLink} dir="ltr">
                  {toPersianDigits(phone1)} (تلفکس)
                </a>
              </div>
            </li>
            <li>
              <Mail size={16} className={styles.contactIcon} />
              <a href={`mailto:${email}`} className={styles.contactLink} dir="ltr">
                {email}
              </a>
            </li>
            <li>
              <MapPin size={16} className={styles.contactIcon} />
              <span className={styles.contactText}>
                {address}
              </span>
            </li>
            <li>
              <Hash size={16} className={styles.contactIcon} />
              <span className={styles.contactText} dir="rtl">
                کد پستی: {toPersianDigits(postalCode)}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomInner}`}>
          <p className={styles.copyright}>
            © {toPersianDigits(currentYear)} تمامی حقوق این وب‌سایت متعلق به شرکت {companyName} می‌باشد.
          </p>
          <p className={styles.devCredit}>
            طراحی و توسعه: <span>محمدعلی زارعی</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

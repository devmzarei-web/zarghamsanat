import Link from 'next/link'
import { Home, PhoneCall, ArrowRight, FileQuestion } from 'lucide-react'

export const metadata = {
  title: 'صفحه یافت نشد (۴۰۴) | ضرغام صنعت اروند',
  description: 'صفحه مورد نظر یافت نشد. می‌توانید به صفحه اصلی یا بخش‌های دیگر سایت مراجعه کنید.',
}

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        background: 'linear-gradient(180deg, var(--navy-950, #0a0f1d) 0%, var(--navy-900, #111827) 100%)',
        color: '#ffffff',
        direction: 'rtl',
      }}
    >
      <div
        style={{
          maxWidth: '650px',
          width: '100%',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(201, 146, 42, 0.25)',
          borderRadius: 'var(--radius-2xl, 1.5rem)',
          padding: '3.5rem 2rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(249, 115, 22, 0.15)',
            border: '2px solid var(--gold-400, #fbbf24)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            color: 'var(--gold-400, #fbbf24)',
          }}
        >
          <FileQuestion size={42} />
        </div>

        <span
          style={{
            display: 'inline-block',
            fontSize: 'var(--text-xs, 0.75rem)',
            fontWeight: 800,
            color: 'var(--gold-400, #fbbf24)',
            letterSpacing: '0.1em',
            marginBottom: '0.5rem',
          }}
        >
          خطای ۴۰۴
        </span>

        <h1
          style={{
            fontSize: 'var(--text-3xl, 2rem)',
            fontWeight: 900,
            fontFamily: 'var(--font-heading)',
            marginBottom: '1rem',
            color: '#ffffff',
          }}
        >
          صفحه مورد نظر یافت نشد
        </h1>

        <p
          style={{
            fontSize: 'var(--text-base, 1rem)',
            color: 'rgba(255, 255, 255, 0.75)',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
          }}
        >
          متأسفانه صفحه‌ای که به دنبال آن بودید وجود ندارد یا آدرس آن تغییر کرده است. می‌توانید به صفحه اصلی بازگردید یا از لینک‌های زیر استفاده نمایید.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
          }}
        >
          <Link
            href="/"
            className="btn btn--primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.75rem',
            }}
          >
            <Home size={18} />
            <span>صفحه اصلی</span>
          </Link>

          <Link
            href="/services"
            className="btn btn--secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.75rem',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <span>خدمات تخصصی</span>
          </Link>

          <Link
            href="/contact"
            className="btn btn--outline"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.75rem',
              color: 'var(--gold-400, #fbbf24)',
              borderColor: 'var(--gold-400, #fbbf24)',
            }}
          >
            <PhoneCall size={18} />
            <span>تماس با ما</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

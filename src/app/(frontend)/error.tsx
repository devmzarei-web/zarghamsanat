'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCw, Home, AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Unhandled Application Error:', error)
  }, [error])

  return (
    <div
      style={{
        minHeight: '70vh',
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
          maxWidth: '600px',
          width: '100%',
          textAlign: 'center',
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
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
            background: 'rgba(239, 68, 68, 0.15)',
            border: '2px solid #ef4444',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto',
            color: '#ef4444',
          }}
        >
          <AlertTriangle size={42} />
        </div>

        <span
          style={{
            display: 'inline-block',
            fontSize: 'var(--text-xs, 0.75rem)',
            fontWeight: 800,
            color: '#ef4444',
            letterSpacing: '0.1em',
            marginBottom: '0.5rem',
          }}
        >
          خطای موقت سیستم (۵۰۰)
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
          مشکلی در پردازش درخواست رخ داد
        </h1>

        <p
          style={{
            fontSize: 'var(--text-base, 1rem)',
            color: 'rgba(255, 255, 255, 0.75)',
            lineHeight: 1.8,
            marginBottom: '2.5rem',
          }}
        >
          یک خطای موقت در ارتباط با سرور رخ داده است. می‌توانید مجدداً تلاش کرده یا به صفحه اصلی بازگردید.
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={() => reset()}
            className="btn btn--primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 1.75rem',
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={18} />
            <span>تلاش مجدد</span>
          </button>

          <Link
            href="/"
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
            <Home size={18} />
            <span>بازگشت به صفحه اصلی</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

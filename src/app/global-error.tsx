'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCw, Home, AlertTriangle } from 'lucide-react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Unhandled Global Error:', error)
  }, [error])

  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>خطای سرور | ضرغام صنعت اروند</title>
        <style>{`
          body {
            margin: 0;
            padding: 0;
            background-color: #0a0f1d;
            color: #ffffff;
            font-family: var(--font-persian, system-ui, sans-serif);
            direction: rtl;
          }
          a, button {
            text-decoration: none;
            font-family: var(--font-persian, system-ui, sans-serif);
          }
          h1, h2, h3, .heading-font {
            font-family: var(--font-heading, system-ui, sans-serif);
          }
        `}</style>
      </head>
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem 1.5rem',
            background: 'linear-gradient(180deg, #0a0f1d 0%, #111827 100%)',
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
              borderRadius: '1.5rem',
              padding: '3.5rem 2rem',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
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
                fontSize: '0.85rem',
                fontWeight: 800,
                color: '#ef4444',
                letterSpacing: '0.1em',
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-heading, system-ui, sans-serif)',
              }}
            >
              خطای سیستم (۵۰۰)
            </span>

            <h1
              className="heading-font"
              style={{
                fontSize: '2rem',
                fontWeight: 900,
                marginBottom: '1rem',
                color: '#ffffff',
              }}
            >
              مشکلی در سرور رخ داده است
            </h1>

            <p
              style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.8,
                marginBottom: '2.5rem',
                fontFamily: 'var(--font-persian, system-ui, sans-serif)',
              }}
            >
              یک خطای موقت در سرور رخ داده است. می‌توانید مجدداً تلاش کرده یا به صفحه اصلی بازگردید.
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
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.75rem',
                  background: 'linear-gradient(135deg, #c9922a, #fbbf24)',
                  color: '#0a0f1d',
                  fontWeight: 800,
                  borderRadius: '0.75rem',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(201, 146, 42, 0.3)',
                  fontFamily: 'var(--font-heading, system-ui, sans-serif)',
                }}
              >
                <RefreshCw size={18} />
                <span>تلاش مجدد</span>
              </button>

              <Link
                href="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.75rem',
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                  fontWeight: 700,
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  fontFamily: 'var(--font-persian, system-ui, sans-serif)',
                }}
              >
                <Home size={18} />
                <span>بازگشت به صفحه اصلی</span>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

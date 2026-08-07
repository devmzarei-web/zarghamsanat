import Link from 'next/link'
import { Home, PhoneCall, FileQuestion, Layers } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'

export const metadata = {
  title: 'صفحه یافت نشد (۴۰۴) | ضرغام صنعت اروند',
  description: 'صفحه مورد نظر یافت نشد. می‌توانید به صفحه اصلی یا بخش‌های دیگر سایت مراجعه کنید.',
}

const TITLE_FONT_MAP: Record<string, string> = {
  YekanBakh: "'YekanBakh', system-ui, sans-serif",
  IRANSansX: "'IRANSansX', system-ui, sans-serif",
  Vazirmatn: "'Vazirmatn', system-ui, sans-serif",
  Anjoman: "'Anjoman', system-ui, sans-serif",
  Kamand: "'Kamand', system-ui, sans-serif",
}

const TEXT_FONT_MAP: Record<string, string> = {
  IRANSansX: "'IRANSansX', system-ui, sans-serif",
  YekanBakh: "'YekanBakh', system-ui, sans-serif",
  Vazirmatn: "'Vazirmatn', system-ui, sans-serif",
}

export default async function GlobalNotFound() {
  let settings: any = null
  try {
    const payload = await getPayloadClient()
    settings = await payload.findGlobal({ slug: 'site-settings' })
  } catch (_) {}

  const titleFontFamily = TITLE_FONT_MAP[settings?.titleFont] || TITLE_FONT_MAP['YekanBakh']
  const textFontFamily = TEXT_FONT_MAP[settings?.textFont] || TEXT_FONT_MAP['IRANSansX']

  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>صفحه یافت نشد (۴۰۴) | ضرغام صنعت اروند</title>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --font-heading: ${titleFontFamily};
                --font-persian: ${textFontFamily};
              }
              body {
                margin: 0;
                padding: 0;
                background-color: #0a0f1d;
                color: #ffffff;
                font-family: var(--font-persian);
                direction: rtl;
              }
              a, button {
                text-decoration: none;
                font-family: var(--font-persian);
              }
              h1, h2, h3, .heading-font {
                font-family: var(--font-heading);
              }
            `,
          }}
        />
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
              maxWidth: '650px',
              width: '100%',
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(201, 146, 42, 0.3)',
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
                background: 'rgba(249, 115, 22, 0.15)',
                border: '2px solid #fbbf24',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem auto',
                color: '#fbbf24',
              }}
            >
              <FileQuestion size={42} />
            </div>

            <span
              style={{
                display: 'inline-block',
                fontSize: '0.85rem',
                fontWeight: 800,
                color: '#fbbf24',
                letterSpacing: '0.1em',
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-heading)',
              }}
            >
              خطای ۴۰۴
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
              صفحه مورد نظر یافت نشد
            </h1>

            <p
              style={{
                fontSize: '1rem',
                color: 'rgba(255, 255, 255, 0.75)',
                lineHeight: 1.8,
                marginBottom: '2.5rem',
                fontFamily: 'var(--font-persian)',
              }}
            >
              متأسفانه صفحه‌ای که به دنبال آن بودید وجود ندارد یا آدرس آن تغییر کرده است. می‌توانید به صفحه اصلی یا سایر بخش‌های سایت مراجعه کنید.
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
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.75rem',
                  background: 'linear-gradient(135deg, #c9922a, #fbbf24)',
                  color: '#0a0f1d',
                  fontWeight: 800,
                  borderRadius: '0.75rem',
                  boxShadow: '0 4px 15px rgba(201, 146, 42, 0.3)',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                <Home size={18} />
                <span>صفحه اصلی</span>
              </Link>

              <Link
                href="/services"
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
                  fontFamily: 'var(--font-persian)',
                }}
              >
                <Layers size={18} />
                <span>خدمات تخصصی</span>
              </Link>

              <Link
                href="/contact"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.75rem',
                  background: 'transparent',
                  color: '#fbbf24',
                  fontWeight: 700,
                  borderRadius: '0.75rem',
                  border: '1px solid #fbbf24',
                  fontFamily: 'var(--font-persian)',
                }}
              >
                <PhoneCall size={18} />
                <span>تماس با ما</span>
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}

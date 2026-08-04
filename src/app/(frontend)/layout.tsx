import type { Metadata } from 'next'
import '@/styles/globals.css'
import { LenisProvider } from '@/lib/LenisProvider'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import LoadingScreen from '@/components/LoadingScreen/LoadingScreen'
import { getPayloadClient } from '@/lib/payload'

export const metadata: Metadata = {
  title: {
    default: 'ضرغام صنعت اروند | پایپینگ صنعتی، مکانیکال و اجرای پروژه‌های نفت و گاز',
    template: '%s | ضرغام صنعت اروند',
  },
  description:
    'شرکت ضرغام صنعت اروند با بیش از ۱۵۰ پروژه موفق در زمینه پایپینگ صنعتی، نصب تجهیزات مکانیکی، جوشکاری تخصصی و اجرای پروژه‌های نفت، گاز و پتروشیمی فعالیت می‌کند.',
  keywords: [
    'ضرغام صنعت اروند',
    'پایپینگ صنعتی',
    'جوشکاری تخصصی',
    'نفت و گاز',
    'مکانیکال',
    'پتروشیمی',
    'آبادان',
    'خوزستان',
  ],
  authors: [{ name: 'ضرغام صنعت اروند' }],
  creator: 'ضرغام صنعت اروند',
  openGraph: {
    type: 'website',
    locale: 'fa_IR',
    url: 'https://zarghamsanat.com',
    siteName: 'ضرغام صنعت اروند',
    title: 'ضرغام صنعت اروند | پایپینگ صنعتی و نفت و گاز',
    description:
      'اجرای دقیق پروژه‌های صنعتی با تکیه بر تخصص و تجربه در صنایع نفت، گاز و پتروشیمی',
  },
  robots: {
    index: true,
    follow: true,
  },
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let settings: any = null
  let services: any[] = []
  try {
    const payload = await getPayloadClient()
    const [rawSettings, servicesRes] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings' }),
      payload.find({ collection: 'services', sort: 'order', limit: 100 }),
    ])
    if (rawSettings) {
      settings = JSON.parse(JSON.stringify(rawSettings))
    }
    if (servicesRes?.docs) {
      services = JSON.parse(JSON.stringify(servicesRes.docs))
    }
  } catch (_) {}

  const faviconUrl =
    settings?.favicon && typeof settings.favicon === 'object' && settings.favicon.url
      ? settings.favicon.url
      : '/favicon.ico'

  const titleFontFamily = TITLE_FONT_MAP[settings?.titleFont] || TITLE_FONT_MAP['YekanBakh']
  const textFontFamily = TEXT_FONT_MAP[settings?.textFont] || TEXT_FONT_MAP['IRANSansX']
  const titleColor = settings?.titleColor || '#111827'
  const subtitleColor = settings?.subtitleColor || '#4b5563'
  const textColor = settings?.textColor || '#111827'

  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={faviconUrl} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --font-heading: ${titleFontFamily};
                --font-persian: ${textFontFamily};
                --color-title: ${titleColor};
                --color-subtitle: ${subtitleColor};
                --color-text: ${textColor};
              }
            `,
          }}
        />
      </head>
      <body>
        <LoadingScreen />
        <LenisProvider>
          <Header settings={settings} />
          <main id="main-content">
            {children}
          </main>
          <Footer settings={settings} services={services} />
        </LenisProvider>
      </body>
    </html>
  )
}


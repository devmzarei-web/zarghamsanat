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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let settings: any = null
  try {
    const payload = await getPayloadClient()
    const rawSettings = await payload.findGlobal({ slug: 'site-settings' })
    if (rawSettings) {
      settings = JSON.parse(JSON.stringify(rawSettings))
    }
  } catch (_) {}

  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body>
        <LoadingScreen />
        <LenisProvider>
          <Header settings={settings} />
          <main id="main-content">
            {children}
          </main>
          <Footer settings={settings} />
        </LenisProvider>
      </body>
    </html>
  )
}

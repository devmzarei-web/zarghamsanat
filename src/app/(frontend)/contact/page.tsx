import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock, Hash, Smartphone } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import { toPersianDigits } from '@/lib/utils'
import ContactForm from '@/components/ContactForm/ContactForm'
import PageHero from '@/components/PageHero/PageHero'

export const revalidate = 60

async function getContactData() {
  try {
    const payload = await getPayloadClient()
    const [cmsPage, siteSettings] = await Promise.all([
      payload.find({
        collection: 'pages',
        where: { slug: { equals: 'contact' } },
        limit: 1,
      }),
      payload.findGlobal({ slug: 'site-settings' }),
    ])

    return JSON.parse(
      JSON.stringify({
        cmsPage: cmsPage?.docs?.[0] ?? null,
        siteSettings,
      })
    )
  } catch (_) {
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactData()
  const cmsPage = data?.cmsPage
  return {
    title: cmsPage?.metaTitle || 'تماس با ما | ضرغام صنعت اروند',
    description: cmsPage?.metaDescription || 'ارتباط با شرکت ضرغام صنعت اروند — شماره تلفن، تلفکس، آدرس دفتر مرکزی و فرم درخواست همکاری',
  }
}

export default async function ContactPage() {
  const data = await getContactData()
  const cmsPage = data?.cmsPage
  const settings = data?.siteSettings

  // If settings exist, use exact values without fallback || that restores cleared fields
  const phone1 = settings ? (settings.phone1 ?? '') : '061-53328646'
  const phone2 = settings ? (settings.phone2 ?? '') : ''
  const mobile = settings ? (settings.mobile ?? '') : ''
  const email1 = settings ? (settings.email ?? '') : 'info@zarghamsanat.ir'
  const email2 = settings ? (settings.email2 ?? '') : ''
  const address = settings ? (settings.address ?? '') : 'آبادان، کوی قدس، خیابان بهار ۲۷، پلاک ۵'
  const postalCode = settings ? (settings.postalCode ?? '') : '6317814564'
  const workingHours = settings ? (settings.workingHours ?? '') : 'شنبه تا چهارشنبه: ۸ الی ۱۷ | پنجشنبه: ۸ الی ۱۳'

  const contactList = [
    { icon: Phone, label: 'تلفکس دفتر مرکزی', values: [phone1, phone2].filter(Boolean) as string[] },
    { icon: Smartphone, label: 'شماره همراه / پشتیبانی', values: [mobile].filter(Boolean) as string[] },
    { icon: Mail, label: 'پست الکترونیک', values: [email1, email2].filter(Boolean) as string[] },
    { icon: MapPin, label: 'آدرس دفتر مرکزی', values: [address].filter(Boolean) as string[] },
    { icon: Hash, label: 'کد پستی', values: [postalCode].filter(Boolean) as string[] },
    { icon: Clock, label: 'ساعات کاری دفتر', values: [workingHours].filter(Boolean) as string[] },
  ].filter((item) => item.values.length > 0)

  return (
    <>
      <PageHero
        title={cmsPage?.heroTitle || 'تماس با ما'}
        badge={cmsPage?.heroBadge || 'دفتر مرکزی و ارتباطات'}
        subtitle={cmsPage?.heroSubtitle || 'آماده پاسخگویی به سوالات، ارائه مشاوره فنی و دریافت درخواست‌های همکاری شما هستیم'}
        breadcrumbs={[{ label: 'تماس با ما' }]}
        bgImage={cmsPage?.heroImage?.url || '/images/hero-slide-2.png'}
      />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '4rem', alignItems: 'start' }}>
            {/* Dynamic Contact info from CMS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                  اطلاعات ارتباطی
                </h2>
                <div className="gold-divider" />
              </div>

              {contactList.map(({ icon: Icon, label, values }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: 'rgba(201,146,42,0.12)', border: '1.5px solid rgba(201,146,42,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={20} style={{ color: 'var(--gold-500)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                      {label}
                    </div>
                    {values.map((v, i) => (
                      <div key={i} style={{ fontSize: 'var(--text-base)', color: 'var(--navy-900)', fontWeight: 600, lineHeight: 1.6, direction: 'rtl' }}>
                        {toPersianDigits(v)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            <div style={{ background: 'var(--navy-900)', borderRadius: 'var(--radius-2xl)', padding: '3rem', border: '1px solid rgba(201,146,42,0.2)', boxShadow: 'var(--shadow-xl)' }}>
              <h2 style={{ fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--gold-300)', marginBottom: '0.5rem', fontFamily: 'var(--font-heading)' }}>
                درخواست همکاری و دریافت استعلام
              </h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', lineHeight: 1.7 }}>
                فرم زیر را تکمیل کنید تا کارشناسان فنی ضرغام صنعت اروند در اسرع وقت با شما تماس بگیرند
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

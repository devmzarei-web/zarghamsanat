import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import PageHero from '@/components/PageHero/PageHero'
import ServicesNav from '@/components/ServicesNav/ServicesNav'
import ServiceSectionBlock from '@/components/ServiceSectionBlock/ServiceSectionBlock'
import BackToTopButton from '@/components/BackToTopButton/BackToTopButton'

export const dynamic = 'force-dynamic'
export const revalidate = 0

async function getServicesPageData() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'services' } },
      limit: 1,
    })
    return result?.docs?.[0] ? JSON.parse(JSON.stringify(result.docs[0])) : null
  } catch (_) {
    return null
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getServicesPageData()
  return {
    title: page?.metaTitle || 'خدمات تخصصی | ضرغام صنعت اروند',
    description: page?.metaDescription || 'خدمات تخصصی شرکت ضرغام صنعت اروند در حوزه پایپینگ، نصب تجهیزات مکانیکی، ساخت مخازن و سیویل صنعتی',
  }
}

const DEFAULT_SERVICES = [
  {
    id: '1',
    title: 'اجرای پایپینگ صنعتی و عایق‌کاری',
    slug: 'industrial-piping',
    shortDescription: 'طراحی، تهیه، اجرا و عایق‌کاری سیستم‌های لوله‌کشی صنعتی در صنایع نفت، گاز و پتروشیمی با بالاترین استانداردهای ASME B31.3 و NACE.',
    features: [
      { feature: 'پیش‌ساخت و جوشکاری Spool در کارگاه و نصب در سایت' },
      { feature: 'تست‌های هیدروستاتیک و پنوماتیک خطوط تحت فشار' },
      { feature: 'عایق‌کاری گرم، سرد و کلدینگ استنلس استیل' },
    ],
    faqs: [
      { question: 'استانداردهای مرجع اجرای پایپینگ چیست؟', answer: 'تمامی مراحل طراحی و اجرا بر اساس استانداردهای ASME B31.3، ASME B31.8 و الزامات پدافند غیرعامل و NACE صورت می‌گیرد.' },
      { question: 'نحوه کنترل کیفیت جوش‌ها چگونه است؟', answer: 'تست‌های NDT شامل RT (رادیوگرافی)، UT (اولتراسونیک)، PT و MT توسط بازرسین Level II مستندسازی و ارائه می‌گردد.' },
    ],
  },
  {
    id: '2',
    title: 'نصب تجهیزات مکانیکی (ثابت و دوار)',
    slug: 'mechanical-equipment',
    shortDescription: 'نصب و راه‌اندازی انواع تجهیزات مکانیکی صنعتی شامل پمپ‌ها، کمپرسورها، مبدل‌های حرارتی، برج‌ها و پکیج‌های صنعتی.',
    features: [
      { feature: 'تراز دقیق لیزری و گروت‌ریزی فونداسیون تجهیزات' },
      { feature: 'نصب سنگین برج‌های تقطیر و مبدل‌های پوسته و لوله' },
      { feature: 'پری‌کمیژنینگ و راه‌اندازی آزمایشی (Cold Run / Hot Run)' },
    ],
    faqs: [
      { question: 'حداکثر تنتاژ نصب تجهیزات توسط شرکت چقدر است؟', answer: 'تیم‌های اجرایی ما تجربه نصب تجهیزات سنگین و فوق سنگین تا ۲۰۰ تن را دارا می‌باشند.' },
    ],
  },
  {
    id: '3',
    title: 'جوشکاری تخصصی (CS، SS و آلیاژی)',
    slug: 'welding',
    shortDescription: 'اجرای جوشکاری تخصصی خطوط لوله و تجهیزات تحت فشار توسط جوشکاران دارای گواهینامه‌های بین‌المللی ۶G و WPS/PQR.',
    features: [
      { feature: 'جوشکاری آلیاژهای خاص Duplex، Inconel و Monel' },
      { feature: 'عملیات حرارتی پس از جوشکاری (PWHT)' },
      { feature: 'تهیه WPS و PQR بر اساس کد ASME Sec IX' },
    ],
  },
  {
    id: '4',
    title: 'ساخت و نصب انواع مخازن ذخیره',
    slug: 'storage-tanks',
    shortDescription: 'طراحی، ساخت و نصب مخازن ذخیره سقف ثابت، کروی و دو جداره بر اساس استانداردهای API 650 و API 620.',
    features: [
      { feature: 'مونتاژ ورق‌های بدنه و سقف با جک‌های هیدرولیکی' },
      { feature: 'نصب سیستم‌های شناور و سیلینگ سقف مخازن' },
      { feature: 'تست هیدروستاتیک و بازرسی انحراف عمودی' },
    ],
  },
  {
    id: '5',
    title: 'ساخت و نصب استراکچر فلزی و ساپورت',
    slug: 'steel-structure',
    shortDescription: 'ساخت و نصب انواع سازه‌های فلزی سنگین صنعتی، استراکچر پالت‌ها، گالری‌ها و پایپ ساپورت‌ها.',
  },
  {
    id: '6',
    title: 'عملیات سیویل، بتن‌ریزی و ساختمانی',
    slug: 'civil-works',
    shortDescription: 'اجرای فونداسیون سنگین تجهیزات، ترنچ و ترانشه‌های صنعتی، دایک‌وال مخازن و عملیات سیویل پلنت‌ها.',
  },
  {
    id: '7',
    title: 'سندبلاست و رنگ‌آمیزی صنعتی',
    slug: 'sandblast-painting',
    shortDescription: 'اجرای سندبلاست سطوح فلزی و اعمال پوشش‌های اپوکسی و ضد خوردگی بر اساس استانداردهای SSPC و NACE.',
  },
  {
    id: '8',
    title: 'تأمین نیروی فنی و اجرایی',
    slug: 'manpower',
    shortDescription: 'تأمین و اعزام تیم‌های متخصص فنی، جوشکاران، فیترها و کارشناسان کنترل کیفیت جهت اجرای پروژه‌ها.',
  },
]

export default async function ServicesPage() {
  const cmsPage = await getServicesPageData()
  let services = DEFAULT_SERVICES

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({ collection: 'services', sort: 'order', limit: 50 })
    const docs = JSON.parse(JSON.stringify(result?.docs ?? []))
    if (docs.length > 0) services = docs
  } catch (_) {}

  const navItems = services.map((s: any) => ({
    id: s.id,
    title: s.title,
    slug: s.slug,
  }))

  return (
    <>
      <PageHero
        title={cmsPage?.heroTitle || 'خدمات تخصصی'}
        badge={cmsPage?.heroBadge || 'حوزه فعالیت‌ها'}
        subtitle={cmsPage?.heroSubtitle || 'ارائه کامل‌ترین خدمات مهندسی، تامین متریال، اجرا و نصب تجهیزات در صنایع نفت، گاز، پتروشیمی و فولاد'}
        breadcrumbs={[{ label: 'خدمات' }]}
        bgImage={cmsPage?.heroImage?.url || '/images/hero-slide-2.png'}
      />

      {/* Sticky Navigation Bar */}
      <ServicesNav services={navItems} />

      {/* Main Content Area: Detailed Services Blocks */}
      <main className="section" style={{ background: 'linear-gradient(180deg, #0b1320 0%, #111a28 100%)' }}>
        <div className="container">
          {services.map((svc: any, i: number) => (
            <ServiceSectionBlock key={svc.id || svc.slug} service={svc} index={i} />
          ))}
        </div>
      </main>

      {/* Floating Back to Top Button */}
      <BackToTopButton />
    </>
  )
}

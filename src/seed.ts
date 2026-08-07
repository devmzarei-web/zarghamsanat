import { loadEnvConfig } from '@next/env'
import { getPayloadClient } from './lib/payload'

function createLexicalContent(text: string) {
  return {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text,
              version: 1,
            },
          ],
          direction: 'rtl',
          format: '',
          indent: 0,
          version: 1,
        },
      ],
      direction: 'rtl',
      format: '',
      indent: 0,
      version: 1,
    },
  }
}

export async function seedDatabase() {
  loadEnvConfig(process.cwd())

  if (!process.env.PAYLOAD_SECRET) {
    process.env.PAYLOAD_SECRET = 'zarghamsanat_secret_key_2026_super_secure'
  }
  if (!process.env.DATABASE_URI) {
    process.env.DATABASE_URI = 'postgresql://postgres:Number05@localhost:5432/zarghamsanat'
  }

  console.log('🌱 Checking & pre-populating Zargham Sanat Arvand CMS records...')
  try {
    const payload = await getPayloadClient()

    // 1. Master Admin User (Safely Check)
    try {
      const existingUsers = await payload.find({
        collection: 'users',
        limit: 1,
      })

      if (existingUsers.docs.length === 0) {
        await payload.create({
          collection: 'users',
          data: {
            email: 'admin@zarghamsanat.ir',
            password: 'Zargham@2026',
            name: 'مدیر سیستم',
          },
        })
        console.log('✅ Created initial admin user: admin@zarghamsanat.ir / Zargham@2026')
      }
    } catch (err) {
      console.log('ℹ Admin user check complete.')
    }

    // 2. Globals: Site Settings
    try {
      const currentSettings = await payload.findGlobal({ slug: 'site-settings' })
      if (!currentSettings?.companyName) {
        await payload.updateGlobal({
          slug: 'site-settings',
          data: {
            companyName: 'ضرغام صنعت اروند',
            tagline: 'پیمانکاری، صنعتی، پایپینگ و مکانیکال',
            phone1: '061-53328646',
            phone2: '0916-000-0000',
            mobile: '0916-000-0000',
            email: 'info@zarghamsanat.com',
            email2: 'zarghamsanat@gmail.com',
            workingHours: 'شنبه تا چهارشنبه: ۸ الی ۱۷ | پنجشنبه: ۸ الی ۱۳',
            postalCode: '6317814564',
            address: 'آبادان، کوی قدس، خیابان بهار ۲۷، پلاک ۵',
            heroType: 'slider',
            heroTitle: 'مجری پروژه‌های نفت، گاز، پتروشیمی و صنایع مختلف',
            heroSubtitle: 'اجرای عملیات پایپینگ صنعتی، عایق‌کاری، سندبلاست و رنگ‌آمیزی بر اساس استانداردهای بین‌المللی ASME و NACE',
            heroTagline: 'کیفیت، ایمنی، تعهد: پایه‌های اعتماد',
            heroSlides: [
              {
                title: 'مجری پروژه‌های نفت، گاز، پتروشیمی و صنایع مختلف',
                subtitle: 'اجرای عملیات پایپینگ صنعتی، عایق‌کاری، سندبلاست و رنگ‌آمیزی بر اساس استانداردهای بین‌المللی ASME و NACE',
              },
              {
                title: 'نصب تخصصی تجهیزات مکانیکی ثابت و دوار',
                subtitle: 'نصب انواع پمپ‌ها، کمپرسورها، مبدل‌های حرارتی، برج‌ها و پکیج‌های صنعتی در سراسر کشور',
              },
              {
                title: 'ساخت و نصب انواع مخازن ذخیره و استراکچر فلزی',
                subtitle: 'طراحی، ساخت و نصب مخازن کروی، سقف ثابت و دو جداره بر اساس استانداردهای API 650 و API 620',
              },
            ],
            navItems: [
              { label: 'صفحه اصلی', href: '/', order: 1 },
              { label: 'درباره ما', href: '/about', order: 2 },
              { label: 'خدمات تخصصی', href: '/services', order: 3 },
              { label: 'پروژه‌ها', href: '/projects', order: 4 },
              { label: 'گواهینامه‌ها', href: '/certificates', order: 5 },
              { label: 'مقالات', href: '/articles', order: 6 },
              { label: 'تماس با ما', href: '/contact', order: 7 },
            ],
            metaTitle: 'ضرغام صنعت اروند | پایپینگ صنعتی، تجهیزات مکانیکی و پروژه‌های نفت و گاز',
            metaDescription: 'شرکت ضرغام صنعت اروند مجری پروژه‌های نفت، گاز، پتروشیمی، پایپینگ صنعتی، نصب تجهیزات مکانیکی، سیویل و ساخت مخازن ذخیره با بیش از یک دهه تجربه در سطح کشور.',
          },
        })
        console.log('✅ Site Settings global populated.')
      }
    } catch (err: any) {
      console.log('ℹ Site Settings error:', err?.message || err)
    }

    // 3. Globals: Stats
    try {
      const currentStats = await payload.findGlobal({ slug: 'stats' })
      if (!currentStats?.foundedYear) {
        await payload.updateGlobal({
          slug: 'stats',
          data: {
            foundedYear: 1390,
            projectsCompleted: 150,
            specialists: 80,
            trustedClients: 40,
            showPlusSign: true,
          },
        })
        console.log('✅ Stats global populated.')
      }
    } catch (err: any) {
      console.log('ℹ Stats error:', err?.message || err)
    }

    // 4. Collection: Pages
    const DEFAULT_PAGES = [
      {
        title: 'صفحه اصلی',
        slug: 'home',
        heroTitle: 'مجری پروژه‌های نفت، گاز، پتروشیمی و صنایع مختلف',
        heroSubtitle: 'اجرای عملیات پایپینگ، نصب تجهیزات مکانیکی، سیویل و ساخت مخازن با بالاترین استانداردهای کیفی',
        heroBadge: 'کیفیت، ایمنی، تعهد: پایه‌های اعتماد',
        storyTitle: 'درباره شرکت ضرغام صنعت اروند',
        bodyContent: 'شرکت ضرغام صنعت اروند، یکی از شرکت‌های پیشرو در اجرای پروژه‌های صنعتی، نفت، گاز و پتروشیمی در جنوب کشور است.',
        metaTitle: 'صفحه اصلی | ضرغام صنعت اروند',
        metaDescription: 'شرکت ضرغام صنعت اروند مجری پروژه‌های نفت، گاز، پتروشیمی، پایپینگ صنعتی، نصب تجهیزات مکانیکی و ساخت مخازن.',
      },
      {
        title: 'درباره ما',
        slug: 'about',
        heroTitle: 'درباره ما',
        heroSubtitle: 'مجری تخصصی پروژه‌های نفت، گاز، پتروشیمی و صنایع مختلف با اتکا به ظرفیت بالای نیروی انسانی متخصص، کیفیت عالی و مدیریت زمان‌بندی',
        heroBadge: 'شناسنامه و سوابق شرکت',
        storyTitle: 'معرفی و تاریخچه شرکت',
        bodyContent: 'شرکت ضرغام صنعت اروند، یکی از شرکت‌های پیمانکاری در اجرای پروژه‌های نفت، گاز، پتروشیمی و صنایع مختلف می‌باشد که از بدو تأسیس تاکنون، با اتکا به ظرفیت بالای نیروی انسانی متخصص تلاش کرده است تا تعهدات قراردادی خود با کارفرمایان را به نحو احسن انجام داده و ضمن مدیریت هزینه‌ها، کیفیت و زمان‌بندی پروژه‌ها را سرلوحه کارهای خود قرار دهد.',
        metaTitle: 'درباره ما | ضرغام صنعت اروند',
        metaDescription: 'درباره شرکت ضرغام صنعت اروند، توانمندی‌های اجرایی، ارزش‌های سازمانی و سابقه فعالیت در صنایع کشور.',
      },
      {
        title: 'خدمات تخصصی',
        slug: 'services',
        heroTitle: 'خدمات تخصصی',
        heroSubtitle: 'ارائه کامل‌ترین خدمات مهندسی، تامین متریال، اجرا و نصب تجهیزات در صنایع نفت، گاز، پتروشیمی و فولاد',
        heroBadge: 'حوزه فعالیت‌ها',
        storyTitle: 'توانمندی‌های مهندسی و اجرایی',
        bodyContent: 'مجموعه جامع خدمات تخصصی شرکت ضرغام صنعت اروند بر اساس آخرین استانداردهای بین‌المللی ASME، API و NACE.',
        metaTitle: 'خدمات تخصصی | ضرغام صنعت اروند',
        metaDescription: 'خدمات تخصصی پایپینگ، نصب تجهیزات مکانیکی، ساخت مخازن، سیویل، سندبلاست و جوشکاری صنعتی.',
      },
      {
        title: 'پروژه‌های ما',
        slug: 'projects',
        heroTitle: 'پروژه‌های ما',
        heroSubtitle: 'سابقه درخشان در اجرای پروژه‌های بزرگ پالایشگاهی، پتروشیمی، فولاد و تأسیسات زیربنایی کشور',
        heroBadge: 'نمونه کارها',
        storyTitle: 'سابقه اجرایی و تحویل پروژه‌ها',
        bodyContent: 'ضرغام صنعت اروند افتخار دارد که طی سالیان متمادی پروژه‌های متعددی را در حوزه نفت، گاز و پتروشیمی با موفقیت به پایان رسانده است.',
        metaTitle: 'پروژه‌ها | ضرغام صنعت اروند',
        metaDescription: 'نمونه پروژه‌های اجرا شده توسط شرکت ضرغام صنعت اروند در پالایشگاه‌ها و پتروشیمی‌های کشور.',
      },
      {
        title: 'گواهینامه‌ها و صلاحیت‌ها',
        slug: 'certificates',
        heroTitle: 'گواهینامه‌ها و صلاحیت‌های قانونی',
        heroSubtitle: 'گواهینامه‌های صلاحیت پیمانکاری، ایمنی (HSE) و استانداردهای بین‌المللی مدیریت کیفیت ISO شرکت ضرغام صنعت اروند',
        heroBadge: 'اعتبارسنجی و رتبه‌بندی',
        storyTitle: 'استانداردها و تاییدیه رسمی',
        bodyContent: 'دارای تاییدیه صلاحیت از سازمان مدیریت و برنامه‌ریزی کشور و گواهی‌نامه‌های کیفیت ISO 9001 و ISO 45001.',
        metaTitle: 'گواهینامه‌ها | ضرغام صنعت اروند',
        metaDescription: 'گواهینامه‌های رسمی رتبه‌بندی ۵ نفت و گاز، ایمنی HSE، ISO 9001 و ISO 45001 شرکت ضرغام صنعت اروند.',
      },
      {
        title: 'اخبار و مقالات',
        slug: 'articles',
        heroTitle: 'اخبار و اطلاع‌رسانی',
        heroSubtitle: 'آخرین اخبار، مقالات تخصصی، گزارشات پیشرفت پروژه و اطلاعیه‌های شرکت ضرغام صنعت اروند',
        heroBadge: 'اخبار و مقالات',
        storyTitle: 'مرکز دانش و اخبار صنعت',
        bodyContent: 'دستاوردهای جدید، مقالات تخصصی مهندسی و آخرین رویدادهای شرکت ضرغام صنعت اروند.',
        metaTitle: 'اخبار و مقالات | ضرغام صنعت اروند',
        metaDescription: 'جدیدترین اخبار، پروژه‌های جدید، مقالات مهندسی و اطلاعیه‌های رسمی شرکت ضرغام صنعت اروند.',
      },
      {
        title: 'تماس با ما',
        slug: 'contact',
        heroTitle: 'تماس با ما',
        heroSubtitle: 'آماده پاسخگویی به سوالات، ارائه مشاوره فنی و دریافت درخواست‌های همکاری شما هستیم',
        heroBadge: 'دفتر مرکزی و ارتباطات',
        storyTitle: 'ارتباط مستقیم با کارشناسان',
        bodyContent: 'جهت استعلام قیمت، مشاوره تخصصی و یا دریافت رزومه رسمی شرکت با دفتر مرکزی تماس حاصل فرمایید.',
        metaTitle: 'تماس با ما | ضرغام صنعت اروند',
        metaDescription: 'ارتباط با دفتر مرکزی شرکت ضرغام صنعت اروند در آبادان، شماره تلفن، تلفکس و فرم استعلام پروژه.',
      },
    ]

    for (const pageItem of DEFAULT_PAGES) {
      try {
        const existingPage = await payload.find({
          collection: 'pages',
          where: { slug: { equals: pageItem.slug } },
        })
        if (existingPage.docs.length === 0) {
          await payload.create({
            collection: 'pages',
            data: pageItem,
          })
          console.log(`✅ Page pre-populated: ${pageItem.slug}`)
        }
      } catch (err: any) {
        console.log(`ℹ Page ${pageItem.slug} error:`, err?.message || err)
      }
    }

    // 5. Collection: Services
    const DEFAULT_SERVICES = [
      {
        title: 'اجرای پایپینگ صنعتی و عایق‌کاری',
        slug: 'industrial-piping',
        shortDescription: 'طراحی، تهیه، اجرا و عایق‌کاری سیستم‌های لوله‌کشی صنعتی در صنایع نفت، گاز و پتروشیمی با بالاترین استانداردهای ASME B31.3 و NACE.',
        description: createLexicalContent('طراحی، تهیه، اجرا و عایق‌کاری سیستم‌های لوله‌کشی صنعتی در صنایع نفت، گاز و پتروشیمی با بالاترین استانداردهای ASME B31.3 و NACE.'),
        order: 1,
        ctaText: 'استعلام و مشاوره تخصصی',
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
        title: 'نصب تجهیزات مکانیکی (ثابت و دوار)',
        slug: 'mechanical-equipment',
        shortDescription: 'نصب و راه‌اندازی انواع تجهیزات مکانیکی صنعتی شامل پمپ‌ها، کمپرسورها، مبدل‌های حرارتی، برج‌ها و پکیج‌های صنعتی.',
        description: createLexicalContent('نصب و راه‌اندازی انواع تجهیزات مکانیکی صنعتی شامل پمپ‌ها، کمپرسورها، مبدل‌های حرارتی، برج‌ها و پکیج‌های صنعتی.'),
        order: 2,
        ctaText: 'استعلام و مشاوره تخصصی',
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
        title: 'جوشکاری تخصصی CS، SS و آلیاژی',
        slug: 'welding',
        shortDescription: 'جوشکاری تخصصی CS، SS، دوبلکس و آلیاژی توسط جوشکاران دارای کد بین‌المللی ۶G و WPS/PQR.',
        description: createLexicalContent('جوشکاری تخصصی CS، SS، دوبلکس و آلیاژی توسط جوشکاران دارای کد بین‌المللی ۶G و WPS/PQR.'),
        order: 3,
        ctaText: 'استعلام و مشاوره تخصصی',
        features: [
          { feature: 'جوشکاران دارای گواهی ۶G و تاییدیه بازرسی فنی' },
          { feature: 'اجرای فرآیندهای TIG, SMAW, FCAW و SAW' },
          { feature: 'عملیات عملیات حرارتی پس از جوشکاری (PWHT)' },
        ],
        faqs: [
          { question: 'آیا WPS و PQR توسط شرکت ارائه می‌شود؟', answer: 'بله، تمامی دستورالعمل‌های جوشکاری استاندارد (WPS) و گزارش‌های تایید دستورالعمل (PQR) ارائه می‌گردد.' },
        ],
      },
      {
        title: 'ساخت و نصب انواع مخازن ذخیره',
        slug: 'storage-tanks',
        shortDescription: 'ساخت و مونتاژ مخازن کروی، سقف ثابت و دو جداره بر اساس استانداردهای API 650 و API 620.',
        description: createLexicalContent('ساخت و مونتاژ مخازن کروی، سقف ثابت و دو جداره بر اساس استانداردهای API 650 و API 620.'),
        order: 4,
        ctaText: 'استعلام و مشاوره تخصصی',
        features: [
          { feature: 'مونتاژ بدنه مخازن با جک‌های هیدرولیکی اتوماتیک' },
          { feature: 'نصب سقف‌های شناور و ثابت و نردبان‌های دورانی' },
          { feature: 'تست‌های خلاء و آبگیری (Hydrotest) مخازن' },
        ],
        faqs: [
          { question: 'استاندارد مرجع ساخت مخازن چیست؟', answer: 'ساخت مخازن بر اساس استانداردهای API 650، API 620 و BS 2654 صورت می‌پذیرد.' },
        ],
      },
      {
        title: 'ساخت و نصب استراکچر و ساپورت',
        slug: 'steel-structure',
        shortDescription: 'ساخت و نصب استراکچر فلزی سنگین صنعتی، پایپ‌رک‌ها، گالری‌ها و ساپورت‌های لوله‌کشی.',
        description: createLexicalContent('ساخت و نصب استراکچر فلزی سنگین صنعتی، پایپ‌رک‌ها، گالری‌ها و ساپورت‌های لوله‌کشی.'),
        order: 5,
        ctaText: 'استعلام و مشاوره تخصصی',
        features: [
          { feature: 'ساخت پایپ‌رک‌های چند طبقه و سازه‌های فلزی پتروشیمی' },
          { feature: 'نصب ساپورت‌های فنری (Spring Support) و هیدرولیکی' },
        ],
        faqs: [
          { question: 'ظرفیت ساخت ماهانه استراکچر چقدر است؟', answer: 'ظرفیت ساخت و نصب استراکچر فلزی شرکت بیش از ۳۰۰ تن در ماه می‌باشد.' },
        ],
      },
      {
        title: 'عملیات سیویل، بتن‌ریزی و ساختمانی',
        slug: 'civil-works',
        shortDescription: 'اجرای فونداسیون‌های فوق سنگین، ترنچ و ترانشه‌های صنعتی, دایک‌وال و سازه‌های بتنی پتروشیمی.',
        description: createLexicalContent('اجرای فونداسیون‌های فوق سنگین، ترنچ و ترانشه‌های صنعتی, دایک‌وال و سازه‌های بتنی پتروشیمی.'),
        order: 6,
        ctaText: 'استعلام و مشاوره تخصصی',
        features: [
          { feature: 'بتن‌ریزی حجیم فونداسیون تجهیزات و مخازن' },
          { feature: 'اجرای کانال‌های کابل‌کشی و حوضچه‌های آبرسانی' },
        ],
        faqs: [
          { question: 'آیا آزمایشات بتن انجام می‌شود؟', answer: 'بله، آزمایش‌های اسلامپ، مقاومت فشاری ۷ و ۲۸ روزه بتن در تمامی مراحل مستند می‌شود.' },
        ],
      },
      {
        title: 'سندبلاست و رنگ‌آمیزی صنعتی',
        slug: 'sandblast-painting',
        shortDescription: 'سندبلاست سطوح فلزی و اعمال پوشش‌های اپوکسی و ضد خوردگی بر اساس استانداردهای SSPC و NACE.',
        description: createLexicalContent('سندبلاست سطوح فلزی و اعمال پوشش‌های اپوکسی و ضد خوردگی بر اساس استانداردهای SSPC و NACE.'),
        order: 7,
        ctaText: 'استعلام و مشاوره تخصصی',
        features: [
          { feature: 'آماده‌سازی سطح تا درجه Sa 2.5 و Sa 3' },
          { feature: 'اعمال پوشش‌های زینک‌ریچ، اپوکسی و پلی‌اوراتان' },
        ],
        faqs: [
          { question: 'دستگاه‌های سنجش ضخامت رنگ چگونه است؟', answer: 'اندازه‌گیری ضخامت رنگ خشک (DFT) توسط دستگاه‌های کالیبره شده Elcometer صورت می‌گیرد.' },
        ],
      },
      {
        title: 'تأمین نیروی فنی و اجرایی',
        slug: 'manpower',
        shortDescription: 'اعزام تیم‌های فنی مجرب، فیتر، جوشکار ۶G و کارشناسان کنترل کیفیت (QC) جهت پروژه‌های صنعتی.',
        description: createLexicalContent('اعزام تیم‌های فنی مجرب، فیتر، جوشکار ۶G و کارشناسان کنترل کیفیت (QC) جهت پروژه‌های صنعتی.'),
        order: 8,
        ctaText: 'استعلام و مشاوره تخصصی',
        features: [
          { feature: 'تامین فیترهای لوله‌کشی و مونتاژکاران حرفه‌ای' },
          { feature: 'تامین بازرسین QC و کارشناسان ایمنی HSE' },
        ],
        faqs: [
          { question: 'سرعت اعزام نیرو به پروژه چقدر است؟', answer: 'تیم‌های فنی متخصص ظرف ۴۸ ساعت پس از عقد قرارداد آماده استقرار در سایت پروژه می‌باشند.' },
        ],
      },
    ]

    for (const svcItem of DEFAULT_SERVICES) {
      try {
        const existingSvc = await payload.find({
          collection: 'services',
          where: { slug: { equals: svcItem.slug } },
        })
        if (existingSvc.docs.length === 0) {
          await payload.create({
            collection: 'services',
            data: svcItem as any,
          })
          console.log(`✅ Service pre-populated: ${svcItem.slug}`)
        }
      } catch (err: any) {
        console.log(`ℹ Service ${svcItem.slug} error:`, err?.message || err)
      }
    }

    // 6. Collection: Projects
    const DEFAULT_PROJECTS = [
      {
        title: 'سیویل، سندبلاست و رنگ مخازن پتروشیمی مارون',
        slug: 'marun-petrochemical-tanks',
        client: 'مهندسی و ساختمان تیو انرژی',
        location: 'ماهشهر، پتروشیمی مارون',
        serviceDescription: 'رنگ‌آمیزی ۱۵ هزار متر مربع داخل و خارج مخازن، اجرای فونداسیون سوپراستراکچر مخازن و دایک‌وال‌های اطراف.',
        featured: true,
        order: 1,
      },
      {
        title: 'نصب و پایپینگ تجهیزات تصفیه آب فولاد شادگان',
        slug: 'shadgan-steel-water-treatment',
        client: 'شرکت عمراب',
        location: 'شادگان',
        serviceDescription: 'عملیات پایپینگ ۱۰۰ هزار اینچ، نصب ۳۰۰ تن تجهیزات ثابت، ۲۵۰ تن تجهیزات دوار و ۱۰ هزار متر مربع رنگ.',
        featured: true,
        order: 2,
      },
      {
        title: 'پایپینگ مخازن کروی پالایشگاه آبادان',
        slug: 'abadan-refinery-spherical-tanks',
        client: 'مهندسی و ساختمان تیو انرژی',
        location: 'پالایش نفت آبادان',
        serviceDescription: 'پایپینگ ۲۴ هزار اینچ، ساخت و نصب ۸۰ تن ساپورت و استراکچر، کابل‌کشی و سندبلاست و رنگ‌آمیزی.',
        featured: true,
        order: 3,
      },
    ]

    for (const projItem of DEFAULT_PROJECTS) {
      try {
        const existingProj = await payload.find({
          collection: 'projects',
          where: { slug: { equals: projItem.slug } },
        })
        if (existingProj.docs.length === 0) {
          await payload.create({
            collection: 'projects',
            data: projItem as any,
          })
          console.log(`✅ Project pre-populated: ${projItem.slug}`)
        }
      } catch (err: any) {
        console.log(`ℹ Project ${projItem.slug} error:`, err?.message || err)
      }
    }

    // 7. Collection: Team
    const DEFAULT_TEAM = [
      {
        name: 'مهندس زرغام زارعی',
        role: 'مدیرعامل و رئیس هیئت مدیره',
        isCeo: true,
        bio: 'با بیش از ۱۵ سال سابقه مدیریت پروژه‌های کلان نفت، گاز و پتروشیمی در سطح کشور',
        quote: 'کیفیت و ایمنی در خطوط لوله و تجهیزات صنعتی، پایه و اساس اعتماد کارفرمایان ماست.',
        email: 'info@zarghamsanat.com',
        phone: '061-53328646',
        order: 1,
      },
      {
        name: 'مهندس علی زارعی',
        role: 'معاونت اجرایی و مدیر پروژه‌ها',
        isCeo: false,
        bio: 'سرپرست کلیه عملیات‌های پایپینگ، نصب تجهیزات مکانیکی و سندبلاست در پروژه‌های صنعتی',
        email: 'exec@zarghamsanat.com',
        phone: '0916-000-0000',
        order: 2,
      },
    ]

    for (const teamItem of DEFAULT_TEAM) {
      try {
        const existingTeam = await payload.find({
          collection: 'team',
          where: { name: { equals: teamItem.name } },
        })
        if (existingTeam.docs.length === 0) {
          await payload.create({
            collection: 'team',
            data: teamItem as any,
          })
          console.log(`✅ Team member pre-populated: ${teamItem.name}`)
        }
      } catch (err: any) {
        console.log(`ℹ Team ${teamItem.name} error:`, err?.message || err)
      }
    }

    // 8. Collection: Certificates
    const DEFAULT_CERTIFICATES = [
      {
        name: 'رتبه‌بندی ۵ رشته نفت و گاز',
        type: 'other',
        issuer: 'سازمان مدیریت و برنامه‌ریزی کشور',
        certificateNumber: 'OG-90231',
        description: 'تاییدیه صلاحیت پیمانکاری اجرایی در صنایع نفت، گاز و پتروشیمی',
        featured: true,
      },
      {
        name: 'سیستم مدیریت کیفیت ISO 9001:2015',
        type: 'iso-9001',
        issuer: 'TÜV NORD',
        description: 'گواهینامه بین‌المللی استانداردهای سیستم مدیریت کیفیت',
        featured: true,
      },
      {
        name: 'سیستم مدیریت ایمنی و بهداشت ISO 45001:2018',
        type: 'iso-45001',
        issuer: 'TÜV NORD',
        description: 'گواهینامه ایمنی و بهداشت حرفه‌ای در پروژه‌های صنعتی',
        featured: true,
      },
      {
        name: 'سیستم مدیریت ایمنی، بهداشت و محیط زیست HSE-MS',
        type: 'hse',
        issuer: 'شرکت ملی نفت ایران',
        description: 'تاییدیه مدیریت ایمنی و حفظ محیط زیست در کارگاه‌ها و سایت‌های عملیاتی',
        featured: true,
      },
    ]

    for (const certItem of DEFAULT_CERTIFICATES) {
      try {
        const existingCert = await payload.find({
          collection: 'certificates',
          where: { name: { equals: certItem.name } },
        })
        if (existingCert.docs.length === 0) {
          await payload.create({
            collection: 'certificates',
            data: certItem as any,
          })
          console.log(`✅ Certificate pre-populated: ${certItem.name}`)
        }
      } catch (err: any) {
        console.log(`ℹ Certificate ${certItem.name} error:`, err?.message || err)
      }
    }

    // 9. Collection: Clients
    const DEFAULT_CLIENTS = [
      { name: 'شرکت مهندسی و ساختمان تیو انرژی', website: 'https://tiuenergy.com', order: 1 },
      { name: 'شرکت پالایش نفت آبادان', website: 'https://alor.ir', order: 2 },
      { name: 'شرکت پتروشیمی مارون', website: 'https://mpc.ir', order: 3 },
      { name: 'پیشگامان فولاد شرق (فولاد شادگان)', website: 'https://ssico.ir', order: 4 },
      { name: 'شرکت صنعتی عمراب', website: 'https://omrab.com', order: 5 },
      { name: 'شرکت جهان فولاد سیرجان', website: 'https://sjsco.ir', order: 6 },
      { name: 'شرکت ماشین‌سازی ویژه', website: 'https://vije.co', order: 7 },
      { name: 'شرکت کمک‌صنعتگران جنوب', website: '', order: 8 },
      { name: 'شرکت طراحی و مهندسی عالی‌نام', website: '', order: 9 },
      { name: 'کنسرسیوم ساینوپک چین و ODCC', website: '', order: 10 },
    ]

    for (const clientItem of DEFAULT_CLIENTS) {
      try {
        const existingClient = await payload.find({
          collection: 'clients',
          where: { name: { equals: clientItem.name } },
        })
        if (existingClient.docs.length === 0) {
          await payload.create({
            collection: 'clients',
            data: clientItem as any,
          })
          console.log(`✅ Client pre-populated: ${clientItem.name}`)
        }
      } catch (err: any) {
        console.log(`ℹ Client ${clientItem.name} error:`, err?.message || err)
      }
    }

    // 10. Collection: Articles
    const DEFAULT_ARTICLES = [
      {
        title: 'استانداردهای بین‌المللی ASME B31.3 در اجرای خطوط لوله صنعتی تحت فشار',
        slug: 'asme-b31-3-piping-standards',
        summary: 'بررسی الزامات طراحی، انتخاب متریال، جوشکاری تخصصی و تست‌های غیرمخرب (NDT) در سیستم‌های لوله‌کشی صنایع نفت و پتروشیمی.',
        author: 'واحد مهندسی و کنترل کیفیت (QC)',
        readingTime: '۷ دقیقه مطالعه',
        content: createLexicalContent('بررسی الزامات طراحی، انتخاب متریال، جوشکاری تخصصی و تست‌های غیرمخرب (NDT) در سیستم‌های لوله‌کشی صنایع نفت و پتروشیمی.'),
        category: 'technical',
        publishDate: new Date('2026-05-15T00:00:00Z').toISOString(),
        published: true,
        featured: true,
      },
      {
        title: 'تکنیک‌های جوشکاری تخصصی آلیاژهای SS و Duplex با گواهینامه ۶G',
        slug: 'duplex-welding-techniques',
        summary: 'معرفی دستورالعمل‌های WPS/PQR، كنترل حرارت ورودی (Heat Input) و عایق‌کاری گازی در جوشکاری فولادهای زنگ‌نزدیک و دو فازی.',
        author: 'سرپرست بازرسی فنی و جوش',
        readingTime: '۵ دقیقه مطالعه',
        content: createLexicalContent('معرفی دستورالعمل‌های WPS/PQR، كنترل حرارت ورودی (Heat Input) و عایق‌کاری گازی در جوشکاری فولادهای زنگ‌نزدیک و دو فازی.'),
        category: 'technical',
        publishDate: new Date('2026-04-10T00:00:00Z').toISOString(),
        published: true,
        featured: true,
      },
    ]

    for (const articleItem of DEFAULT_ARTICLES) {
      try {
        const existingArt = await payload.find({
          collection: 'articles',
          where: { slug: { equals: articleItem.slug } },
        })
        if (existingArt.docs.length === 0) {
          await payload.create({
            collection: 'articles',
            data: articleItem as any,
          })
          console.log(`✅ Article pre-populated: ${articleItem.slug}`)
        }
      } catch (err: any) {
        console.log(`ℹ Article ${articleItem.slug} error:`, err?.message || err)
      }
    }

    console.log('🎉 All default CMS records checked and pre-populated successfully!')
  } catch (err: any) {
    console.error('❌ Error pre-populating CMS data:', err?.message || err)
  }
}

if (!process.env.DATABASE_URI) {
  process.env.DATABASE_URI = 'postgresql://postgres:Number05@localhost:5432/zarghamsanat'
}
if (!process.env.PAYLOAD_SECRET) {
  process.env.PAYLOAD_SECRET = 'zarghamsanat_secret_key_2026_super_secure'
}

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import path from 'path'
import fs from 'fs'

async function seed() {
  console.log('🌱 Starting Zargham Sanat database seed...')

  try {
    const payload = await getPayload({ config: configPromise })

    // Helper to upload or get media
    async function getOrCreateMedia(filename: string, altText: string) {
      const publicMediaPath = path.join(process.cwd(), 'public', 'media', filename)
      if (!fs.existsSync(publicMediaPath)) {
        console.log(`⚠️ Media file not found: ${filename}`)
        return null
      }

      const existingMedia = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
      })

      if (existingMedia.docs.length > 0) {
        return existingMedia.docs[0].id
      }

      const mediaDoc = await payload.create({
        collection: 'media',
        filePath: publicMediaPath,
        data: {
          alt: altText,
        },
      })

      return mediaDoc.id
    }

    // 1. Create Initial Admin User if not exists
    const existingUsers = await payload.find({ collection: 'users', limit: 1 })
    if (existingUsers.docs.length === 0) {
      console.log('👤 Creating initial admin user...')
      await payload.create({
        collection: 'users',
        data: {
          email: 'admin@zarghamsanat.com',
          password: 'Zargham@2026',
          name: 'مدیر سیستم',
        },
      })
      console.log('✅ Initial admin user created (Email: admin@zarghamsanat.com / Pass: Zargham@2026)')
    }

    // Upload 3 hero slide images
    const hero1Id = await getOrCreateMedia('hero-slide-1.png', 'پایپینگ و پالایشگاه')
    const hero2Id = await getOrCreateMedia('hero-slide-2.png', 'تجهیزات مکانیکی')
    const hero3Id = await getOrCreateMedia('hero-slide-3.png', 'مخازن ذخیره و استراکچر')

    // 2. Update SiteSettings global with 3 hero slides containing individual titles & subtitles
    console.log('⚙️ Updating SiteSettings with 3 hero slides...')
    await payload.updateGlobal({
      slug: 'site-settings',
      data: {
        companyName: 'ضرغام صنعت اروند',
        tagline: 'پیمانکاری، صنعتی، پایپینگ و مکانیکال',
        heroType: 'slider',
        heroSlides: [
          {
            image: hero1Id || undefined,
            title: 'مجری پروژه‌های نفت، گاز، پتروشیمی و صنایع مختلف',
            subtitle: 'اجرای عملیات پایپینگ صنعتی، عایق‌کاری، سندبلاست و رنگ‌آمیزی بر اساس استانداردهای بین‌المللی ASME و NACE',
          },
          {
            image: hero2Id || undefined,
            title: 'نصب تخصصی تجهیزات مکانیکی ثابت و دوار',
            subtitle: 'نصب انواع پمپ‌ها، کمپرسورها، مبدل‌های حرارتی، برج‌ها و پکیج‌های صنعتی در سراسر کشور',
          },
          {
            image: hero3Id || undefined,
            title: 'ساخت و نصب انواع مخازن ذخیره و استراکچر فلزی',
            subtitle: 'طراحی، ساخت و نصب مخازن کروی، سقف ثابت و دو جداره بر اساس استانداردهای API 650 و API 620',
          },
        ],
        heroTitle: 'مجری پروژه‌های نفت، گاز، پتروشیمی و صنایع مختلف',
        heroSubtitle: 'اجرای عملیات پایپینگ، نصب تجهیزات مکانیکی، سیویل و ساخت مخازن با بالاترین استانداردهای کیفی',
        heroTagline: 'کیفیت، ایمنی، تعهد: پایه‌های اعتماد',
        phone1: '061-53328646',
        phone2: '0916-000-0000',
        mobile: '0916-000-0000',
        email: 'info@zarghamsanat.com',
        email2: 'zarghamsanat@gmail.com',
        workingHours: 'شنبه تا چهارشنبه: ۸ الی ۱۷ | پنجشنبه: ۸ الی ۱۳',
        postalCode: '6317814564',
        address: 'آبادان، کوی قدس، خیابان بهار ۲۷، پلاک ۵',
      },
    })

    // 3. Update Stats global
    console.log('📊 Updating Stats...')
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

    // 4. Seed Services
    console.log('🛠️ Seeding Services...')
    const existingServices = await payload.find({ collection: 'services', limit: 10 })
    if (existingServices.docs.length === 0) {
      const servicesData = [
        {
          title: 'اجرای پایپینگ صنعتی و عایق‌کاری',
          slug: 'industrial-piping',
          shortDescription: 'طراحی، تهیه، اجرا و عایق‌کاری سیستم‌های لوله‌کشی صنعتی در صنایع نفت، گاز و پتروشیمی با بالاترین استانداردهای ASME و NACE.',
          order: 1,
        },
        {
          title: 'نصب تجهیزات مکانیکی (ثابت و دوار)',
          slug: 'mechanical-equipment',
          shortDescription: 'نصب و راه‌اندازی انواع تجهیزات مکانیکی صنعتی شامل پمپ‌ها، کمپرسورها، مبدل‌های حرارتی، برج‌ها و پکیج‌های صنعتی.',
          order: 2,
        },
        {
          title: 'جوشکاری تخصصی (CS، SS و آلیاژی)',
          slug: 'welding',
          shortDescription: 'اجرای جوشکاری تخصصی خطوط لوله و تجهیزات تحت فشار توسط جوشکاران دارای گواهینامه‌های بین‌المللی ۶G و WPS/PQR.',
          order: 3,
        },
        {
          title: 'ساخت و نصب انواع مخازن ذخیره',
          slug: 'storage-tanks',
          shortDescription: 'طراحی، ساخت و نصب مخازن ذخیره سقف ثابت، کروی و دو جداره بر اساس استانداردهای API 650 و API 620.',
          order: 4,
        },
        {
          title: 'ساخت و نصب استراکچر فلزی و ساپورت',
          slug: 'steel-structure',
          shortDescription: 'ساخت و نصب انواع سازه‌های فلزی سنگین صنعتی، استراکچر پالت‌ها، گالری‌ها و پایپ ساپورت‌ها.',
          order: 5,
        },
        {
          title: 'عملیات سیویل، بتن‌ریزی و ساختمانی',
          slug: 'civil-works',
          shortDescription: 'اجرای فونداسیون سنگین تجهیزات، ترنچ و ترانشه‌های صنعتی، دایک‌وال مخازن و عملیات سیویل پلنت‌ها.',
          order: 6,
        },
        {
          title: 'سندبلاست و رنگ‌آمیزی صنعتی',
          slug: 'sandblast-painting',
          shortDescription: 'اجرای سندبلاست سطوح فلزی و اعمال پوشش‌های اپوکسی و ضد خوردگی بر اساس استانداردهای SSPC و NACE.',
          order: 7,
        },
        {
          title: 'تأمین نیروی فنی و اجرایی',
          slug: 'manpower',
          shortDescription: 'تأمین و اعزام تیم‌های متخصص فنی، جوشکاران، فیترها و کارشناسان کنترل کیفیت جهت اجرای پروژه‌ها.',
          order: 8,
        },
      ]

      for (const s of servicesData) {
        await payload.create({ collection: 'services', data: s })
      }
      console.log('✅ Services seeded.')
    }

    // 5. Seed Projects with media IDs & linked Client Satisfaction Letters
    console.log('🏗️ Seeding Projects with Client Satisfaction Letters...')
    const existingProjects = await payload.find({ collection: 'projects', limit: 10 })
    if (existingProjects.docs.length === 0) {
      const projectsData = [
        {
          title: 'سیویل، سندبلاست و رنگ مخازن پتروشیمی مارون',
          slug: 'marun-petrochemical-tanks',
          client: 'مهندسی و ساختمان تیو انرژی',
          location: 'ماهشهر، پتروشیمی مارون',
          serviceDescription: 'رنگ‌آمیزی ۱۵ هزار متر مربع داخل و خارج مخازن، اجرای فونداسیون سوپراستراکچر مخازن و دایک‌وال‌های اطراف.',
          imageFilename: 'image9.png',
          satisfactionFilename: 'image47.png',
          satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت مهندسی و ساختمان تیو انرژی',
          status: 'in-progress' as const,
          featured: true,
          order: 1,
        },
        {
          title: 'نصب و پایپینگ تجهیزات تصفیه آب فولاد شادگان',
          slug: 'shadgan-steel-water-treatment',
          client: 'شرکت عمراب',
          location: 'شادگان',
          serviceDescription: 'عملیات پایپینگ ۱۰۰ هزار اینچ، نصب ۳۰۰ تن تجهیزات ثابت، ۲۵۰ تن تجهیزات دوار و ۱۰ هزار متر مربع رنگ.',
          imageFilename: 'image22.jpeg',
          satisfactionFilename: 'image48.png',
          satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت صنعتی پیشگامان فولاد شرق و شرکت عمراب',
          status: 'completed' as const,
          featured: true,
          order: 2,
        },
        {
          title: 'پایپینگ مخازن کروی پالایشگاه آبادان',
          slug: 'abadan-refinery-spherical-tanks',
          client: 'مهندسی و ساختمان تیو انرژی',
          location: 'پالایش نفت آبادان',
          serviceDescription: 'پایپینگ ۲۴ هزار اینچ، ساخت و نصب ۸۰ تن ساپورت و استراکچر، کابل‌کشی و سندبلاست و رنگ‌آمیزی.',
          imageFilename: 'image30.jpg',
          satisfactionFilename: 'image49.png',
          satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت پالایش نفت آبادان',
          status: 'completed' as const,
          featured: true,
          order: 3,
        },
        {
          title: 'احداث مجتمع ذخیره‌سازی پالایشگاه آبادان',
          slug: 'abadan-refinery-storage-complex',
          client: 'پارس تابلو / تیو انرژی',
          location: 'پالایشگاه آبادان',
          serviceDescription: 'پایپینگ ۱۰ هزار اینچ، ساخت مخزن ذخیره ۱۳۵ تن، استراکچر ۱۰۰ تن، بتن‌ریزی ۱۵۰۰ متر مکعب.',
          imageFilename: 'image35.jpg',
          satisfactionFilename: 'image49.png',
          satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت پارس تابلو و پالایشگاه آبادان',
          status: 'completed' as const,
          featured: true,
          order: 4,
        },
        {
          title: 'نصب تجهیزات مکانیکال یوتیلیتی پتروشیمی گچساران',
          slug: 'gachsaran-petrochemical-utility',
          client: 'ماشین‌سازی ویژه',
          location: 'گچساران',
          serviceDescription: 'نصب تجهیزات پکیج بلودان و RO ۷۸ تن، تجهیزات ثابت ۲۸۶ تن، دوار ۱۲۸ تن (۱۱۲ عدد ثابت، ۸۵ عدد دوار).',
          imageFilename: 'image40.jpeg',
          satisfactionFilename: 'image51.jpg',
          satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت ماشین‌سازی ویژه',
          status: 'completed' as const,
          featured: true,
          order: 5,
        },
        {
          title: 'بازسازی کامل واحد ۶۰۰ پتروشیمی آبادان',
          slug: 'abadan-petrochemical-unit-600',
          client: 'کمک‌صنعتگران جنوب',
          location: 'پتروشیمی آبادان',
          serviceDescription: 'عملیات پایپینگ ۳۰ هزار اینچ، ساخت و نصب ساپورت ۵۰ تن، سندبلاست و رنگ‌آمیزی ۵۰۰۰ متر مربع.',
          imageFilename: 'image42.jpg',
          satisfactionFilename: 'image52.jpg',
          satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت کمک‌صنعتگران جنوب',
          status: 'completed' as const,
          featured: true,
          order: 6,
        },
        {
          title: 'جمع‌آوری گازهای فلر پالایش نفت آبادان',
          slug: 'abadan-refinery-flare-gas-recovery',
          client: 'طراحی و مهندسی عالی‌نام',
          location: 'پالایشگاه نفت آبادان',
          serviceDescription: 'اجرای پایپینگ ۱۱ هزار اینچ، ساخت و نصب ساپورت ۳۵ تن، سندبلاست و رنگ ۳۰۰۰ متر مربع و پیش‌راه‌اندازی.',
          imageFilename: 'image45.jpg',
          satisfactionFilename: 'image53.jpg',
          satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت طراحی و مهندسی عالی‌نام',
          status: 'completed' as const,
          featured: false,
          order: 7,
        },
        {
          title: 'ترنچ و ترانشه آب و نیروی مکران چابهار',
          slug: 'chabahar-makran-water-power-trench',
          client: 'مهندسی و ساختمان تیو انرژی',
          location: 'چابهار، مکران',
          serviceDescription: 'بتن‌ریزی ۳۰۰۰ متر مکعب، قالب‌بندی ۲۰ هزار متر مربع، آرماتوربندی ۲۴۰ تن، ورق‌گذاری ۵۷ تن.',
          imageFilename: 'image33.jpg',
          satisfactionFilename: 'image47.png',
          satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت مهندسی و ساختمان تیو انرژی',
          status: 'completed' as const,
          featured: false,
          order: 8,
        },
      ]

      for (const p of projectsData) {
        const coverMediaId = await getOrCreateMedia(p.imageFilename, p.title)
        const satisfactionMediaId = await getOrCreateMedia(p.satisfactionFilename, `رضایت‌نامه ${p.client}`)
        if (coverMediaId) {
          await payload.create({
            collection: 'projects',
            data: {
              title: p.title,
              slug: p.slug,
              client: p.client,
              location: p.location,
              serviceDescription: p.serviceDescription,
              coverImage: coverMediaId,
              satisfactionLetter: satisfactionMediaId || undefined,
              satisfactionNotes: p.satisfactionNotes,
              status: p.status,
              featured: p.featured,
              order: p.order,
            } as any,
          })
        }
      }
      console.log('✅ Projects seeded with cover media and satisfaction letters.')
    }

    // 6. Seed Official Qualification Certificates ONLY (ISO, HSE, Ratings)
    console.log('📜 Seeding Official Qualification Certificates...')
    const existingCerts = await payload.find({ collection: 'certificates', limit: 10 })
    if (existingCerts.docs.length === 0) {
      const certsData = [
        { name: 'گواهینامه رتبه‌بندی و صلاحیت پیمانکاری', type: 'iso-9001', issuer: 'سازمان مدیریت و برنامه‌ریزی کشور', filename: 'image2.png' },
        { name: 'گواهینامه صلاحیت ایمنی پیمانکاران (HSE)', type: 'hse', issuer: 'وزارت تعاون، کار و رفاه اجتماعی', filename: 'image3.jpg' },
        { name: 'گواهینامه عضویت انجمن شرکت‌های ساختمانی خوزستان', type: 'inspection', issuer: 'انجمن شرکت‌های ساختمانی و تاسیساتی', filename: 'image4.jpg' },
        { name: 'گواهینامه صلاحیت رتبه‌بندی ۵ نفت و گاز', type: 'iso-9001', issuer: 'معاونت برنامه‌ریزی و نظارت راهبردی', filename: 'image5.jpg' },
        { name: 'گواهینامه سیستم مدیریت کیفیت ISO 9001:2015', type: 'iso-9001', issuer: 'مرکز صدور گواهینامه‌های بین‌المللی', filename: 'image6.jpg' },
        { name: 'گواهینامه سیستم مدیریت ایمنی و بهداشت ISO 45001:2018', type: 'iso-45001', issuer: 'مرکز صدور گواهینامه‌های بین‌المللی', filename: 'image7.jpg' },
      ]

      for (const c of certsData) {
        const certMediaId = await getOrCreateMedia(c.filename, c.name)
        if (certMediaId) {
          await payload.create({
            collection: 'certificates',
            data: {
              name: c.name,
              type: c.type as any,
              issuer: c.issuer,
              image: certMediaId,
            },
          })
        }
      }
      console.log('✅ Official certificates seeded.')
    }

    // 7. Seed Pages
    console.log('📄 Seeding Pages...')
    const existingPages = await payload.find({ collection: 'pages', limit: 10 })
    if (existingPages.docs.length === 0) {
      const pagesData = [
        {
          title: 'صفحه اصلی',
          slug: 'home',
          heroTitle: 'مجری پروژه‌های نفت، گاز، پتروشیمی و صنایع مختلف',
          heroSubtitle: 'اجرای عملیات پایپینگ، نصب تجهیزات مکانیکی، سیویل و ساخت مخازن با بالاترین استانداردهای کیفی',
          heroBadge: 'کیفیت، ایمنی، تعهد: پایه‌های اعتماد',
          metaTitle: 'صفحه اصلی | ضرغام صنعت اروند',
          metaDescription: 'شرکت ضرغام صنعت اروند مجری پروژه‌های نفت، گاز، پتروشیمی، پایپینگ صنعتی، نصب تجهیزات مکانیکی و ساخت مخازن.',
        },
        {
          title: 'درباره ما',
          slug: 'about',
          heroTitle: 'درباره ما',
          heroSubtitle: 'مجری تخصصی پروژه‌های نفت، گاز، پتروشیمی و صنایع مختلف با اتکا به ظرفیت بالای نیروی انسانی متخصص، کیفیت عالی و مدیریت زمان‌بندی',
          heroBadge: 'شناسنامه و سوابق شرکت',
          metaTitle: 'درباره ما | ضرغام صنعت اروند',
          metaDescription: 'درباره شرکت ضرغام صنعت اروند، توانمندی‌های اجرایی، ارزش‌های سازمانی و سابقه فعالیت در صنایع کشور.',
        },
        {
          title: 'خدمات تخصصی',
          slug: 'services',
          heroTitle: 'خدمات تخصصی',
          heroSubtitle: 'ارائه کامل‌ترین خدمات مهندسی، تامین متریال، اجرا و نصب تجهیزات در صنایع نفت، گاز، پتروشیمی و فولاد',
          heroBadge: 'حوزه فعالیت‌ها',
          metaTitle: 'خدمات تخصصی | ضرغام صنعت اروند',
          metaDescription: 'خدمات تخصصی پایپینگ، نصب تجهیزات مکانیکی، ساخت مخازن، سیویل، سندبلاست و جوشکاری صنعتی.',
        },
        {
          title: 'پروژه‌های ما',
          slug: 'projects',
          heroTitle: 'پروژه‌های ما',
          heroSubtitle: 'سابقه درخشان در اجرای پروژه‌های بزرگ پالایشگاهی، پتروشیمی، فولاد و تأسیسات زیربنایی کشور',
          heroBadge: 'نمونه کارها',
          metaTitle: 'پروژه‌ها | ضرغام صنعت اروند',
          metaDescription: 'نمونه پروژه‌های اجرا شده توسط شرکت ضرغام صنعت اروند در پالایشگاه‌ها و پتروشیمی‌های کشور.',
        },
        {
          title: 'گواهینامه‌ها و صلاحیت‌ها',
          slug: 'certificates',
          heroTitle: 'گواهینامه‌ها و صلاحیت‌های قانونی',
          heroSubtitle: 'گواهینامه‌های صلاحیت پیمانکاری، ایمنی (HSE) و استانداردهای بین‌المللی مدیریت کیفیت ISO شرکت ضرغام صنعت اروند',
          heroBadge: 'اعتبارسنجی و رتبه‌بندی',
          metaTitle: 'گواهینامه‌ها | ضرغام صنعت اروند',
          metaDescription: 'گواهینامه‌های رسمی رتبه‌بندی ۵ نفت و گاز، ایمنی HSE، ISO 9001 و ISO 45001 شرکت ضرغام صنعت اروند.',
        },
        {
          title: 'اخبار و مقالات',
          slug: 'news',
          heroTitle: 'اخبار و اطلاع‌رسانی',
          heroSubtitle: 'آخرین اخبار، گزارشات پیشرفت پروژه و اطلاعیه‌های شرکت ضرغام صنعت اروند',
          heroBadge: 'اخبار شرکت',
          metaTitle: 'اخبار | ضرغام صنعت اروند',
          metaDescription: 'جدیدترین اخبار، پروژه‌های جدید و اطلاعیه‌های رسمی شرکت ضرغام صنعت اروند.',
        },
        {
          title: 'تماس با ما',
          slug: 'contact',
          heroTitle: 'تماس با ما',
          heroSubtitle: 'آماده پاسخگویی به سوالات، ارائه مشاوره فنی و دریافت درخواست‌های همکاری شما هستیم',
          heroBadge: 'دفتر مرکزی و ارتباطات',
          metaTitle: 'تماس با ما | ضرغام صنعت اروند',
          metaDescription: 'ارتباط با دفتر مرکزی شرکت ضرغام صنعت اروند در آبادان، شماره تلفن، تلفکس و فرم استعلام پروژه.',
        },
      ]

      for (const p of pagesData) {
        await payload.create({ collection: 'pages', data: p })
      }
      console.log('✅ Pages seeded.')
    }

    // 8. Seed Clients
    console.log('🏢 Seeding Clients...')
    const existingClients = await payload.find({ collection: 'clients', limit: 10 })
    if (existingClients.docs.length === 0) {
      const clientsData = [
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

      for (const cl of clientsData) {
        await payload.create({ collection: 'clients', data: cl as any })
      }
      console.log('✅ Clients seeded.')
    }

    console.log('🎉 Database seeding completed successfully!')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seeding error:', err)
    process.exit(1)
  }
}

seed()

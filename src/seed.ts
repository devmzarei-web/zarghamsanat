import { getPayloadClient } from './lib/payload'

export async function seedDatabase() {
  console.log('🌱 Starting database seed for Zargham Sanat Arvand...')
  try {
    const payload = await getPayloadClient()

    // 1. Seed Master Admin User
    try {
      const existingUsers = await payload.find({
        collection: 'users',
        where: { email: { equals: 'admin@zarghamsanat.ir' } },
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
        console.log('✅ Created Admin User: admin@zarghamsanat.ir / Zargham@2026')
      }
    } catch (err) {
      console.log('⚠ Admin user seeding skipped or already exists')
    }

    // 2. Seed Globals: Site Settings
    try {
      await payload.updateGlobal({
        slug: 'site-settings',
        data: {
          companyName: 'ضرغام صنعت اروند',
          tagline: 'پیمانکاری، صنعتی، پایپینگ و مکانیکال',
          phone1: '061-53328646',
          email: 'info@zarghamsanat.ir',
          address: 'آبادان، کوی قدس، خیابان بهار ۲۷، پلاک ۵',
          postalCode: '6317814564',
          heroType: 'slider',
          heroTitle: 'مجری پروژه‌های نفت، گاز، پتروشیمی و صنایع مختلف',
          heroSubtitle: 'اجرای عملیات پایپینگ صنعتی، عایق‌کاری، سندبلاست و رنگ‌آمیزی بر اساس استانداردهای بین‌المللی ASME و NACE',
          heroTagline: 'کیفیت، ایمنی، تعهد: پایه‌های اعتماد',
        },
      })
      console.log('✅ Updated Site Settings global')
    } catch (err) {
      console.log('⚠ Site settings global update failed')
    }

    // 3. Seed Globals: Stats
    try {
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
      console.log('✅ Updated Stats global')
    } catch (err) {
      console.log('⚠ Stats global update failed')
    }

    // 4. Seed Services
    try {
      const DEFAULT_SERVICES = [
        {
          title: 'اجرای پایپینگ صنعتی و عایق‌کاری',
          slug: 'industrial-piping',
          shortDescription: 'طراحی، پیش‌ساخت و اجرای خطوط لوله صنعتی تحت فشار بر اساس استانداردهای ASME B31.3 و NACE.',
          order: 1,
        },
        {
          title: 'نصب تجهیزات مکانیکی (ثابت و دوار)',
          slug: 'mechanical-equipment',
          shortDescription: 'نصب و تراز دقیق تجهیزات دوار و ثابت، پمپ‌های سنگین، کمپرسورها، برج‌ها و مبدل‌های حرارتی.',
          order: 2,
        },
        {
          title: 'جوشکاری تخصصی CS، SS و آلیاژی',
          slug: 'welding',
          shortDescription: 'جوشکاری تخصصی CS، SS، دوبلکس و آلیاژی توسط جوشکاران دارای کد بین‌المللی ۶G و WPS/PQR.',
          order: 3,
        },
        {
          title: 'ساخت و نصب انواع مخازن ذخیره',
          slug: 'storage-tanks',
          shortDescription: 'ساخت و مونتاژ مخازن کروی، سقف ثابت و دو جداره بر اساس استانداردهای API 650 و API 620.',
          order: 4,
        },
        {
          title: 'ساخت و نصب استراکچر و ساپورت',
          slug: 'steel-structure',
          shortDescription: 'ساخت و نصب استراکچر فلزی سنگین صنعتی، پایپ‌رک‌ها، گالری‌ها و ساپورت‌های لوله‌کشی.',
          order: 5,
        },
        {
          title: 'عملیات سیویل، بتن‌ریزی و ساختمانی',
          slug: 'civil-works',
          shortDescription: 'اجرای فونداسیون‌های فوق سنگین، ترنچ و ترانشه‌های صنعتی, دایک‌وال و سازه‌های بتنی پتروشیمی.',
          order: 6,
        },
        {
          title: 'سندبلاست و رنگ‌آمیزی صنعتی',
          slug: 'sandblast-painting',
          shortDescription: 'سندبلاست سطوح فلزی و اعمال پوشش‌های اپوکسی و ضد خوردگی بر اساس استانداردهای SSPC و NACE.',
          order: 7,
        },
        {
          title: 'تأمین نیروی فنی و اجرایی',
          slug: 'manpower',
          shortDescription: 'اعزام تیم‌های فنی مجرب، فیتر، جوشکار ۶G و کارشناسان کنترل کیفیت (QC) جهت پروژه‌های صنعتی.',
          order: 8,
        },
      ]

      for (const svc of DEFAULT_SERVICES) {
        const existing = await payload.find({
          collection: 'services',
          where: { slug: { equals: svc.slug } },
        })
        if (existing.docs.length === 0) {
          await payload.create({
            collection: 'services',
            data: svc,
          })
        }
      }
      console.log('✅ Seeded Services')
    } catch (err) {
      console.log('⚠ Services seeding failed')
    }

    // 5. Seed Clients
    try {
      const DEFAULT_CLIENTS = [
        { name: 'مهندسی و ساختمان تیو انرژی', order: 1 },
        { name: 'شرکت پتروشیمی مارون', order: 2 },
        { name: 'پالایش نفت آبادان', order: 3 },
        { name: 'پیشگامان فولاد شرق (فولاد شادگان)', order: 4 },
        { name: 'شرکت صنعتی عمراب', order: 5 },
        { name: 'شرکت جهان فولاد سیرجان', order: 6 },
        { name: 'شرکت ماشین‌سازی ویژه', order: 7 },
        { name: 'شرکت کمک‌صنعتگران جنوب', order: 8 },
        { name: 'طراحی و مهندسی عالی‌نام', order: 9 },
        { name: 'کنسرسیوم سابیک-پترو ODCC', order: 10 },
      ]

      for (const client of DEFAULT_CLIENTS) {
        const existing = await payload.find({
          collection: 'clients',
          where: { name: { equals: client.name } },
        })
        if (existing.docs.length === 0) {
          await payload.create({
            collection: 'clients',
            data: client,
          })
        }
      }
      console.log('✅ Seeded Clients')
    } catch (err) {
      console.log('⚠ Clients seeding failed')
    }

    // 6. Seed Featured Projects
    try {
      const DEFAULT_PROJECTS = [
        {
          title: 'سیویل، سندبلاست و رنگ مخازن پتروشیمی مارون',
          slug: 'marun-petrochemical-tanks',
          serviceDescription: 'رنگ‌آمیزی ۱۵ هزار متر مربع داخل و خارج مخازن، اجرای فونداسیون سوپراستراکچر مخازن و دایک‌وال‌های اطراف.',
          featured: true,
          order: 1,
        },
        {
          title: 'پایپینگ صنعتی و عایق‌کاری پالایشگاه آبادان',
          slug: 'abadan-refinery-piping',
          serviceDescription: 'پیش‌ساخت و نصب ۱۲ هزار اینچ‌قطر خطوط لوله صنعتی تحت فشار بالا و عایق‌کاری گرم و سرد.',
          featured: true,
          order: 2,
        },
        {
          title: 'ساخت و مونتاژ مخازن کُروی فولاد شادگان',
          slug: 'shadegan-steel-tanks',
          serviceDescription: 'مونتاژ، جوشکاری تخصصی ۶G و تست‌های NDT مخازن ذخیره‌سازی گاز بر اساس استاندارد API 620.',
          featured: true,
          order: 3,
        },
      ]

      for (const proj of DEFAULT_PROJECTS) {
        const existing = await payload.find({
          collection: 'projects',
          where: { slug: { equals: proj.slug } },
        })
        if (existing.docs.length === 0) {
          await payload.create({
            collection: 'projects',
            data: proj as any,
          })
        }
      }
      console.log('✅ Seeded Projects')
    } catch (err) {
      console.log('⚠ Projects seeding failed')
    }

    console.log('🚀 Database seeding completed successfully!')
  } catch (err) {
    console.error('❌ Error during seeding:', err)
  }
}

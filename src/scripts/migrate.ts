import nextEnv from '@next/env'
import pg from 'pg'

const loadEnvConfig = typeof nextEnv === 'function' ? nextEnv : (nextEnv as any)?.loadEnvConfig || (nextEnv as any)?.default?.loadEnvConfig
if (typeof loadEnvConfig === 'function') {
  loadEnvConfig(process.cwd())
}

const { Client } = pg

async function run() {
  console.log('🔄 Syncing PostgreSQL database tables and columns for Site Settings...')

  const dbUri = process.env.DATABASE_URI || 'postgresql://postgres@localhost:5432/zarghamsanat'
  const client = new Client({
    connectionString: dbUri,
    ssl: dbUri && !dbUri.includes('localhost') ? { rejectUnauthorized: false } : false,
  })

  await client.connect()

  const sqls = [
    `CREATE TABLE IF NOT EXISTS "site_settings" (
      "id" serial PRIMARY KEY,
      "company_name" varchar DEFAULT 'ضرغام صنعت اروند',
      "tagline" varchar DEFAULT 'پیمانکاری، صنعتی، پایپینگ و مکانیکال',
      "logo_id" integer,
      "favicon_id" integer,
      "title_font" varchar DEFAULT 'YekanBakh',
      "text_font" varchar DEFAULT 'IRANSansX',
      "title_color" varchar DEFAULT '#111827',
      "subtitle_color" varchar DEFAULT '#4b5563',
      "text_color" varchar DEFAULT '#111827',
      "hero_type" varchar DEFAULT 'slider',
      "hero_video_id" integer,
      "presentation_video_id" integer,
      "presentation_video_url" varchar,
      "presentation_video_cover_id" integer,
      "presentation_badge" varchar DEFAULT 'فیلم معرفی تخصص و سوابق شرکت',
      "presentation_title" varchar DEFAULT 'شرکت مهندسی و صنعتی ضرغام صنعت اروند',
      "presentation_subtitle" varchar DEFAULT 'پیشرو در اجرای پروژه‌های پایپینگ صنعتی، نصب تجهیزات مکانیکی، سیویل و ساخت مخازن با بالاترین استانداردهای کیفی کشور',
      "presentation_primary_btn_text" varchar DEFAULT 'مشاهده پروژه‌ها',
      "presentation_primary_btn_link" varchar DEFAULT '/projects',
      "presentation_secondary_btn_text" varchar DEFAULT 'درباره ما بیشتر بدانید',
      "presentation_secondary_btn_link" varchar DEFAULT '/about',
      "hero_title" varchar DEFAULT 'مجری پروژه‌های نفت، گاز، پتروشیمی و صنایع مختلف',
      "hero_subtitle" varchar DEFAULT 'اجرای عملیات پایپینگ، نصب تجهیزات مکانیکی، سیویل و ساخت مخازن با بالاترین استانداردهای کیفی',
      "hero_tagline" varchar DEFAULT 'کیفیت، ایمنی، تعهد: پایه‌های اعتماد',
      "phone1" varchar DEFAULT '061-53328646',
      "phone2" varchar DEFAULT '0916-000-0000',
      "mobile" varchar DEFAULT '0916-000-0000',
      "email" varchar DEFAULT 'info@zarghamsanat.com',
      "email2" varchar DEFAULT 'zarghamsanat@gmail.com',
      "working_hours" varchar DEFAULT 'شنبه تا چهارشنبه: ۸ الی ۱۷ | پنجشنبه: ۸ الی ۱۳',
      "postal_code" varchar DEFAULT '6317814564',
      "address" varchar DEFAULT 'آبادان، کوی قدس، خیابان بهار ۲۷، پلاک ۵',
      "map_embed_url" varchar,
      "meta_title" varchar DEFAULT 'ضرغام صنعت اروند | پایپینگ صنعتی، تجهیزات مکانیکی و پروژه‌های نفت و گاز',
      "meta_description" varchar DEFAULT 'شرکت ضرغام صنعت اروند مجری پروژه‌های نفت، گاز، پتروشیمی، پایپینگ صنعتی، نصب تجهیزات مکانیکی، سیویل و ساخت مخازن ذخیره با بیش از یک دهه تجربه در سطح کشور.',
      "og_image_id" integer,
      "footer_description" varchar,
      "footer_copyright_text" varchar,
      "footer_dev_credit" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now(),
      "created_at" timestamp(3) with time zone DEFAULT now()
    );`,

    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "presentation_video_id" integer;`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "presentation_video_url" varchar;`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "presentation_video_cover_id" integer;`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "presentation_badge" varchar;`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "presentation_title" varchar;`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "presentation_subtitle" varchar;`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "presentation_primary_btn_text" varchar;`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "presentation_primary_btn_link" varchar;`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "presentation_secondary_btn_text" varchar;`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "presentation_secondary_btn_link" varchar;`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "footer_description" varchar;`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "footer_copyright_text" varchar;`,
    `ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "footer_dev_credit" varchar;`,

    `CREATE TABLE IF NOT EXISTS "site_settings_nav_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "href" varchar NOT NULL,
      "order" numeric
    );`,

    `CREATE TABLE IF NOT EXISTS "site_settings_hero_slides" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "image_id" integer,
      "title" varchar,
      "subtitle" varchar
    );`,

    `ALTER TABLE "site_settings_hero_slides" ALTER COLUMN "image_id" DROP NOT NULL;`,

    `CREATE TABLE IF NOT EXISTS "site_settings_footer_quick_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "href" varchar NOT NULL
    );`,

    `INSERT INTO "site_settings" ("id", "company_name", "created_at", "updated_at")
     SELECT 1, 'ضرغام صنعت اروند', NOW(), NOW()
     WHERE NOT EXISTS (SELECT 1 FROM "site_settings");`
  ]

  for (const s of sqls) {
    try {
      await client.query(s)
    } catch (e: any) {
      console.log('SQL note:', e?.message || e)
    }
  }

  await client.end()
  console.log('✅ PostgreSQL database tables and columns for Site Settings synced successfully!')

  // Now initialize Payload to populate data if needed
  try {
    const { getPayload } = await import('payload')
    const configPromise = (await import('../payload.config')).default
    const payload = await getPayload({ config: configPromise })
    const current = await payload.findGlobal({ slug: 'site-settings' })
    if (!current?.companyName) {
      await payload.updateGlobal({
        slug: 'site-settings',
        data: {
          companyName: 'ضرغام صنعت اروند',
          tagline: 'پیمانکاری، صنعتی، پایپینگ و مکانیکال',
          phone1: '061-53328646',
          heroType: 'slider',
          presentationBadge: 'فیلم معرفی تخصص و سوابق شرکت',
          presentationTitle: 'شرکت مهندسی و صنعتی ضرغام صنعت اروند',
          presentationSubtitle: 'پیشرو در اجرای پروژه‌های پایپینگ صنعتی، نصب تجهیزات مکانیکی، سیویل و ساخت مخازن با بالاترین استانداردهای کیفی کشور',
          presentationPrimaryBtnText: 'مشاهده پروژه‌ها',
          presentationPrimaryBtnLink: '/projects',
          presentationSecondaryBtnText: 'درباره ما بیشتر بدانید',
          presentationSecondaryBtnLink: '/about',
        },
      })
      console.log('✅ Site Settings global document initialized.')
    }
  } catch (err: any) {
    console.log('Global init note:', err?.message || err)
  }

  process.exit(0)
}

run().catch((err) => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})

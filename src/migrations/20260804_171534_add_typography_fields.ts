import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_projects_status" AS ENUM('in-progress', 'completed');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_certificates_type" AS ENUM('iso-9001', 'iso-14001', 'iso-45001', 'hse', 'welding', 'inspection', 'other');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_news_category" AS ENUM('company', 'projects', 'certificates', 'events', 'industry');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_contact_submissions_request_type" AS ENUM('piping', 'mechanical', 'welding', 'structure', 'overhaul', 'sandblast', 'manpower', 'other');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_contact_submissions_status" AS ENUM('new', 'reviewing', 'responded', 'closed');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_site_settings_title_font" AS ENUM('YekanBakh', 'IRANSansX', 'Vazirmatn', 'Anjoman', 'Kamand');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_site_settings_text_font" AS ENUM('IRANSansX', 'YekanBakh', 'Vazirmatn');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_site_settings_hero_type" AS ENUM('video', 'slider');
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE TABLE IF NOT EXISTS "site_settings" (
    	"id" serial PRIMARY KEY NOT NULL,
    	"company_name" varchar DEFAULT 'ضرغام صنعت اروند' NOT NULL,
    	"tagline" varchar DEFAULT 'پیمانکاری، صنعتی، پایپینگ و مکانیکال',
    	"logo_id" integer,
    	"favicon_id" integer,
    	"title_font" "enum_site_settings_title_font" DEFAULT 'YekanBakh',
    	"text_font" "enum_site_settings_text_font" DEFAULT 'IRANSansX',
    	"title_color" varchar DEFAULT '#111827',
    	"subtitle_color" varchar DEFAULT '#4b5563',
    	"text_color" varchar DEFAULT '#111827',
    	"hero_type" "enum_site_settings_hero_type" DEFAULT 'slider' NOT NULL,
    	"hero_video_id" integer,
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
    	"updated_at" timestamp(3) with time zone,
    	"created_at" timestamp(3) with time zone
    );

    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "title_font" "enum_site_settings_title_font" DEFAULT 'YekanBakh';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "text_font" "enum_site_settings_text_font" DEFAULT 'IRANSansX';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "title_color" varchar DEFAULT '#111827';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "subtitle_color" varchar DEFAULT '#4b5563';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "text_color" varchar DEFAULT '#111827';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "title_font";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "text_font";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "title_color";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "subtitle_color";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "text_color";
  `)
}

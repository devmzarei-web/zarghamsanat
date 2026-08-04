import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- 1. Create Migration Table
    CREATE TABLE IF NOT EXISTS "payload_migrations" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "batch" numeric NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    -- 2. Create Enums
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

    -- 3. Create Base Tables
    CREATE TABLE IF NOT EXISTS "users" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "email" varchar NOT NULL,
      "reset_password_token" varchar,
      "reset_password_expiration" timestamp(3) with time zone,
      "salt" varchar,
      "hash" varchar,
      "login_attempts" numeric DEFAULT 0,
      "lock_until" timestamp(3) with time zone
    );

    CREATE TABLE IF NOT EXISTS "media" (
      "id" serial PRIMARY KEY NOT NULL,
      "alt" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "url" varchar,
      "thumbnail_u_r_l" varchar,
      "filename" varchar,
      "mime_type" varchar,
      "filesize" numeric,
      "width" numeric,
      "height" numeric,
      "focal_x" numeric,
      "focal_y" numeric
    );

    CREATE TABLE IF NOT EXISTS "services" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL UNIQUE,
      "short_description" varchar NOT NULL,
      "description" jsonb,
      "icon_id" integer,
      "cover_image_id" integer,
      "cta_text" varchar DEFAULT 'استعلام و مشاوره تخصصی',
      "order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "services_features" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "feature" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "services_faqs" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "question" varchar NOT NULL,
      "answer" varchar NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "projects" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL UNIQUE,
      "client" varchar,
      "location" varchar,
      "status" "enum_projects_status" DEFAULT 'completed',
      "service_description" varchar NOT NULL,
      "description" jsonb,
      "cover_image_id" integer,
      "featured" boolean DEFAULT false,
      "order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "clients" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "logo_id" integer,
      "order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

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
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "stats" (
      "id" serial PRIMARY KEY NOT NULL,
      "founded_year" numeric DEFAULT 1390,
      "projects_completed" numeric DEFAULT 150,
      "specialists" numeric DEFAULT 80,
      "trusted_clients" numeric DEFAULT 40,
      "show_plus_sign" boolean DEFAULT true,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    -- 4. Add Columns Safely if Table Already Exists
    ALTER TABLE "services" ADD COLUMN IF NOT EXISTS "cta_text" varchar DEFAULT 'استعلام و مشاوره تخصصی';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "title_font" "enum_site_settings_title_font" DEFAULT 'YekanBakh';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "text_font" "enum_site_settings_text_font" DEFAULT 'IRANSansX';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "title_color" varchar DEFAULT '#111827';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "subtitle_color" varchar DEFAULT '#4b5563';
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "text_color" varchar DEFAULT '#111827';

    -- 5. Add Constraints Safely
    DO $$ BEGIN
      ALTER TABLE "services_features" ADD CONSTRAINT "services_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "services_faqs" ADD CONSTRAINT "services_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "services_features" CASCADE;
    DROP TABLE IF EXISTS "services_faqs" CASCADE;
  `)
}

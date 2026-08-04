import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Create Articles Table
    CREATE TABLE IF NOT EXISTS "articles" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL UNIQUE,
      "summary" varchar NOT NULL,
      "author" varchar DEFAULT 'تیم فنی ضرغام صنعت اروند',
      "reading_time" varchar DEFAULT '۵ دقیقه',
      "content" jsonb NOT NULL,
      "cover_image_id" integer,
      "category" varchar DEFAULT 'technical',
      "publish_date" timestamp(3) with time zone,
      "published" boolean DEFAULT true,
      "featured" boolean DEFAULT false,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    -- Create Header Nav Items Table for SiteSettings
    CREATE TABLE IF NOT EXISTS "site_settings_nav_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "href" varchar NOT NULL,
      "order" numeric DEFAULT 0
    );

    DO $$ BEGIN
      ALTER TABLE "articles" ADD CONSTRAINT "articles_cover_image_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings_nav_items" ADD CONSTRAINT "site_settings_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE INDEX IF NOT EXISTS "articles_created_at_idx" ON "articles" USING btree ("created_at");
    CREATE INDEX IF NOT EXISTS "site_settings_nav_items_order_idx" ON "site_settings_nav_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "site_settings_nav_items_parent_id_idx" ON "site_settings_nav_items" USING btree ("_parent_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "articles" CASCADE;
    DROP TABLE IF EXISTS "site_settings_nav_items" CASCADE;
  `)
}

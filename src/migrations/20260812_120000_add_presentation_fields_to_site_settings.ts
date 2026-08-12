import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "presentation_video_id" integer;
    EXCEPTION WHEN OTHERS THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "presentation_video_url" varchar;
    EXCEPTION WHEN OTHERS THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "presentation_video_cover_id" integer;
    EXCEPTION WHEN OTHERS THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "presentation_badge" varchar;
    EXCEPTION WHEN OTHERS THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "presentation_title" varchar;
    EXCEPTION WHEN OTHERS THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "presentation_subtitle" varchar;
    EXCEPTION WHEN OTHERS THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "presentation_primary_btn_text" varchar;
    EXCEPTION WHEN OTHERS THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "presentation_primary_btn_link" varchar;
    EXCEPTION WHEN OTHERS THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "presentation_secondary_btn_text" varchar;
    EXCEPTION WHEN OTHERS THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "presentation_secondary_btn_link" varchar;
    EXCEPTION WHEN OTHERS THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "footer_description" varchar;
    EXCEPTION WHEN OTHERS THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "footer_copyright_text" varchar;
    EXCEPTION WHEN OTHERS THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "footer_dev_credit" varchar;
    EXCEPTION WHEN OTHERS THEN NULL; END $$;

    DO $$ BEGIN
      CREATE TABLE IF NOT EXISTS "site_settings_footer_quick_links" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "label" varchar NOT NULL,
        "href" varchar NOT NULL
      );
    EXCEPTION WHEN OTHERS THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings_footer_quick_links" ADD CONSTRAINT "site_settings_footer_quick_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN OTHERS THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_presentation_video_id_media_id_fk" FOREIGN KEY ("presentation_video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN OTHERS THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_presentation_video_cover_id_media_id_fk" FOREIGN KEY ("presentation_video_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN OTHERS THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "site_settings_footer_quick_links";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "footer_description";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "footer_copyright_text";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "footer_dev_credit";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "presentation_video_id";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "presentation_video_url";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "presentation_video_cover_id";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "presentation_badge";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "presentation_title";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "presentation_subtitle";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "presentation_primary_btn_text";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "presentation_primary_btn_link";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "presentation_secondary_btn_text";
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "presentation_secondary_btn_link";
  `)
}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TABLE IF NOT EXISTS "pages" (
        "id" serial PRIMARY KEY,
        "title" varchar NOT NULL,
        "slug" varchar NOT NULL UNIQUE,
        "hero_title" varchar,
        "hero_subtitle" varchar,
        "hero_badge" varchar,
        "story_title" varchar,
        "body_content" varchar,
        "team_section_badge" varchar,
        "team_section_title" varchar,
        "meta_title" varchar,
        "meta_description" varchar,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );
      ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "team_section_badge" varchar;
      ALTER TABLE "pages" ADD COLUMN IF NOT EXISTS "team_section_title" varchar;
    EXCEPTION WHEN OTHERS THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "team_section_badge";
    ALTER TABLE "pages" DROP COLUMN IF EXISTS "team_section_title";
  `)
}

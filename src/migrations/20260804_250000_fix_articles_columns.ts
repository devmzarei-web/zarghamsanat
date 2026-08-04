import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "articles" ADD COLUMN IF NOT EXISTS "seo_meta_title" varchar;
    ALTER TABLE "articles" ADD COLUMN IF NOT EXISTS "seo_meta_description" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Safe migration
}

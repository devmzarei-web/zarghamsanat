import nextEnv from '@next/env'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

const loadEnvConfig = typeof nextEnv === 'function' ? nextEnv : (nextEnv as any)?.loadEnvConfig || (nextEnv as any)?.default?.loadEnvConfig
if (typeof loadEnvConfig === 'function') {
  loadEnvConfig(process.cwd())
}

async function run() {
  console.log('🔄 Syncing PostgreSQL database columns for Site Settings...')
  const payload = await getPayload({ config: configPromise })

  const sqls = [
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
    `CREATE TABLE IF NOT EXISTS "site_settings_footer_quick_links" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "href" varchar NOT NULL
    );`,
  ]

  for (const s of sqls) {
    try {
      await (payload.db as any).execute({ raw: s })
    } catch (e: any) {
      console.log('SQL note:', e?.message || e)
    }
  }

  console.log('✅ PostgreSQL database columns for Site Settings synced successfully!')
  process.exit(0)
}

run().catch((err) => {
  console.error('❌ Migration failed:', err)
  process.exit(1)
})

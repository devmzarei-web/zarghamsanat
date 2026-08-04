import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "news" CASCADE;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Can't restore dropped table automatically
}

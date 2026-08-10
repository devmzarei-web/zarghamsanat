import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "crew_gallery" ADD COLUMN IF NOT EXISTS "related_service_id" integer;
      ALTER TABLE "crew_gallery" ADD COLUMN IF NOT EXISTS "related_project_id" integer;
    EXCEPTION WHEN OTHERS THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "crew_gallery" ADD CONSTRAINT "crew_gallery_related_service_id_services_id_fk" FOREIGN KEY ("related_service_id") REFERENCES "public"."services"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "crew_gallery" ADD CONSTRAINT "crew_gallery_related_project_id_projects_id_fk" FOREIGN KEY ("related_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "crew_gallery" DROP COLUMN IF EXISTS "related_service_id";
    ALTER TABLE "crew_gallery" DROP COLUMN IF EXISTS "related_project_id";
  `)
}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TABLE IF NOT EXISTS "crew_gallery" (
        "id" serial PRIMARY KEY,
        "title" varchar NOT NULL,
        "category" varchar DEFAULT 'welders' NOT NULL,
        "custom_category" varchar,
        "image_id" integer,
        "caption" varchar,
        "location" varchar,
        "featured" boolean DEFAULT true,
        "order" numeric DEFAULT 0,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
      );
    EXCEPTION WHEN OTHERS THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "crew_gallery" ADD CONSTRAINT "crew_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN NULL; END $$;

    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "crew_gallery_id" integer;
    EXCEPTION WHEN OTHERS THEN NULL; END $$;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "crew_gallery_id";
    DROP TABLE IF EXISTS "crew_gallery" CASCADE;
  `)
}

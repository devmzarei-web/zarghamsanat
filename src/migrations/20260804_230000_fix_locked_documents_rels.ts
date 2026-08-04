import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Ensure payload_locked_documents and payload_locked_documents_rels exist
    CREATE TABLE IF NOT EXISTS "payload_locked_documents" (
      "id" serial PRIMARY KEY NOT NULL,
      "global_slug" varchar,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "payload_locked_documents_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "users_id" integer,
      "media_id" integer,
      "services_id" integer,
      "projects_id" integer,
      "certificates_id" integer,
      "articles_id" integer,
      "contact_submissions_id" integer,
      "clients_id" integer,
      "pages_id" integer,
      "team_id" integer
    );

    -- Alter payload_locked_documents_rels to safely add articles_id and drop news_id if present
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "articles_id" integer;
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "news_id";

    -- Safely add FK constraint for articles_id
    DO $$ BEGIN
      ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    -- Safely add Index
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "articles_id";
  `)
}

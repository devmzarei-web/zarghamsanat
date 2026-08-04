import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Create Team Table
    CREATE TABLE IF NOT EXISTS "team" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "role" varchar NOT NULL,
      "is_ceo" boolean DEFAULT false,
      "photo_id" integer,
      "bio" varchar,
      "quote" varchar,
      "email" varchar,
      "phone" varchar,
      "order" numeric DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );


    DO $$ BEGIN
      ALTER TABLE "team" ADD CONSTRAINT "team_photo_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null; END $$;

    CREATE INDEX IF NOT EXISTS "team_order_idx" ON "team" USING btree ("order");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "team" CASCADE;

  `)
}

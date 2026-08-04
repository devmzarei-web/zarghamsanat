# 🛡️ Zargham Sanat Arvand — Database, CMS & AI Development Rules

This document outlines mandatory guidelines for human developers and AI coding assistants working on this repository to ensure that database migrations, Payload CMS schema changes, and production builds on VPS never break existing data or crash deployments.

---

## 1. 🚫 Never Overwrite or Seed Live CMS Data
- **Rule**: Do **NOT** run seed scripts (`seedDatabase`) or drop/truncate database tables on active environments.
- **Context**: The client manually enters and manages real project data, services, clients, and news via the Payload CMS admin panel.
- **Requirement**: Always preserve existing CMS records. Any default data in codebase components should only serve as a visual fallback when the database returns 0 records.

---

## 2. ⚡ Fail-Safe & Idempotent Database Migrations
When adding new fields to Payload CMS collections (e.g. adding array fields like `features` or `faqs` to `Services.ts`):

1. **Use `IF NOT EXISTS` for all SQL Statements**:
   - All `CREATE TABLE` statements must use `CREATE TABLE IF NOT EXISTS`.
   - All `ADD COLUMN` statements must use `ADD COLUMN IF NOT EXISTS`.
   - The `payload_migrations` tracking table must be ensured with `CREATE TABLE IF NOT EXISTS "payload_migrations" (...)` at the start of migrations.

2. **Wrap Foreign Key Constraints & Types in Exception Blocks**:
   ```sql
   DO $$ BEGIN
     ALTER TABLE "services_features" ADD CONSTRAINT "services_features_parent_id_fk" 
     FOREIGN KEY ("_parent_id") REFERENCES "public"."services"("id") ON DELETE cascade;
   EXCEPTION WHEN duplicate_object THEN null; END $$;
   ```

3. **Register All Migrations in `src/migrations/index.ts`**:
   - Every `.ts` migration file generated in `src/migrations/` must be exported and registered in `src/migrations/index.ts`.

---

## 3. 🛡️ Defensive Frontend Component Design
- **Partial Field Graceful Fallback**: Components rendering CMS collections must never discard entire records if newly added fields (e.g. `features` or `faqs`) are `undefined` or `null` on older CMS items.
- **Example**:
  ```typescript
  const featuresList = service.features && service.features.length > 0
    ? service.features
    : DEFAULT_FEATURES; // Fallback features for that specific service
  ```
- **Error Handling**: Do not swallow errors silently without logging. If a `payload.find()` fails due to a missing relation, log the error clearly so administrators can run `npm run migrate`.

---

## 4. 📦 Build & VPS Deployment Safety
- **Package Scripts**:
  - `"build": "payload migrate && next build"`
  - `"migrate": "payload migrate"`
  - `"migrate:create": "payload migrate:create"`
- **Why**: Running `payload migrate` before `next build` ensures that when new code is pulled on the VPS (`git pull origin main`), any newly required database tables or columns are applied cleanly before Next.js compiles static pages.

---

## 5. 🛠️ Step-by-Step Workflow for Adding CMS Fields
1. Modify schema in `src/collections/<CollectionName>.ts`.
2. Generate migration file: `npx payload migrate:create add_<feature_name>`.
3. Verify the generated migration file uses `IF NOT EXISTS` guards.
4. Test build locally: `npx next build`.
5. Commit both schema changes and migration files: `git commit -m "feat: ..."` & `git push origin main`.

---

## 6. 🗑️ Rules for Deleting Collections
If you need to delete an entire collection (e.g. converting `News` to `Articles`):
1. **Remove all code references first**: Use `grep_search` to find all imports, frontend page queries, seed scripts, and Payload config registrations of the collection and remove/replace them.
2. **Remove frontend folders**: Delete the Next.js routes (e.g. `src/app/(frontend)/news`).
3. **Manual Drop Migration**: Do NOT rely on `payload migrate:create` to drop the collection automatically as it may generate a flawed schema-rebuild migration. Instead, manually write a migration file with `DROP TABLE IF EXISTS "collection_name" CASCADE;`.
4. **Clean Previous Migrations**: Check previous migrations in `src/migrations/` and ensure they do not try to `ALTER TABLE "deleted_collection"` after the table is dropped.
5. **Always add `sharp` configuration** in `payload.config.ts` (e.g., `sharp,`) to prevent CMS UI crashes when editing items with image references.

---

## 7. 🔒 Payload Internal Tables & Document Locks Rule
- **Rule**: When replacing or adding collections (e.g. replacing `News` with `Articles`), ensure that Payload's internal document lock relationship table `payload_locked_documents_rels` has its relationship columns updated (e.g., adding `articles_id` and dropping `news_id`).
- **Why**: Payload 3.x queries `payload_locked_documents_rels` on every admin page load. If the table is missing the foreign key column for a new collection, PostgreSQL will throw `column payload_locked_documents__rels.<collection>_id does not exist` and crash the Payload CMS Admin interface (`/admin`).

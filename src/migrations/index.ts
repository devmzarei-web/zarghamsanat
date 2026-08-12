import * as migration_20260804_000000_init_and_sync_all_tables from './20260804_000000_init_and_sync_all_tables';
import * as migration_20260804_190000_add_team_and_articles from './20260804_190000_add_team_and_articles';
import * as migration_20260804_200000_articles_and_nav_items from './20260804_200000_articles_and_nav_items';
import * as migration_20260804_210000_drop_news from './20260804_210000_drop_news';
import * as migration_20260804_220000_create_missing_internal_tables from './20260804_220000_create_missing_internal_tables';
import * as migration_20260804_230000_fix_locked_documents_rels from './20260804_230000_fix_locked_documents_rels';
import * as migration_20260804_240000_ensure_all_rel_columns from './20260804_240000_ensure_all_rel_columns';
import * as migration_20260804_250000_fix_articles_columns from './20260804_250000_fix_articles_columns';
import * as migration_20260807_170000_add_team_section_fields_to_pages from './20260807_170000_add_team_section_fields_to_pages';
import * as migration_20260810_230000_add_crew_gallery_collection from './20260810_230000_add_crew_gallery_collection';
import * as migration_20260810_240000_fix_pages_hero_image_column from './20260810_240000_fix_pages_hero_image_column';
import * as migration_20260810_250000_add_gallery_relationships from './20260810_250000_add_gallery_relationships';
import * as migration_20260812_270000_add_presentation_fields_to_site_settings from './20260812_270000_add_presentation_fields_to_site_settings';

export const migrations = [
  {
    up: migration_20260804_000000_init_and_sync_all_tables.up,
    down: migration_20260804_000000_init_and_sync_all_tables.down,
    name: '20260804_000000_init_and_sync_all_tables',
  },
  {
    up: migration_20260804_190000_add_team_and_articles.up,
    down: migration_20260804_190000_add_team_and_articles.down,
    name: '20260804_190000_add_team_and_articles',
  },
  {
    up: migration_20260804_200000_articles_and_nav_items.up,
    down: migration_20260804_200000_articles_and_nav_items.down,
    name: '20260804_200000_articles_and_nav_items',
  },
  {
    up: migration_20260804_210000_drop_news.up,
    down: migration_20260804_210000_drop_news.down,
    name: '20260804_210000_drop_news',
  },
  {
    up: migration_20260804_220000_create_missing_internal_tables.up,
    down: migration_20260804_220000_create_missing_internal_tables.down,
    name: '20260804_220000_create_missing_internal_tables',
  },
  {
    up: migration_20260804_230000_fix_locked_documents_rels.up,
    down: migration_20260804_230000_fix_locked_documents_rels.down,
    name: '20260804_230000_fix_locked_documents_rels',
  },
  {
    up: migration_20260804_240000_ensure_all_rel_columns.up,
    down: migration_20260804_240000_ensure_all_rel_columns.down,
    name: '20260804_240000_ensure_all_rel_columns',
  },
  {
    up: migration_20260804_250000_fix_articles_columns.up,
    down: migration_20260804_250000_fix_articles_columns.down,
    name: '20260804_250000_fix_articles_columns',
  },
  {
    up: migration_20260807_170000_add_team_section_fields_to_pages.up,
    down: migration_20260807_170000_add_team_section_fields_to_pages.down,
    name: '20260807_170000_add_team_section_fields_to_pages',
  },
  {
    up: migration_20260810_230000_add_crew_gallery_collection.up,
    down: migration_20260810_230000_add_crew_gallery_collection.down,
    name: '20260810_230000_add_crew_gallery_collection',
  },
  {
    up: migration_20260810_240000_fix_pages_hero_image_column.up,
    down: migration_20260810_240000_fix_pages_hero_image_column.down,
    name: '20260810_240000_fix_pages_hero_image_column',
  },
  {
    up: migration_20260810_250000_add_gallery_relationships.up,
    down: migration_20260810_250000_add_gallery_relationships.down,
    name: '20260810_250000_add_gallery_relationships',
  },
  {
    up: migration_20260812_270000_add_presentation_fields_to_site_settings.up,
    down: migration_20260812_270000_add_presentation_fields_to_site_settings.down,
    name: '20260812_270000_add_presentation_fields_to_site_settings',
  },
];

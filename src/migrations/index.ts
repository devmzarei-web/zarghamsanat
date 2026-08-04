import * as migration_20260804_000000_init_and_sync_all_tables from './20260804_000000_init_and_sync_all_tables';
import * as migration_20260804_190000_add_team_and_articles from './20260804_190000_add_team_and_articles';
import * as migration_20260804_200000_articles_and_nav_items from './20260804_200000_articles_and_nav_items';
import * as migration_20260804_210000_drop_news from './20260804_210000_drop_news';
import * as migration_20260804_220000_create_missing_internal_tables from './20260804_220000_create_missing_internal_tables';

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
];

import * as migration_20260804_000000_init_and_sync_all_tables from './20260804_000000_init_and_sync_all_tables';
import * as migration_20260804_190000_add_team_and_articles from './20260804_190000_add_team_and_articles';
import * as migration_20260804_200000_articles_and_nav_items from './20260804_200000_articles_and_nav_items';

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
];

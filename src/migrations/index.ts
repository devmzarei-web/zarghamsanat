import * as migration_20260804_000000_init_and_sync_all_tables from './20260804_000000_init_and_sync_all_tables';
import * as migration_20260804_190000_add_team_and_articles from './20260804_190000_add_team_and_articles';

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
];

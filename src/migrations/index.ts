import * as migration_20260804_000000_init_and_sync_all_tables from './20260804_000000_init_and_sync_all_tables';

export const migrations = [
  {
    up: migration_20260804_000000_init_and_sync_all_tables.up,
    down: migration_20260804_000000_init_and_sync_all_tables.down,
    name: '20260804_000000_init_and_sync_all_tables',
  },
];

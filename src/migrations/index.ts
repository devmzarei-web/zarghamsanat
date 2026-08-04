import * as migration_20260804_171534_add_typography_fields from './20260804_171534_add_typography_fields';

export const migrations = [
  {
    up: migration_20260804_171534_add_typography_fields.up,
    down: migration_20260804_171534_add_typography_fields.down,
    name: '20260804_171534_add_typography_fields'
  },
];

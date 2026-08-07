import { loadEnvConfig } from '@next/env'

loadEnvConfig(process.cwd())

import { seedDatabase } from '../seed'

async function run() {
  await seedDatabase()
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

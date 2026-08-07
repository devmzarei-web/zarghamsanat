import nextEnv from '@next/env'

const loadEnvConfig = typeof nextEnv === 'function' ? nextEnv : (nextEnv as any)?.loadEnvConfig || (nextEnv as any)?.default?.loadEnvConfig
if (typeof loadEnvConfig === 'function') {
  loadEnvConfig(process.cwd())
}

async function run() {
  const { seedDatabase } = await import('../seed')
  await seedDatabase()
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

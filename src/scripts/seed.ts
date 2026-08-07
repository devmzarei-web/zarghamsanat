if (!process.env.PAYLOAD_SECRET) {
  process.env.PAYLOAD_SECRET = 'zarghamsanat_secret_key_2026_super_secure'
}
if (!process.env.DATABASE_URI) {
  process.env.DATABASE_URI = 'postgresql://postgres:Number05@localhost:5432/zarghamsanat'
}

import { seedDatabase } from '../seed'

async function run() {
  await seedDatabase()
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

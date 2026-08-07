import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

// Collections
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Projects } from './collections/Projects'
import { Certificates } from './collections/Certificates'
import { Articles } from './collections/Articles'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Clients } from './collections/Clients'
import { Pages } from './collections/Pages'
import { Team } from './collections/Team'

// Globals
import { SiteSettings } from './globals/SiteSettings'
import { Stats } from './globals/Stats'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const rawDbUri = process.env.DATABASE_URI || 'postgresql://postgres:Number05%24@localhost:5432/zarghamsanat'
const dbUri = rawDbUri.replace('postgres:Number05@', 'postgres:Number05%24@')

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '| ضرغام صنعت اروند',
    },
    dateFormat: 'dd/MM/yyyy',
  },

  collections: [
    // Built-in users collection (admins)
    {
      slug: 'users',
      auth: true,
      labels: {
        singular: 'کاربر ادمین',
        plural: 'کاربران ادمین',
      },
      admin: {
        useAsTitle: 'email',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'نام',
        },
      ],
    },
    Media,
    Services,
    Projects,
    Certificates,
    Articles,
    ContactSubmissions,
    Clients,
    Pages,
    Team,
  ],

  globals: [SiteSettings, Stats],
  sharp,

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: dbUri,
      ssl: dbUri && !dbUri.includes('localhost') ? { rejectUnauthorized: false } : false,
    },
    push: false,
  }),

  secret: process.env.PAYLOAD_SECRET || 'zarghamsanat_secret_key_2026_super_secure',

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  upload: {
    limits: {
      fileSize: 52428800, // 50 MB
    },
  },
})

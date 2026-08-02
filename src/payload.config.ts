import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

// Collections
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Projects } from './collections/Projects'
import { Certificates } from './collections/Certificates'
import { News } from './collections/News'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { Clients } from './collections/Clients'
import { Pages } from './collections/Pages'

// Globals
import { SiteSettings } from './globals/SiteSettings'
import { Stats } from './globals/Stats'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

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
    News,
    ContactSubmissions,
    Clients,
    Pages,
  ],

  globals: [SiteSettings, Stats],

  editor: lexicalEditor(),

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI as string,
    },
  }),

  secret: process.env.PAYLOAD_SECRET as string,

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  upload: {
    limits: {
      fileSize: 52428800, // 50 MB
    },
  },
})

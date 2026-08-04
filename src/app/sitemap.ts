import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://zarghamsanat.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/certificates`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/articles`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
  ]

  try {
    const payload = await getPayloadClient()

    const [projects, services, articles] = await Promise.all([
      payload.find({ collection: 'projects', limit: 100 }),
      payload.find({ collection: 'services', limit: 50 }),
      payload.find({ collection: 'articles', where: { published: { equals: true } }, limit: 100 }),
    ])

    const projectRoutes: MetadataRoute.Sitemap = projects.docs.map((p: any) => ({
      url: `${BASE_URL}/projects/${p.slug}`,
      lastModified: new Date(p.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.7,
    }))

    const serviceRoutes: MetadataRoute.Sitemap = services.docs.map((s: any) => ({
      url: `${BASE_URL}/services/${s.slug}`,
      lastModified: new Date(s.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

    const articleRoutes: MetadataRoute.Sitemap = articles.docs.map((n: any) => ({
      url: `${BASE_URL}/articles/${n.slug}`,
      lastModified: new Date(n.updatedAt),
      changeFrequency: 'monthly',
      priority: 0.5,
    }))

    return [...staticRoutes, ...projectRoutes, ...serviceRoutes, ...articleRoutes]
  } catch (_) {
    return staticRoutes
  }
}

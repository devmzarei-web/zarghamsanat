import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Building, ChevronLeft, Calendar, FileCheck, Layers, Image as ImageIcon, Award } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import ProjectDetailView from '@/components/ProjectDetailView/ProjectDetailView'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Params { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const cleanSlug = slug.replace(/^\/+/, '').replace(/^projects\//, '').replace(/^services\//, '')

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      where: {
        or: [
          { slug: { equals: slug } },
          { slug: { equals: cleanSlug } },
          { slug: { equals: `/${cleanSlug}` } },
          { slug: { equals: `projects/${cleanSlug}` } },
        ],
      },
      limit: 1,
    })
    const project = result?.docs?.[0] ? JSON.parse(JSON.stringify(result.docs[0])) : null
    if (!project) return { title: 'پروژه یافت نشد' }
    return {
      title: `${project.title} | ضرغام صنعت اروند`,
      description: project.serviceDescription,
    }
  } catch (_) {
    return { title: 'پروژه | ضرغام صنعت اروند' }
  }
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params
  const cleanSlug = slug.replace(/^\/+/, '').replace(/^projects\//, '').replace(/^services\//, '')

  let project: any = null

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'projects',
      where: {
        or: [
          { slug: { equals: slug } },
          { slug: { equals: cleanSlug } },
          { slug: { equals: `/${cleanSlug}` } },
          { slug: { equals: `projects/${cleanSlug}` } },
        ],
      },
      limit: 1,
    })
    if (result?.docs?.[0]) {
      project = JSON.parse(JSON.stringify(result.docs[0]))
    }
  } catch (_) {}

  if (!project) notFound()

  return <ProjectDetailView project={project} />
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Building, ChevronLeft, Calendar, FileCheck, Layers, Image as ImageIcon, Award } from 'lucide-react'
import { getPayloadClient } from '@/lib/payload'
import ProjectDetailView from '@/components/ProjectDetailView/ProjectDetailView'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Params { params: Promise<{ slug: string }> }

const DEFAULT_PROJECTS = [
  {
    id: '1',
    title: 'سیویل، سندبلاست و رنگ مخازن پتروشیمی مارون',
    slug: 'marun-petrochemical-tanks',
    client: 'مهندسی و ساختمان تیو انرژی',
    location: 'ماهشهر، پتروشیمی مارون',
    serviceDescription: 'رنگ‌آمیزی ۱۵ هزار متر مربع داخل و خارج مخازن، اجرای فونداسیون سوپراستراکچر مخازن و دایک‌وال‌های اطراف.',
    coverImage: { url: '/media/image9.png', alt: 'پتروشیمی مارون' },
    status: 'in-progress',
    satisfactionLetter: { url: '/media/image47.png', alt: 'رضایت‌نامه تیو انرژی' },
    satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت مهندسی و ساختمان تیو انرژی',
  },
  {
    id: '2',
    title: 'نصب و پایپینگ تجهیزات تصفیه آب فولاد شادگان',
    slug: 'shadgan-steel-water-treatment',
    client: 'شرکت عمراب',
    location: 'شادگان',
    serviceDescription: 'عملیات پایپینگ ۱۰۰ هزار اینچ، نصب ۳۰۰ تن تجهیزات ثابت، ۲۵۰ تن تجهیزات دوار و ۱۰ هزار متر مربع رنگ.',
    coverImage: { url: '/media/image22.jpeg', alt: 'فولاد شادگان' },
    status: 'completed',
    satisfactionLetter: { url: '/media/image48.png', alt: 'رضایت‌نامه شادگان' },
    satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت صنعتی پیشگامان فولاد شرق و شرکت عمراب',
  },
  {
    id: '3',
    title: 'پایپینگ مخازن کروی پالایشگاه آبادان',
    slug: 'abadan-refinery-spherical-tanks',
    client: 'مهندسی و ساختمان تیو انرژی',
    location: 'پالایش نفت آبادان',
    serviceDescription: 'پایپینگ ۲۴ هزار اینچ، ساخت و نصب ۸۰ تن ساپورت و استراکچر، کابل‌کشی و سندبلاست و رنگ‌آمیزی.',
    coverImage: { url: '/media/image30.jpg', alt: 'مخازن کروی پالایشگاه آبادان' },
    status: 'completed',
    satisfactionLetter: { url: '/media/image49.png', alt: 'رضایت‌نامه پالایش نفت آبادان' },
    satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت پالایش نفت آبادان',
  },
  {
    id: '4',
    title: 'احداث مجتمع ذخیره‌سازی پالایشگاه آبادان',
    slug: 'abadan-refinery-storage-complex',
    client: 'پارس تابلو / تیو انرژی',
    location: 'پالایشگاه آبادان',
    serviceDescription: 'پایپینگ ۱۰ هزار اینچ، ساخت مخزن ذخیره ۱۳۵ تن، استراکچر ۱۰۰ تن، بتن‌ریزی ۱۵۰۰ متر مکعب.',
    coverImage: { url: '/media/image35.jpg', alt: 'مجتمع ذخیره‌سازی پالایشگاه آبادان' },
    status: 'completed',
    satisfactionLetter: { url: '/media/image49.png', alt: 'رضایت‌نامه پالایش نفت آبادان' },
    satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت پارس تابلو و پالایشگاه آبادان',
  },
  {
    id: '5',
    title: 'نصب تجهیزات مکانیکال یوتیلیتی پتروشیمی گچساران',
    slug: 'gachsaran-petrochemical-utility',
    client: 'ماشین‌سازی ویژه',
    location: 'گچساران',
    serviceDescription: 'نصب تجهیزات پکیج بلودان و RO ۷۸ تن، تجهیزات ثابت ۲۸۶ تن، دوار ۱۲۸ تن (۱۱۲ عدد ثابت، ۸۵ عدد دوار).',
    coverImage: { url: '/media/image40.jpeg', alt: 'پتروشیمی گچساران' },
    status: 'completed',
    satisfactionLetter: { url: '/media/image51.jpg', alt: 'رضایت‌نامه ماشین‌سازی ویژه' },
    satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت ماشین‌سازی ویژه',
  },
  {
    id: '6',
    title: 'بازسازی کامل واحد ۶۰۰ پتروشیمی آبادان',
    slug: 'abadan-petrochemical-unit-600',
    client: 'کمک‌صنعتگران جنوب',
    location: 'پتروشیمی آبادان',
    serviceDescription: 'عملیات پایپینگ ۳۰ هزار اینچ، ساخت و نصب ساپورت ۵۰ تن، سندبلاست و رنگ‌آمیزی ۵۰۰۰ متر مربع.',
    coverImage: { url: '/media/image42.jpg', alt: 'واحد ۶۰۰ پتروشیمی آبادان' },
    status: 'completed',
    satisfactionLetter: { url: '/media/image52.jpg', alt: 'رضایت‌نامه کمک‌صنعتگران جنوب' },
    satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت کمک‌صنعتگران جنوب',
  },
  {
    id: '7',
    title: 'جمع‌آوری گازهای فلر پالایش نفت آبادان',
    slug: 'abadan-refinery-flare-gas-recovery',
    client: 'طراحی و مهندسی عالی‌نام',
    location: 'پالایشگاه نفت آبادان',
    serviceDescription: 'اجرای پایپینگ ۱۱ هزار اینچ، ساخت و نصب ساپورت ۳۵ تن، سندبلاست و رنگ ۳۰۰۰ متر مربع و پیش‌راه‌اندازی.',
    coverImage: { url: '/media/image45.jpg', alt: 'پروژه جمع‌آوری گازهای فلر' },
    status: 'completed',
    satisfactionLetter: { url: '/media/image53.jpg', alt: 'رضایت‌نامه عالی‌نام' },
    satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت طراحی و مهندسی عالی‌نام',
  },
  {
    id: '8',
    title: 'ترنچ و ترانشه آب و نیروی مکران چابهار',
    slug: 'chabahar-makran-water-power-trench',
    client: 'مهندسی و ساختمان تیو انرژی',
    location: 'چابهار، مکران',
    serviceDescription: 'بتن‌ریزی ۳۰۰۰ متر مکعب، قالب‌بندی ۲۰ هزار متر مربع، آرماتوربندی ۲۴۰ تن، ورق‌گذاری ۵۷ تن.',
    coverImage: { url: '/media/image33.jpg', alt: 'آب و نیروی مکران چابهار' },
    status: 'completed',
    satisfactionLetter: { url: '/media/image47.png', alt: 'رضایت‌نامه تیو انرژی' },
    satisfactionNotes: 'تاییدیه حسن انجام کار و رضایت‌نامه رسمی صادر شده توسط شرکت مهندسی و ساختمان تیو انرژی',
  },
]

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
    const project = (result?.docs?.[0] ? JSON.parse(JSON.stringify(result.docs[0])) : null) || DEFAULT_PROJECTS.find(p => p.slug === cleanSlug || p.slug === slug)
    if (!project) return { title: 'پروژه یافت نشد' }
    return {
      title: `${project.title} | ضرغام صنعت اروند`,
      description: project.serviceDescription,
    }
  } catch (_) {
    const fallback = DEFAULT_PROJECTS.find(p => p.slug === cleanSlug || p.slug === slug)
    return { title: fallback ? fallback.title : 'پروژه | ضرغام صنعت اروند' }
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

  if (!project) {
    project = DEFAULT_PROJECTS.find(p => p.slug === cleanSlug || p.slug === slug)
  }

  if (!project) notFound()

  return <ProjectDetailView project={project} />
}

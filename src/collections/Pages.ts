import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'صفحه',
    plural: 'صفحات سایت',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'عنوان صفحه',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'نامک (Slug)',
      required: true,
      unique: true,
    },
    {
      name: 'heroTitle',
      type: 'text',
      label: 'عنوان هیرو صفحه',
    },
    {
      name: 'heroSubtitle',
      type: 'textarea',
      label: 'زیرعنوان هیرو صفحه',
    },
    {
      name: 'heroBadge',
      type: 'text',
      label: 'نشان / بج هیرو',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      label: 'تصویر پس‌زمینه هیرو',
    },
    {
      name: 'storyTitle',
      type: 'text',
      label: 'عنوان بخش معرفی / داستان صفحه',
    },
    {
      name: 'bodyContent',
      type: 'textarea',
      label: 'متن اصلی / توضیحات صفحه',
    },
    {
      name: 'video',
      type: 'upload',
      relationTo: 'media',
      label: 'ویدیو اختصاصی صفحه (Media Upload)',
      admin: {
        description: 'فایل ویدیوی اختصاصی تیزر یا معرفی برای این صفحه',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'لینک مستقیم یا جایگزین ویدیو (آدرس MP4)',
      admin: {
        description: 'در صورت عدم آپلود فایل در رسانه، می‌توانید لینک مستقیم MP4 را وارد کنید',
      },
    },
    {
      name: 'videoCover',
      type: 'upload',
      relationTo: 'media',
      label: 'تصویر کاور/پوستر ویدیوی صفحه',
    },
    {
      name: 'teamSectionBadge',
      type: 'text',
      label: 'بج / نشان بخش تیم مدیریت',
    },
    {
      name: 'teamSectionTitle',
      type: 'text',
      label: 'عنوان بخش تیم مدیریت',
    },
    {
      name: 'metaTitle',
      type: 'text',
      label: 'عنوان متا (SEO)',
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      label: 'توضیحات متا (SEO)',
    },
  ],
}

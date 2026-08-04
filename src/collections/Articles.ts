import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  labels: {
    singular: 'مقاله',
    plural: 'مقالات',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'publishDate', 'published', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'عنوان مقاله',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'نامک (Slug)',
      required: true,
      unique: true,
      admin: {
        description: 'مثال: asme-b31-3-piping-standards — حروف انگلیسی و خط تیره',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'چکیده / خلاصه مقاله',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      label: 'نویسنده / منبع',
      defaultValue: 'تیم فنی ضرغام صنعت اروند',
    },
    {
      name: 'readingTime',
      type: 'text',
      label: 'زمان مطالعه (تخمینی)',
      defaultValue: '۵ دقیقه',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'محتوای کامل مقاله',
      required: true,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'تصویر شاخص',
    },
    {
      name: 'category',
      type: 'select',
      label: 'دسته‌بندی',
      options: [
        { label: 'مقالات تخصصی', value: 'technical' },
        { label: 'اخبار شرکت', value: 'company' },
        { label: 'پروژه‌های جدید', value: 'projects' },
        { label: 'گواهینامه‌ها و استانداردها', value: 'certificates' },
        { label: 'صنعت نفت و گاز', value: 'industry' },
      ],
      defaultValue: 'technical',
    },
    {
      name: 'publishDate',
      type: 'date',
      label: 'تاریخ انتشار',
      required: true,
    },
    {
      name: 'published',
      type: 'checkbox',
      label: 'منتشر شده',
      defaultValue: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'مقاله ویژه',
      defaultValue: false,
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'عنوان متا',
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'توضیح متا',
        },
      ],
    },
  ],
}

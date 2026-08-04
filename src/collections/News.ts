import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'مقاله / خبر',
    plural: 'مقالات و اخبار',
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
      label: 'عنوان مقاله / خبر',
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
      name: 'summary',
      type: 'textarea',
      label: 'خلاصه مقاله / چکیده',
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

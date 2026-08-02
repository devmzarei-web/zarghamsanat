import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'خبر',
    plural: 'اخبار',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishDate', 'published', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'عنوان خبر',
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
      label: 'خلاصه خبر',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'محتوای کامل خبر',
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
        { label: 'اخبار شرکت', value: 'company' },
        { label: 'پروژه‌های جدید', value: 'projects' },
        { label: 'گواهینامه‌ها', value: 'certificates' },
        { label: 'رویدادها', value: 'events' },
        { label: 'صنعت نفت و گاز', value: 'industry' },
      ],
      defaultValue: 'company',
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
      defaultValue: false,
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'خبر ویژه',
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

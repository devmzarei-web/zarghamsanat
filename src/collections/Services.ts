import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: 'خدمت',
    plural: 'خدمات',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'order', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'عنوان خدمت',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'نامک (Slug)',
      required: true,
      unique: true,
      admin: {
        description: 'مثال: industrial-piping — فقط حروف انگلیسی، اعداد و خط تیره',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'توضیح کوتاه (برای کارت)',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'توضیح کامل',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: 'آیکون خدمت',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'تصویر شاخص',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'گالری تصاویر',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'توضیح تصویر',
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'ترتیب نمایش',
      defaultValue: 0,
      admin: {
        description: 'عدد کمتر = نمایش اول',
      },
    },
  ],
}

import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: 'پروژه',
    plural: 'پروژه‌ها',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'location', 'featured', 'status', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'نام پروژه',
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
      name: 'location',
      type: 'text',
      label: 'محل اجرا',
      required: false,
    },
    {
      name: 'client',
      type: 'text',
      label: 'کارفرما (متنی)',
      required: false,
    },

    {
      name: 'serviceDescription',
      type: 'textarea',
      label: 'شرح خدمات',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      label: 'توضیحات کامل پروژه',
    },
    {
      name: 'relatedService',
      type: 'relationship',
      relationTo: 'services',
      label: 'خدمت مرتبط',
      hasMany: false,
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'تصویر شاخص',
      required: false,
    },
    {
      name: 'beforeAfterImages',
      type: 'array',
      label: 'تصاویر قبل و بعد از اجرا',
      fields: [
        {
          name: 'before',
          type: 'upload',
          relationTo: 'media',
          label: 'تصویر قبل',
        },
        {
          name: 'after',
          type: 'upload',
          relationTo: 'media',
          label: 'تصویر بعد',
        },
        {
          name: 'caption',
          type: 'text',
          label: 'توضیح',
        },
      ],
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'گالری تصاویر پروژه',
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
          label: 'توضیح',
        },
      ],
    },
    {
      name: 'satisfactionLetter',
      type: 'upload',
      relationTo: 'media',
      label: 'رضایت‌نامه / تاییدیه حسن انجام کار کارفرما',
      admin: {
        description: 'تصویر اسکن شده تاییدیه حسن انجام کار صادر شده توسط کارفرمای پروژه',
      },
    },
    {
      name: 'satisfactionNotes',
      type: 'text',
      label: 'عنوان / توضیح تاییدیه رضایت‌نامه',
    },
    {
      name: 'completionDate',
      type: 'date',
      label: 'تاریخ تکمیل',
      admin: {
        date: {
          pickerAppearance: 'monthOnly',
          displayFormat: 'MM/yyyy',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'وضعیت',
      options: [
        { label: 'در حال اجرا', value: 'in-progress' },
        { label: 'تکمیل شده', value: 'completed' },
      ],
      defaultValue: 'completed',
      required: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'نمایش در صفحه اصلی',
      defaultValue: false,
      admin: {
        description: 'این پروژه در بخش پروژه‌های شاخص صفحه اصلی نمایش داده می‌شود',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'ترتیب نمایش',
      defaultValue: 0,
    },
  ],
}

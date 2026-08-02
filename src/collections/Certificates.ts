import type { CollectionConfig } from 'payload'

export const Certificates: CollectionConfig = {
  slug: 'certificates',
  labels: {
    singular: 'گواهینامه',
    plural: 'گواهینامه‌ها',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'issuer', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'نام گواهینامه',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      label: 'نوع گواهینامه',
      options: [
        { label: 'ISO 9001 - سیستم مدیریت کیفیت', value: 'iso-9001' },
        { label: 'ISO 14001 - مدیریت محیط زیست', value: 'iso-14001' },
        { label: 'ISO 45001 - ایمنی و بهداشت', value: 'iso-45001' },
        { label: 'HSE - ایمنی، بهداشت و محیط زیست', value: 'hse' },
        { label: 'گواهینامه جوشکاری', value: 'welding' },
        { label: 'گواهینامه بازرسی', value: 'inspection' },
        { label: 'سایر', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'issuer',
      type: 'text',
      label: 'صادر کننده',
    },
    {
      name: 'certificateNumber',
      type: 'text',
      label: 'شماره گواهینامه',
    },
    {
      name: 'issueDate',
      type: 'date',
      label: 'تاریخ صدور',
    },
    {
      name: 'expiryDate',
      type: 'date',
      label: 'تاریخ انقضا',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'تصویر گواهینامه',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'توضیحات',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'نمایش در صفحه اصلی',
      defaultValue: false,
    },
  ],
}

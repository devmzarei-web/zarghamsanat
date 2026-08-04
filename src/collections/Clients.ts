import type { CollectionConfig } from 'payload'

export const Clients: CollectionConfig = {
  slug: 'clients',
  labels: {
    singular: 'کارفرما',
    plural: 'کارفرمایان',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'order', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'نام شرکت',
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'لوگو',
      required: false,
    },
    {
      name: 'website',
      type: 'text',
      label: 'وب‌سایت (اختیاری)',
    },
    {
      name: 'order',
      type: 'number',
      label: 'ترتیب نمایش',
      defaultValue: 0,
    },
  ],
}

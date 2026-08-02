import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: 'درخواست همکاری',
    plural: 'درخواست‌های همکاری',
  },
  access: {
    // Only admins can read submissions
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'requestType', 'status', 'createdAt'],
    description: 'فرم‌های درخواست همکاری دریافت شده از وب‌سایت',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'نام و نام خانوادگی',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      label: 'شماره تماس',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: 'ایمیل',
    },
    {
      name: 'requestType',
      type: 'select',
      label: 'موضوع درخواست',
      options: [
        { label: 'اجرای پایپینگ صنعتی', value: 'piping' },
        { label: 'نصب تجهیزات مکانیکی', value: 'mechanical' },
        { label: 'جوشکاری تخصصی', value: 'welding' },
        { label: 'ساخت استراکچر فلزی', value: 'structure' },
        { label: 'تعمیرات اساسی (Overhaul)', value: 'overhaul' },
        { label: 'سندبلاست و رنگ صنعتی', value: 'sandblast' },
        { label: 'تأمین نیروی فنی', value: 'manpower' },
        { label: 'سایر', value: 'other' },
      ],
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'توضیحات',
    },
    {
      name: 'status',
      type: 'select',
      label: 'وضعیت پیگیری',
      options: [
        { label: 'جدید', value: 'new' },
        { label: 'در حال بررسی', value: 'reviewing' },
        { label: 'پاسخ داده شده', value: 'responded' },
        { label: 'بسته شده', value: 'closed' },
      ],
      defaultValue: 'new',
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      label: 'یادداشت داخلی',
      admin: {
        description: 'این یادداشت فقط برای ادمین قابل مشاهده است',
      },
    },
  ],
  timestamps: true,
}

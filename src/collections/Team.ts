import type { CollectionConfig } from 'payload'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: {
    singular: 'عضو تیم / مدیر',
    plural: 'اعضای تیم و مدیریت',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'isCeo', 'order'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'نام و نام خانوادگی',
      required: true,
    },
    {
      name: 'role',
      type: 'text',
      label: 'سمت / عنوان سازمانی',
      required: true,
      admin: {
        description: 'مثال: مدیرعامل و رئیس هیئت مدیره / مدیر پروژه‌ها / سرپرست کارگاه',
      },
    },
    {
      name: 'isCeo',
      type: 'checkbox',
      label: 'آیا مدیرعامل (CEO) است؟',
      defaultValue: false,
      admin: {
        description: 'در صورت فعال بودن، در بخش ویژه پیام مدیرعامل نمایش داده می‌شود',
      },
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'تصویر پرسنلی / پرتره',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'بیوگرافی / درباره سوابق',
    },
    {
      name: 'quote',
      type: 'textarea',
      label: 'بیانیه / پیام ویژه (برای مدیرعامل)',
      admin: {
        description: 'نقل قول یا پیام اصلی مدیرعامل خطاب به کارفرمایان',
      },
    },
    {
      name: 'email',
      type: 'email',
      label: 'ایمیل کاری',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'شماره تماس مستقیم / داخلی',
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

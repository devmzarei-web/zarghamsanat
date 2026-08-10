import type { CollectionConfig } from 'payload'

export const CrewGallery: CollectionConfig = {
  slug: 'crew-gallery',
  labels: {
    singular: 'تصویر گالری / نیروی متخصص',
    plural: 'گالری تصاویر و نیروهای متخصص',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'location', 'featured', 'order', 'updatedAt'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'عنوان تصویر / تخصص',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'دسته‌بندی اصلی فعالیت',
      required: true,
      defaultValue: 'welders',
      options: [
        { label: 'جوشکاران تخصصی (۶G & آلیاژی)', value: 'welders' },
        { label: 'فیترها و مونتاژکاران لوله', value: 'fitters' },
        { label: 'پایپینگ و عایق‌کاری صنعتی', value: 'piping' },
        { label: 'نصب تجهیزات مکانیکال (ثابت و دوار)', value: 'mechanical' },
        { label: 'ساخت و مونتاژ مخازن ذخیره', value: 'tanks' },
        { label: 'سندبلاست و رنگ‌آمیزی صنعتی', value: 'sandblast' },
        { label: 'عملیات سیویل و بتن‌ریزی', value: 'civil' },
        { label: 'ایمنی، بهداشت و محیط زیست (HSE)', value: 'hse' },
        { label: 'تیم اجرایی و مدیریت کارگاه', value: 'team' },
      ],
    },
    {
      name: 'customCategory',
      type: 'text',
      label: 'دسته‌بندی سفارشی (اختیاری)',
      admin: {
        description: 'اگر دسته‌بندی جدیدی مد نظر دارید می‌توانید در این بخش وارد نمایید.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'تصویر کارگاه / نیروی متخصص',
    },
    {
      name: 'caption',
      type: 'textarea',
      label: 'توضیحات و مشخصات اجرایی',
    },
    {
      name: 'location',
      type: 'text',
      label: 'موقعیت / نام پروژه یا سایت کارگاهی',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'نمایش ویژه در گالری',
      defaultValue: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'ترتیب نمایش',
      defaultValue: 0,
    },
  ],
}

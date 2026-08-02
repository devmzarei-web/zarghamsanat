import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'تنظیمات سایت',
  access: {
    read: () => true,
  },
  admin: {
    description: 'تنظیمات اصلی سایت - لوگو، اطلاعات تماس، هیرو',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'هویت برند',
          fields: [
            {
              name: 'companyName',
              type: 'text',
              label: 'نام شرکت',
              defaultValue: 'ضرغام صنعت اروند',
              required: true,
            },
            {
              name: 'tagline',
              type: 'text',
              label: 'شعار / زیرعنوان شرکت',
              defaultValue: 'پیمانکاری، صنعتی، پایپینگ و مکانیکال',
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'لوگو',
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              label: 'فاویکون',
            },
          ],
        },
        // ── Hero ───────────────────────────────
        {
          label: 'هیرو (صفحه اصلی)',
          fields: [
            {
              name: 'heroType',
              type: 'radio',
              label: 'نوع هیرو',
              options: [
                { label: 'ویدیو (پس‌زمینه)', value: 'video' },
                { label: 'اسلایدر ۳ تصویر', value: 'slider' },
              ],
              defaultValue: 'slider',
              required: true,
            },
            {
              name: 'heroVideo',
              type: 'upload',
              relationTo: 'media',
              label: 'ویدیو هیرو',
              admin: {
                description: 'فایل ویدیو (MP4 توصیه می‌شود)',
                condition: (data) => data.heroType === 'video',
              },
            },
            {
              name: 'heroSlides',
              type: 'array',
              label: 'اسلاید‌های هیرو',
              minRows: 1,
              maxRows: 3,
              admin: {
                condition: (data) => data.heroType === 'slider',
              },
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'تصویر اسلاید',
                  required: true,
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'عنوان اسلاید',
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'زیرعنوان اسلاید',
                },
              ],
            },
            {
              name: 'heroTitle',
              type: 'text',
              label: 'عنوان اصلی هیرو',
              defaultValue: 'مجری پروژه‌های نفت، گاز، پتروشیمی و صنایع مختلف',
            },
            {
              name: 'heroSubtitle',
              type: 'text',
              label: 'زیرعنوان هیرو',
              defaultValue: 'اجرای عملیات پایپینگ، نصب تجهیزات مکانیکی، سیویل و ساخت مخازن با بالاترین استانداردهای کیفی',
            },
            {
              name: 'heroTagline',
              type: 'text',
              label: 'تگ‌لاین هیرو',
              defaultValue: 'کیفیت، ایمنی، تعهد: پایه‌های اعتماد',
            },
          ],
        },
        // ── Contact ────────────────────────────
        {
          label: 'اطلاعات تماس',
          fields: [
            {
              name: 'phone1',
              type: 'text',
              label: 'تلفکس دفتر مرکزی',
              defaultValue: '061-53328646',
            },
            {
              name: 'phone2',
              type: 'text',
              label: 'شماره تماس ۲',
              defaultValue: '0916-000-0000',
            },
            {
              name: 'mobile',
              type: 'text',
              label: 'موبایل',
              defaultValue: '0916-000-0000',
            },
            {
              name: 'email',
              type: 'email',
              label: 'ایمیل اصلی',
              defaultValue: 'info@zarghamsanat.com',
            },
            {
              name: 'email2',
              type: 'text',
              label: 'ایمیل دوم',
              defaultValue: 'zarghamsanat@gmail.com',
            },
            {
              name: 'workingHours',
              type: 'text',
              label: 'ساعات کاری دفتر',
              defaultValue: 'شنبه تا چهارشنبه: ۸ الی ۱۷ | پنجشنبه: ۸ الی ۱۳',
            },
            {
              name: 'postalCode',
              type: 'text',
              label: 'کد پستی',
              defaultValue: '6317814564',
            },
            {
              name: 'address',
              type: 'textarea',
              label: 'آدرس دفتر مرکزی',
              defaultValue: 'آبادان، کوی قدس، خیابان بهار ۲۷، پلاک ۵',
            },
            {
              name: 'mapEmbedUrl',
              type: 'text',
              label: 'لینک نقشه (Google Maps Embed)',
            },
          ],
        },
        // ── SEO ────────────────────────────────
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              label: 'عنوان متا پیش‌فرض',
              defaultValue: 'ضرغام صنعت اروند | پایپینگ صنعتی، تجهیزات مکانیکی و پروژه‌های نفت و گاز',
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              label: 'توضیح متا پیش‌فرض',
              defaultValue: 'شرکت ضرغام صنعت اروند مجری پروژه‌های نفت، گاز، پتروشیمی، پایپینگ صنعتی، نصب تجهیزات مکانیکی، سیویل و ساخت مخازن ذخیره با بیش از یک دهه تجربه در سطح کشور.',
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'تصویر OG (شبکه‌های اجتماعی)',
            },
          ],
        },
      ],
    },
  ],
}

import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'تنظیمات سایت',
  access: {
    read: () => true,
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
        // ── Header Navigation ────────────────────────
        {
          label: 'منوی هدر (Navigation)',
          fields: [
            {
              name: 'navItems',
              type: 'array',
              label: 'آیتم‌های منوی هدر',
              labels: {
                singular: 'آیتم منو',
                plural: 'آیتم‌های منو',
              },
              fields: [
                {
                  name: 'label',
                  type: 'text',
                  label: 'عنوان لینک',
                  required: true,
                },
                {
                  name: 'href',
                  type: 'text',
                  label: 'آدرس (URL / Route)',
                  required: true,
                  admin: {
                    description: 'مثال: / ، /about ، /services ، /projects ، /articles ، /contact',
                  },
                },
                {
                  name: 'order',
                  type: 'number',
                  label: 'ترتیب نمایش',
                  defaultValue: 0,
                },
              ],
            },
          ],
        },
        // ── Typography & Colors ───────────────────────
        {
          label: 'تایپوگرافی و رنگ‌ها',
          fields: [
            {
              name: 'titleFont',
              type: 'select',
              label: 'فونت عناوین (Titles)',
              defaultValue: 'YekanBakh',
              options: [
                { label: 'یکان بخ (YekanBakh)', value: 'YekanBakh' },
                { label: 'ایران سنس (IRANSansX)', value: 'IRANSansX' },
                { label: 'وزیرمتن (Vazirmatn)', value: 'Vazirmatn' },
                { label: 'انجمن (Anjoman)', value: 'Anjoman' },
                { label: 'کمند (Kamand)', value: 'Kamand' },
              ],
            },
            {
              name: 'textFont',
              type: 'select',
              label: 'فونت متن اصلی (Body Text)',
              defaultValue: 'IRANSansX',
              options: [
                { label: 'ایران سنس (IRANSansX)', value: 'IRANSansX' },
                { label: 'یکان بخ (YekanBakh)', value: 'YekanBakh' },
                { label: 'وزیرمتن (Vazirmatn)', value: 'Vazirmatn' },
              ],
            },
            {
              name: 'titleColor',
              type: 'text',
              label: 'رنگ عناوین (Title Color)',
              defaultValue: '#111827',
              admin: {
                description: 'کد Hex رنگ عناوین (مانند #111827 مشکی، #1A365D سرمه‌ای، #F97316 نارنجی)',
              },
            },
            {
              name: 'subtitleColor',
              type: 'text',
              label: 'رنگ زیرعنوان‌ها (Subtitle Color)',
              defaultValue: '#4b5563',
              admin: {
                description: 'کد Hex رنگ زیرعنوان‌ها (مانند #4b5563 خاکستری)',
              },
            },
            {
              name: 'textColor',
              type: 'text',
              label: 'رنگ متن اصلی (Body Text Color)',
              defaultValue: '#111827',
              admin: {
                description: 'کد Hex رنگ متن اصلی (مانند #111827)',
              },
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
                { label: 'ویدیو معرفی سه‌بعدی (Presentation Hero)', value: 'presentation' },
              ],
              defaultValue: 'slider',
              required: true,
            },
            {
              name: 'heroVideo',
              type: 'upload',
              relationTo: 'media',
              label: 'ویدیو پس‌زمینه هیرو',
              admin: {
                description: 'فایل ویدیو (MP4 توصیه می‌شود)',
              },
            },
            {
              name: 'presentationVideo',
              type: 'upload',
              relationTo: 'media',
              label: 'ویدیو معرفی سه‌بعدی (Presentation Box)',
              admin: {
                description: 'فایل یا ویدیو اصلی تیزر معرفی شرکت برای حالت Presentation',
              },
            },
            {
              name: 'presentationVideoUrl',
              type: 'text',
              label: 'لینک مستقیم یا جایگزین ویدیو معرفی (آدرس MP4)',
              admin: {
                description: 'در صورت عدم آپلود فایل رسانه، می‌توانید لینک مستقیم ویدیو MP4 را اینجا وارد کنید',
              },
            },
            {
              name: 'presentationVideoCover',
              type: 'upload',
              relationTo: 'media',
              label: 'تصویر کاور/پوستر ویدیو معرفی',
            },
            {
              name: 'presentationBadge',
              type: 'text',
              label: 'تگ‌لاین / برچسب هیرو ویدیو معرفی',
              defaultValue: 'فیلم معرفی تخصص و سوابق شرکت',
            },
            {
              name: 'presentationTitle',
              type: 'text',
              label: 'عنوان اصلی هیرو ویدیو معرفی',
              defaultValue: 'شرکت مهندسی و صنعتی ضرغام صنعت اروند',
            },
            {
              name: 'presentationSubtitle',
              type: 'textarea',
              label: 'زیرعنوان / توضیح هیرو ویدیو معرفی',
              defaultValue: 'پیشرو در اجرای پروژه‌های پایپینگ صنعتی، نصب تجهیزات مکانیکی، سیویل و ساخت مخازن با بالاترین استانداردهای کیفی کشور',
            },
            {
              name: 'presentationPrimaryBtnText',
              type: 'text',
              label: 'متن دکمه اصلی (اصلی)',
              defaultValue: 'مشاهده پروژه‌ها',
            },
            {
              name: 'presentationPrimaryBtnLink',
              type: 'text',
              label: 'لینک دکمه اصلی',
              defaultValue: '/projects',
            },
            {
              name: 'presentationSecondaryBtnText',
              type: 'text',
              label: 'متن دکمه دوم (ثانویه)',
              defaultValue: 'درباره ما بیشتر بدانید',
            },
            {
              name: 'presentationSecondaryBtnLink',
              type: 'text',
              label: 'لینک دکمه دوم',
              defaultValue: '/about',
            },
            {
              name: 'heroSlides',
              type: 'array',
              label: 'اسلاید‌های هیرو',
              minRows: 1,
              maxRows: 3,
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

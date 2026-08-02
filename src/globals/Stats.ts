import type { GlobalConfig } from 'payload'

export const Stats: GlobalConfig = {
  slug: 'stats',
  label: 'آمار شرکت',
  access: {
    read: () => true,
  },
  admin: {
    description: 'آمارهای نمایش داده شده در صفحه اصلی',
  },
  fields: [
    {
      name: 'foundedYear',
      type: 'number',
      label: 'سال تأسیس',
      defaultValue: 1390,
      required: true,
    },
    {
      name: 'projectsCompleted',
      type: 'number',
      label: 'پروژه انجام شده',
      defaultValue: 150,
      required: true,
    },
    {
      name: 'specialists',
      type: 'number',
      label: 'نیروی متخصص',
      defaultValue: 80,
      required: true,
    },
    {
      name: 'trustedClients',
      type: 'number',
      label: 'کارفرمای معتبر',
      defaultValue: 40,
      required: true,
    },
    {
      name: 'showPlusSign',
      type: 'checkbox',
      label: 'نمایش علامت + بعد از اعداد',
      defaultValue: true,
      admin: {
        description: 'مثال: ۱۵۰+',
      },
    },
  ],
}

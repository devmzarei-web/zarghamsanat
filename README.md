# zarghamsanat.ir — راهنمای راه‌اندازی

## پیش‌نیازها

- **Node.js** v20.9.0 یا بالاتر
- **PostgreSQL** 15 یا بالاتر
- **PM2** (برای تولید)
- **Nginx** (برای reverse proxy)

---

## ۱. نصب و راه‌اندازی محلی

```bash
# ۱. نصب وابستگی‌ها
npm install

# ۲. کپی متغیرهای محیطی
cp .env.example .env

# ۳. ویرایش .env — حتماً مقادیر DATABASE_URI و PAYLOAD_SECRET را وارد کنید
```

### ساختار پوشه‌ها برای فایل‌های شما:

```
public/
├── fonts/                     ← فونت‌های فارسی Vazirmatn را اینجا قرار دهید
│   ├── Vazirmatn-Regular.woff2
│   ├── Vazirmatn-Medium.woff2
│   ├── Vazirmatn-SemiBold.woff2
│   ├── Vazirmatn-Bold.woff2
│   └── Vazirmatn-ExtraBold.woff2
├── images/                    ← تصاویر استاتیک
│   ├── hero-1.jpg             ← تصویر اسلاید ۱ هیرو (پیش‌فرض)
│   ├── hero-2.jpg             ← تصویر اسلاید ۲ هیرو
│   └── hero-3.jpg             ← تصویر اسلاید ۳ هیرو
└── media/                     ← آپلودهای CMS (خودکار ایجاد می‌شود)
```

**لوگو:** فایل `Zargham-Logo.png` را در `public/images/Zargham-Logo.png` قرار دهید.

```bash
# ۴. اجرای محلی (Development)
npm run dev
```

سایت روی `http://localhost:3000` و پنل مدیریت روی `http://localhost:3000/admin` در دسترس خواهد بود.

---

## ۲. راه‌اندازی پایگاه داده

```bash
# ایجاد پایگاه داده PostgreSQL
createdb zarghamsanat

# ایجاد کاربر (اختیاری)
createuser -P zarghamsanat_user

# مقدار DATABASE_URI در .env:
# postgresql://zarghamsanat_user:PASSWORD@localhost:5432/zarghamsanat
```

Payload به صورت خودکار جداول لازم را ایجاد می‌کند.

---

## ۳. اولین ورود به پنل مدیریت

۱. سایت را اجرا کنید: `npm run dev`
۲. به `http://localhost:3000/admin` بروید
۳. کاربر ادمین اول را ثبت کنید
۴. از پنل، محتوا اضافه کنید:
   - **تنظیمات سایت** → هیرو (ویدیو یا اسلایدر) را انتخاب کنید
   - **آمار شرکت** → اعداد را ویرایش کنید
   - **خدمات** → خدمات خود را اضافه کنید
   - **پروژه‌ها** → پروژه‌ها را اضافه کرده و «نمایش در صفحه اصلی» را برای ۳ پروژه فعال کنید
   - **کارفرمایان** → لوگوهای کارفرمایان را آپلود کنید
   - **گواهینامه‌ها** → گواهینامه‌ها را اضافه کنید

---

## ۴. استقرار روی VPS (Production)

```bash
# روی سرور
git clone https://github.com/your-repo/zarghamsanat.git /var/www/zarghamsanat.ir
cd /var/www/zarghamsanat.ir

npm install
cp .env.example .env
# ویرایش .env با مقادیر production

npm run build

# نصب PM2
npm install -g pm2

# شروع با PM2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

### پیکربندی Nginx:

```nginx
server {
    listen 80;
    server_name zarghamsanat.ir www.zarghamsanat.ir;

    location /_next/static {
        alias /var/www/zarghamsanat.ir/.next/static;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location /media {
        alias /var/www/zarghamsanat.ir/public/media;
        expires 30d;
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# SSL با Certbot
certbot --nginx -d zarghamsanat.ir -d www.zarghamsanat.ir
```

---

## ساختار پروژه

```
src/
├── app/                    ← صفحات و API routes (Next.js App Router)
│   ├── layout.tsx          ← layout اصلی (Header, Footer, Loading)
│   ├── page.tsx            ← صفحه اصلی
│   ├── about/page.tsx      ← درباره ما
│   ├── services/           ← خدمات
│   ├── projects/           ← پروژه‌ها
│   ├── certificates/       ← گواهینامه‌ها
│   ├── news/               ← اخبار
│   ├── contact/page.tsx    ← تماس با ما
│   ├── api/contact/        ← API فرم تماس
│   └── (payload)/admin/    ← پنل مدیریت CMS
├── collections/            ← تعریف Collection های Payload
├── globals/                ← تعریف Global های Payload
├── components/             ← کامپوننت‌های React
├── hooks/                  ← Custom hooks
├── lib/                    ← توابع کمکی
├── styles/                 ← CSS سراسری
└── payload.config.ts       ← پیکربندی اصلی Payload CMS
```


import React from 'react'
import Link from 'next/link'
import {
  Briefcase,
  Wrench,
  Image as ImageIcon,
  FileText,
  Award,
  Inbox,
  Settings,
  PlusCircle,
  BarChart3,
  Users,
  ShieldCheck,
  Building2,
  ChevronLeft,
} from 'lucide-react'
import styles from './AdminDashboard.module.css'

export default function AdminDashboard() {
  return (
    <div className={styles.dashboardContainer} dir="rtl">
      {/* Header Banner */}
      <div className={styles.headerBanner}>
        <div className={styles.headerBrand}>
          <img
            src="/images/Zargham-Logo.png"
            alt="ضرغام صنعت اروند"
            className={styles.headerLogo}
          />
          <div>
            <h1 className={styles.headerTitle}>داشبورد مدیریت سیستم ضرغام صنعت اروند</h1>
            <p className={styles.headerSubtitle}>
              سامانه مرکزی مدیریت محتوا، پروژه‌ها، خدمات صنعتی، آلبوم‌های تصویری و پایش درخواست‌ها
            </p>
          </div>
        </div>
        <div className={styles.headerBadges}>
          <span className={styles.statusBadge}>
            <ShieldCheck size={14} />
            <span>سیستم فعال و ایمن</span>
          </span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className={styles.statsGrid}>
        <Link href="/admin/collections/projects" className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.blueIcon}`}>
            <Briefcase size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>پروژه‌های اجرایی</span>
            <span className={styles.statSub}>مدیریت شناسنامه پروژه‌ها</span>
          </div>
          <ChevronLeft size={18} className={styles.arrowIcon} />
        </Link>

        <Link href="/admin/collections/services" className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.orangeIcon}`}>
            <Wrench size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>خدمات تخصصی صنعتی</span>
            <span className={styles.statSub}>پایپینگ، مکانیکال، مخازن</span>
          </div>
          <ChevronLeft size={18} className={styles.arrowIcon} />
        </Link>

        <Link href="/admin/collections/crew-gallery" className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.goldIcon}`}>
            <ImageIcon size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>گالری و نیروهای متخصص</span>
            <span className={styles.statSub}>آلبوم‌های ۳D و تخصص‌ها</span>
          </div>
          <ChevronLeft size={18} className={styles.arrowIcon} />
        </Link>

        <Link href="/admin/collections/articles" className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.greenIcon}`}>
            <FileText size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>مقالات و اخبار</span>
            <span className={styles.statSub}>مطالب علمی و اخبار شرکت</span>
          </div>
          <ChevronLeft size={18} className={styles.arrowIcon} />
        </Link>

        <Link href="/admin/collections/certificates" className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.purpleIcon}`}>
            <Award size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>گواهی‌نامه‌ها و WPS</span>
            <span className={styles.statSub}>استانداردها و تاییده‌ها</span>
          </div>
          <ChevronLeft size={18} className={styles.arrowIcon} />
        </Link>

        <Link href="/admin/collections/contact-submissions" className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.redIcon}`}>
            <Inbox size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>پیام‌های تماس و استعلام</span>
            <span className={styles.statSub}>درخواست‌های مشتریان</span>
          </div>
          <ChevronLeft size={18} className={styles.arrowIcon} />
        </Link>

        <Link href="/admin/collections/clients" className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.blueIcon}`}>
            <Building2 size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>کارفرمایان و همکاران</span>
            <span className={styles.statSub}>لوگو و اطلاعات مشتریان</span>
          </div>
          <ChevronLeft size={18} className={styles.arrowIcon} />
        </Link>

        <Link href="/admin/collections/pages" className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.purpleIcon}`}>
            <FileText size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>صفحات سایت</span>
            <span className={styles.statSub}>مدیریت محتوای صفحات ثابت</span>
          </div>
          <ChevronLeft size={18} className={styles.arrowIcon} />
        </Link>

        <Link href="/admin/collections/team" className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.goldIcon}`}>
            <Users size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>اعضای تیم و مدیریت</span>
            <span className={styles.statSub}>معرفی مدیران و مهندسین</span>
          </div>
          <ChevronLeft size={18} className={styles.arrowIcon} />
        </Link>

        <Link href="/admin/collections/media" className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.greenIcon}`}>
            <ImageIcon size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>رسانه‌ها و فایل‌ها</span>
            <span className={styles.statSub}>آپلود و مدیریت تمامی تصاویر</span>
          </div>
          <ChevronLeft size={18} className={styles.arrowIcon} />
        </Link>

        <Link href="/admin/collections/users" className={styles.statCard}>
          <div className={`${styles.iconWrap} ${styles.orangeIcon}`}>
            <ShieldCheck size={24} />
          </div>
          <div className={styles.statInfo}>
            <span className={styles.statLabel}>کاربران ادمین</span>
            <span className={styles.statSub}>مدیریت دسترسی‌های سیستم</span>
          </div>
          <ChevronLeft size={18} className={styles.arrowIcon} />
        </Link>
      </div>

      {/* Quick Actions & System Settings Section */}
      <div className={styles.sectionsRow}>
        <div className={styles.actionBlock}>
          <h2 className={styles.blockTitle}>
            <PlusCircle size={18} />
            <span>عملیات و افزون سریع</span>
          </h2>
          <div className={styles.actionButtons}>
            <Link href="/admin/collections/projects/create" className={styles.btnAction}>
              <PlusCircle size={16} />
              <span>ثبت پروژه جدید</span>
            </Link>
            <Link href="/admin/collections/crew-gallery/create" className={styles.btnAction}>
              <ImageIcon size={16} />
              <span>افزودن تصویر گالری</span>
            </Link>
            <Link href="/admin/collections/articles/create" className={styles.btnAction}>
              <FileText size={16} />
              <span>انتشار مقاله جدید</span>
            </Link>
            <Link href="/admin/collections/media/create" className={styles.btnAction}>
              <PlusCircle size={16} />
              <span>آپلود رسانه و تصویر</span>
            </Link>
          </div>
        </div>

        <div className={styles.actionBlock}>
          <h2 className={styles.blockTitle}>
            <Settings size={18} />
            <span>تنظیمات و آمار کلان</span>
          </h2>
          <div className={styles.actionButtons}>
            <Link href="/admin/globals/site-settings" className={styles.btnActionOutline}>
              <Building2 size={16} />
              <span>تنظیمات اصلی و تماس شرکت</span>
            </Link>
            <Link href="/admin/globals/stats" className={styles.btnActionOutline}>
              <BarChart3 size={16} />
              <span>آمار و شمارنده‌های صفحه اصلی</span>
            </Link>
            <Link href="/admin/collections/team" className={styles.btnActionOutline}>
              <Users size={16} />
              <span>مدیریت اعضای تیم و مدیران</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

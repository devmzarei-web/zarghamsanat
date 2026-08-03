import React from 'react'
import { toPersianDigits, formatShamsiYearMonth } from '@/lib/utils'
import styles from './ProjectSignboard.module.css'

interface ProjectSignboardProps {
  title: string
  client?: string
  location?: string
  status?: string
  startDate?: string
  completionDate?: string
  durationMonths?: string | number
  supervisor?: string
}

export default function ProjectSignboard({
  title,
  client = 'پتروشیمی / صنایع نفت و گاز',
  location,
  status = 'completed',
  startDate,
  completionDate,
  durationMonths,
  supervisor = 'مدیریت طرح و نظارت مهندسی',
}: ProjectSignboardProps) {
  const formattedStatus = status === 'completed' ? 'تکمیل شده (خاتمه یافته)' : 'در حال اجرا'

  return (
    <div className={styles.boardWrapper}>
      {/* Top Mounting Posts Simulation */}
      <div className={styles.postLeft} />
      <div className={styles.postRight} />

      {/* Main Yellow Signboard */}
      <div className={styles.signboard}>
        <div className={styles.boardHeader}>
          <h3 className={styles.boardTitle}>شناسنامه فنی و اجرایی پروژه</h3>
        </div>

        <div className={styles.rowsContainer}>
          <div className={styles.row}>
            <span className={styles.label}>نام پروژه:</span>
            <span className={styles.value}>{title}</span>
          </div>

          {client && (
            <div className={styles.row}>
              <span className={styles.label}>کارفرما:</span>
              <span className={styles.value}>{client}</span>
            </div>
          )}

          {location && (
            <div className={styles.row}>
              <span className={styles.label}>محل اجرا:</span>
              <span className={styles.value}>{location}</span>
            </div>
          )}

          <div className={styles.row}>
            <span className={styles.label}>پیمانکار مجری:</span>
            <span className={styles.value}>شرکت ضرغام صنعت اروند</span>
          </div>

          <div className={styles.row}>
            <span className={styles.label}>نظارت فیلد و مهندسی:</span>
            <span className={styles.value}>{supervisor}</span>
          </div>

          {durationMonths && (
            <div className={styles.row}>
              <span className={styles.label}>مدت زمان قرارداد:</span>
              <span className={styles.value}>{toPersianDigits(durationMonths)} ماه</span>
            </div>
          )}

          {startDate && (
            <div className={styles.row}>
              <span className={styles.label}>تاریخ شروع:</span>
              <span className={styles.value}>{formatShamsiYearMonth(startDate)}</span>
            </div>
          )}

          {completionDate && (
            <div className={styles.row}>
              <span className={styles.label}>تاریخ تحویل / پایان:</span>
              <span className={styles.value}>{formatShamsiYearMonth(completionDate)}</span>
            </div>
          )}

          <div className={styles.row}>
            <span className={styles.label}>وضعیت کنونی:</span>
            <span className={`${styles.value} ${status === 'completed' ? styles.statusCompleted : styles.statusProgress}`}>
              {formattedStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import React, { useRef, useLayoutEffect, useState } from 'react'
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

function AutoFitValue({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const [scale, setScale] = useState(1)
  const [isMultiLine, setIsMultiLine] = useState(false)

  useLayoutEffect(() => {
    const container = containerRef.current
    const text = textRef.current
    if (!container || !text) return

    // Reset styles to accurately measure scroll width
    text.style.fontSize = ''
    text.style.whiteSpace = 'nowrap'

    const containerWidth = container.clientWidth
    const textWidth = text.scrollWidth

    if (textWidth > containerWidth && containerWidth > 0) {
      const calculatedRatio = containerWidth / textWidth
      if (calculatedRatio < 0.65) {
        setScale(0.72)
        setIsMultiLine(true)
      } else {
        setScale(Math.max(0.65, Math.floor(calculatedRatio * 100) / 100))
        setIsMultiLine(false)
      }
    } else {
      setScale(1)
      setIsMultiLine(false)
    }
  }, [children])

  return (
    <div ref={containerRef} className={styles.valueContainer}>
      <span
        ref={textRef}
        className={`${styles.value} ${className} ${isMultiLine ? styles.multiLineValue : ''}`}
        style={scale < 1 ? { fontSize: `${scale * 0.75}rem` } : undefined}
      >
        {children}
      </span>
    </div>
  )
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
            <AutoFitValue>{title}</AutoFitValue>
          </div>

          {client && (
            <div className={styles.row}>
              <span className={styles.label}>کارفرما:</span>
              <AutoFitValue>{client}</AutoFitValue>
            </div>
          )}

          {location && (
            <div className={styles.row}>
              <span className={styles.label}>محل اجرا:</span>
              <AutoFitValue>{location}</AutoFitValue>
            </div>
          )}

          <div className={styles.row}>
            <span className={styles.label}>پیمانکار مجری:</span>
            <AutoFitValue>شرکت ضرغام صنعت اروند</AutoFitValue>
          </div>


          {durationMonths && (
            <div className={styles.row}>
              <span className={styles.label}>مدت زمان قرارداد:</span>
              <AutoFitValue>{toPersianDigits(durationMonths)} ماه</AutoFitValue>
            </div>
          )}

          {startDate && (
            <div className={styles.row}>
              <span className={styles.label}>تاریخ شروع:</span>
              <AutoFitValue>{formatShamsiYearMonth(startDate)}</AutoFitValue>
            </div>
          )}

          {completionDate && (
            <div className={styles.row}>
              <span className={styles.label}>تاریخ تحویل / پایان:</span>
              <AutoFitValue>{formatShamsiYearMonth(completionDate)}</AutoFitValue>
            </div>
          )}

          <div className={styles.row}>
            <span className={styles.label}>وضعیت کنونی:</span>
            <AutoFitValue className={status === 'completed' ? styles.statusCompleted : styles.statusProgress}>
              {formattedStatus}
            </AutoFitValue>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import styles from './ContactForm.module.css'

const REQUEST_TYPES = [
  { value: '', label: 'موضوع درخواست را انتخاب کنید' },
  { value: 'piping', label: 'اجرای پایپینگ صنعتی' },
  { value: 'mechanical', label: 'نصب تجهیزات مکانیکی' },
  { value: 'welding', label: 'جوشکاری تخصصی' },
  { value: 'structure', label: 'ساخت استراکچر فلزی' },
  { value: 'overhaul', label: 'تعمیرات اساسی (Overhaul)' },
  { value: 'sandblast', label: 'سندبلاست و رنگ صنعتی' },
  { value: 'manpower', label: 'تأمین نیروی فنی' },
  { value: 'other', label: 'سایر' },
]

interface FormData {
  name: string
  phone: string
  email: string
  requestType: string
  notes: string
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    requestType: '',
    notes: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {}
    if (!form.name.trim()) newErrors.name = 'نام الزامی است'
    const cleanPhone = form.phone.replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
    if (!form.phone.trim()) newErrors.phone = 'شماره تماس الزامی است'
    else if (!/^[0-9+\-\s]{8,15}$/.test(cleanPhone)) newErrors.phone = 'شماره تماس معتبر نیست'
    if (!form.requestType) newErrors.requestType = 'موضوع درخواست را انتخاب کنید'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        setSuccess(true)
        setForm({ name: '', phone: '', email: '', requestType: '', notes: '' })
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className={styles.successState}>
        <CheckCircle size={48} className={styles.successIcon} />
        <h4 className={styles.successTitle}>درخواست شما ثبت شد!</h4>
        <p className={styles.successMsg}>
          کارشناسان ما در اسرع وقت با شما تماس خواهند گرفت.
        </p>
        <button
          className="btn btn--outline"
          onClick={() => setSuccess(false)}
          style={{ marginTop: '1rem' }}
        >
          ارسال درخواست جدید
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>
          نام و نام خانوادگی <span className={styles.required}>*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="form-input form-input--dark"
          placeholder="نام خود را وارد کنید"
          autoComplete="name"
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="phone" className={styles.label}>
          شماره تماس <span className={styles.required}>*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          className="form-input form-input--dark"
          placeholder="09xxxxxxxxx"
          dir="ltr"
          autoComplete="tel"
        />
        {errors.phone && <span className="form-error">{errors.phone}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          ایمیل
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="form-input form-input--dark"
          placeholder="example@mail.com"
          dir="ltr"
          autoComplete="email"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="requestType" className={styles.label}>
          موضوع درخواست <span className={styles.required}>*</span>
        </label>
        <select
          id="requestType"
          name="requestType"
          value={form.requestType}
          onChange={handleChange}
          className="form-select form-select--dark"
        >
          {REQUEST_TYPES.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.requestType && <span className="form-error">{errors.requestType}</span>}
      </div>

      <div className={styles.field}>
        <label htmlFor="notes" className={styles.label}>
          توضیحات
        </label>
        <textarea
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleChange}
          className="form-textarea form-textarea--dark"
          placeholder="توضیحات تکمیلی..."
          rows={3}
        />
      </div>

      <button
        type="submit"
        className="btn btn--primary w-full"
        disabled={submitting}
        id="submit-contact-form"
      >
        {submitting ? (
          <span className={styles.spinner} />
        ) : (
          <>
            <Send size={16} />
            ارسال درخواست
          </>
        )}
      </button>
    </form>
  )
}

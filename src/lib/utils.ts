/**
 * Utility to convert English digits to Persian digits.
 */
export function toPersianDigits(n: string | number | undefined | null): string {
  if (n === null || n === undefined) return ''
  const str = String(n)
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  return str.replace(/\d/g, (d) => persianDigits[parseInt(d, 10)])
}

/**
 * Cleanly format project URLs even if the user enters slashes or prefixes in CMS
 */
export function getProjectUrl(slug?: string): string {
  if (!slug) return '/projects'
  let clean = String(slug).trim().toLowerCase()
  clean = clean.replace(/^\/+/, '')
  clean = clean.replace(/^projects\//, '')
  clean = clean.replace(/^services\//, '')
  return `/projects/${clean}`
}

/**
 * Cleanly format service URLs
 */
export function getServiceUrl(slug?: string): string {
  if (!slug) return '/services'
  let clean = String(slug).trim().toLowerCase()
  clean = clean.replace(/^\/+/, '')
  clean = clean.replace(/^services\//, '')
  return `/services/${clean}`
}

/**
 * Format any ISO date string to Shamsi Year and Month (e.g., بهمن ۱۴۰۴)
 */
export function formatShamsiYearMonth(dateStr?: string): string {
  if (!dateStr) return ''
  const str = String(dateStr).trim()
  if (str.length <= 7 && !str.includes('T') && !str.includes('-')) {
    return toPersianDigits(str)
  }
  try {
    const d = new Date(str)
    if (isNaN(d.getTime())) return toPersianDigits(str)
    const formatter = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
      year: 'numeric',
      month: 'long',
    })
    return formatter.format(d)
  } catch (_) {
    return toPersianDigits(str)
  }
}



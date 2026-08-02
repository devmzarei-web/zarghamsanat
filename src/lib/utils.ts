/**
 * Utility to convert English digits to Persian digits.
 */
export function toPersianDigits(n: string | number | undefined | null): string {
  if (n === null || n === undefined) return ''
  const str = String(n)
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
  return str.replace(/\d/g, (d) => persianDigits[parseInt(d, 10)])
}

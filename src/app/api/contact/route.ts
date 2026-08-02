import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payload'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, email, requestType, notes } = body

    // Basic validation
    if (!name || !phone || !requestType) {
      return NextResponse.json(
        { error: 'فیلدهای الزامی پر نشده‌اند' },
        { status: 400 }
      )
    }

    const payload = await getPayloadClient()

    await payload.create({
      collection: 'contact-submissions',
      data: {
        name,
        phone,
        email: email || undefined,
        requestType,
        notes: notes || undefined,
        status: 'new',
      },
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'خطا در ثبت درخواست. لطفاً دوباره تلاش کنید.' },
      { status: 500 }
    )
  }
}

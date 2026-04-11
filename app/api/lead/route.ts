import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const payload = await req.json()

    // TODO: интеграция с CRM / Bitrix24 webhook
    // В MVP просто логируем в серверную консоль.
    console.log('[lead]', JSON.stringify(payload))

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[lead] error', e)
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}

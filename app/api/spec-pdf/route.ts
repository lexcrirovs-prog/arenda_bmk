import { NextResponse } from 'next/server'
import { getProductById } from '@/content/products'

export const runtime = 'nodejs'

/**
 * Заглушка генерации PDF-спецификации. В production здесь будет серверная
 * генерация на основе данных расчёта (pdfkit / @react-pdf/renderer).
 * В MVP перенаправляем на статичный файл техпаспорта модели.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 })
  }
  const product = getProductById(id)
  if (!product) {
    return NextResponse.json({ error: 'product not found' }, { status: 404 })
  }
  return NextResponse.redirect(new URL(product.pdfUrl, req.url), 302)
}

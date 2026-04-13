'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { products, getProductById, type Product } from '@/content/products'
import { formatPower, formatPrice, formatSteam, formatNumber, formatHours } from '@/lib/format'
import { Button } from '@/components/ui/button'

const rows: { label: string; get: (p: Product) => string }[] = [
  { label: 'Тип', get: (p) => (p.type === 'steam' ? 'Паровая' : 'Водогрейная') },
  { label: 'Тепловая мощность', get: (p) => formatPower(p.powerKW) },
  { label: 'Пар, т/ч', get: (p) => (p.steamTonsPerHour ? formatSteam(p.steamTonsPerHour) : '—') },
  { label: 'Давление, бар', get: (p) => (p.pressureBar ? String(p.pressureBar) : '—') },
  { label: 'КПД, %', get: (p) => String(p.efficiency) },
  { label: 'Топливо', get: (p) => p.fuel.join(' / ') },
  { label: 'Расход', get: (p) => p.fuelConsumption },
  {
    label: 'Габариты, мм',
    get: (p) =>
      `${formatNumber(p.dimensions.length)} × ${formatNumber(p.dimensions.width)} × ${formatNumber(p.dimensions.height)}`,
  },
  { label: 'Вес, кг', get: (p) => formatNumber(p.weightKg) },
  { label: 'Мобилизация', get: (p) => formatHours(p.mobilizationHours) },
  { label: 'Ставка / мес', get: (p) => formatPrice(p.monthlyRate) },
]

export function CompareView() {
  const searchParams = useSearchParams()
  const items = useMemo(() => {
    const raw = searchParams.get('ids') ?? ''
    return raw
      .split(',')
      .filter(Boolean)
      .slice(0, 4)
      .map(getProductById)
      .filter((p): p is Product => Boolean(p))
  }, [searchParams])

  return (
    <section className="container-pro py-14">
      <Link
        href="/catalog"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-industrial-900"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        В каталог
      </Link>
      <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-industrial-900">
        Сравнение моделей
      </h1>

      {items.length < 2 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
          <p className="text-slate-600">
            Выберите от 2 до 4 моделей в каталоге, чтобы построить сравнительную таблицу.
          </p>
          <Button asChild variant="primary" className="mt-5">
            <Link href="/catalog">Перейти в каталог</Link>
          </Button>
          <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
            {products.slice(0, 3).map((p) => (
              <Link
                key={p.id}
                href={`/compare?ids=${p.id}`}
                className="rounded-xl border border-slate-200 bg-white p-4 hover:shadow-card"
              >
                <p className="font-mono text-[10px] uppercase text-slate-400">Пример</p>
                <p className="mt-1 font-semibold text-industrial-900">{p.shortTitle}</p>
                <p className="mt-1 font-mono text-sm text-slate-500">{formatPower(p.powerKW)}</p>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50">
                <th className="sticky left-0 bg-slate-50 px-4 py-4 text-left font-mono text-xs uppercase tracking-wide text-slate-500">
                  Параметр
                </th>
                {items.map((p) => (
                  <th key={p.id} className="px-4 py-4 text-left text-base font-semibold text-industrial-900">
                    <Link href={`/catalog/${p.slug}`} className="hover:underline">{p.shortTitle}</Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.label} className="border-t border-slate-200">
                  <td className="sticky left-0 bg-white px-4 py-3 text-slate-500">{r.label}</td>
                  {items.map((p) => (
                    <td key={p.id} className="px-4 py-3 font-mono text-industrial-900">{r.get(p)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

import Link from 'next/link'
import { FileText, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatPower, formatPrice } from '@/lib/format'
import type { CalculatorResult } from './calculator.logic'

export function ResultCard({ result }: { result: CalculatorResult }) {
  const { baseKW, correctedKW, recommended, monthlyRate } = result
  const overheadPct = Math.round(((correctedKW - baseKW) / baseKW) * 100)

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
      <div className="flex items-center justify-between">
        <Badge variant="alert">Рекомендация</Badge>
        <span className="font-mono text-[10px] uppercase tracking-wide text-slate-400">
          CALC-{Date.now().toString(36).slice(-6).toUpperCase()}
        </span>
      </div>

      <dl className="mt-6 space-y-4 border-b border-slate-200 pb-6">
        <div className="flex items-baseline justify-between">
          <dt className="text-sm text-slate-500">Базовая мощность Q = S · q · N</dt>
          <dd className="font-mono text-lg text-industrial-900">{formatPower(baseKW)}</dd>
        </div>
        <div className="flex items-baseline justify-between">
          <dt className="text-sm text-slate-500">Поправки на объект и утепление</dt>
          <dd className="font-mono text-sm text-slate-500">
            {overheadPct > 0 ? `+${overheadPct}%` : `${overheadPct}%`}
          </dd>
        </div>
        <div className="flex items-baseline justify-between">
          <dt className="text-base font-semibold text-industrial-900">Итоговая мощность</dt>
          <dd className="font-mono text-2xl font-semibold text-alert-600">
            {formatPower(correctedKW)}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <p className="font-mono text-[10px] uppercase tracking-wide text-slate-500">
          Рекомендованная модель
        </p>
        <p className="mt-1 text-lg font-semibold text-industrial-900">
          {recommended.title}
        </p>
        <p className="mt-1 text-sm text-slate-600 line-clamp-2">
          {recommended.description}
        </p>
      </div>

      <div className="mt-6 flex items-end justify-between rounded-xl bg-industrial-900 px-5 py-4 text-slate-50">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-wide text-alert-400">
            Ежемесячная ставка от
          </p>
          <p className="mt-0.5 font-mono text-2xl font-semibold">
            {formatPrice(monthlyRate)}
          </p>
        </div>
        <Button asChild variant="primary" size="sm">
          <Link href={`/catalog/${recommended.slug}`}>
            Подробнее
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </Button>
      </div>

      <div className="mt-4">
        <Button asChild variant="outline" className="w-full">
          <a href={recommended.pdfUrl} download>
            <FileText className="h-4 w-4" aria-hidden />
            Скачать техспецификацию (PDF)
          </a>
        </Button>
      </div>
    </div>
  )
}

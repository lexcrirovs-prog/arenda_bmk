import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cases } from '@/content/cases'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Реализованные проекты аренды котельных',
  description:
    'Кейс-стади аварийных подмен, строительных прогревов и обеспечения пищевых и фармпроизводств мобильными блочно-модульными котельными.',
  path: '/cases',
})

export default function CasesPage() {
  return (
    <>
      <section className="bg-industrial-900 py-14 text-slate-50">
        <div className="container-pro">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-alert-400">
            Кейсы
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Проекты, где мы сработали по счёту часов
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Реальные истории развёртывания мобильных котельных — с цифрами,
            сроками и комментариями инженерных служб заказчика.
          </p>
        </div>
      </section>

      <section className="container-pro py-14">
        <ul className="space-y-6">
          {cases.map((c) => (
            <li
              key={c.id}
              className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-card md:grid-cols-[260px_1fr] md:p-8"
            >
              <div
                role="img"
                aria-label={c.heroAlt}
                className="relative h-40 w-full overflow-hidden rounded-xl bg-gradient-to-br from-industrial-900 via-industrial-800 to-industrial-700 md:h-full"
              >
                <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent_0_14px,rgba(243,156,18,0.08)_14px_15px)]" />
                <div className="absolute bottom-3 right-3 font-mono text-[10px] uppercase tracking-wide text-slate-400">
                  CASE-{c.id.slice(0, 4).toUpperCase()}
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="alert">{c.industry}</Badge>
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5" aria-hidden /> {c.location}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5" aria-hidden /> {c.durationHours} ч
                  </span>
                </div>
                <h2 className="mt-3 text-xl font-semibold text-industrial-900 leading-snug">
                  <Link href={`/cases/${c.slug}`} className="hover:underline">
                    {c.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm text-slate-600 line-clamp-3">
                  {c.challenge}
                </p>
                <div className="mt-5 flex flex-wrap gap-6 border-t border-slate-200 pt-4">
                  {c.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="text-[10px] uppercase tracking-wide text-slate-500">
                        {m.label}
                      </p>
                      <p className="font-mono text-sm font-semibold text-industrial-900">
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/cases/${c.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-alert-600 hover:underline"
                >
                  Читать кейс
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

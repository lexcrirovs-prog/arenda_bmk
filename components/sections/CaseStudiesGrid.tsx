import Link from 'next/link'
import { ArrowRight, Clock, MapPin } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cases } from '@/content/cases'

export function CaseStudiesGrid() {
  return (
    <section className="section">
      <div className="container-pro">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Реализованные проекты"
            title="Где уже выручали коллег"
            description="Ниже — три характерных сценария: аварийная подмена, строительный прогрев и обеспечение фармпроизводства на ППР. Прозой, а не маркетингом."
          />
          <Button asChild variant="outline">
            <Link href="/cases">
              Все кейсы
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <article
              key={c.id}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white shadow-card overflow-hidden"
            >
              <div
                className="relative aspect-[16/10] bg-gradient-to-br from-industrial-900 via-industrial-800 to-industrial-700"
                role="img"
                aria-label={c.heroAlt}
              >
                <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent_0_14px,rgba(243,156,18,0.08)_14px_15px)]" />
                <div className="absolute left-4 top-4">
                  <Badge variant="alert">{c.industry}</Badge>
                </div>
                <div className="absolute right-4 bottom-4 font-mono text-[10px] uppercase tracking-wide text-slate-400">
                  CASE-{c.id.slice(0, 4).toUpperCase()}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-semibold text-industrial-900 leading-snug">
                  <Link
                    href={`/cases/${c.slug}`}
                    className="after:absolute after:inset-0"
                  >
                    {c.title}
                  </Link>
                </h3>
                <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {c.location}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {c.durationHours} ч
                  </span>
                </div>
                <p className="mt-4 text-sm text-slate-600 line-clamp-3">
                  {c.challenge}
                </p>
                <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-200 pt-4">
                  {c.metrics.slice(0, 2).map((m) => (
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

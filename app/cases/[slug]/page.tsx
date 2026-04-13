import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, MapPin, Quote } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cases, getCaseBySlug } from '@/content/cases'
import { getProductById } from '@/content/products'
import { buildMetadata } from '@/lib/seo'
import { formatPower } from '@/lib/format'

export function generateStaticParams() {
  return cases.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const c = getCaseBySlug(slug)
  if (!c) return buildMetadata({ title: 'Кейс не найден' })
  return buildMetadata({
    title: c.title,
    description: c.challenge.slice(0, 150),
    path: `/cases/${c.slug}`,
  })
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const c = getCaseBySlug(slug)
  if (!c) notFound()

  const equipment = c.equipmentUsed
    .map((id) => getProductById(id))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))

  return (
    <>
      <section className="bg-industrial-900 py-14 text-slate-50">
        <div className="container-pro">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-50"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Все кейсы
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Badge variant="alert">{c.industry}</Badge>
            <span className="flex items-center gap-1 text-xs text-slate-400">
              <MapPin className="h-3.5 w-3.5" aria-hidden /> {c.location}
            </span>
            <span className="flex items-center gap-1 font-mono text-xs text-slate-400">
              <Clock className="h-3.5 w-3.5" aria-hidden /> {c.durationHours} ч
            </span>
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-50 leading-tight">
            {c.title}
          </h1>
        </div>
      </section>

      <section className="container-pro py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <article className="prose prose-slate max-w-none">
            <h2 className="text-xl font-semibold text-industrial-900">Задача</h2>
            <p className="mt-2 text-slate-700 leading-relaxed">{c.challenge}</p>

            <h2 className="mt-8 text-xl font-semibold text-industrial-900">Решение</h2>
            <p className="mt-2 text-slate-700 leading-relaxed">{c.solution}</p>

            <h2 className="mt-8 text-xl font-semibold text-industrial-900">Результат</h2>
            <p className="mt-2 text-slate-700 leading-relaxed">{c.outcome}</p>

            {c.quote && (
              <blockquote className="mt-10 rounded-2xl border-l-4 border-alert-500 bg-slate-50 p-6">
                <Quote className="h-5 w-5 text-alert-500" aria-hidden />
                <p className="mt-3 text-lg italic leading-relaxed text-industrial-900">
                  «{c.quote.text}»
                </p>
                <footer className="mt-4 text-sm text-slate-600">
                  <strong className="text-industrial-900">{c.quote.author}</strong>,{' '}
                  {c.quote.role}
                </footer>
              </blockquote>
            )}
          </article>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <h3 className="font-mono text-[10px] uppercase tracking-wide text-slate-500">
                Project at a Glance
              </h3>
              <dl className="mt-4 divide-y divide-slate-200">
                {c.metrics.map((m) => (
                  <div key={m.label} className="flex items-baseline justify-between py-2.5">
                    <dt className="text-sm text-slate-500">{m.label}</dt>
                    <dd className="font-mono text-sm font-semibold text-industrial-900">
                      {m.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {equipment.length > 0 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                <h3 className="font-mono text-[10px] uppercase tracking-wide text-slate-500">
                  Использованное оборудование
                </h3>
                <ul className="mt-4 space-y-3">
                  {equipment.map((p) => (
                    <li key={p.id}>
                      <Link
                        href={`/catalog/${p.slug}`}
                        className="block rounded-lg bg-slate-50 px-4 py-3 hover:bg-slate-100"
                      >
                        <p className="font-semibold text-industrial-900">
                          {p.shortTitle}
                        </p>
                        <p className="font-mono text-xs text-slate-500">
                          {formatPower(p.powerKW)}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  )
}

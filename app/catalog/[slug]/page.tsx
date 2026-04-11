import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Flame, Droplets, FileText, FileCode, Phone } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TechDataPoint } from '@/components/common/TechDataPoint'
import { products, getProductBySlug } from '@/content/products'
import { formatPower, formatPrice, formatSteam, formatNumber, formatHours } from '@/lib/format'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/content/seo'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug)
  if (!product) return buildMetadata({ title: 'Модель не найдена' })
  return buildMetadata({
    title: product.title,
    description: product.description,
    path: `/catalog/${product.slug}`,
  })
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const fuelLabel = product.fuel
    .map((f) => ({ gas: 'газ', diesel: 'дизель', dual: 'двухтопливная' }[f]))
    .join(' / ')

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    sku: product.id,
    brand: { '@type': 'Brand', name: siteConfig.name },
    offers: {
      '@type': 'Offer',
      price: product.monthlyRate,
      priceCurrency: 'RUB',
      availability: 'https://schema.org/InStock',
      url: `${siteConfig.url}/catalog/${product.slug}`,
    },
  }

  return (
    <>
      <section className="bg-industrial-900 py-14 text-slate-50">
        <div className="container-pro">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-50"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Назад в каталог
          </Link>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Badge variant={product.type === 'steam' ? 'steam' : 'hotwater'}>
                {product.type === 'steam' ? (
                  <>
                    <Flame className="mr-1 h-3 w-3" aria-hidden /> Паровая
                  </>
                ) : (
                  <>
                    <Droplets className="mr-1 h-3 w-3" aria-hidden /> Водогрейная
                  </>
                )}
              </Badge>
              <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                {product.title}
              </h1>
              <p className="mt-4 max-w-2xl text-slate-300">{product.description}</p>
            </div>
            <div className="rounded-2xl border border-industrial-700 bg-industrial-950/60 px-6 py-4">
              <p className="font-mono text-[10px] uppercase tracking-wide text-slate-400">
                Ставка аренды от
              </p>
              <p className="mt-1 font-mono text-3xl font-semibold text-alert-400">
                {formatPrice(product.monthlyRate)}
              </p>
              <p className="text-xs text-slate-400">/ мес., НДС в том числе</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-pro py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <div className="space-y-10">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
              <h2 className="text-xl font-semibold text-industrial-900">
                Технические характеристики
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <TechDataPoint
                  label="Тепловая мощность"
                  value={formatPower(product.powerKW)}
                />
                {product.steamTonsPerHour && (
                  <TechDataPoint
                    label="Паропроизводительность"
                    value={formatSteam(product.steamTonsPerHour)}
                  />
                )}
                {product.pressureBar && (
                  <TechDataPoint
                    label="Рабочее давление"
                    value={`${product.pressureBar}`}
                    unit="бар"
                  />
                )}
                <TechDataPoint label="КПД" value={`${product.efficiency}`} unit="%" />
                <TechDataPoint label="Топливо" value={fuelLabel} />
                <TechDataPoint
                  label="Расход топлива"
                  value={product.fuelConsumption}
                />
                <TechDataPoint
                  label="Длина / Ширина / Высота"
                  value={`${formatNumber(product.dimensions.length)} × ${formatNumber(
                    product.dimensions.width
                  )} × ${formatNumber(product.dimensions.height)}`}
                  unit="мм"
                />
                <TechDataPoint
                  label="Вес"
                  value={formatNumber(product.weightKg)}
                  unit="кг"
                />
                <TechDataPoint
                  label="Мобилизация"
                  value={formatHours(product.mobilizationHours)}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
              <h2 className="text-xl font-semibold text-industrial-900">
                Комплектация и особенности
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {product.features.map((f) => (
                  <li
                    key={f}
                    className="flex gap-3 rounded-lg bg-slate-50 px-4 py-3 text-sm text-industrial-900"
                  >
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-alert-500"
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 h-fit space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <h3 className="text-base font-semibold text-industrial-900">
                Документация
              </h3>
              <div className="mt-4 space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <a href={product.pdfUrl} download>
                    <FileText className="h-4 w-4" aria-hidden />
                    Технический паспорт (PDF)
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <a href={product.dwgUrl} download>
                    <FileCode className="h-4 w-4" aria-hidden />
                    Чертежи DWG
                  </a>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-industrial-900 p-6 text-slate-50 shadow-card">
              <p className="font-mono text-[10px] uppercase tracking-wide text-alert-400">
                Готовы выехать
              </p>
              <p className="mt-2 text-lg font-semibold leading-snug">
                Уточнить наличие и получить КП
              </p>
              <Button asChild variant="primary" className="mt-4 w-full">
                <Link href={`/contact?model=${product.id}`}>Запросить КП</Link>
              </Button>
              <Button asChild variant="emergency" className="mt-2 w-full">
                <a href={`tel:${siteConfig.emergencyPhone.replace(/\s/g, '')}`}>
                  <Phone className="h-4 w-4" aria-hidden />
                  {siteConfig.emergencyPhone}
                </a>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
    </>
  )
}

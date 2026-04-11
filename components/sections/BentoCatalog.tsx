import Link from 'next/link'
import { ArrowRight, Flame, Droplets } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { products } from '@/content/products'
import { formatPower, formatPrice, formatSteam } from '@/lib/format'
import { cn } from '@/lib/utils'

// Bento layout: сетка 6 колонок, разные span для создания асимметрии
const layout: Record<string, string> = {
  'bmk-steam-10': 'lg:col-span-4 lg:row-span-2', // flagship — large
  'bmk-hw-10': 'lg:col-span-2 lg:row-span-1',
  'bmk-steam-4': 'lg:col-span-2 lg:row-span-1',
  'bmk-hw-3': 'lg:col-span-3 lg:row-span-1',
  'bmk-hw-1': 'lg:col-span-3 lg:row-span-1',
  'bmk-steam-1': 'lg:col-span-2 lg:row-span-1',
}

export function BentoCatalog() {
  return (
    <section className="section bg-slate-100">
      <div className="container-pro">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Каталог оборудования"
            title="Паровые и водогрейные БМК в контейнерах"
            description="Шесть типовых конфигураций закрывают диапазон от 1 МВт до 10 МВт. Все модели — с автоматикой, удалённым мониторингом и блоком водоподготовки."
          />
          <Button asChild variant="outline">
            <Link href="/catalog">
              Все модели
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </div>

        <div className="mt-12 bento-grid lg:grid-rows-[repeat(2,minmax(220px,auto))]">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/catalog/${p.slug}`}
              className={cn(
                'bento-item group flex flex-col justify-between relative overflow-hidden',
                layout[p.id] ?? 'lg:col-span-2'
              )}
            >
              <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-[linear-gradient(135deg,transparent_48%,#1A2B3C_48%_52%,transparent_52%)] bg-[size:28px_28px]" />

              <div className="relative space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={p.type === 'steam' ? 'steam' : 'hotwater'}>
                    {p.type === 'steam' ? (
                      <>
                        <Flame className="mr-1 h-3 w-3" aria-hidden /> Паровая
                      </>
                    ) : (
                      <>
                        <Droplets className="mr-1 h-3 w-3" aria-hidden /> Водогрейная
                      </>
                    )}
                  </Badge>
                  <span className="font-mono text-[10px] uppercase tracking-wide text-slate-400">
                    {p.id.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-industrial-900 leading-tight">
                  {p.shortTitle}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2">
                  {p.description}
                </p>
              </div>

              <div className="relative mt-6 grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">
                    {p.type === 'steam' ? 'Паропроизводительность' : 'Мощность'}
                  </p>
                  <p className="font-mono text-lg font-semibold text-industrial-900">
                    {p.type === 'steam' && p.steamTonsPerHour
                      ? formatSteam(p.steamTonsPerHour)
                      : formatPower(p.powerKW)}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-slate-500">
                    от / месяц
                  </p>
                  <p className="font-mono text-lg font-semibold text-alert-600">
                    {formatPrice(p.monthlyRate)}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm font-medium text-industrial-900 opacity-80 group-hover:opacity-100">
                Подробнее
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

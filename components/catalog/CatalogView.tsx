'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Flame, Droplets, Scale, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { products, type BoilerType, type FuelType } from '@/content/products'
import { formatPower, formatPrice, formatSteam } from '@/lib/format'
import { cn } from '@/lib/utils'

interface Filters {
  types: BoilerType[]
  fuels: FuelType[]
  minPowerMW: number
}

const ALL_TYPES: { value: BoilerType; label: string }[] = [
  { value: 'steam', label: 'Паровые' },
  { value: 'hotwater', label: 'Водогрейные' },
]

const ALL_FUELS: { value: FuelType; label: string }[] = [
  { value: 'gas', label: 'Газ' },
  { value: 'diesel', label: 'Дизель' },
  { value: 'dual', label: 'Двухтопливная' },
]

const POWER_STEPS = [0, 1, 3, 5, 10]

export function CatalogView({ initialType }: { initialType?: BoilerType }) {
  const [filters, setFilters] = useState<Filters>({
    types: initialType ? [initialType] : [],
    fuels: [],
    minPowerMW: 0,
  })
  const [compareIds, setCompareIds] = useState<string[]>([])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filters.types.length && !filters.types.includes(p.type)) return false
      if (filters.fuels.length && !p.fuel.some((f) => filters.fuels.includes(f)))
        return false
      if (p.powerKW / 1000 < filters.minPowerMW) return false
      return true
    })
  }, [filters])

  function toggleType(t: BoilerType) {
    setFilters((f) => ({
      ...f,
      types: f.types.includes(t)
        ? f.types.filter((x) => x !== t)
        : [...f.types, t],
    }))
  }
  function toggleFuel(fu: FuelType) {
    setFilters((f) => ({
      ...f,
      fuels: f.fuels.includes(fu) ? f.fuels.filter((x) => x !== fu) : [...f.fuels, fu],
    }))
  }
  function toggleCompare(id: string) {
    setCompareIds((ids) => {
      if (ids.includes(id)) return ids.filter((x) => x !== id)
      if (ids.length >= 4) return ids
      return [...ids, id]
    })
  }

  return (
    <div className="container-pro py-12 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-24 self-start space-y-8">
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wide text-slate-500">
              Тип котельной
            </h2>
            <div className="mt-3 space-y-2">
              {ALL_TYPES.map((t) => (
                <label
                  key={t.value}
                  className="flex items-center gap-3 text-sm text-industrial-900 cursor-pointer"
                >
                  <Checkbox
                    checked={filters.types.includes(t.value)}
                    onCheckedChange={() => toggleType(t.value)}
                    aria-label={`Фильтр: ${t.label}`}
                  />
                  {t.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-mono text-xs uppercase tracking-wide text-slate-500">
              Топливо
            </h2>
            <div className="mt-3 space-y-2">
              {ALL_FUELS.map((f) => (
                <label
                  key={f.value}
                  className="flex items-center gap-3 text-sm text-industrial-900 cursor-pointer"
                >
                  <Checkbox
                    checked={filters.fuels.includes(f.value)}
                    onCheckedChange={() => toggleFuel(f.value)}
                    aria-label={`Фильтр топлива: ${f.label}`}
                  />
                  {f.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="power" className="font-mono text-xs uppercase tracking-wide text-slate-500">
              Минимальная мощность
            </Label>
            <div className="mt-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">от</span>
                <span className="font-mono text-industrial-900">
                  {filters.minPowerMW} МВт
                </span>
              </div>
              <input
                id="power"
                type="range"
                min={0}
                max={10}
                step={1}
                value={filters.minPowerMW}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, minPowerMW: Number(e.target.value) }))
                }
                className="mt-2 w-full accent-alert-500"
              />
              <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-400">
                {POWER_STEPS.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setFilters({ types: [], fuels: [], minPowerMW: 0 })}
          >
            Сбросить фильтры
          </Button>
        </aside>

        <div>
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-wide text-slate-500">
              Найдено моделей: <span className="text-industrial-900">{filtered.length}</span>
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
              По заданным фильтрам ничего не найдено. Попробуйте расширить параметры.
            </div>
          ) : (
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {filtered.map((p) => {
                const inCompare = compareIds.includes(p.id)
                return (
                  <article
                    key={p.id}
                    className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
                  >
                    <div className="flex items-start justify-between">
                      <Badge variant={p.type === 'steam' ? 'steam' : 'hotwater'}>
                        {p.type === 'steam' ? (
                          <>
                            <Flame className="mr-1 h-3 w-3" aria-hidden />
                            Пар
                          </>
                        ) : (
                          <>
                            <Droplets className="mr-1 h-3 w-3" aria-hidden />
                            Вода
                          </>
                        )}
                      </Badge>
                      <span className="font-mono text-[10px] uppercase tracking-wide text-slate-400">
                        {p.id.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-industrial-900">
                      <Link href={`/catalog/${p.slug}`} className="hover:underline">
                        {p.shortTitle}
                      </Link>
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                      {p.description}
                    </p>

                    <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-200 pt-4 text-xs">
                      <div>
                        <dt className="text-slate-500">Мощность</dt>
                        <dd className="font-mono text-sm text-industrial-900">
                          {formatPower(p.powerKW)}
                        </dd>
                      </div>
                      {p.steamTonsPerHour && (
                        <div>
                          <dt className="text-slate-500">Пар</dt>
                          <dd className="font-mono text-sm text-industrial-900">
                            {formatSteam(p.steamTonsPerHour)}
                          </dd>
                        </div>
                      )}
                      <div>
                        <dt className="text-slate-500">КПД</dt>
                        <dd className="font-mono text-sm text-industrial-900">
                          {p.efficiency}%
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-5 flex items-end justify-between border-t border-slate-200 pt-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-slate-500">
                          от / мес
                        </p>
                        <p className="font-mono text-xl font-semibold text-alert-600">
                          {formatPrice(p.monthlyRate)}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant={inCompare ? 'primary' : 'outline'}
                          size="sm"
                          onClick={() => toggleCompare(p.id)}
                          aria-pressed={inCompare}
                        >
                          <Scale className="h-3.5 w-3.5" aria-hidden />
                          {inCompare ? 'В сравнении' : 'Сравнить'}
                        </Button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {compareIds.length > 0 && (
        <CompareDrawer ids={compareIds} onRemove={toggleCompare} onClear={() => setCompareIds([])} />
      )}
    </div>
  )
}

function CompareDrawer({
  ids,
  onRemove,
  onClear,
}: {
  ids: string[]
  onRemove: (id: string) => void
  onClear: () => void
}) {
  const items = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean)
  const href = `/compare?ids=${ids.join(',')}`

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white shadow-elev">
      <div className="container-pro flex flex-wrap items-center justify-between gap-4 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-wide text-slate-500">
            В сравнении: {ids.length}/4
          </span>
          <ul className="flex flex-wrap gap-2">
            {items.map(
              (p) =>
                p && (
                  <li
                    key={p.id}
                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs"
                  >
                    <span className="font-mono text-industrial-900">
                      {p.shortTitle}
                    </span>
                    <button
                      type="button"
                      onClick={() => onRemove(p.id)}
                      className="text-slate-500 hover:text-red-600"
                      aria-label={`Убрать ${p.shortTitle} из сравнения`}
                    >
                      <X className="h-3 w-3" aria-hidden />
                    </button>
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onClear}>
            Очистить
          </Button>
          <Button asChild variant="primary" size="sm" disabled={ids.length < 2}>
            <Link
              href={href}
              aria-disabled={ids.length < 2}
              className={cn(ids.length < 2 && 'pointer-events-none opacity-50')}
            >
              Перейти к сравнению
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

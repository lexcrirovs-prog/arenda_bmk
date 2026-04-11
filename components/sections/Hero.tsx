'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Phone, Zap, Shield, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/content/seo'

const stats = [
  { label: 'Мобилизация', value: '24', unit: 'часа' },
  { label: 'Диапазон мощности', value: '0,3–20', unit: 'МВт' },
  { label: 'Реализованных проектов', value: '380+', unit: '' },
  { label: 'Круглосуточный сервис', value: '24/7', unit: '' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-industrial-900 text-slate-50">
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:56px_56px]" />
      </div>
      <div className="absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-alert-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-accent-cyan/10 blur-3xl pointer-events-none" />

      <div className="container-pro relative py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="inline-flex items-center gap-2 rounded-full border border-alert-500/30 bg-alert-500/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-alert-400">
              <Zap className="h-3.5 w-3.5" aria-hidden />
              Непрерывность энергоснабжения
            </p>
            <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.05] tracking-tight text-slate-50">
              Аренда блочно-модульных котельных{' '}
              <span className="text-alert-500">без простоев производства</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Мобильные паровые и водогрейные установки в 40-футовых контейнерах.
              Мобилизация от 24 часов, сервис 24/7, сертификация Ростехнадзора.
              Готовы ответить на инженерное задание в течение часа.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild variant="primary" size="lg">
                <Link href="/calculator">
                  Подобрать котельную
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="emergency" size="lg">
                <a
                  href={`tel:${siteConfig.emergencyPhone.replace(/\s/g, '')}`}
                  aria-label="Аварийная горячая линия"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  Аварийная линия
                </a>
              </Button>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4 border-t border-industrial-800 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-xs uppercase tracking-wide text-slate-400">
                    {s.label}
                  </dt>
                  <dd className="mt-1 font-mono tabular-nums text-2xl font-semibold text-slate-50">
                    {s.value}
                    {s.unit && (
                      <span className="ml-1 text-sm font-normal text-slate-400">
                        {s.unit}
                      </span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative rounded-3xl border border-industrial-800 bg-industrial-800/60 p-5 shadow-elev backdrop-blur">
              <HeroContainerVisual />
              <div className="mt-5 grid grid-cols-2 gap-3">
                <StatCard
                  icon={<Clock className="h-4 w-4" aria-hidden />}
                  label="Пуск на площадке"
                  value="4 ч"
                />
                <StatCard
                  icon={<Shield className="h-4 w-4" aria-hidden />}
                  label="Класс ОПО"
                  value="II–III"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function HeroContainerVisual() {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-industrial-700 bg-gradient-to-br from-industrial-950 via-industrial-900 to-industrial-800"
      role="img"
      aria-label="Иллюстрация контейнерной котельной в 40-футовом Conex-контейнере"
    >
      {/* Conex container schematic */}
      <div className="absolute inset-6 rounded-lg border-2 border-alert-500/70 bg-industrial-800/40">
        <div className="absolute inset-x-6 top-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-alert-400">
          <span>40ft Conex · HC</span>
          <span>12192 × 2438 × 2896 мм</span>
        </div>
        {/* Corrugation */}
        <div className="absolute inset-x-4 top-10 bottom-14 rounded bg-[repeating-linear-gradient(90deg,rgba(243,156,18,0.08)_0_10px,transparent_10px_20px)]" />
        {/* Door */}
        <div className="absolute left-4 bottom-4 h-10 w-14 rounded border border-alert-500/70" />
        {/* Flue */}
        <div className="absolute -top-2 right-16 h-5 w-4 rounded-t-sm bg-alert-500/70" />
        {/* Labels */}
        <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-4 font-mono text-[10px] text-slate-300">
          <span>Q = 10 МВт</span>
          <span>η = 94%</span>
          <span>P = 13 бар</span>
        </div>
      </div>
      <div className="absolute bottom-2 right-3 font-mono text-[9px] uppercase tracking-wide text-slate-500">
        SCH-01 · ISO 1496-1
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-industrial-700 bg-industrial-900/60 px-4 py-3">
      <div className="grid h-8 w-8 place-items-center rounded-md bg-alert-500/15 text-alert-400">
        {icon}
      </div>
      <div>
        <p className="text-[11px] uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p className="font-mono text-sm font-semibold text-slate-50">{value}</p>
      </div>
    </div>
  )
}

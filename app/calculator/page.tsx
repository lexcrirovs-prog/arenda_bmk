import type { Metadata } from 'next'
import { CalculatorForm } from '@/components/calculator/CalculatorForm'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Инженерный калькулятор мощности котельной',
  description:
    'Подберите мобильную котельную для вашего объекта: введите площадь, высоту потолков и тип помещения — получите расчёт мощности и рекомендованную модель БМК с PDF техпаспорта.',
  path: '/calculator',
  keywords: ['калькулятор мощности котельной', 'расчёт котельной онлайн'],
})

export default function CalculatorPage() {
  return (
    <>
      <section className="bg-industrial-900 py-14 text-slate-50">
        <div className="container-pro">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-alert-400">
            Калькулятор
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Подбор мобильной котельной за 2 минуты
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Упрощённая методика расчёта тепловой мощности по формуле
            <span className="mx-1 font-mono text-alert-400">Q = S · q · N</span>
            для отапливаемых объектов площадью до 20 000 м². Результат —
            рекомендованная модель БМК, ежемесячная ставка и PDF с техпаспортом.
          </p>
        </div>
      </section>
      <section className="container-pro py-14">
        <CalculatorForm />
      </section>
    </>
  )
}

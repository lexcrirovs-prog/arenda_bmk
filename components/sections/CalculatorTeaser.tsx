import Link from 'next/link'
import { Calculator, FileText, ArrowRight } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Button } from '@/components/ui/button'

export function CalculatorTeaser() {
  return (
    <section className="section bg-slate-100">
      <div className="container-pro">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Инженерный калькулятор"
              title="Получите предварительную спецификацию за 2 минуты"
              description="Расчёт тепловой мощности по упрощённой методике для объектов до 20 000 м². На выходе — рекомендованная модель БМК, месячная ставка и PDF с техническими характеристиками."
            />
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <p className="font-mono text-[11px] uppercase tracking-wide text-slate-500">
                Используемая методика
              </p>
              <p className="mt-3 font-mono text-xl text-industrial-900">
                <span className="text-alert-600">Q</span>
                <span className="text-slate-500"> (кВт) = </span>
                <span className="text-alert-600">S</span>
                <span className="text-slate-500"> · </span>
                <span className="text-alert-600">0,131</span>
                <span className="text-slate-500"> · </span>
                <span className="text-alert-600">1,2</span>
              </p>
              <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-xs text-slate-500">S — площадь, м²</dt>
                  <dd className="font-mono text-industrial-900">50 … 20 000</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">q — теплопотери</dt>
                  <dd className="font-mono text-industrial-900">0,131 кВт/м²</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">N — запас</dt>
                  <dd className="font-mono text-industrial-900">1,15 – 1,25</dd>
                </div>
              </dl>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="primary" size="lg">
                <Link href="/calculator">
                  <Calculator className="h-4 w-4" aria-hidden />
                  Открыть калькулятор
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/docs/tech-manual.pdf" download>
                  <FileText className="h-4 w-4" aria-hidden />
                  Инженерное руководство (PDF)
                </a>
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-elev">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <p className="font-mono text-xs uppercase tracking-wide text-slate-500">
                Пример расчёта
              </p>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[10px] text-emerald-700">
                ● ВАЛИДНО
              </span>
            </div>
            <dl className="mt-5 divide-y divide-slate-200">
              {[
                { k: 'Тип объекта', v: 'Пищевое производство' },
                { k: 'Площадь', v: '5 000 м²' },
                { k: 'Высота потолков', v: '6,0 м' },
                { k: 'Утепление', v: 'Среднее' },
                { k: 'Расчётная Q', v: '1 572 кВт' },
                { k: 'Рекомендация', v: 'БМК-Т 3,0 МВт' },
                { k: 'Ставка / мес.', v: '720 000 ₽' },
              ].map((row, i) => (
                <div
                  key={row.k}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <dt className="text-slate-500">{row.k}</dt>
                  <dd
                    className={
                      i >= 4
                        ? 'font-mono font-semibold text-alert-600'
                        : 'font-mono text-industrial-900'
                    }
                  >
                    {row.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

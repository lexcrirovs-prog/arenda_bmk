import type { Metadata } from 'next'
import { SectionHeading } from '@/components/common/SectionHeading'
import { buildMetadata } from '@/lib/seo'
import { CtaEmergency } from '@/components/sections/CtaEmergency'

export const metadata: Metadata = buildMetadata({
  title: 'О компании Арена-БМК',
  description:
    'Инженерная компания, специализирующаяся на аренде мобильных блочно-модульных котельных. 12 лет на рынке, 380+ реализованных проектов, собственный парк из 60+ модулей.',
  path: '/about',
})

const stats = [
  { value: '12', unit: 'лет', label: 'На рынке промышленной энергетики' },
  { value: '60+', unit: '', label: 'Модулей в собственном парке' },
  { value: '380+', unit: '', label: 'Реализованных проектов' },
  { value: '3', unit: '', label: 'Базы: Москва, Казань, Новосибирск' },
]

export default function AboutPage() {
  return (
    <>
      <section className="bg-industrial-900 py-14 text-slate-50">
        <div className="container-pro">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-alert-400">
            О компании
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Инженеры, которые выручают других инженеров
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Арена-БМК специализируется исключительно на аренде мобильных паровых
            и водогрейных котельных. Мы не продаём оборудование, не делаем
            проектные работы «в стол» — наш KPI измеряется в часах стабильной
            работы наших модулей на объектах заказчиков.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-pro">
          <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
              >
                <dd className="font-mono text-4xl font-semibold text-industrial-900">
                  {s.value}
                  {s.unit && (
                    <span className="ml-1 text-xl font-normal text-slate-500">
                      {s.unit}
                    </span>
                  )}
                </dd>
                <dt className="mt-2 text-sm text-slate-600">{s.label}</dt>
              </div>
            ))}
          </dl>

          <div className="mt-16 max-w-3xl space-y-6 text-base leading-relaxed text-slate-700">
            <SectionHeading
              eyebrow="Наш подход"
              title="Честный инженерный разговор вместо маркетинга"
            />
            <p>
              Мы выросли из сервисной бригады, которая 12 лет назад выехала
              тушить первую аварию на теплоснабжении молокозавода в Тверской
              области. Уже тогда стало очевидно: в промышленности не хватает
              подрядчиков, которые говорят с инженерами на одном языке —
              в единицах кВт, тоннах пара в час и давлении в барах, а не в
              «инновационных решениях» и «комплексных экосистемах».
            </p>
            <p>
              Сегодня у нас три технических базы и диспетчерский центр с
              круглосуточным дежурством. Каждый модуль оснащён системой
              удалённого мониторинга — мы видим рабочие параметры котельной в
              реальном времени и успеваем реагировать до того, как проблема
              дойдёт до автоматики заказчика.
            </p>
            <p>
              Главный принцип: честное ТЭО по каждой заявке. Если аренда
              невыгоднее покупки — мы об этом скажем. Если ваша площадка
              не годится для 40-фут контейнера — предложим два 20-футовых.
              Если проще привезти дизельный модуль вместо газового — честно
              посчитаем затраты на топливо. Такой подход экономит обеим
              сторонам недели переписок и миллионы рублей.
            </p>
          </div>
        </div>
      </section>

      <CtaEmergency />
    </>
  )
}

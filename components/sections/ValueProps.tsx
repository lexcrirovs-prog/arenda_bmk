import { Clock, ShieldCheck, Wrench, BarChart3 } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'

const items = [
  {
    icon: Clock,
    title: 'Мобилизация от 24 часов',
    text: 'Собственный парк из 60+ модулей готов к выезду в любую точку России. Средний срок запуска на площадке — 4 часа после прибытия.',
  },
  {
    icon: Wrench,
    title: 'Полный цикл «под ключ»',
    text: 'Инженерное обследование → логистика → монтаж → водоподготовка → пуско-наладка → обслуживание. Заказчик не ищет субподрядчиков.',
  },
  {
    icon: ShieldCheck,
    title: 'Ростехнадзор, ОПО, GMP',
    text: 'Лицензия на эксплуатацию ОПО, ISO 9001/14001, сертификация ТР ТС 032/2013. Все документы передаём инженерной службе заказчика.',
  },
  {
    icon: BarChart3,
    title: 'Прозрачная экономика',
    text: 'Ежемесячная ставка фиксирована в договоре. Онлайн-калькулятор показывает сравнение «аренда vs. покупка» с окупаемостью по годам.',
  },
]

export function ValueProps() {
  return (
    <section className="section">
      <div className="container-pro">
        <SectionHeading
          eyebrow="Почему Арена-БМК"
          title="Инженерная ответственность за непрерывность процесса"
          description="Мы работаем с объектами, где каждый час простоя стоит миллионы рублей. Поэтому строим процессы так, чтобы риск отказа на нашей стороне был устранён проектно."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
            >
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-industrial-900 text-alert-500">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-industrial-900">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

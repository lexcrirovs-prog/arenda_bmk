import { SectionHeading } from '@/components/common/SectionHeading'
import { Truck, HardHat, TestTube2, MonitorCheck } from 'lucide-react'

const steps = [
  {
    n: '01',
    icon: Truck,
    title: 'Мобилизация',
    duration: '0–24 ч',
    points: [
      'Инженерное задание за 1 час',
      'Выезд на площадку в течение 24 часов',
      'Логистика негабаритных грузов',
    ],
  },
  {
    n: '02',
    icon: HardHat,
    title: 'Монтаж',
    duration: '4–8 ч',
    points: [
      'Установка на подготовленную плиту',
      'Подключение по быстроразъёмам',
      'Подключение топливной магистрали',
    ],
  },
  {
    n: '03',
    icon: TestTube2,
    title: 'Водоподготовка',
    duration: '2–4 ч',
    points: [
      'Умягчение / обратный осмос',
      'Анализ исходной воды',
      'Настройка реагентной схемы',
    ],
  },
  {
    n: '04',
    icon: MonitorCheck,
    title: 'Мониторинг 24/7',
    duration: 'Всё время аренды',
    points: [
      'Удалённый SCADA-контроль',
      'Регламентное ТО по графику',
      'Аварийная бригада на связи',
    ],
  },
]

export function ProcessTimeline() {
  return (
    <section className="section bg-industrial-900 text-slate-300">
      <div className="container-pro">
        <SectionHeading
          invert
          eyebrow="Процесс «под ключ»"
          title="От заявки до стабильного пара — 4 этапа"
          description="Заказчик получает готовую услугу, а не список задач. Мы берём на себя проектирование, монтаж, водоподготовку и сервис — вашим службам остаётся только подписывать ежемесячные акты."
        />
        <ol className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => {
            const Icon = s.icon
            return (
              <li
                key={s.n}
                className="relative rounded-2xl border border-industrial-800 bg-industrial-950/60 p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-500">
                    {s.n} / 04
                  </span>
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-alert-500 text-industrial-900">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-slate-50">
                  {s.title}
                </h3>
                <p className="mt-1 font-mono text-sm text-accent-cyan">
                  {s.duration}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  {s.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span aria-hidden className="mt-2 h-1 w-1 rounded-full bg-alert-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

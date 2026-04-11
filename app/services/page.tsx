import type { Metadata } from 'next'
import { ProcessTimeline } from '@/components/sections/ProcessTimeline'
import { CertificationsBadges } from '@/components/sections/CertificationsBadges'
import { SectionHeading } from '@/components/common/SectionHeading'
import { buildMetadata } from '@/lib/seo'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Beaker, Wrench, Activity, FlaskConical } from 'lucide-react'

export const metadata: Metadata = buildMetadata({
  title: 'Сервис, монтаж и водоподготовка',
  description:
    'Полный цикл услуг по аренде блочно-модульных котельных: инженерный аудит, монтаж, водоподготовка, обслуживание, аварийный сервис 24/7.',
  path: '/services',
})

const waterPoints = [
  {
    icon: Beaker,
    title: 'Анализ исходной воды',
    text: 'Забор пробы на площадке, экспресс-анализ жёсткости, солесодержания, pH и Fe. В лабораторных условиях — расширенный анализ по ПБ 10-574 и ГОСТ 20995.',
  },
  {
    icon: FlaskConical,
    title: 'Схема водоподготовки',
    text: 'Подбор ступеней: Na-катионирование, умягчение, обратный осмос, EDI — в зависимости от требований к пару/теплоносителю.',
  },
  {
    icon: Activity,
    title: 'Непрерывный мониторинг',
    text: 'Онлайн-контроль общей жёсткости, проводимости и pH с записью в валидируемый журнал. Сигнализация при выходе за уставки.',
  },
  {
    icon: Wrench,
    title: 'Регламентное ТО',
    text: 'Еженедельные, ежемесячные и квартальные операции — по карте ТО. Выездная сервисная бригада по SLA.',
  },
]

const faq = [
  {
    q: 'Сколько времени занимает мобилизация модуля?',
    a: 'Для 20-фут модулей — от 8 до 24 часов с момента подписания наряда, для 40-фут — от 24 до 72 часов. В аварийном сценарии выезд возможен в течение часа.',
  },
  {
    q: 'Какие требования к площадке?',
    a: 'Ровная бетонная или железобетонная плита с уклоном не более 1%, подъезд грузового транспорта 20 т, подключение к электросети 380 В / 63 А, источник воды, точка подключения топлива.',
  },
  {
    q: 'Кто отвечает за безопасность эксплуатации ОПО?',
    a: 'Ответственность распределяется договором: мы — за техническое состояние оборудования, ППР и сервис, заказчик — за условия размещения и допуск персонала на объект.',
  },
  {
    q: 'Как оплачивается топливо?',
    a: 'Возможны две схемы: поставка топлива заказчиком (наиболее выгодно) или через нашу логистику с фиксированной наценкой. Оба варианта прописываются в договоре.',
  },
  {
    q: 'Какой график ТО предусмотрен?',
    a: 'Еженедельный визуальный осмотр, ежемесячная проверка автоматики и горелки, квартальная чистка теплообменника, полугодовая ревизия запорной арматуры.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <section className="bg-industrial-900 py-14 text-slate-50">
        <div className="container-pro">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-alert-400">
            Сервис
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Полный цикл «под ключ» — от ТЗ до мониторинга
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Мы берём на себя всю инженерную работу: от анализа исходной воды до
            передачи данных в вашу АСУ ТП.
          </p>
        </div>
      </section>

      <ProcessTimeline />

      <section className="section">
        <div className="container-pro">
          <SectionHeading
            eyebrow="Водная химия"
            title="Качество воды — залог ресурса котла"
            description="Отдельный модуль водоподготовки входит в стандартную комплектацию каждой БМК. Уровень фильтрации подбирается под конкретные требования к пару или теплоносителю."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {waterPoints.map((w) => {
              const Icon = w.icon
              return (
                <div
                  key={w.title}
                  className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-industrial-900 text-alert-500">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-industrial-900">
                      {w.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      {w.text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <CertificationsBadges />

      <section className="section bg-slate-100">
        <div className="container-pro">
          <SectionHeading
            eyebrow="Частые вопросы"
            title="На что чаще всего смотрят инженеры при выборе подрядчика"
          />
          <div className="mt-10 mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white px-6 shadow-card">
            <Accordion type="single" collapsible>
              {faq.map((item, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  )
}

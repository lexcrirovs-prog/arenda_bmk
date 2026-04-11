import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { ContactForm } from '@/components/contact/ContactForm'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/content/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Контакты и отправка ТЗ',
  description:
    'Связаться с инженерной службой: круглосуточная аварийная линия, отправка технического задания, адреса технических баз в Москве, Казани и Новосибирске.',
  path: '/contact',
})

const bases = [
  { city: 'Москва', address: 'ул. Промышленная, д. 1', phone: '+7 495 555-35-35' },
  { city: 'Казань', address: 'ул. Тэцевская, д. 12', phone: '+7 843 555-35-35' },
  { city: 'Новосибирск', address: 'ул. Станционная, д. 40', phone: '+7 383 555-35-35' },
]

export default function ContactPage() {
  return (
    <>
      <section className="bg-industrial-900 py-14 text-slate-50">
        <div className="container-pro">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-alert-400">
            Контакты
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Прямой доступ к инженерам и диспетчерам
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Звоните на аварийную линию — отвечает дежурный диспетчер, не
            автоответчик. Среднее время принятия наряда — 5 минут.
          </p>
        </div>
      </section>

      <section className="container-pro py-14">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ContactForm />

          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <h2 className="text-base font-semibold text-industrial-900">
                Диспетчерский центр
              </h2>
              <div className="mt-4 space-y-3 text-sm">
                <a
                  href={`tel:${siteConfig.emergencyPhone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 font-mono text-lg font-semibold text-alert-600 hover:underline"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  {siteConfig.emergencyPhone}
                </a>
                <p className="flex items-center gap-2 text-slate-600">
                  <Clock className="h-4 w-4" aria-hidden />
                  24/7, без выходных
                </p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-slate-600 hover:text-industrial-900"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
              <h2 className="text-base font-semibold text-industrial-900">
                Технические базы
              </h2>
              <ul className="mt-4 space-y-4">
                {bases.map((b) => (
                  <li key={b.city}>
                    <p className="font-semibold text-industrial-900">{b.city}</p>
                    <p className="flex items-center gap-2 text-sm text-slate-600">
                      <MapPin className="h-3.5 w-3.5" aria-hidden />
                      {b.address}
                    </p>
                    <p className="font-mono text-sm text-slate-500">{b.phone}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

import { Phone, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/content/seo'

export function CtaEmergency() {
  return (
    <section className="section">
      <div className="container-pro">
        <div className="relative overflow-hidden rounded-3xl bg-industrial-900 px-8 py-14 text-slate-50 sm:px-14">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(243,156,18,0.2),transparent_50%)]"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-red-400/40 bg-red-500/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-red-300">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
                Аварийная линия 24/7
              </p>
              <h2 className="mt-5 text-3xl sm:text-4xl font-semibold leading-tight text-slate-50">
                Авария на котельной? Диспетчер примет заявку за 5 минут.
              </h2>
              <p className="mt-4 max-w-xl text-slate-300">
                Круглосуточная дежурная смена, парк из 60+ модулей на трёх базах —
                в Москве, Казани и Новосибирске. Среднее время выезда — 47 минут.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button asChild variant="emergency" size="lg">
                <a href={`tel:${siteConfig.emergencyPhone.replace(/\s/g, '')}`}>
                  <Phone className="h-4 w-4" aria-hidden />
                  {siteConfig.emergencyPhone}
                </a>
              </Button>
              <Button asChild variant="onDark" size="lg">
                <a href="/contact#brief">
                  <MessageSquare className="h-4 w-4" aria-hidden />
                  Отправить ТЗ
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

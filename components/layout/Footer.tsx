import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import { siteConfig } from '@/content/seo'

const columns = [
  {
    title: 'Продукты',
    links: [
      { href: '/catalog?type=steam', label: 'Паровые котельные' },
      { href: '/catalog?type=hotwater', label: 'Водогрейные котельные' },
      { href: '/calculator', label: 'Калькулятор мощности' },
      { href: '/compare', label: 'Сравнение моделей' },
    ],
  },
  {
    title: 'Компания',
    links: [
      { href: '/about', label: 'О компании' },
      { href: '/cases', label: 'Реализованные проекты' },
      { href: '/services', label: 'Сервис и монтаж' },
      { href: '/contact', label: 'Контакты' },
    ],
  },
  {
    title: 'Документы',
    links: [
      { href: '/services#certifications', label: 'Сертификаты и лицензии' },
      { href: '/docs/policy.pdf', label: 'Политика конфиденциальности' },
      { href: '/docs/offer.pdf', label: 'Публичная оферта' },
      { href: '/docs/safety.pdf', label: 'Правила ОПО' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-industrial-950 text-slate-300">
      <div className="container-pro py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="space-y-5">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-50">
              <span className="inline-block h-9 w-9 rounded-md bg-alert-500 text-industrial-900 grid place-items-center font-mono text-xs font-bold">
                БМК
              </span>
              <span className="text-lg font-semibold">Арена-БМК</span>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              {siteConfig.description}
            </p>
            <div className="space-y-2 text-sm">
              <a
                href={`tel:${siteConfig.emergencyPhone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-slate-50 hover:text-alert-400"
              >
                <Phone className="h-4 w-4" aria-hidden />
                <span className="font-mono tabular-nums font-semibold">
                  {siteConfig.emergencyPhone}
                </span>
                <span className="text-slate-400">— диспетчер 24/7</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 hover:text-slate-50"
              >
                <Mail className="h-4 w-4" aria-hidden />
                {siteConfig.email}
              </a>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                {siteConfig.address}
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-50">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-slate-400 hover:text-slate-50">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-industrial-800 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. ИНН {siteConfig.inn}. Все права защищены.
          </p>
          <p className="font-mono">
            Лицензия Ростехнадзора: ВХ-00-0XXXXX · ISO 9001:2015
          </p>
        </div>
      </div>
    </footer>
  )
}

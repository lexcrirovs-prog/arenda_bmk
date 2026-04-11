'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Phone, Menu } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/content/seo'

const nav = [
  { href: '/catalog', label: 'Каталог' },
  { href: '/calculator', label: 'Калькулятор' },
  { href: '/cases', label: 'Кейсы' },
  { href: '/services', label: 'Сервис' },
  { href: '/about', label: 'О компании' },
  { href: '/contact', label: 'Контакты' },
]

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur supports-[backdrop-filter]:bg-white/75">
      <div className="container-pro flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-industrial-900"
          aria-label="Арена-БМК — на главную"
        >
          <span className="inline-block h-8 w-8 rounded-md bg-industrial-900 text-slate-50 grid place-items-center font-mono text-xs font-bold">
            БМК
          </span>
          <span className="hidden sm:inline font-semibold tracking-tight">
            Арена-БМК
          </span>
        </Link>

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'inline-flex h-10 items-center rounded-md px-3 text-sm font-medium transition-colors',
                      active
                        ? 'bg-slate-100 text-industrial-900'
                        : 'text-slate-600 hover:text-industrial-900 hover:bg-slate-100'
                    )}
                    aria-current={active ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${siteConfig.emergencyPhone.replace(/\s/g, '')}`}
            className="hidden md:inline-flex items-center gap-2 rounded-md border border-red-500/30 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
            aria-label="Аварийная линия 24/7"
          >
            <Phone className="h-4 w-4" aria-hidden />
            <span className="font-mono tabular-nums">{siteConfig.emergencyPhone}</span>
          </a>
          <Button asChild variant="primary" size="sm" className="hidden sm:inline-flex">
            <Link href="/calculator">Подобрать котельную</Link>
          </Button>
          <button
            type="button"
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300"
            onClick={() => setOpen((v) => !v)}
            aria-label="Открыть меню"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="lg:hidden border-t border-slate-200 bg-white"
        >
          <nav aria-label="Мобильная навигация" className="container-pro py-4">
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-md px-3 py-3 text-base font-medium text-industrial-900 hover:bg-slate-100"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`tel:${siteConfig.emergencyPhone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 rounded-md bg-red-50 px-3 py-3 text-base font-semibold text-red-700"
                >
                  <Phone className="h-4 w-4" aria-hidden />
                  <span className="font-mono tabular-nums">
                    {siteConfig.emergencyPhone}
                  </span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}

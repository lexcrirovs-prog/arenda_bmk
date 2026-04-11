import { ShieldCheck } from 'lucide-react'
import { SectionHeading } from '@/components/common/SectionHeading'
import { certifications } from '@/content/certifications'

export function CertificationsBadges() {
  return (
    <section id="certifications" className="section">
      <div className="container-pro">
        <SectionHeading
          eyebrow="Разрешительная документация"
          title="Работаем по правилам Ростехнадзора"
          description="Полный пакет документов передаём инженерной службе заказчика до прибытия установки на площадку. Лицензии доступны для верификации по номерам."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((c) => (
            <li
              key={c.id}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card"
              aria-label={`Сертификат: ${c.title}, ${c.issuer}`}
            >
              <div
                aria-hidden
                className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-industrial-900 text-alert-500"
              >
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wide text-slate-500">
                  {c.issuer}
                </p>
                <h3 className="mt-0.5 text-base font-semibold leading-snug text-industrial-900">
                  {c.title}
                </h3>
                <p className="mt-1 font-mono text-[11px] text-slate-500">
                  № {c.number}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {c.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

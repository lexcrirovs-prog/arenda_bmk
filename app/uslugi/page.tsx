import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { servicePages } from "@/lib/site-data";

export const metadata = {
  title: "Сервисные страницы",
  description:
    "Контентная карта сервисных страниц: водоподготовка, сервис 24/7 и нормативные требования для аренды мобильных котельных.",
};

export default function ServicesPage() {
  return (
    <main className="section-space">
      <div className="site-shell">
        <ScrollReveal>
          <SectionHeading
            eyebrow="Content map"
            title="Сервисные страницы для инженерной, закупочной и HSE-команды."
            description="Этот раздел усиливает длинный B2B-цикл: отдельно показываем водоподготовку, сервис 24/7, мониторинг и нормативный контур, который важен до запуска на площадке."
          />
        </ScrollReveal>

        <div className="mt-12 grid gap-6">
          {servicePages.map((page, index) => (
            <ScrollReveal key={page.slug} delay={0.07 * index}>
              <article className="grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="eyebrow">{page.eyebrow}</p>
                  <h2 className="mt-4 text-2xl font-semibold text-white">{page.title}</h2>
                  <p className="mt-4 text-base leading-8 text-slate-300">{page.summary}</p>
                  <p className="mt-4 text-sm leading-7 text-slate-400">{page.challenge}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {page.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-[#10202f] p-6">
                  <h3 className="text-lg font-semibold text-white">Что получает клиент</h3>
                  <ul className="mt-5 grid gap-3">
                    {page.outcomes.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-7 text-slate-300">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-alert" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/uslugi/${page.slug}`}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-alert px-5 py-3 text-sm font-semibold text-industrial-900 transition hover:bg-alert/90"
                  >
                    Открыть страницу
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </main>
  );
}

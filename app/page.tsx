import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Factory,
  FileText,
  Gauge,
  Mail,
  Phone,
  Send,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { DataVisualization } from "@/components/data-visualization";
import { EngineeringCalculator } from "@/components/engineering-calculator";
import { EquipmentCatalog } from "@/components/equipment-catalog";
import { FAQAccordion } from "@/components/faq-accordion";
import { LeadForm } from "@/components/lead-form";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SectionHeading } from "@/components/section-heading";
import { siteConfig } from "@/lib/site-config";
import {
  caseStudies,
  certifications,
  comparisonScenarios,
  equipmentModels,
  faqItems,
  processSteps,
  servicePages,
  trustMetrics,
} from "@/lib/site-data";

const heroBullets = [
  "Запуск модулей от 24-48 часов при готовой точке подключения.",
  "Никакого CAPEX: переводим временное тепло и пар в OPEX-модель.",
  "Тарифы Base, Service и Full-service под разный уровень риска.",
  "Доставка из Энгельса по России и СНГ, включая северные площадки.",
];

const promiseCards = [
  {
    title: "Напрямую от производителя",
    text:
      "Арендная услуга строится на базе оборудования завода «Премиум Газ». Это сокращает число посредников и ускоряет согласование комплектов, ЗИП и технической документации.",
    icon: Factory,
  },
  {
    title: "Zero CAPEX",
    text:
      "Клиент платит за период использования и выбранный уровень сервиса, а не замораживает бюджет в покупке временной котельной. Особенно ценно на ремонтах и сезонных пиках.",
    icon: Gauge,
  },
  {
    title: "Комплаенс и сервис 24/7",
    text:
      "В проект сразу закладываются ПНР, график ТО, водоподготовка, мониторинг, аварийные алгоритмы и пакет документов под эксплуатацию, ОПО и пожарную безопасность.",
    icon: ShieldCheck,
  },
];

const contactLinks = [
  {
    icon: Phone,
    title: "Горячая линия",
    text: siteConfig.hotlineDisplay,
    href: siteConfig.hotlineHref,
  },
  {
    icon: Mail,
    title: "Почта для лидов",
    text: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Send,
    title: "Канал в MAX",
    text: "max.ru/id6449067259_biz",
    href: siteConfig.maxUrl,
  },
  {
    icon: FileText,
    title: "Краткий бриф",
    text: "Скачать PDF по аренде БМК",
    href: siteConfig.catalogPdfPath,
  },
];

export default function HomePage() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#08131d]/85 backdrop-blur-xl">
        <div className="site-shell flex min-h-[4.75rem] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-alert text-sm font-semibold text-industrial-900">
              БМК
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white">
                {siteConfig.name}
              </p>
              <p className="text-xs text-slate-400">{siteConfig.factory}</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
            {siteConfig.navigation.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </a>
            ))}
            <a
              href={siteConfig.catalogPdfPath}
              className="rounded-full border border-white/10 px-4 py-2 transition hover:border-alert hover:text-alert"
            >
              PDF-бриф
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={siteConfig.hotlineHref}
              className="hidden text-sm font-medium text-slate-200 transition hover:text-white sm:block"
            >
              {siteConfig.hotlineDisplay}
            </a>
            <a
              href="#contact"
              className="rounded-full bg-alert px-4 py-2 text-sm font-semibold text-industrial-900 transition hover:bg-alert/90"
            >
              Получить КП
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden pb-10 pt-14 sm:pt-20">
          <div className="absolute inset-0 -z-10 soft-grid opacity-20" />
          <div className="site-shell grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <ScrollReveal className="max-w-3xl">
              <p className="eyebrow">Containerized boiler rental / industrial b2b</p>
              <h1 className="mt-6 text-5xl font-semibold leading-none tracking-tight text-white sm:text-6xl lg:text-7xl">
                Аренда мобильных котельных от производителя:
                <span className="block text-slate-400">тепло и пар без капитальных затрат.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Мы сдаем в аренду блочно-модульные котельные на базе оборудования завода
                «Премиум Газ» в Энгельсе. Сайт помогает пройти предпродажную подготовку до
                первого звонка: оценить мощность, сравнить парк, понять тариф и сразу отправить
                запрос в работу.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#calculator"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-alert px-6 py-3 text-sm font-semibold text-industrial-900 transition hover:bg-alert/90"
                >
                  Рассчитать аренду
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-alert hover:text-alert"
                >
                  Получить КП за 10 минут
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {heroBullets.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.12}>
              <div className="panel-surface overflow-hidden p-4 sm:p-5">
                <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
                  <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#0d1722]">
                    <Image
                      src="/media/premium-steam-6tph.png"
                      alt="Паровая котельная в контейнере для технологического пара"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08131d] via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                      <div className="grid gap-3 sm:grid-cols-3">
                        {[
                          ["Формат", "пар в контейнере"],
                          ["Тариф", "Base / Service / Full-service"],
                          ["Задача", "резерв и сезонный пик"],
                        ].map(([label, value]) => (
                          <div
                            key={label}
                            className="rounded-2xl border border-white/10 bg-[#08131d]/80 px-4 py-3 backdrop-blur"
                          >
                            <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                              {label}
                            </p>
                            <p className="mt-2 font-mono text-base text-white">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="overflow-hidden rounded-[1.6rem] border border-white/10">
                      <div className="relative h-44 w-full">
                        <Image
                          src="/media/premium-block-15mw-interior-1.jpg"
                          alt="Внутренний вид блочно-модульной котельной 15 МВт"
                          fill
                          sizes="(max-width: 1024px) 100vw, 20vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-[1.6rem] border border-white/10">
                      <div className="relative h-44 w-full">
                        <Image
                          src="/media/premium-hot-water-24mw.jpg"
                          alt="Водогрейная котельная 2.4 МВт"
                          fill
                          sizes="(max-width: 1024px) 100vw, 20vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] p-5">
                      <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                        Живые объекты
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-300">
                        В первой же зоне сайта стоят реальные фотографии ваших котельных. Это
                        сразу переводит разговор из “абстрактной аренды” в конкретный инженерный
                        сервис с понятным уровнем исполнения.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <div className="site-shell mt-12">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {trustMetrics.map((metric, index) => (
                <ScrollReveal key={metric.label} delay={0.08 * index}>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-5 py-5">
                    <p className="font-mono text-2xl text-white">{metric.value}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{metric.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.92fr_1.08fr]">
            <ScrollReveal>
              <SectionHeading
                eyebrow="Что получает клиент"
                title="Аренда БМК продается как сервис: привезем, подключим, введем, будем обслуживать."
                description="На этом экране мы подчеркиваем лучшие B2B-практики из вашего файла: скорость ввода, инженерную компетенцию, прозрачную договорную структуру и понятный уровень комплаенса."
              />
            </ScrollReveal>

            <div className="grid gap-4">
              {promiseCards.map((item, index) => (
                <ScrollReveal key={item.title} delay={0.08 * index}>
                  <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6">
                    <item.icon className="h-5 w-5 text-alert" />
                    <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="site-shell pb-8">
          <ScrollReveal>
            <SectionHeading
              eyebrow="Тарифы и экономика"
              title="Открытая логика цены: ставка, сервис, загрузка."
              description="Визуализация ниже собирает ориентиры из вашего материала: месячные ставки для водогрейных и паровых модулей, а также влияние загрузки на экономику арендного парка."
            />
          </ScrollReveal>
          <div className="mt-12">
            <ScrollReveal>
              <DataVisualization scenarios={comparisonScenarios} />
            </ScrollReveal>
          </div>
        </section>

        <section id="catalog" className="section-space">
          <div className="site-shell">
            <ScrollReveal>
              <SectionHeading
                eyebrow="Каталог парка"
                title="Водогрейные и паровые БМК для аварийных, сезонных и проектных задач."
                description="Каталог теперь говорит языком аренды: мощность, давление, тип топлива, формат контейнера и стартовая ставка. По структуре он опирается на серии Premium C / E и на паровые решения для 1.0, 1.6 и 2.5 т/ч."
              />
            </ScrollReveal>
            <div className="mt-12">
              <EquipmentCatalog models={equipmentModels} />
            </div>
          </div>
        </section>

        <section id="calculator" className="section-space">
          <div className="site-shell">
            <ScrollReveal>
              <SectionHeading
                eyebrow="Онлайн-калькулятор"
                title="Быстрый расчет мощности и стартовой месячной ставки."
                description="Используем формулу Q = S x 0.131 x 1.25, а затем корректируем результат по типу объекта, утеплению и высоте потолков. Это помогает квалифицировать лид еще до созвона."
              />
            </ScrollReveal>
            <div className="mt-12">
              <EngineeringCalculator />
            </div>
          </div>
        </section>

        <section id="cases" className="section-space">
          <div className="site-shell">
            <ScrollReveal>
              <SectionHeading
                eyebrow="Кейсы"
                title="Реальные сценарии: аварийная подмена, технологический пар, резервный контур."
                description="Фотографии и narrative-кейсы усиливают доверие в сегменте, где заказчик считает не только цену, но и риск простоя, сроки мобилизации и качество сервисного контура."
              />
            </ScrollReveal>

            <div className="mt-12 grid gap-6">
              {caseStudies.map((caseStudy, index) => (
                <ScrollReveal key={caseStudy.title} delay={0.06 * index}>
                  <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
                    <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                      <div className="relative min-h-[20rem] overflow-hidden">
                        <Image
                          src={caseStudy.image}
                          alt={caseStudy.imageAlt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#08131d] via-transparent to-transparent" />
                      </div>

                      <div className="p-6 lg:p-8">
                        <p className="eyebrow">Project narrative</p>
                        <h3 className="mt-4 text-2xl font-semibold text-white">{caseStudy.title}</h3>
                        <p className="mt-4 text-base leading-8 text-slate-300">{caseStudy.summary}</p>

                        <div className="mt-6 grid gap-5 text-sm leading-7 text-slate-300">
                          <div>
                            <p className="font-medium text-white">Задача</p>
                            <p className="mt-2">{caseStudy.challenge}</p>
                          </div>
                          <div>
                            <p className="font-medium text-white">Решение</p>
                            <p className="mt-2">{caseStudy.solution}</p>
                          </div>
                          <div>
                            <p className="font-medium text-white">Результат</p>
                            <p className="mt-2">{caseStudy.result}</p>
                          </div>
                        </div>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                          {caseStudy.stats.map((stat) => (
                            <div
                              key={stat.label}
                              className="rounded-[1.25rem] border border-white/10 bg-[#10202f] px-4 py-4"
                            >
                              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                                {stat.label}
                              </p>
                              <p className="mt-2 font-mono text-base text-white">{stat.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section id="service" className="section-space">
          <div className="site-shell grid gap-12 lg:grid-cols-[1fr_1fr]">
            <div>
              <ScrollReveal>
                <SectionHeading
                  eyebrow="Turnkey-процесс"
                  title="От мобилизации до мониторинга: вся сервисная цепочка на одной странице."
                  description="Эти блоки закрывают важные B2B-возражения: как организована доставка, что входит в ПНР, кто отвечает за водоподготовку и где проходит граница между арендой оборудования и полноценной услугой."
                />
              </ScrollReveal>

              <div className="mt-10 grid gap-4">
                {processSteps.map((item, index) => (
                  <ScrollReveal key={item.step} delay={0.08 * index}>
                    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xl text-alert">{item.step}</span>
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            <div className="grid gap-6">
              <ScrollReveal>
                <div className="rounded-[2rem] border border-white/10 bg-[#10202f]/75 p-6 sm:p-8">
                  <p className="eyebrow">Нормативы и доверие</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {certifications.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
                      >
                        <ShieldCheck className="h-5 w-5 text-alert" />
                        <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-300">{item.note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.08}>
                <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="eyebrow">Service pages</p>
                      <h3 className="mt-4 text-2xl font-semibold text-white">
                        Отдельные страницы по воде, сервису и требованиям безопасности.
                      </h3>
                    </div>
                    <Link
                      href="/uslugi"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-slate-200 transition hover:border-alert hover:text-alert"
                    >
                      Все страницы
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>

                  <div className="mt-8 grid gap-4">
                    {servicePages.map((page) => (
                      <Link
                        key={page.slug}
                        href={`/uslugi/${page.slug}`}
                        className="rounded-[1.5rem] border border-white/10 bg-[#10202f] p-5 transition hover:-translate-y-1 hover:border-alert/40"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="text-lg font-semibold text-white">{page.title}</h4>
                            <p className="mt-3 text-sm leading-7 text-slate-300">
                              {page.summary}
                            </p>
                          </div>
                          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-alert" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="section-space">
          <div className="site-shell grid gap-6 lg:grid-cols-3">
            <ScrollReveal>
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
                <Truck className="h-5 w-5 text-alert" />
                <h3 className="mt-4 text-xl font-semibold text-white">Доставка и география</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Налаженная логистика из Энгельса по всей России и странам СНГ. Используем
                  собственный спецтранспорт, низкорамные тралы и ведущие ТК в зависимости от
                  габаритов и срочности.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
                <Gauge className="h-5 w-5 text-alert" />
                <h3 className="mt-4 text-xl font-semibold text-white">Прозрачный OPEX</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Топливо, ТО, операторский пост и спецусловия можно вынести отдельными строками,
                  чтобы клиент видел не абстрактную цену, а понятную структуру промышленного
                  сервиса.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.16}>
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
                <FileText className="h-5 w-5 text-alert" />
                <h3 className="mt-4 text-xl font-semibold text-white">Документы для сделки</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Пакет включает паспорта, сервисные регламенты, материалы по ОПО, водной химии
                  и стартовый бриф для формирования коммерческого предложения.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section id="faq" className="section-space">
          <div className="site-shell">
            <ScrollReveal>
              <SectionHeading
                eyebrow="FAQ"
                title="Частые вопросы по аренде мобильных котельных."
                description="Здесь закрываем типовые вопросы до звонка: что входит в ставку, как считается сервис, кто несет ответственность за документы и что делать, если модуль нужен срочно."
              />
            </ScrollReveal>
            <div className="mt-12">
              <FAQAccordion items={faqItems} />
            </div>
          </div>
        </section>

        <section id="contact" className="pb-24">
          <div className="site-shell">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <ScrollReveal>
                <div className="rounded-[2rem] border border-alert/20 bg-[linear-gradient(135deg,rgba(243,156,18,0.18),rgba(12,23,34,0.95))] p-8 sm:p-10">
                  <p className="eyebrow">Контакты и лидогенерация</p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Почта, телефон и MAX для быстрых запросов по аренде.
                  </h2>
                  <p className="mt-4 text-base leading-8 text-slate-200">
                    Форму справа можно использовать как основной lead-flow. Для срочных запросов
                    добавлены прямые каналы связи: почта, горячая линия и MAX. Это удобно для
                    аварийных проектов и запросов на подмену во время ремонта.
                  </p>

                  <div className="mt-8 grid gap-4">
                    {contactLinks.map((item) => (
                      <a
                        key={item.title}
                        href={item.href}
                        target={
                          item.href.startsWith("http://") || item.href.startsWith("https://")
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          item.href.startsWith("http://") || item.href.startsWith("https://")
                            ? "noreferrer"
                            : undefined
                        }
                        className="rounded-[1.5rem] border border-white/10 bg-[#10202f]/80 p-5 transition hover:border-white/20"
                      >
                        <item.icon className="h-5 w-5 text-alert" />
                        <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.08}>
                <LeadForm />
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="site-shell flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 {siteConfig.shortName}. Лендинг аренды мобильных котельных на базе
            оборудования завода «Премиум Газ».
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href={siteConfig.catalogPdfPath} className="transition hover:text-white">
              PDF-бриф
            </a>
            <a href={siteConfig.maxUrl} target="_blank" rel="noreferrer" className="transition hover:text-white">
              MAX
            </a>
            <Link href="/uslugi" className="transition hover:text-white">
              Сервисные страницы
            </Link>
            <a href={`${siteConfig.basePath}/sitemap.xml`} className="transition hover:text-white">
              sitemap.xml
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

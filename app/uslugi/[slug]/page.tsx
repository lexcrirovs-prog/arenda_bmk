import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, FileText, ListChecks } from "lucide-react";

import { ScrollReveal } from "@/components/scroll-reveal";
import { siteConfig } from "@/lib/site-config";
import { getServicePage, servicePages } from "@/lib/site-data";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return servicePages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = params;
  const page = getServicePage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.summary,
    keywords: page.keywords,
    alternates: {
      canonical: `${siteConfig.url}/uslugi/${page.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = params;
  const page = getServicePage(slug);

  if (!page) {
    notFound();
  }

  return (
    <main className="section-space">
      <div className="site-shell">
        <Link
          href="/uslugi"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Назад к сервисным страницам
        </Link>

        <ScrollReveal className="mt-8 max-w-4xl">
          <p className="eyebrow">{page.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {page.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">{page.summary}</p>
          <p className="mt-6 text-base leading-8 text-slate-400">{page.challenge}</p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <ScrollReveal>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-2xl font-semibold text-white">Что обещаем в сделке</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{page.promise}</p>

              <h3 className="mt-8 flex items-center gap-2 text-lg font-semibold text-white">
                <ListChecks className="h-5 w-5 text-alert" />
                Что получает команда проекта
              </h3>
              <ul className="mt-4 grid gap-3 text-sm leading-7 text-slate-300">
                {page.outcomes.map((item) => (
                  <li key={item} className="rounded-2xl border border-white/10 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-[2rem] border border-white/10 bg-[#10202f] p-6">
              <h2 className="text-2xl font-semibold text-white">Модули сервиса</h2>
              <ul className="mt-6 grid gap-3 text-sm leading-7 text-slate-300">
                {page.modules.map((item) => (
                  <li key={item} className="rounded-2xl border border-white/10 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <ScrollReveal>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
              <h2 className="text-2xl font-semibold text-white">Регламент контроля</h2>
              <ul className="mt-6 grid gap-3 text-sm leading-7 text-slate-300">
                {page.schedule.map((item) => (
                  <li key={item} className="rounded-2xl border border-white/10 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
              <h2 className="flex items-center gap-2 text-2xl font-semibold text-white">
                <FileText className="h-5 w-5 text-alert" />
                Документы в контентной карте
              </h2>
              <ul className="mt-6 grid gap-3 text-sm leading-7 text-slate-300">
                {page.documents.map((item) => (
                  <li key={item} className="rounded-2xl border border-white/10 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}

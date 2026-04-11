import type { Metadata } from 'next'
import { CatalogView } from '@/components/catalog/CatalogView'
import { buildMetadata } from '@/lib/seo'
import type { BoilerType } from '@/content/products'

export const metadata: Metadata = buildMetadata({
  title: 'Каталог мобильных котельных',
  description:
    'Каталог паровых и водогрейных блочно-модульных котельных на аренду: БМК от 1 МВт до 10 МВт, дизельные и газовые модели. Прозрачные ставки, мобилизация 24 часа.',
  path: '/catalog',
  keywords: [
    'каталог блочно-модульных котельных',
    'аренда БМК каталог',
    'паровая котельная 10 т/ч',
  ],
})

interface Props {
  searchParams: { type?: string }
}

export default function CatalogPage({ searchParams }: Props) {
  const initialType =
    searchParams.type === 'steam' || searchParams.type === 'hotwater'
      ? (searchParams.type as BoilerType)
      : undefined

  return (
    <>
      <section className="bg-industrial-900 py-14 text-slate-50">
        <div className="container-pro">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-alert-400">
            Каталог
          </p>
          <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            Мобильные блочно-модульные котельные
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Все модели доступны для немедленной аренды. Фильтруйте по типу и
            топливу, сравнивайте до 4 моделей одновременно, получайте PDF
            техпаспорта прямо с карточки.
          </p>
        </div>
      </section>
      <CatalogView initialType={initialType} />
    </>
  )
}

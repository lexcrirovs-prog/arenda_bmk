import { Suspense } from 'react'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { CompareView } from '@/components/catalog/CompareView'

export const metadata: Metadata = buildMetadata({
  title: 'Сравнение моделей БМК',
  description: 'Сравнение технических характеристик паровых и водогрейных контейнерных котельных.',
  path: '/compare',
})

export default function ComparePage() {
  return (
    <Suspense>
      <CompareView />
    </Suspense>
  )
}

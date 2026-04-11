import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="container-pro py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-alert-600">
        Ошибка 404
      </p>
      <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-industrial-900">
        Страница не найдена
      </h1>
      <p className="mt-4 mx-auto max-w-xl text-slate-600">
        Возможно, страница была перемещена или вы перешли по устаревшей ссылке.
        Вернитесь в каталог или воспользуйтесь калькулятором мощности.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild variant="primary" size="lg">
          <Link href="/">На главную</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/catalog">В каталог</Link>
        </Button>
      </div>
    </section>
  )
}

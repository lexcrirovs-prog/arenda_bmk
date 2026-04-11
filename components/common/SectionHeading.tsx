import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  invert?: boolean
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  invert = false,
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        'max-w-3xl space-y-3',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'font-mono text-xs uppercase tracking-[0.18em]',
            invert ? 'text-accent-cyan' : 'text-alert-600'
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'text-3xl sm:text-4xl lg:text-[2.75rem] leading-tight font-semibold tracking-tight',
          invert ? 'text-slate-50' : 'text-industrial-900'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'text-base sm:text-lg leading-relaxed',
            invert ? 'text-slate-300' : 'text-slate-600'
          )}
        >
          {description}
        </p>
      )}
    </header>
  )
}

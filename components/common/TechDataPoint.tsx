import { cn } from '@/lib/utils'

interface TechDataPointProps {
  label: string
  value: string
  unit?: string
  className?: string
  invert?: boolean
}

export function TechDataPoint({
  label,
  value,
  unit,
  className,
  invert = false,
}: TechDataPointProps) {
  return (
    <div className={cn('space-y-0.5', className)}>
      <p
        className={cn(
          'text-xs uppercase tracking-wide',
          invert ? 'text-slate-400' : 'text-slate-500'
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          'font-mono tabular-nums text-lg font-semibold',
          invert ? 'text-accent-cyan' : 'text-industrial-900'
        )}
      >
        {value}
        {unit && (
          <span className="ml-1 text-sm font-normal text-slate-500">{unit}</span>
        )}
      </p>
    </div>
  )
}

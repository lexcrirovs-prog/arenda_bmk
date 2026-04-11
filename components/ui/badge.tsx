import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-industrial-900 text-slate-50',
        secondary:
          'border-transparent bg-slate-200 text-industrial-900',
        outline: 'border-slate-300 text-industrial-900',
        alert:
          'border-transparent bg-alert-500/15 text-alert-700',
        success:
          'border-transparent bg-emerald-100 text-emerald-800',
        steam:
          'border-transparent bg-sky-100 text-sky-800',
        hotwater:
          'border-transparent bg-orange-100 text-orange-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

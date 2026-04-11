import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none',
  {
    variants: {
      variant: {
        default:
          'bg-industrial-900 text-slate-50 hover:bg-industrial-800 shadow-sm',
        primary:
          'bg-alert-500 text-industrial-900 hover:bg-alert-600 shadow-sm font-semibold',
        outline:
          'border border-slate-300 bg-transparent text-industrial-900 hover:bg-slate-100',
        ghost: 'text-industrial-900 hover:bg-slate-100',
        link: 'text-industrial-900 underline-offset-4 hover:underline',
        emergency:
          'bg-red-600 text-white hover:bg-red-700 shadow-sm animate-pulse-ring',
        onDark:
          'bg-slate-50 text-industrial-900 hover:bg-slate-200 shadow-sm',
      },
      size: {
        sm: 'h-9 px-3',
        md: 'h-11 px-5',
        lg: 'h-12 px-7 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

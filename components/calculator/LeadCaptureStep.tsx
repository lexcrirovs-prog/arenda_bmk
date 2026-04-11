'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { leadSchema, type LeadInput, type CalculatorInput } from './calculator.schema'
import type { CalculatorResult } from './calculator.logic'

interface Props {
  calcInput: CalculatorInput
  result: CalculatorResult
  onSubmitted: () => void
}

export function LeadCaptureStep({ calcInput, result, onSubmitted }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: '', company: '', phone: '', email: '', consent: false },
  })

  async function onSubmit(values: LeadInput) {
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'calculator',
          lead: values,
          calc: {
            input: calcInput,
            result: {
              correctedKW: result.correctedKW,
              model: result.recommended.id,
              monthlyRate: result.monthlyRate,
            },
          },
        }),
      })
      onSubmitted()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
      aria-labelledby="lead-title"
    >
      <h3 id="lead-title" className="text-lg font-semibold text-industrial-900">
        Получить КП от инженера
      </h3>
      <p className="mt-1 text-sm text-slate-600">
        Отправим персональное коммерческое предложение с учётом ваших параметров.
      </p>

      <div className="mt-5 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Имя</Label>
            <Input
              id="name"
              className="mt-2"
              aria-invalid={!!errors.name}
              {...register('name')}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="company">Компания</Label>
            <Input
              id="company"
              className="mt-2"
              aria-invalid={!!errors.company}
              {...register('company')}
            />
            {errors.company && (
              <p className="mt-1 text-xs text-red-600">{errors.company.message}</p>
            )}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+7 ___ ___-__-__"
              className="mt-2 font-mono"
              aria-invalid={!!errors.phone}
              {...register('phone')}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">E-mail (по желанию)</Label>
            <Input
              id="email"
              type="email"
              className="mt-2"
              aria-invalid={!!errors.email}
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>
        <label className="flex items-start gap-3 text-xs text-slate-600 leading-relaxed">
          <Checkbox
            onCheckedChange={(v) => setValue('consent', v === true, { shouldValidate: true })}
            aria-invalid={!!errors.consent}
          />
          <span>
            Согласен на обработку персональных данных в соответствии с{' '}
            <a href="/docs/policy.pdf" className="underline">
              политикой конфиденциальности
            </a>
            .
          </span>
        </label>
        {errors.consent && (
          <p className="text-xs text-red-600">{errors.consent.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="mt-6 w-full"
        disabled={isSubmitting}
      >
        <Send className="h-4 w-4" aria-hidden />
        {isSubmitting ? 'Отправляем…' : 'Получить КП'}
      </Button>
    </form>
  )
}

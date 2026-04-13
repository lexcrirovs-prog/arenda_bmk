'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

const contactSchema = z.object({
  name: z.string().min(2, 'Введите имя'),
  company: z.string().min(2, 'Укажите компанию'),
  phone: z.string().min(10, 'Введите телефон'),
  email: z.string().email('Введите корректный e-mail'),
  message: z
    .string()
    .min(20, 'Опишите задачу подробнее — минимум 20 символов')
    .max(2000),
  consent: z
    .boolean()
    .refine((v) => v === true, {
      message: 'Требуется согласие на обработку данных',
    }),
})

type ContactInput = z.infer<typeof contactSchema>

export function ContactForm() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', company: '', phone: '', email: '', message: '' },
  })

  async function onSubmit(values: ContactInput) {
    const { submitLead } = await import('@/lib/lead')
    await submitLead({ source: 'contact', lead: values })
    setSent(true)
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-emerald-900">
        <p className="text-lg font-semibold">Заявка принята</p>
        <p className="mt-2 text-sm">
          Инженер свяжется с вами в течение 60 минут в рабочее время. В нерабочее
          время, если дело срочное, позвоните на аварийную линию.
        </p>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      id="brief"
      className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card"
      aria-labelledby="contact-form-title"
    >
      <h2 id="contact-form-title" className="text-xl font-semibold text-industrial-900">
        Отправить техническое задание
      </h2>
      <p className="mt-1 text-sm text-slate-600">
        Чем детальнее вы опишете задачу — тем точнее будет КП. Вложения можно
        отправить позже на e-mail инженера.
      </p>

      <div className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="c-name">Имя</Label>
            <Input id="c-name" className="mt-2" {...register('name')} aria-invalid={!!errors.name} />
            {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="c-company">Компания</Label>
            <Input id="c-company" className="mt-2" {...register('company')} aria-invalid={!!errors.company} />
            {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company.message}</p>}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="c-phone">Телефон</Label>
            <Input id="c-phone" type="tel" className="mt-2 font-mono" {...register('phone')} aria-invalid={!!errors.phone} />
            {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>}
          </div>
          <div>
            <Label htmlFor="c-email">E-mail</Label>
            <Input id="c-email" type="email" className="mt-2" {...register('email')} aria-invalid={!!errors.email} />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
        </div>
        <div>
          <Label htmlFor="c-message">Описание задачи</Label>
          <textarea
            id="c-message"
            rows={6}
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus:border-industrial-700 focus:outline-none focus:ring-2 focus:ring-industrial-700/20 aria-invalid:border-red-500"
            placeholder="Например: объект — сыроварня, требуется пар 2 т/ч при 10 бар на время ППР собственной котельной (21 сутки), начало — через 3 недели, площадка в Калужской области."
            aria-invalid={!!errors.message}
            {...register('message')}
          />
          {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
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
        {errors.consent && <p className="text-xs text-red-600">{errors.consent.message}</p>}
      </div>

      <Button type="submit" variant="primary" size="lg" className="mt-6 w-full sm:w-auto" disabled={isSubmitting}>
        <Send className="h-4 w-4" aria-hidden />
        {isSubmitting ? 'Отправляем…' : 'Отправить задание'}
      </Button>
    </form>
  )
}

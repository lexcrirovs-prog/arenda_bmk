'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Calculator as CalcIcon, FileText, RefreshCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { calculatorSchema, type CalculatorInput } from './calculator.schema'
import { calcHeatPower, type CalculatorResult } from './calculator.logic'
import { ResultCard } from './ResultCard'
import { LeadCaptureStep } from './LeadCaptureStep'

const facilityOptions: { value: CalculatorInput['facility']; label: string }[] = [
  { value: 'warehouse', label: 'Склад / логистика' },
  { value: 'office', label: 'Офисное здание' },
  { value: 'production', label: 'Промышленное производство' },
  { value: 'food', label: 'Пищевое производство' },
  { value: 'pharma', label: 'Фармацевтика / чистые помещения' },
]

const insulationOptions: { value: CalculatorInput['insulation']; label: string }[] = [
  { value: 'high', label: 'Высокое (новостройка, СП 50)' },
  { value: 'medium', label: 'Среднее (типовое здание)' },
  { value: 'low', label: 'Низкое (старый фонд / ангар)' },
]

export function CalculatorForm() {
  const [result, setResult] = useState<CalculatorResult | null>(null)
  const [lastInput, setLastInput] = useState<CalculatorInput | null>(null)
  const [leadSent, setLeadSent] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CalculatorInput>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      facility: 'production',
      area: 5000,
      ceilingHeight: 4,
      insulation: 'medium',
      boilerType: 'hotwater',
    },
  })

  function onSubmit(values: CalculatorInput) {
    const r = calcHeatPower(values)
    setResult(r)
    setLastInput(values)
    setLeadSent(false)
  }

  function resetAll() {
    reset()
    setResult(null)
    setLastInput(null)
    setLeadSent(false)
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card"
        aria-labelledby="calc-form-title"
      >
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-industrial-900 text-alert-500">
            <CalcIcon className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <h2 id="calc-form-title" className="text-lg font-semibold text-industrial-900">
              Параметры объекта
            </h2>
            <p className="text-xs text-slate-500">
              Методика применима для объектов до 20 000 м²
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <Label htmlFor="facility">Тип объекта</Label>
            <Controller
              control={control}
              name="facility"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="facility" className="mt-2" aria-invalid={!!errors.facility}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {facilityOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.facility && (
              <p className="mt-1 text-xs text-red-600">{errors.facility.message}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="area">Общая площадь, м²</Label>
              <Input
                id="area"
                type="number"
                inputMode="numeric"
                min={50}
                max={20000}
                className="mt-2"
                aria-invalid={!!errors.area}
                {...register('area', { valueAsNumber: true })}
              />
              {errors.area && (
                <p className="mt-1 text-xs text-red-600">{errors.area.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="ceilingHeight">Высота потолков, м</Label>
              <Input
                id="ceilingHeight"
                type="number"
                inputMode="decimal"
                step="0.1"
                min={2.5}
                max={12}
                className="mt-2"
                aria-invalid={!!errors.ceilingHeight}
                {...register('ceilingHeight', { valueAsNumber: true })}
              />
              {errors.ceilingHeight && (
                <p className="mt-1 text-xs text-red-600">{errors.ceilingHeight.message}</p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="insulation">Уровень утепления</Label>
            <Controller
              control={control}
              name="insulation"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="insulation" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {insulationOptions.map((o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label>Тип котельной</Label>
            <Controller
              control={control}
              name="boilerType"
              render={({ field }) => (
                <div role="radiogroup" className="mt-2 grid gap-2 sm:grid-cols-2">
                  {[
                    { value: 'hotwater', label: 'Водогрейная', sub: 'Отопление и ГВС' },
                    { value: 'steam', label: 'Паровая', sub: 'Технологический пар' },
                  ].map((o) => {
                    const active = field.value === o.value
                    return (
                      <button
                        type="button"
                        key={o.value}
                        role="radio"
                        aria-checked={active}
                        onClick={() => field.onChange(o.value)}
                        className={`rounded-lg border px-4 py-3 text-left transition ${
                          active
                            ? 'border-alert-500 bg-alert-500/5'
                            : 'border-slate-300 hover:border-slate-400'
                        }`}
                      >
                        <p className="font-semibold text-industrial-900">{o.label}</p>
                        <p className="text-xs text-slate-500">{o.sub}</p>
                      </button>
                    )
                  })}
                </div>
              )}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button type="submit" variant="primary" size="lg" disabled={isSubmitting}>
            Рассчитать мощность
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
          <Button type="button" variant="ghost" size="lg" onClick={resetAll}>
            <RefreshCcw className="h-4 w-4" aria-hidden />
            Сбросить
          </Button>
        </div>

        <p className="mt-6 font-mono text-[11px] leading-relaxed text-slate-500">
          Расчёт предварительный. Итоговая спецификация готовится нашими инженерами
          на основании полного технического задания, исходной воды, топливной схемы
          и особенностей площадки.
        </p>
      </form>

      <div className="space-y-6">
        {result && lastInput ? (
          <>
            <ResultCard result={result} />
            {!leadSent ? (
              <LeadCaptureStep
                calcInput={lastInput}
                result={result}
                onSubmitted={() => setLeadSent(true)}
              />
            ) : (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
                <p className="font-semibold">Заявка принята в работу</p>
                <p className="mt-1 text-sm">
                  Инженер свяжется с вами в течение 60 минут в рабочее время. В нерабочее
                  время действуйте через аварийную линию 24/7.
                </p>
              </div>
            )}
          </>
        ) : (
          <EmptyResult />
        )}
      </div>
    </div>
  )
}

function EmptyResult() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8">
      <div className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-slate-400">
        <FileText className="h-5 w-5" aria-hidden />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-industrial-900">
        Результат появится здесь
      </h3>
      <p className="mt-2 text-sm text-slate-600">
        Заполните параметры слева, и мы покажем рекомендованную модель БМК, месячную
        ставку аренды и откроем форму захвата спецификации в PDF.
      </p>
      <div className="mt-6 rounded-lg bg-slate-50 p-4">
        <p className="font-mono text-[11px] uppercase tracking-wide text-slate-500">
          Методика расчёта
        </p>
        <p className="mt-2 font-mono text-sm text-industrial-900">
          Q = S · 0,131 · 1,2 · k<sub>h</sub> · k<sub>i</sub> · k<sub>f</sub>
        </p>
        <p className="mt-2 text-xs text-slate-500">
          где k<sub>h</sub> — поправка на высоту потолков, k<sub>i</sub> — на утепление,
          k<sub>f</sub> — на тип объекта.
        </p>
      </div>
    </div>
  )
}

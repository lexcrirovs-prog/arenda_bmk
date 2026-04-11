"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Gauge, ShieldCheck } from "lucide-react";
import { startTransition, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

import { currencyFormatter, siteConfig } from "@/lib/site-config";
import {
  ceilingProfiles,
  equipmentModels,
  facilityProfiles,
  insulationProfiles,
} from "@/lib/site-data";

const facilityValues = new Set(facilityProfiles.map((item) => item.value));
const insulationValues = new Set(insulationProfiles.map((item) => item.value));
const ceilingValues = new Set(ceilingProfiles.map((item) => item.value));

const calculatorSchema = z.object({
  facilityType: z
    .string()
    .refine((value) => facilityValues.has(value), "Выберите тип объекта"),
  area: z
    .number()
    .min(200, "Минимум 200 м²")
    .max(20000, "Для более крупных объектов нужен ручной расчет"),
  ceilingHeight: z
    .string()
    .refine((value) => ceilingValues.has(value), "Выберите высоту потолков"),
  insulation: z
    .string()
    .refine((value) => insulationValues.has(value), "Укажите уровень утепления"),
});

type CalculatorValues = z.infer<typeof calculatorSchema>;

export function EngineeringCalculator() {
  const [briefReady, setBriefReady] = useState(false);

  const form = useForm<CalculatorValues>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      facilityType: facilityProfiles[0]?.value,
      area: 3000,
      ceilingHeight: ceilingProfiles[0]?.value,
      insulation: insulationProfiles[1]?.value,
    },
    mode: "onChange",
  });

  const values = useWatch({ control: form.control });
  const facility =
    facilityProfiles.find((item) => item.value === values.facilityType) ??
    facilityProfiles[0];
  const insulation =
    insulationProfiles.find((item) => item.value === values.insulation) ??
    insulationProfiles[1];
  const ceiling =
    ceilingProfiles.find((item) => item.value === values.ceilingHeight) ??
    ceilingProfiles[0];

  const baseDemandKw = (values.area ?? 0) * 0.131 * 1.25;
  const correctedDemandKw =
    baseDemandKw * facility.factor * insulation.factor * ceiling.factor;

  const candidateModels = equipmentModels.filter(
    (model) => model.category === facility.category && model.powerKw >= correctedDemandKw,
  );
  const recommendedModel =
    candidateModels[0] ??
    equipmentModels
      .filter((model) => model.category === facility.category)
      .at(-1) ??
    equipmentModels[0];

  const reserveDelta = Math.max(recommendedModel.powerKw - correctedDemandKw, 0);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <form
        onSubmit={form.handleSubmit(() => {
          startTransition(() => setBriefReady(true));
        })}
        className="rounded-[2rem] border border-white/10 bg-[#10202f]/75 p-6 shadow-panel backdrop-blur sm:p-8"
      >
        <div className="grid gap-6">
          <div className="grid gap-2">
            <label htmlFor="facilityType" className="text-sm font-medium text-slate-100">
              Тип объекта
            </label>
            <select
              id="facilityType"
              {...form.register("facilityType")}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-100 outline-none transition focus:border-alert"
            >
              {facilityProfiles.map((item) => (
                <option key={item.value} value={item.value} className="bg-industrial-900">
                  {item.label}
                </option>
              ))}
            </select>
            {form.formState.errors.facilityType ? (
              <p className="text-sm text-orange-300">
                {form.formState.errors.facilityType.message}
              </p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <label htmlFor="area" className="text-sm font-medium text-slate-100">
              Площадь, м²
            </label>
            <input
              id="area"
              type="number"
              {...form.register("area", { valueAsNumber: true })}
              className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-100 outline-none transition focus:border-alert"
            />
            {form.formState.errors.area ? (
              <p className="text-sm text-orange-300">{form.formState.errors.area.message}</p>
            ) : null}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="grid gap-2">
              <label htmlFor="ceilingHeight" className="text-sm font-medium text-slate-100">
                Высота потолков
              </label>
              <select
                id="ceilingHeight"
                {...form.register("ceilingHeight")}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-100 outline-none transition focus:border-alert"
              >
                {ceilingProfiles.map((item) => (
                  <option key={item.value} value={item.value} className="bg-industrial-900">
                    {item.label}
                  </option>
                ))}
              </select>
              {form.formState.errors.ceilingHeight ? (
                <p className="text-sm text-orange-300">
                  {form.formState.errors.ceilingHeight.message}
                </p>
              ) : null}
            </div>

            <div className="grid gap-2">
              <label htmlFor="insulation" className="text-sm font-medium text-slate-100">
                Утепление
              </label>
              <select
                id="insulation"
                {...form.register("insulation")}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-100 outline-none transition focus:border-alert"
              >
                {insulationProfiles.map((item) => (
                  <option key={item.value} value={item.value} className="bg-industrial-900">
                    {item.label}
                  </option>
                ))}
              </select>
              {form.formState.errors.insulation ? (
                <p className="text-sm text-orange-300">
                  {form.formState.errors.insulation.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-slate-300">
            Базовая методика: <span className="font-mono text-white">Q = S x 0.131 x 1.25</span>.
            Затем экспресс-оценка корректируется по типу объекта, утеплению и высоте потолков,
            чтобы вы сразу увидели реалистичный диапазон мощности и стартовую месячную ставку
            аренды.
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-alert px-5 py-3 text-sm font-semibold text-industrial-900 transition hover:bg-alert/90"
          >
            Сформировать предварительную спецификацию
          </button>
        </div>
      </form>

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-glow sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-alert">
          Предварительный результат
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[1.5rem] border border-white/10 bg-[#10202f] p-5">
            <div className="flex items-center gap-3 text-slate-300">
              <Gauge className="h-5 w-5 text-alert" />
              Рекомендуемая мощность
            </div>
            <p className="mt-3 font-mono text-3xl text-white">
              {Math.round(correctedDemandKw)} кВт
            </p>
            <p className="mt-3 text-sm text-slate-400">
              Запас по выбранному модулю: {Math.round(reserveDelta)} кВт
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-[#10202f] p-5">
            <div className="flex items-center gap-3 text-slate-300">
              <ShieldCheck className="h-5 w-5 text-alert" />
              Стартовая ставка
            </div>
            <p className="mt-3 font-mono text-3xl text-white">
              {currencyFormatter.format(recommendedModel.monthlyRateFrom)}
            </p>
            <p className="mt-3 text-sm text-slate-400">
              Ориентир по модели Service, без топлива и нестандартной логистики.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-[#10202f] p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm text-slate-300">Рекомендуемый модуль</p>
              <h3 className="mt-2 text-2xl font-semibold text-white">
                {recommendedModel.name}
              </h3>
            </div>
            <span className="rounded-full border border-alert/30 bg-alert/10 px-3 py-1 text-xs font-medium text-alert">
              {facility.category === "steam" ? "Паровая БМК" : "Водогрейная БМК"}
            </span>
          </div>

          <dl className="mt-6 grid gap-4 text-sm text-slate-300 sm:grid-cols-2">
            <div>
              <dt className="text-slate-500">Мощность / эквивалент</dt>
              <dd className="mt-1 font-mono text-white">{recommendedModel.powerLabel}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Ориентир по запуску</dt>
              <dd className="mt-1 font-mono text-white">{recommendedModel.launchLeadTime}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Топливо</dt>
              <dd className="mt-1 font-mono text-white">
                {recommendedModel.fuel.join(" / ")}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Габариты</dt>
              <dd className="mt-1 font-mono text-white">{recommendedModel.dimensions}</dd>
            </div>
          </dl>

          <p className="mt-6 text-sm leading-7 text-slate-300">{facility.note}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={siteConfig.catalogPdfPath}
              download
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-industrial-900 transition hover:bg-slate-100"
            >
              <Download className="h-4 w-4" />
              Скачать краткий бриф
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:border-alert hover:text-alert"
            >
              Передать вводные инженеру
            </a>
          </div>

          {briefReady ? (
            <div className="mt-6 rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
              Предварительная спецификация готова. Следующий шаг — уточнить схему подключения,
              режим эксплуатации и пакет документов под ваш объект.
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

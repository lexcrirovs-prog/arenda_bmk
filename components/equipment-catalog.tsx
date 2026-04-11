"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { startTransition, useDeferredValue, useState } from "react";
import { CheckCircle2, Search, SlidersHorizontal } from "lucide-react";

import { currencyFormatter } from "@/lib/site-config";
import type { EquipmentCategory, EquipmentModel } from "@/lib/site-data";

interface EquipmentCatalogProps {
  models: EquipmentModel[];
}

export function EquipmentCatalog({ models }: EquipmentCatalogProps) {
  const [activeCategory, setActiveCategory] =
    useState<EquipmentCategory>("hot-water");
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const deferredQuery = useDeferredValue(query.trim().toLowerCase());

  const filteredModels = models.filter((model) => {
    if (model.category !== activeCategory) {
      return false;
    }

    if (!deferredQuery) {
      return true;
    }

    const haystack = [
      model.name,
      model.powerLabel,
      model.steamLabel ?? "",
      model.priority,
      model.techNote,
      ...model.useCases,
      ...model.fuel,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(deferredQuery);
  });

  const comparedModels = models.filter((model) => selectedIds.includes(model.id));

  const toggleModel = (id: string) => {
    startTransition(() => {
      setSelectedIds((current) => {
        if (current.includes(id)) {
          return current.filter((item) => item !== id);
        }

        if (current.length >= 3) {
          return [...current.slice(1), id];
        }

        return [...current, id];
      });
    });
  };

  return (
    <Tabs.Root
      value={activeCategory}
      onValueChange={(value) => {
        startTransition(() => setActiveCategory(value as EquipmentCategory));
      }}
      className="grid gap-8"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <Tabs.List className="inline-flex w-full max-w-xl rounded-full border border-white/10 bg-white/[0.03] p-1">
          <Tabs.Trigger
            value="hot-water"
            className="w-full rounded-full px-4 py-3 text-sm font-medium text-slate-300 transition data-[state=active]:bg-white data-[state=active]:text-industrial-900"
          >
            Водогрейные БМК
          </Tabs.Trigger>
          <Tabs.Trigger
            value="steam"
            className="w-full rounded-full px-4 py-3 text-sm font-medium text-slate-300 transition data-[state=active]:bg-white data-[state=active]:text-industrial-900"
          >
            Паровые БМК
          </Tabs.Trigger>
        </Tabs.List>

        <label className="flex w-full max-w-md items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
          <Search className="h-4 w-4 text-alert" />
          <span className="sr-only">Поиск по парку</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent outline-none placeholder:text-slate-500"
            placeholder="Например: 1 МВт, дизель, 12 бар"
          />
        </label>
      </div>

      <div
        className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-300"
        aria-live="polite"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-alert" />
            <span>
              Выбрано для сравнения:{" "}
              <strong className="font-semibold text-white">{selectedIds.length}</strong> из 3
              модулей
            </span>
          </div>
          <span className="text-slate-400">
            Если выбрать больше трех, список автоматически заменит самый ранний модуль.
          </span>
        </div>
      </div>

      {(["hot-water", "steam"] as EquipmentCategory[]).map((category) => (
        <Tabs.Content
          key={category}
          value={category}
          className="grid gap-6 focus:outline-none"
        >
          <div className="grid gap-6 lg:grid-cols-3">
            {filteredModels.length ? (
              filteredModels.map((model) => {
                const selected = selectedIds.includes(model.id);

                return (
                  <article
                    key={model.id}
                    className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 shadow-panel transition hover:-translate-y-1 hover:border-alert/40"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-alert">
                          {model.priority}
                        </p>
                        <h3 className="mt-3 text-2xl font-semibold text-white">
                          {model.name}
                        </h3>
                      </div>
                      {selected ? (
                        <span className="inline-flex items-center gap-2 rounded-full bg-alert/15 px-3 py-1 text-xs font-medium text-alert">
                          <CheckCircle2 className="h-4 w-4" />В сравнении
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-8 grid gap-4 border-y border-white/10 py-6 font-mono text-sm text-slate-200">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-400">Мощность</span>
                        <strong>{model.powerLabel}</strong>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-400">Пар</span>
                        <strong>{model.steamLabel ?? "н/д"}</strong>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-400">Топливо</span>
                        <strong>{model.fuel.join(" / ")}</strong>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-slate-400">Ставка от</span>
                        <strong>{currencyFormatter.format(model.monthlyRateFrom)}</strong>
                      </div>
                    </div>

                    <p className="mt-6 text-sm leading-7 text-slate-300">{model.techNote}</p>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {model.useCases.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-col gap-3">
                      <button
                        type="button"
                        onClick={() => toggleModel(model.id)}
                        className={`rounded-full px-5 py-3 text-sm font-medium transition ${
                          selected
                            ? "bg-white text-industrial-900"
                            : "bg-alert text-industrial-900 hover:bg-alert/90"
                        }`}
                      >
                        {selected ? "Убрать из сравнения" : "Добавить в сравнение"}
                      </button>
                      <p className="text-xs leading-6 text-slate-400">
                        Пуск от {model.launchLeadTime}, рабочее давление {model.workingPressure},
                        КПД {model.efficiency}.
                      </p>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="rounded-[1.75rem] border border-dashed border-white/10 bg-white/[0.03] p-6 text-slate-300 lg:col-span-3">
                По этому запросу ничего не найдено. Попробуйте мощность, тип топлива или
                рабочее давление без дополнительных слов.
              </div>
            )}
          </div>
        </Tabs.Content>
      ))}

      {comparedModels.length ? (
        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0f1b27]">
          <div className="border-b border-white/10 px-6 py-5">
            <h3 className="text-xl font-semibold text-white">Сравнение модулей</h3>
            <p className="mt-2 text-sm text-slate-300">
              Таблица для закупки и главного инженера: мощность, логистика, вес, рабочее
              давление и месячная ставка в одной системе координат.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-white/[0.03] text-slate-300">
                <tr>
                  <th className="px-6 py-4 font-medium">Параметр</th>
                  {comparedModels.map((model) => (
                    <th key={model.id} className="px-6 py-4 font-medium text-white">
                      {model.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Мощность", (model: EquipmentModel) => model.powerLabel],
                  [
                    "Паропроизводительность",
                    (model: EquipmentModel) => model.steamLabel ?? "не применяется",
                  ],
                  ["Топливо", (model: EquipmentModel) => model.fuel.join(" / ")],
                  ["Габариты", (model: EquipmentModel) => model.dimensions],
                  ["Вес", (model: EquipmentModel) => `${model.weightTons} т`],
                  [
                    "Ставка / мес.",
                    (model: EquipmentModel) => currencyFormatter.format(model.monthlyRateFrom),
                  ],
                  ["Пуск", (model: EquipmentModel) => model.launchLeadTime],
                  ["Рабочее давление", (model: EquipmentModel) => model.workingPressure],
                ].map(([label, resolver]) => (
                  <tr key={label as string} className="border-t border-white/10">
                    <td className="px-6 py-4 font-medium text-slate-400">{label as string}</td>
                    {comparedModels.map((model) => (
                      <td key={model.id} className="px-6 py-4 text-slate-100">
                        {(resolver as (model: EquipmentModel) => string)(model)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </Tabs.Root>
  );
}

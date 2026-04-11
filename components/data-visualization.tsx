"use client";

import { startTransition, useState } from "react";
import { motion } from "framer-motion";

import type { ComparisonScenario } from "@/lib/site-data";

interface DataVisualizationProps {
  scenarios: ComparisonScenario[];
}

export function DataVisualization({ scenarios }: DataVisualizationProps) {
  const [activeId, setActiveId] = useState(scenarios[0]?.id ?? "");

  const activeScenario =
    scenarios.find((scenario) => scenario.id === activeId) ?? scenarios[0];
  const maxValue = Math.max(...activeScenario.values.map((item) => item.value), 1);

  return (
    <div className="rounded-[2rem] border border-white/10 bg-[#10202f]/75 p-6 shadow-glow backdrop-blur sm:p-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-alert">
            Тарифная логика
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            {activeScenario.label}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
            {activeScenario.caption}
          </p>
        </div>
        <div
          className="grid gap-2 sm:grid-cols-3"
          role="tablist"
          aria-label="Сценарии сравнения"
        >
          {scenarios.map((scenario) => {
            const active = scenario.id === activeScenario.id;

            return (
              <button
                key={scenario.id}
                type="button"
                onClick={() => {
                  startTransition(() => setActiveId(scenario.id));
                }}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  active
                    ? "border-alert bg-alert text-industrial-900"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-alert/60 hover:text-white"
                }`}
              >
                {scenario.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 grid gap-5">
        {activeScenario.values.map((item) => {
          const width = `${(item.value / maxValue) * 100}%`;

          return (
            <div key={item.label} className="grid gap-2">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-slate-200">{item.label}</span>
                <span className="font-mono text-white">
                  {item.value}
                  {activeScenario.unit}
                </span>
              </div>
              <div className="h-4 rounded-full bg-white/5">
                <motion.div
                  key={`${activeScenario.id}-${item.label}`}
                  className={`h-full rounded-full ${
                    item.highlight ? "bg-alert" : "bg-slate-400/70"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

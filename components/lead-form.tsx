"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, MailCheck } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { siteConfig } from "@/lib/site-config";

const leadSchema = z.object({
  company: z.string().min(2, "Укажите компанию"),
  name: z.string().min(2, "Укажите имя"),
  phone: z.string().min(7, "Укажите телефон"),
  email: z.string().email("Укажите корректный email"),
  equipmentType: z.string().min(1, "Выберите направление"),
  message: z.string().min(10, "Опишите задачу чуть подробнее"),
});

type LeadValues = z.infer<typeof leadSchema>;

export function LeadForm() {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  const form = useForm<LeadValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      company: "",
      name: "",
      phone: "",
      email: "",
      equipmentType: "Аренда водогрейной БМК",
      message: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitState("loading");

    const body = new FormData();
    body.append("_subject", "Новый лид с сайта аренды БМК");
    body.append("_template", "table");
    body.append("_captcha", "false");
    body.append("_honey", "");
    body.append("Компания", values.company);
    body.append("Контакт", values.name);
    body.append("Телефон", values.phone);
    body.append("Email", values.email);
    body.append("Направление", values.equipmentType);
    body.append("Задача", values.message);
    body.append("Источник", "arendabmk landing");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${siteConfig.email}`, {
        method: "POST",
        body,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Lead submit failed");
      }

      form.reset();
      setSubmitState("success");
    } catch (error) {
      console.error(error);
      setSubmitState("error");
    }
  });

  return (
    <div className="rounded-[2rem] border border-white/10 bg-[#10202f]/85 p-6 shadow-glow sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Lead capture</p>
          <h3 className="mt-4 text-2xl font-semibold text-white">
            Отправить запрос на аренду
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Заявка уйдет на <span className="font-medium text-white">{siteConfig.email}</span>.
            Укажите задачу, мощность или нагрузку по пару, и мы вернемся с подбором, КП и
            следующим шагом по запуску.
          </p>
        </div>
        <MailCheck className="mt-1 h-5 w-5 shrink-0 text-alert" />
      </div>

      <form onSubmit={onSubmit} className="mt-8 grid gap-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Компания"
            error={form.formState.errors.company?.message}
            input={
              <input
                {...form.register("company")}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-100 outline-none transition focus:border-alert"
                placeholder="ООО СеверСтрой"
              />
            }
          />
          <Field
            label="Контактное лицо"
            error={form.formState.errors.name?.message}
            input={
              <input
                {...form.register("name")}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-100 outline-none transition focus:border-alert"
                placeholder="Иван Петров"
              />
            }
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field
            label="Телефон"
            error={form.formState.errors.phone?.message}
            input={
              <input
                {...form.register("phone")}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-100 outline-none transition focus:border-alert"
                placeholder="+7 (900) 000-00-00"
              />
            }
          />
          <Field
            label="Email"
            error={form.formState.errors.email?.message}
            input={
              <input
                type="email"
                {...form.register("email")}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-100 outline-none transition focus:border-alert"
                placeholder="office@company.ru"
              />
            }
          />
        </div>

        <Field
          label="Направление"
          error={form.formState.errors.equipmentType?.message}
          input={
            <select
              {...form.register("equipmentType")}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-100 outline-none transition focus:border-alert"
            >
              <option className="bg-industrial-900">Аренда водогрейной БМК</option>
              <option className="bg-industrial-900">Аренда паровой БМК</option>
              <option className="bg-industrial-900">Аварийная подмена на время ремонта</option>
              <option className="bg-industrial-900">Service / Full-service</option>
              <option className="bg-industrial-900">Запрос КП и графика поставки</option>
            </select>
          }
        />

        <Field
          label="Задача"
          error={form.formState.errors.message?.message}
          input={
            <textarea
              {...form.register("message")}
              rows={5}
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-slate-100 outline-none transition focus:border-alert"
              placeholder="Например: нужна подменная водогрейная БМК 1 МВт на 6 месяцев для стройплощадки, запуск в течение 3 дней, топливо по отдельной строке."
            />
          }
        />

        <button
          type="submit"
          disabled={submitState === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-alert px-6 py-3 text-sm font-semibold text-industrial-900 transition hover:bg-alert/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitState === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Отправляем заявку
            </>
          ) : (
            "Отправить заявку"
          )}
        </button>

        {submitState === "success" ? (
          <div className="rounded-[1.5rem] border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm text-emerald-100">
            Заявка отправлена. Если это первый live-запрос через FormSubmit, сервис может
            сначала прислать письмо-подтверждение на {siteConfig.email}.
          </div>
        ) : null}

        {submitState === "error" ? (
          <div className="rounded-[1.5rem] border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-100">
            Не удалось отправить заявку автоматически. Можно сразу написать на{" "}
            <a className="underline underline-offset-4" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </a>{" "}
            или перейти в{" "}
            <a
              className="underline underline-offset-4"
              href={siteConfig.maxUrl}
              target="_blank"
              rel="noreferrer"
            >
              MAX
            </a>
            .
          </div>
        ) : null}
      </form>
    </div>
  );
}

function Field({
  label,
  input,
  error,
}: {
  label: string;
  input: ReactNode;
  error?: string;
}) {
  return (
    <label className="grid gap-2 text-sm text-slate-200">
      <span>{label}</span>
      {input}
      {error ? <span className="text-sm text-orange-300">{error}</span> : null}
    </label>
  );
}

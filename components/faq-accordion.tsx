"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

interface FAQAccordionProps {
  items: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <Accordion.Root
      type="single"
      collapsible
      className="rounded-[2rem] border border-white/10 bg-white/[0.03]"
    >
      {items.map((item) => (
        <Accordion.Item
          key={item.question}
          value={item.question}
          className="border-b border-white/10 last:border-b-0"
        >
          <Accordion.Header>
            <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-medium text-white transition hover:text-alert">
              {item.question}
              <ChevronDown className="h-5 w-5 shrink-0 text-slate-400 transition group-data-[state=open]:rotate-180 group-data-[state=open]:text-alert" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <div className="px-6 pb-6 text-sm leading-7 text-slate-300">
              {item.answer}
            </div>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}

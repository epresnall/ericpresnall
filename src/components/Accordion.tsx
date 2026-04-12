"use client";

import { useState } from "react";

export interface AccordionItem {
  title: string;
  items: { name: string; description: string }[];
}

export default function Accordion({ sections }: { sections: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {sections.map((section, i) => (
        <div key={section.title} className="card-glow overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left"
          >
            <span className="heading text-lg">{section.title}</span>
            <svg
              className={`w-5 h-5 text-[var(--color-purple)] transition-transform ${
                openIndex === i ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            className={`grid transition-all duration-300 ${
              openIndex === i
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-6 pb-6 space-y-4">
                {section.items.map((item) => (
                  <div key={item.name} className="flex gap-4">
                    <div className="w-1 bg-[var(--color-purple)] rounded-full shrink-0" />
                    <div>
                      <p className="font-semibold text-[var(--color-white)]">
                        {item.name}
                      </p>
                      <p className="text-sm text-[var(--color-white-60)] mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

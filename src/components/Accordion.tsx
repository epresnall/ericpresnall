"use client";

import { useState } from "react";

export interface AccordionItem {
  title: string;
  items: { name: string; description: string }[];
}

export default function Accordion({ sections }: { sections: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div>
      {sections.map((section, i) => (
        <div
          key={section.title}
          className="border-b border-white/10 last:border-b-0"
        >
          {/* Heading bar — Webflow .dropdown-heading-bar */}
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between py-5 text-left group"
          >
            {/* Webflow .heading-h3.service-title: Oswald, 30px */}
            <span className="font-[family-name:var(--font-heading)] text-[24px] md:text-[30px] font-medium text-[var(--color-white)]">
              {section.title}
            </span>
            <svg
              className={`w-5 h-5 text-[var(--color-purple)] transition-transform duration-300 ${
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

          {/* Dropdown content */}
          <div
            className={`grid transition-all duration-300 ${
              openIndex === i
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              {/* Webflow .service-grid: 2-column grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0 pb-6">
                {section.items.map((item) => (
                  <div key={item.name} className="flex gap-3 py-4 border-b border-white/5 last:border-b-0">
                    {/* Webflow .list-dot */}
                    <div className="w-1.5 h-1.5 mt-2.5 rounded-full bg-[var(--color-purple)] shrink-0" />
                    <div>
                      {/* Webflow .service-name: Barlow, 20px, 500 */}
                      <p className="text-[18px] md:text-[20px] font-medium text-[var(--color-white)] leading-[150%]">
                        {item.name}
                      </p>
                      {/* Webflow .paragraph: 18px, 150% */}
                      <p className="text-base text-[var(--color-white-60)] mt-1 leading-[150%]">
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

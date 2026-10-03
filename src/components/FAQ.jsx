import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FAQ({ items }) {
  const [active, setActive] = useState(null);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((item, index) => {
        const isOpen = active === index;

        return (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          >
            <button
              onClick={() => setActive(isOpen ? null : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-semibold transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              <span>{item.question}</span>

              <ChevronDown
                size={20}
                className={`shrink-0 text-slate-500 transition-transform duration-300 dark:text-slate-400 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="border-t border-slate-200 px-5 py-5 text-sm leading-7 text-slate-500 dark:border-slate-800 dark:text-slate-400">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default FAQ;

"use client";

import { createPortal } from "react-dom";
import { useSelectMenu } from "@/app/hooks/useSelectMenu";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectMenuProps = {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  className?: string;
  id?: string;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={`shrink-0 text-[#6B7280] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path
        d="M4 6.2 8 10l4-3.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SelectMenu({
  value,
  onChange,
  options,
  placeholder = "Select",
  disabled,
  invalid,
  className,
  id,
}: SelectMenuProps) {
  const menu = useSelectMenu();
  const selected = options.find((option) => option.value === value);

  const panel =
    menu.open && menu.box ? (
      <ul
        ref={menu.menuRef}
        role="listbox"
        style={{
          top: menu.box.top,
          left: menu.box.left,
          width: menu.box.width,
        }}
        className="menu-pop fixed z-[80] max-h-64 overflow-auto rounded-2xl border border-[#EEF0F4] bg-white py-2 shadow-[0_16px_40px_-18px_rgba(15,23,42,0.35)]"
      >
        {options.length === 0 ? (
          <li className="px-4 py-2.5 text-sm text-[#6B7280]">
            Nothing to choose
          </li>
        ) : (
          options.map((option) => {
            const active = option.value === value;
            return (
              <li key={option.value || option.label}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  disabled={option.disabled}
                  onClick={() => {
                    if (option.disabled) return;
                    onChange(option.value);
                    menu.close();
                  }}
                  className={`block w-full px-4 py-2.5 text-left text-sm transition duration-150 disabled:cursor-not-allowed disabled:text-[#C5C8D0] ${active ? "font-medium text-[#0F766E]" : "text-[#1F2937] hover:bg-[#F7F8FA]"}`}
                >
                  {option.label}
                </button>
              </li>
            );
          })
        )}
      </ul>
    ) : null;

  return (
    <div ref={menu.rootRef} className={`relative ${className ?? ""}`}>
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={menu.open}
        onClick={menu.toggle}
        className={`flex w-full items-center justify-between gap-3 rounded-xl border bg-white px-4 py-2.5 text-left text-sm shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition duration-200 hover:border-[#D5D8E0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E] disabled:cursor-not-allowed disabled:opacity-50 ${invalid ? "border-red-500" : "border-[#E6E8EE]"}`}
      >
        <span className={selected ? "text-[#1F2937]" : "text-[#6B7280]"}>
          {selected?.label ?? placeholder}
        </span>
        <Chevron open={menu.open} />
      </button>
      {typeof document !== "undefined" && panel
        ? createPortal(panel, document.body)
        : null}
    </div>
  );
}

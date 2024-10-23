import SvgArrowSelect from "@/assets/sprite/arrow-select.svg";
import { useOuterClick } from "../../hooks";
import { type KeyboardEvent, type MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import type { SimpleSelectOption, SimpleSelectValue } from "../../types";

export const SimpleSelect = ({
  value,
  options,
  onChange,
  className,
  dataCy,
}: {
  value: string;
  options: SimpleSelectOption[];
  onChange: (value: SimpleSelectValue) => void;
  className: string;
  dataCy: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeSelect = useCallback(() => setIsOpen(false), []);
  const handleToggleVisibility = (state: boolean | MouseEvent<HTMLButtonElement>): void => (typeof state === "boolean" ? setIsOpen(state) : setIsOpen(!isOpen));
  const handleChange = (val: SimpleSelectValue): void => {
    if (val === value) return closeSelect();
    onChange(val);
    closeSelect();
  };

  const optionsRef = useRef<HTMLButtonElement[]>([]);
  // notice: limit items ref list after update
  useEffect(() => {
    optionsRef.current = optionsRef.current.slice(0, options.length);
  }, [options]);

  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (["ArrowDown"].includes(event.key)) {
      event.preventDefault();
      handleToggleVisibility(true);
      if (isOpen) setFocusedOptionIndex(focusedOptionIndex < options.length - 1 ? focusedOptionIndex + 1 : 0);
    } else if (["ArrowUp"].includes(event.key) && isOpen) {
      event.preventDefault();
      setFocusedOptionIndex(focusedOptionIndex > 0 ? focusedOptionIndex - 1 : options.length - 1);
    }
  };
  useEffect((): void => {
    if (!isOpen || !optionsRef.current?.length) return;
    optionsRef.current[focusedOptionIndex].focus();
  }, [isOpen, focusedOptionIndex]);

  // notice: type for addEventListener
  useEffect((): (() => void) => {
    const handleEscape: EventListener = (event: KeyboardEventInit): void => {
      if (event.key === "Escape") closeSelect();
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const selectRef = useRef<HTMLDivElement | null>(null);
  useOuterClick(selectRef, closeSelect);

  return (
    <div ref={selectRef} className={`relative text-sm dark:text-white/85 ${className}`} data-cy={dataCy} onKeyDown={handleKeyDown}>
      <button
        type="button"
        className={`flex h-8 items-center gap-1.5 rounded-md border px-3 duration-300 ${isOpen ? "border-primary-blue text-primary-gray" : "border-black/15 dark:border-dark-gray"}`}
        onClick={handleToggleVisibility}
      >
        {value}
        <SvgArrowSelect className="h-3 w-3 text-primary-gray dark:text-dark-gray" />
      </button>
      <ul className={`absolute top-full mt-0.5 w-full rounded-md bg-white p-1 shadow-lg duration-300 dark:bg-darkest-gray ${!isOpen && "pointer-events-none opacity-0"}`}>
        {options.map((option, index) => (
          <li key={option.value}>
            <button
              ref={(el) => {
                if (el) optionsRef.current[index] = el;
              }}
              className={`focus-appearance flex h-8 w-full rounded px-3 py-1 duration-300 ${
                value === option.value ? "bg-blue-100 dark:bg-darkest-blue" : "cursor-pointer hover:bg-black/5 dark:hover:bg-white/10"
              }`}
              type="button"
              tabIndex={isOpen ? 0 : -1}
              onClick={() => handleChange(option.value)}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

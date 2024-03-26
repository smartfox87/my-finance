import { useEffect, useState } from "react";
import SvgArrowSelect from "@/assets/sprite/arrow-select.svg";

export const SimpleSelect = ({ value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = (state) => (state !== undefined ? setIsOpen(state) : setIsOpen(!isOpen));
  const handleChange = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);
  const handleKeyDown = (e) => {
    if (!["ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    handleToggleVisibility(true);
    if (isOpen) setFocusedOptionIndex(focusedOptionIndex < options.length - 1 ? focusedOptionIndex + 1 : 0);
  };
  useEffect(() => {
    if (!isOpen) return;
    document.querySelectorAll(".simple-select li button")[focusedOptionIndex].focus();
  }, [isOpen, focusedOptionIndex]);

  useEffect(() => {
    const handleEscape = (e) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", handleEscape);
    const handleClickOutside = (e) => !e.target.closest(".simple-select") && setIsOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="simple-select relative text-sm dark:text-white/85" onKeyDown={handleKeyDown}>
      <button
        type="button"
        className={`flex h-8 items-center gap-1.5 rounded-md border px-3 duration-300 ${isOpen ? "border-primary-blue text-primary-gray" : "border-black/15 dark:border-dark-gray"}`}
        onClick={handleToggleVisibility}
      >
        {value}
        <SvgArrowSelect className="h-3 w-3 text-primary-gray dark:text-dark-gray" />
      </button>
      <ul className={`absolute top-full mt-0.5 min-w-full rounded-md bg-white p-1 shadow-lg duration-300 dark:bg-darkest-gray ${!isOpen && "pointer-events-none opacity-0"}`}>
        {options.map((option) => (
          <li key={option.value}>
            <button
              className={`focus-appearance flex h-8 w-full rounded px-3 py-1 duration-300 ${
                value === option.value ? "bg-blue-100 dark:bg-darkest-blue" : "cursor-pointer hover:bg-black/5 dark:hover:bg-white/10"
              }`}
              type="button"
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

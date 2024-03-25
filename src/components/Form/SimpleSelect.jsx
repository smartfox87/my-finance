import PropTypes from "prop-types";
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
        className={`flex h-8 items-center gap-1.5 rounded-md border px-3 duration-300 ${isOpen ? "border-primary-blue text-primary-gray" : "dark:border-dark-gray border-black/15"}`}
        onClick={handleToggleVisibility}
      >
        {value}
        <SvgArrowSelect className="text-primary-gray dark:text-dark-gray h-3 w-3" />
      </button>
      <ul className={`dark:bg-darkest-gray absolute top-full mt-0.5 min-w-full rounded-md bg-white p-1 shadow-lg duration-300 ${!isOpen && "pointer-events-none opacity-0"}`}>
        {options.map((option) => (
          <li key={option.value}>
            <button
              className={`focus-appearance flex h-8 w-full rounded px-3 py-1 duration-300 ${
                value === option.value ? "dark:bg-darkest-blue bg-blue-100" : "cursor-pointer hover:bg-black/5 dark:hover:bg-white/10"
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

SimpleSelect.propTypes = {
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

import { useEffect, useRef } from "react";
import { useViewport } from "@/hooks/viewport";

export const CalculatorResult = ({ value, onKeyDown, onChange }) => {
  const inputRef = useRef(null);
  const { isTouchDevice } = useViewport();

  useEffect(() => {
    if (!isTouchDevice) setTimeout(() => inputRef.current.focus());
  }, [isTouchDevice]);

  return (
    <div className="flex h-16 w-full items-center bg-gray-200 p-3 dark:bg-gray-700">
      <input
        ref={inputRef}
        value={value}
        data-cy="calculator-input"
        className="h-12 w-full appearance-none border-none bg-transparent text-2xl font-bold uppercase shadow-none outline-none"
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

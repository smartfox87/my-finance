import { useEffect } from "react";
import { useViewport } from "@/hooks/viewport";
import { useFieldFocus } from "@/hooks/fieldFocus";
import { ResultChangeHandler, ResultKeyDownHandler } from "@/types/calculator";

export const CalculatorResult = ({ value, onKeyDown, onChange }: { value: string; onKeyDown: ResultKeyDownHandler; onChange: ResultChangeHandler }) => {
  const { isTouchDevice } = useViewport();

  const [focusFieldRef, mountFocusField] = useFieldFocus<HTMLInputElement>();

  useEffect(() => {
    if (!isTouchDevice) {
      mountFocusField(true);
      return () => mountFocusField(false);
    }
  }, [isTouchDevice]);

  return (
    <div className="flex h-16 w-full items-center bg-gray-200 p-3 dark:bg-gray-700">
      <input
        ref={focusFieldRef}
        value={value}
        data-cy="calculator-input"
        className="h-12 w-full appearance-none border-none bg-transparent text-2xl font-bold uppercase shadow-none outline-none"
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

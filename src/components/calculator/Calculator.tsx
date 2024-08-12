import { forwardRef, SetStateAction, useImperativeHandle, useState } from "react";
import { CalculatorResult } from "@/components/calculator/CalculatorResult";
import { CalculatorKeyPad } from "@/components/calculator/CalculatorKeyPad";
import { decimalsKeys, integerKeys, mathOperatorsKeys, navigationKeys } from "@/constants/input";
import type { ButtonClickHandler, ResultChangeHandler, ResultKeyDownHandler } from "@/types/calculator";

// notice: setState type
export const Calculator = forwardRef(function Calculator({ onCalculate }: { onCalculate: (result: SetStateAction<number>) => void }, ref) {
  const [result, setResult] = useState("");

  const clear = (): void => setResult("");

  const backspace = (): void => setResult((prevResult) => prevResult.toString().slice(0, -1));

  const calculate = (): void => {
    const checkResult = result.includes("--") ? result.replace("--", "+") : result;

    try {
      const calculatedResult = Math.ceil(eval(checkResult) * 100) / 100;
      setResult(calculatedResult.toString());
      if (onCalculate) onCalculate(calculatedResult);
    } catch (e) {
      setResult("error");
    }
  };

  const handleClick: ButtonClickHandler = (event) => {
    const button = event.currentTarget.name;
    if (button === "=") calculate();
    else if (button === "clear") clear();
    else if (button === "backspace") backspace();
    else setResult(result + button);
  };

  const allowedKeys: string[] = [...integerKeys, ...decimalsKeys, ...navigationKeys, ...mathOperatorsKeys];
  const handleKeyDown: ResultKeyDownHandler = (event) => {
    if (!allowedKeys.includes(event.key)) event.preventDefault();
    else if (event.key === "Enter") calculate();
  };

  const handleChange: ResultChangeHandler = (event) => setResult(event.target.value);

  useImperativeHandle(ref, () => ({ clear }));

  return (
    <section data-cy="calculator-body" className="flex flex-col gap-0.5">
      <CalculatorResult value={result} onKeyDown={handleKeyDown} onChange={handleChange} />
      <CalculatorKeyPad onClick={handleClick} />
    </section>
  );
});

import { forwardRef, useImperativeHandle, useState } from "react";
import { CalculatorResult } from "@/components/Calculator/CalculatorResult.jsx";
import { CalculatorKeyPad } from "@/components/Calculator/CalculatorKeyPad.jsx";
import { decimalsKeys, integerKeys, mathOperatorsKeys, navigationKeys } from "@/constants/input";

export const Calculator = forwardRef(function Calculator({ onCalculate }, ref) {
  const [result, setResult] = useState("");

  const clear = () => setResult("");

  const backspace = () => setResult((prevResult) => prevResult.toString().slice(0, -1));

  const calculate = () => {
    const checkResult = result.includes("--") ? result.replace("--", "+") : result;

    try {
      const calculatedResult = Math.ceil(eval(checkResult) * 100) / 100;
      setResult(calculatedResult.toString());
      if (onCalculate) onCalculate(calculatedResult);
    } catch (e) {
      setResult("error");
    }
  };

  const handleClick = (event) => {
    const button = event.currentTarget.name;
    if (button === "=") calculate();
    else if (button === "clear") clear();
    else if (button === "backspace") backspace();
    else setResult(result + button);
  };

  const allowedKeys = [...integerKeys, ...decimalsKeys, ...navigationKeys, ...mathOperatorsKeys];
  const handleKeyDown = (event) => {
    if (!allowedKeys.includes(event.key)) event.preventDefault();
    else if (event.key === "Enter") calculate();
  };

  const handleChange = (event) => setResult(event.target.value);

  useImperativeHandle(ref, () => ({ clear }));

  return (
    <section data-cy="calculator-body" className="flex flex-col gap-0.5">
      <CalculatorResult value={result} onKeyDown={handleKeyDown} onChange={handleChange} />
      <CalculatorKeyPad onClick={handleClick} />
    </section>
  );
});

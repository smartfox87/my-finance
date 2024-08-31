import type { ReactNode } from "react";
import type { ButtonClickHandler } from "@/features/calculator";

export const CalculatorButton = ({ name, title, onClick, children }: { name: string; title?: string; children?: ReactNode; onClick: ButtonClickHandler }) => {
  return (
    <button type="button" name={name} title={title} className="flex h-12 w-1/5 grow items-center justify-center bg-gray-200 outline-none dark:bg-gray-700" onClick={onClick}>
      {children || name}
    </button>
  );
};

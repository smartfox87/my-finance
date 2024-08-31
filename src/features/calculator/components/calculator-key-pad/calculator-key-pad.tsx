import { CalculatorButton } from "../calculator-button";
import SvgDelete from "@/assets/sprite/delete.svg";
import SvgBackspace from "@/assets/sprite/backspace.svg";
import { useTranslation } from "react-i18next";
import type { ButtonClickHandler } from "@/features/calculator";

export const CalculatorKeyPad = ({ onClick }: { onClick: ButtonClickHandler }) => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-wrap gap-0.5 text-2xl font-bold">
      <CalculatorButton name="(" onClick={onClick} />
      <CalculatorButton name=")" onClick={onClick} />
      <CalculatorButton name="backspace" title={t("buttons.backspace")} onClick={onClick}>
        <SvgBackspace className="h-6 w-6" />
      </CalculatorButton>
      <CalculatorButton name="clear" title={t("buttons.clear")} onClick={onClick}>
        <SvgDelete className="h-7 w-7" />
      </CalculatorButton>

      <CalculatorButton name="1" onClick={onClick} />
      <CalculatorButton name="2" onClick={onClick} />
      <CalculatorButton name="3" onClick={onClick} />
      <CalculatorButton name="+" onClick={onClick} />

      <CalculatorButton name="4" onClick={onClick} />
      <CalculatorButton name="5" onClick={onClick} />
      <CalculatorButton name="6" onClick={onClick} />
      <CalculatorButton name="-" onClick={onClick} />

      <CalculatorButton name="7" onClick={onClick} />
      <CalculatorButton name="8" onClick={onClick} />
      <CalculatorButton name="9" onClick={onClick} />
      <CalculatorButton name="*" onClick={onClick} />

      <CalculatorButton name="." onClick={onClick} />
      <CalculatorButton name="0" onClick={onClick} />
      <CalculatorButton name="=" onClick={onClick} />
      <CalculatorButton name="/" onClick={onClick} />
    </div>
  );
};

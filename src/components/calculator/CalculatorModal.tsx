import { ReactNode, useRef, useState } from "react";
import { Button } from "antd";
import { SideModal } from "@/components/modals/SideModal";
import { Calculator } from "@/components/calculator/Calculator";
import SvgCalculator from "@/assets/sprite/calculator.svg";
import SvgPassPrice from "@/assets/sprite/pass-price.svg";
import { CalculatorRef, CalculatorSaveHandler } from "@/types/calculator";

export const CalculatorModal = ({ title, buttonOpen, buttonSave, onSave }: { title: string; buttonOpen: ReactNode; buttonSave: ReactNode; onSave: CalculatorSaveHandler }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = () => setIsOpen((prevState) => !prevState);

  const calculatorRef = useRef<CalculatorRef | null>(null);
  const [value, setValue] = useState(0);
  const handleSaveResult = (): void => {
    onSave(value);
    setIsOpen(false);
    calculatorRef.current?.clear();
  };

  const saveBtn = (
    <Button type="primary" data-cy="calculator-save-btn" className="!flex items-center justify-center gap-3" disabled={!value} onClick={handleSaveResult}>
      <SvgPassPrice className="h-5 w-5" />
      {buttonSave}
    </Button>
  );

  return (
    <>
      <Button size="large" data-cy="calculator-modal-btn" className="!flex w-full items-center justify-center gap-3" onClick={handleToggleVisibility}>
        <SvgCalculator className="h-5 w-5" />
        {buttonOpen}
      </Button>
      <SideModal title={title} isOpen={isOpen} footer={saveBtn} onClose={handleToggleVisibility}>
        <Calculator ref={calculatorRef} onCalculate={setValue} />
      </SideModal>
    </>
  );
};

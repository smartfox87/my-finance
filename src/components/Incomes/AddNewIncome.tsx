import { Button } from "antd";
import { SideModal } from "@/components/modals/SideModal";
import { DefaultForm } from "@/components/form/DefaultForm";
import { useSelector } from "react-redux";
import { selectIncomeFields } from "@/store/selectors/incomes";
import { createIncomeItemThunk } from "@/store/slices/incomesSlice";
import { useTranslation } from "react-i18next";
import { showNotification } from "@/helpers/modals";
import { memo, useRef, useState } from "react";
import { CalculatorModal } from "@/components/calculator/CalculatorModal";
import { useViewport } from "@/hooks/viewport";
import SvgNewIncome from "@/assets/sprite/new-income.svg";
import { useAppDispatch } from "@/hooks/redux";
import { showCommonError } from "@/helpers/errors";
import { isIncomeItemData } from "@/predicates/incomes";
import { FieldIds, FieldTypes } from "@/types/field";
import type { CalculatorSaveHandler } from "@/types/calculator";
import type { DefaultFormRef, DefaultFormSaveHandler } from "@/types/form";

export const AddNewIncome = memo(function AddNewIncome({ isAdaptive, onSave }: { isAdaptive?: boolean; onSave: () => Promise<void> }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isMobile } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = (): void => setIsOpen((prevState) => !prevState);

  const newIncomeFields = useSelector(selectIncomeFields);

  const handleSaveNewIncome: DefaultFormSaveHandler = async (fieldsValues) => {
    try {
      if (!isIncomeItemData(fieldsValues)) return;
      await dispatch(createIncomeItemThunk(fieldsValues)).unwrap();
      await onSave();
      setIsOpen(false);
      showNotification({ title: t("notifications.income.create") });
    } catch (error) {
      showCommonError();
    }
  };

  const formRef = useRef<DefaultFormRef | null>(null);
  const handleSetCalculatedAmount: CalculatorSaveHandler = (value) => formRef.current?.handleChangeFieldValue({ id: FieldIds.AMOUNT, type: FieldTypes.NUMBER, value });

  return (
    <>
      <Button size="large" data-cy="add-income-modal-btm" className="!flex items-center justify-center gap-3" onClick={handleToggleVisibility}>
        <SvgNewIncome className="h-5 w-5 shrink-0" />
        {(!isAdaptive || !isMobile) && t("common.add_income")}
      </Button>
      <SideModal
        title={t("common.add_income")}
        isOpen={isOpen}
        footer={<CalculatorModal title={t("common.amount_calculator")} buttonOpen={t("common.amount_calculator")} buttonSave={t("buttons.save_amount")} onSave={handleSetCalculatedAmount} />}
        onClose={handleToggleVisibility}
      >
        <DefaultForm ref={formRef} fields={newIncomeFields} isResetAfterSave data-cy="add-income-form" onSaveForm={handleSaveNewIncome} />
      </SideModal>
    </>
  );
});

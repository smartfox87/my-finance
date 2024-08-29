import { Button } from "antd";
import { SideModal } from "@/components/modals/SideModal";
import { DefaultForm } from "@/components/form/DefaultForm";
import { selectCostFields } from "@/store/selectors/costs";
import { createCostItemThunk } from "@/store/slices/costsSlice";
import { useTranslation } from "react-i18next";
import { showNotification } from "@/helpers/modals";
import { memo, useRef, useState } from "react";
import SvgNewExpense from "@/assets/sprite/new-expense.svg";
import { CalculatorModal } from "@/components/calculator/CalculatorModal";
import { useViewport } from "@/hooks/viewport";
import { isCostItemData } from "@/predicates/costs";
import { showCommonError } from "@/helpers/errors";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { FieldIds, FieldTypes } from "@/types/field";
import type { CalculatorSaveHandler } from "@/types/calculator";
import type { DefaultFormRef, DefaultFormSaveHandler } from "@/types/form";
import { ComponentOnSaveProps } from "@/types/common";

export const AddNewCost = memo(function AddNewCost({ isAdaptive, onSave }: ComponentOnSaveProps & { isAdaptive?: boolean }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isMobile } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = (): void => setIsOpen((prevState) => !prevState);

  const newCostFields = useAppSelector(selectCostFields);

  const handleSaveNewCost: DefaultFormSaveHandler = async (fieldsValues) => {
    try {
      if (!isCostItemData(fieldsValues)) return;
      await dispatch(createCostItemThunk(fieldsValues)).unwrap();
      await onSave();
      setIsOpen(false);
      showNotification({ title: t("notifications.expense.create") });
    } catch (error) {
      showCommonError({ error });
    }
  };

  const formRef = useRef<DefaultFormRef | null>(null);
  const handleSetCalculatedAmount: CalculatorSaveHandler = (value) => formRef.current?.handleChangeFieldValue({ id: FieldIds.AMOUNT, type: FieldTypes.NUMBER, value });

  return (
    <>
      <Button size="large" data-cy="add-expense-modal-btm" className="!flex items-center justify-center gap-2" onClick={handleToggleVisibility}>
        <SvgNewExpense className="h-7 w-7" />
        {(!isAdaptive || !isMobile) && t("buttons.add_expense")}
      </Button>
      <SideModal
        title={t("titles.add_expense")}
        isOpen={isOpen}
        footer={<CalculatorModal title={t("common.amount_calculator")} buttonOpen={t("common.amount_calculator")} buttonSave={t("buttons.save_amount")} onSave={handleSetCalculatedAmount} />}
        onClose={handleToggleVisibility}
      >
        <DefaultForm ref={formRef} fields={newCostFields} isResetAfterSave data-cy="add-expense-form" onSaveForm={handleSaveNewCost} />
      </SideModal>
    </>
  );
});

import { Button } from "antd";
import { SideModal } from "@/components/modals/side-modal";
import { DefaultForm } from "@/features/default-form";
import { selectCostFields } from "../../selectors";
import { createCostItemThunk } from "../../store";
import { useTranslation } from "react-i18next";
import { showNotification } from "@/utils/show-notification";
import { memo, useRef, useState } from "react";
import SvgNewExpense from "@/assets/sprite/new-expense.svg";
import { useViewport } from "@/hooks/viewport";
import { isCostItemData } from "../../predicates";
import { showCommonError } from "@/utils/show-common-error";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { FieldIds, FieldTypes } from "@/types/field";
import { type CalculatorSaveHandler, CalculatorModal } from "@/features/calculator";
import type { DefaultFormRef, DefaultFormSaveHandler } from "@/types/form";
import type { ComponentOnSaveProps } from "@/types/common";

export const AddNew = memo(function AddNewCost({ isAdaptive, onSave }: ComponentOnSaveProps & { isAdaptive?: boolean }) {
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

import { Button } from "antd";
import { SideModal } from "@/components/modals/SideModal";
import { DefaultForm } from "@/components/form/DefaultForm";
import { selectBudgetFields } from "../../selectors";
import { createBudgetItemThunk } from "../../store";
import { useTranslation } from "react-i18next";
import { showNotification } from "@/helpers/modals";
import { memo, useRef, useState } from "react";
import SvgNewBudget from "@/assets/sprite/new-budget.svg";
import { CalculatorModal } from "@/components/calculator/CalculatorModal";
import { useViewport } from "@/hooks/viewport";
import { isBudgetItemData } from "../../predicates";
import { showCommonError } from "@/helpers/errors";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { FieldIds, FieldTypes } from "@/types/field";
import type { CalculatorSaveHandler } from "@/types/calculator";
import type { DefaultFormRef, DefaultFormSaveHandler } from "@/types/form";

export const AddNew = memo(function AddNewBudget({ isAdaptive, onSave }: { isAdaptive?: boolean; onSave: () => Promise<void> }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isMobile } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = (): void => setIsOpen((prevState) => !prevState);

  const newBudgetFields = useAppSelector(selectBudgetFields);

  const onSaveNewBudget: DefaultFormSaveHandler = async (fieldsValues) => {
    try {
      if (!isBudgetItemData(fieldsValues)) return;
      await dispatch(createBudgetItemThunk(fieldsValues)).unwrap();
      await onSave();
      setIsOpen(false);
      showNotification({ title: t("notifications.budget.create") });
    } catch (error) {
      showCommonError({ error });
    }
  };

  const formRef = useRef<DefaultFormRef | null>(null);
  const handleSetCalculatedAmount: CalculatorSaveHandler = (value) => formRef.current?.handleChangeFieldValue({ id: FieldIds.AMOUNT, type: FieldTypes.NUMBER, value });

  return (
    <>
      <Button size="large" data-cy="add-budget-modal-btm" className="!flex items-center justify-center gap-3" onClick={handleToggleVisibility}>
        <SvgNewBudget className="h-[22px] w-[22px]" />
        {(!isAdaptive || !isMobile) && t("buttons.add_budget")}
      </Button>
      <SideModal
        title={t("titles.add_budget")}
        isOpen={isOpen}
        footer={<CalculatorModal title={t("common.amount_calculator")} buttonOpen={t("common.amount_calculator")} buttonSave={t("buttons.save_amount")} onSave={handleSetCalculatedAmount} />}
        onClose={handleToggleVisibility}
      >
        <DefaultForm ref={formRef} fields={newBudgetFields} isResetAfterSave data-cy="add-budget-form" onSaveForm={onSaveNewBudget} />
      </SideModal>
    </>
  );
});

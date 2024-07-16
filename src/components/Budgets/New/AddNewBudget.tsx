import { Button } from "antd";
import { SideModal } from "@/components/Modals/SideModal.jsx";
import { DefaultForm } from "@/components/Form/DefaultForm";
import { useSelector } from "react-redux";
import { selectBudgetFields } from "@/store/selectors/budgets";
import { createBudgetItemThunk } from "@/store/budgetsSlice";
import { useTranslation } from "react-i18next";
import { showNotification } from "@/helpers/modals.js";
import { memo, useRef, useState } from "react";
import SvgNewBudget from "@/assets/sprite/new-budget.svg";
import { CalculatorModal } from "@/components/Calculator/CalculatorModal.jsx";
import { useViewport } from "@/hooks/viewport";
import { DefaultFormRef, DefaultFormSaveHandler } from "@/types/form";
import { FieldIds, FieldTypes } from "@/types/field";
import { useAppDispatch } from "@/hooks/redux";
import { isBudgetItemData } from "@/predicates/budget";
import { showCommonError } from "@/helpers/errors";

export const AddNewBudget = memo(function AddNewBudget({ isAdaptive, onSave }: { isAdaptive?: boolean; onSave: () => Promise<void> }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { viewport } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = () => setIsOpen((prevState) => !prevState);

  const newBudgetFields = useSelector(selectBudgetFields);

  const onSaveNewBudget: DefaultFormSaveHandler = async (fieldsValues) => {
    try {
      if (!isBudgetItemData(fieldsValues)) return;
      await dispatch(createBudgetItemThunk(fieldsValues)).unwrap();
      await onSave();
      setIsOpen(false);
      showNotification({ title: t("notifications.budget.create") });
    } catch (error) {
      showCommonError();
    }
  };

  const formRef = useRef<DefaultFormRef>(null);
  const handleSetCalculatedAmount = (value: number) => formRef.current?.handleChangeFieldValue({ id: FieldIds.AMOUNT, type: FieldTypes.NUMBER, value });

  return (
    <>
      <Button size="large" data-cy="add-budget-modal-btm" className="!flex items-center justify-center gap-3" onClick={handleToggleVisibility}>
        <SvgNewBudget className="h-[22px] w-[22px]" />
        {(!isAdaptive || !["xs", "xxs"].includes(viewport)) && t("buttons.add_budget")}
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

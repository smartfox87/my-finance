import { Button } from "antd";
import { SideModal } from "@/components/Modals/SideModal.jsx";
import { DefaultForm } from "@/components/Form/DefaultForm.tsx";
import { useDispatch, useSelector } from "react-redux";
import { selectBudgetFields } from "@/store/selectors/budgets";
import { createBudgetItemThunk } from "@/store/budgetsSlice";
import { useTranslation } from "react-i18next";
import { showNotification } from "@/helpers/modals.js";
import { memo, useRef, useState } from "react";
import SvgNewBudget from "@/assets/sprite/new-budget.svg";

import { CalculatorModal } from "@/components/Calculator/CalculatorModal.jsx";
import { useViewport } from "@/hooks/viewport";

export const AddNewBudget = memo(function AddNewBudget({ isAdaptive, onSave }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { viewport } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = () => setIsOpen((prevState) => !prevState);

  const newBudgetFields = useSelector(selectBudgetFields);

  const onSaveNewBudget = async (fieldsValues) => {
    const { error } = await dispatch(createBudgetItemThunk(fieldsValues));
    if (error) return;
    onSave();
    setIsOpen(false);
    showNotification({ title: t("notifications.budget.create") });
  };

  const formRef = useRef();
  const handleSetCalculatedAmount = (value) => formRef.current.handleChangeFieldValue({ id: "amount", value });

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

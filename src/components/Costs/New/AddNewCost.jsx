import { Button } from "antd";
import { SideModal } from "@/components/Modals/SideModal.jsx";
import { DefaultForm } from "@/components/Form/DefaultForm.tsx";
import { useDispatch, useSelector } from "react-redux";
import { selectCostFields } from "@/store/selectors/costs.js";
import { createCostItemThunk } from "@/store/costsSlice";
import { useTranslation } from "react-i18next";
import { showNotification } from "@/helpers/modals.js";
import { memo, useRef, useState } from "react";
import SvgNewExpense from "@/assets/sprite/new-expense.svg";
import { CalculatorModal } from "@/components/Calculator/CalculatorModal.jsx";
import { useViewport } from "@/hooks/viewport.js";

export const AddNewCost = memo(function AddNewCost({ isAdaptive, onSave }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { viewport } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = () => setIsOpen((prevState) => !prevState);

  const newCostFields = useSelector(selectCostFields);

  const handleSaveNewCost = async (fieldsValues) => {
    const { error } = await dispatch(createCostItemThunk(fieldsValues));
    if (error) return;
    await onSave();
    setIsOpen(false);
    showNotification({ title: t("notifications.expense.create") });
  };

  const formRef = useRef();
  const handleSetCalculatedAmount = (value) => formRef.current.handleChangeFieldValue({ id: "amount", value });

  return (
    <>
      <Button size="large" data-cy="add-expense-modal-btm" className="!flex items-center justify-center gap-2" onClick={handleToggleVisibility}>
        <SvgNewExpense className="h-7 w-7" />
        {(!isAdaptive || !["xs", "xxs"].includes(viewport)) && t("buttons.add_expense")}
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

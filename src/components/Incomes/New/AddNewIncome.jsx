import { Button } from "antd";
import { SideModal } from "@/components/Modals/SideModal.jsx";
import { DefaultForm } from "@/components/Form/DefaultForm.tsx";
import { useDispatch, useSelector } from "react-redux";
import { selectIncomeFields } from "@/store/selectors/incomes.js";
import { createIncomeItemThunk } from "@/store/incomesSlice";
import { useTranslation } from "react-i18next";
import { showNotification } from "@/helpers/modals.js";
import { memo, useRef, useState } from "react";
import { CalculatorModal } from "@/components/Calculator/CalculatorModal.jsx";
import { useViewport } from "@/hooks/viewport.js";
import SvgNewIncome from "@/assets/sprite/new-income.svg";

export const AddNewIncome = memo(function AddNewIncome({ isAdaptive, onSave }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { viewport } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = () => setIsOpen((prevState) => !prevState);

  const newIncomeFields = useSelector(selectIncomeFields);

  const handleSaveNewIncome = async (fieldsValues) => {
    const { error } = await dispatch(createIncomeItemThunk(fieldsValues));
    if (error) return;
    await onSave();
    setIsOpen(false);
    showNotification({ title: t("notifications.income.create") });
  };

  const formRef = useRef();
  const handleSetCalculatedAmount = (value) => formRef.current.handleChangeFieldValue({ id: "amount", value });

  return (
    <>
      <Button size="large" data-cy="add-income-modal-btm" className="!flex items-center justify-center gap-3" onClick={handleToggleVisibility}>
        <SvgNewIncome className="h-5 w-5 shrink-0" />
        {(!isAdaptive || !["xs", "xxs"].includes(viewport)) && t("common.add_income")}
      </Button>
      <SideModal
        title={t("common.add_income")}
        isOpen={isOpen}
        footer={<CalculatorModal title={t("common.amount_calculator")} buttonOpen={t("common.amount_calculator")} buttonSave={t("buttons.save_amount")} onSave={handleSetCalculatedAmount} />}
        onClose={handleToggleVisibility}
      >
        <DefaultForm ref={formRef} fields={newIncomeFields} isResetAfterSave isVisible={isOpen} data-cy="add-income-form" onSaveForm={handleSaveNewIncome} />
      </SideModal>
    </>
  );
});

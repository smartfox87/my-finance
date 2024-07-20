import { Button } from "antd";
import { SideModal } from "@/components/Modals/SideModal";
import { DefaultForm } from "@/components/Form/DefaultForm";
import { useSelector } from "react-redux";
import { selectCostFields } from "@/store/selectors/costs";
import { createCostItemThunk } from "@/store/costsSlice";
import { useTranslation } from "react-i18next";
import { showNotification } from "@/helpers/modals.js";
import { memo, useRef, useState } from "react";
import SvgNewExpense from "@/assets/sprite/new-expense.svg";
import { CalculatorModal } from "@/components/Calculator/CalculatorModal.jsx";
import { useViewport } from "@/hooks/viewport";
import { DefaultFormRef, DefaultFormSaveHandler } from "@/types/form";
import { FieldIds, FieldTypes } from "@/types/field";
import { isCostItemData } from "@/predicates/costs";
import { showCommonError } from "@/helpers/errors";
import { useAppDispatch } from "@/hooks/redux";

export const AddNewCost = memo(function AddNewCost({ isAdaptive, onSave }: { isAdaptive?: boolean; onSave: () => Promise<void> }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isMobile } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = () => setIsOpen((prevState) => !prevState);

  const newCostFields = useSelector(selectCostFields);

  const handleSaveNewCost: DefaultFormSaveHandler = async (fieldsValues) => {
    try {
      if (!isCostItemData(fieldsValues)) return;
      await dispatch(createCostItemThunk(fieldsValues)).unwrap();
      await onSave();
      setIsOpen(false);
      showNotification({ title: t("notifications.expense.create") });
    } catch (error) {
      showCommonError();
    }
  };

  const formRef = useRef<DefaultFormRef>();
  const handleSetCalculatedAmount = (value: number): void => formRef.current?.handleChangeFieldValue({ id: FieldIds.AMOUNT, type: FieldTypes.NUMBER, value });

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

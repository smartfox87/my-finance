import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useRef, useState } from "react";
import { selectBudgetFields, selectBudgetItem } from "@/store/selectors/budgets";
import { deleteBudgetItemThunk, getBudgetItemThunk, setBudgetItem, updateBudgetItemThunk } from "@/store/budgetsSlice";
import { DefaultForm } from "@/components/Form/DefaultForm.tsx";
import { getOnlyValuesFromData } from "@/helpers/processData.js";
import { showNotification } from "@/helpers/modals.js";
import { SideModal } from "@/components/Modals/SideModal.jsx";
import { useLoading } from "@/hooks/loading.js";
import { checkIsNumber } from "@/helpers/numbers.js";
import SvgDelete from "@/assets/sprite/delete.svg";
import { CalculatorModal } from "@/components/Calculator/CalculatorModal.jsx";
import { Button } from "antd";
import { useSearchParams, useRouter } from "next/navigation";

export const BudgetDetail = memo(function BudgetDetail({ onSave }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const budgetId = searchParams.get("budgetId");

  const [isLoading, setIsLoading] = useLoading(false);
  const [isBtnLoading, setIsBtnLoading] = useLoading(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
    router.push("/budgets");
    dispatch(setBudgetItem(null));
  };

  useEffect(() => {
    if (budgetId) {
      setIsOpen(true);
      setIsLoading(true);
      dispatch(getBudgetItemThunk(budgetId)).finally(() => setIsLoading(false));
    }
  }, [budgetId]);

  const budgetItem = useSelector(selectBudgetItem);
  const budgetValues = budgetItem ? getOnlyValuesFromData(budgetItem) : {};
  const budgetFields = useSelector(selectBudgetFields).map((field) => ({
    ...field,
    value: checkIsNumber(budgetValues[field.id]) || budgetValues[field.id]?.length ? budgetValues[field.id] : field.value,
  }));

  const handleUpdateBudget = async (fieldsValues) => {
    const { error } = await dispatch(updateBudgetItemThunk({ budgetId: budgetItem.id, budgetData: fieldsValues }));
    setIsLoading(false);
    if (!error) {
      onSave();
      handleCloseModal();
      showNotification({ title: t("notifications.budget.update") });
    }
  };

  const handleDeleteBudget = async () => {
    setIsBtnLoading(true);
    const { error } = await dispatch(deleteBudgetItemThunk(budgetItem.id));
    setIsBtnLoading(false);
    if (!error) {
      onSave();
      handleCloseModal();
      showNotification({ title: t("notifications.budget.delete") });
    }
  };

  const formRef = useRef();
  const handleSetCalculatedAmount = (value) => formRef.current.handleChangeFieldValue({ id: "amount", value });

  const footer = (
    <div className="flex flex-col gap-4">
      <CalculatorModal title={t("common.amount_calculator")} buttonOpen={t("common.amount_calculator")} buttonSave={t("buttons.save_amount")} onSave={handleSetCalculatedAmount} />
      <Button size="large" data-cy="delete-budget-btn" className="!flex w-full items-center justify-center gap-3" loading={isBtnLoading} onClick={handleDeleteBudget}>
        <SvgDelete className="h-5 w-5 cursor-pointer duration-300 hover:text-blue-600" />
        {t("buttons.delete_budget")}
      </Button>
    </div>
  );

  return (
    <SideModal title={t("titles.detail_budget")} isOpen={isOpen} isLoading={isLoading} footer={footer} onClose={handleCloseModal}>
      <DefaultForm ref={formRef} fields={budgetFields} data-cy="edit-budget-form" onSaveForm={handleUpdateBudget} />
    </SideModal>
  );
});

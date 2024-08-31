import { useTranslation } from "react-i18next";
import { memo, useEffect, useRef, useState } from "react";
import { selectBudgetFields, selectBudgetItem } from "@/store/selectors/budgets";
import { deleteBudgetItemThunk, getBudgetItemThunk, setBudgetItem, updateBudgetItemThunk } from "@/store/slices/budgetsSlice";
import { DefaultForm } from "@/components/form/DefaultForm";
import { showNotification } from "@/helpers/modals";
import { SideModal } from "@/components/modals/SideModal";
import { useLoading } from "@/hooks/loading";
import SvgDelete from "@/assets/sprite/delete.svg";
import { CalculatorModal } from "@/components/calculator/CalculatorModal";
import { Button } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { showCommonError } from "@/helpers/errors";
import { isBudgetItemData } from "@/predicates/budget";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { FieldIds, FieldTypes } from "@/types/field";
import type { CalculatorSaveHandler } from "@/types/calculator";
import type { ComponentOnSaveProps } from "@/types/common";
import type { DefaultFormRef, DefaultFormSaveHandler } from "@/types/form";

export const BudgetDetail = memo(function BudgetDetail({ onSave }: ComponentOnSaveProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const budgetId = searchParams.get("budgetId");

  const [isLoading, setIsLoading] = useLoading(false);
  const [isBtnLoading, setIsBtnLoading] = useLoading(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = (): void => {
    setIsOpen(false);
    router.push("/budgets");
    dispatch(setBudgetItem(null));
  };

  useEffect((): void => {
    if (budgetId) {
      setIsOpen(true);
      setIsLoading(true);
      dispatch(getBudgetItemThunk(budgetId)).finally(() => setIsLoading(false));
    }
  }, [budgetId]);

  const budgetItem = useAppSelector(selectBudgetItem);
  const budgetFields = useAppSelector(selectBudgetFields);

  const handleUpdateBudget: DefaultFormSaveHandler = async (fieldsValues) => {
    try {
      if (!(budgetItem && isBudgetItemData(fieldsValues))) return;
      await dispatch(updateBudgetItemThunk({ budgetId: budgetItem.id, budgetData: fieldsValues })).unwrap();
      await onSave();
      handleCloseModal();
      showNotification({ title: t("notifications.budget.update") });
    } catch (error) {
      showCommonError({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBudget = async (): Promise<void> => {
    try {
      if (!budgetItem) return;
      setIsBtnLoading(true);
      await dispatch(deleteBudgetItemThunk(budgetItem.id)).unwrap();
      await onSave();
      handleCloseModal();
      showNotification({ title: t("notifications.budget.delete") });
    } catch (error) {
      showCommonError({ error });
    } finally {
      setIsBtnLoading(false);
    }
  };

  const formRef = useRef<DefaultFormRef | null>(null);
  const handleSetCalculatedAmount: CalculatorSaveHandler = (value) => formRef.current?.handleChangeFieldValue({ id: FieldIds.AMOUNT, type: FieldTypes.NUMBER, value });

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
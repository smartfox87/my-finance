import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { memo, useEffect, useRef, useState } from "react";
import { selectCostFields, selectCostItem } from "@/store/selectors/costs";
import { deleteCostItemThunk, getCostItemThunk, setCostItem, updateCostItemThunk } from "@/store/slices/costsSlice";
import { DefaultForm } from "@/components/form/DefaultForm";
import { showNotification } from "@/helpers/modals";
import { SideModal } from "@/components/modals/SideModal";
import { useLoading } from "@/hooks/loading";
import SvgDelete from "@/assets/sprite/delete.svg";
import { CalculatorModal } from "@/components/calculator/CalculatorModal";
import { Button } from "antd";
import { useSearchParams, useRouter } from "next/navigation";
import { isCostItemData } from "@/predicates/costs";
import { showCommonError } from "@/helpers/errors";
import { useAppDispatch } from "@/hooks/redux";
import { FieldIds, FieldTypes } from "@/types/field";
import type { CalculatorSaveHandler } from "@/types/calculator";
import type { ComponentOnSaveProps } from "@/types/common";
import type { DefaultFormRef, DefaultFormSaveHandler } from "@/types/form";

export const CostDetail = memo(function CostDetail({ onSave }: ComponentOnSaveProps) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const costId = searchParams.get("costId");

  const [isLoading, setIsLoading] = useLoading(false);
  const [isBtnLoading, setIsBtnLoading] = useLoading(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = (): void => {
    setIsOpen(false);
    router.push("/expenses");
    dispatch(setCostItem(null));
  };

  useEffect((): void => {
    if (costId) {
      setIsOpen(true);
      setIsLoading(true);
      dispatch(getCostItemThunk(costId)).finally(() => setIsLoading(false));
    }
  }, [costId]);

  const costItem = useSelector(selectCostItem);
  const costFields = useSelector(selectCostFields);

  const handleUpdateCost: DefaultFormSaveHandler = async (fieldsValues) => {
    try {
      if (!(costItem && isCostItemData(fieldsValues))) return;
      await dispatch(updateCostItemThunk({ costId: costItem.id, costData: fieldsValues })).unwrap();
      await onSave();
      handleCloseModal();
      showNotification({ title: t("notifications.expense.update") });
    } catch (error) {
      showCommonError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCost = async (): Promise<void> => {
    try {
      if (!costItem) return;
      setIsBtnLoading(true);
      await dispatch(deleteCostItemThunk(costItem.id)).unwrap();
      await onSave();
      handleCloseModal();
      showNotification({ title: t("notifications.expense.delete") });
    } catch (error) {
      showCommonError();
    } finally {
      setIsBtnLoading(false);
    }
  };

  const formRef = useRef<DefaultFormRef | null>(null);
  const handleSetCalculatedAmount: CalculatorSaveHandler = (value) => formRef.current?.handleChangeFieldValue({ id: FieldIds.AMOUNT, type: FieldTypes.NUMBER, value });

  const footer = (
    <div className="flex flex-col gap-4">
      <CalculatorModal title={t("common.amount_calculator")} buttonOpen={t("common.amount_calculator")} buttonSave={t("buttons.save_amount")} onSave={handleSetCalculatedAmount} />
      <Button size="large" data-cy="delete-expense-btn" className="!flex w-full items-center justify-center gap-3" loading={isBtnLoading} onClick={handleDeleteCost}>
        <SvgDelete className="h-5 w-5 cursor-pointer duration-300 hover:text-blue-600" />
        {t("buttons.delete_expense")}
      </Button>
    </div>
  );

  return (
    <SideModal title={t("titles.detail_expense")} isOpen={isOpen} isLoading={isLoading} footer={footer} onClose={handleCloseModal}>
      <DefaultForm ref={formRef} fields={costFields} data-cy="edit-expense-form" onSaveForm={handleUpdateCost} />
    </SideModal>
  );
});

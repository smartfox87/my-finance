import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useRef, useState } from "react";
import { selectCostFields, selectCostItem } from "@/store/selectors/costs.js";
import { deleteCostItemThunk, getCostItemThunk, setCostItem, updateCostItemThunk } from "@/store/costsSlice.js";
import { DefaultForm } from "@/components/Form/DefaultForm.jsx";
import { getOnlyValuesFromData } from "@/helpers/processData.js";
import { showNotification } from "@/helpers/modals.js";
import { SideModal } from "@/components/Modals/SideModal.jsx";
import { useLoading } from "@/hooks/loading.js";
import SvgDelete from "@/assets/sprite/delete.svg";
import { CalculatorModal } from "@/components/Calculator/CalculatorModal.jsx";
import { Button } from "antd";
import { useParams, useRouter } from "next/navigation";

export const CostDetail = memo(function CostDetail({ onSave }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { costId } = useParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useLoading(false);
  const [isBtnLoading, setIsBtnLoading] = useLoading(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
    router.push("/expenses");
    dispatch(setCostItem(null));
  };

  useEffect(() => {
    if (costId) {
      setIsOpen(true);
      setIsLoading(true);
      dispatch(getCostItemThunk(costId)).finally(() => setIsLoading(false));
    }
  }, [costId]);

  const costItem = useSelector(selectCostItem);
  const costValues = costItem ? getOnlyValuesFromData(costItem) : {};
  const costFields = useSelector(selectCostFields).map((field) => ({ ...field, value: costValues[field.id] }));

  const handleUpdateCost = async (fieldsValues) => {
    const { error } = await dispatch(updateCostItemThunk({ costId: costItem.id, costData: fieldsValues }));
    setIsLoading(false);
    if (!error) {
      onSave();
      handleCloseModal();
      showNotification({ title: t("notifications.expense.update") });
    }
  };

  const handleDeleteCost = async () => {
    setIsBtnLoading(true);
    const { error } = await dispatch(deleteCostItemThunk(costItem.id));
    setIsBtnLoading(false);
    if (!error) {
      onSave();
      handleCloseModal();
      showNotification({ title: t("notifications.expense.delete") });
    }
  };

  const formRef = useRef();
  const handleSetCalculatedAmount = (value) => formRef.current.handleChangeFieldValue({ id: "amount", value });

  const footer = (
    <div className="flex flex-col gap-4">
      <CalculatorModal title={t("common.amount_calculator")} buttonOpen={t("common.amount_calculator")} buttonSave={t("buttons.save_amount")} onSave={handleSetCalculatedAmount} />
      <Button size="large" className="!flex w-full items-center justify-center gap-3" loading={isBtnLoading} onClick={handleDeleteCost}>
        <SvgDelete className="h-5 w-5 cursor-pointer duration-300 hover:text-blue-600" />
        {t("buttons.delete_expense")}
      </Button>
    </div>
  );

  return (
    <SideModal title={t("titles.detail_expense")} isOpen={isOpen} isLoading={isLoading} footer={footer} onClose={handleCloseModal}>
      <DefaultForm ref={formRef} fields={costFields} onSaveForm={handleUpdateCost} />
    </SideModal>
  );
});

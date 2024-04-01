import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useRef, useState } from "react";
import { selectIncomeFields, selectIncomeItem } from "@/store/selectors/incomes.js";
import { deleteIncomeItemThunk, getIncomeItemThunk, setIncomeItem, updateIncomeItemThunk } from "@/store/incomesSlice.js";
import { DefaultForm } from "@/components/Form/DefaultForm.jsx";
import { getOnlyValuesFromData } from "@/helpers/processData.js";
import { showNotification } from "@/helpers/modals.js";
import { SideModal } from "@/components/Modals/SideModal.jsx";
import { useLoading } from "@/hooks/loading.js";
import SvgDelete from "@/assets/sprite/delete.svg";
import { CalculatorModal } from "@/components/Calculator/CalculatorModal.jsx";
import { Button } from "antd";
import { useSearchParams, useRouter } from "next/navigation";

export const IncomeDetail = memo(function IncomeDetail({ onSave }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const incomeId = searchParams.get("incomeId");

  const [isLoading, setIsLoading] = useLoading(false);
  const [isBtnLoading, setIsBtnLoading] = useLoading(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
    router.push("/incomes");
    dispatch(setIncomeItem(null));
  };

  useEffect(() => {
    if (incomeId) {
      setIsOpen(true);
      setIsLoading(true);
      dispatch(getIncomeItemThunk(incomeId)).finally(() => setIsLoading(false));
    }
  }, [incomeId]);

  const incomeItem = useSelector(selectIncomeItem);
  const incomeValues = incomeItem ? getOnlyValuesFromData(incomeItem) : {};
  const incomeFields = useSelector(selectIncomeFields).map((field) => ({ ...field, value: incomeValues[field.id] }));

  const handleUpdateIncome = async (fieldsValues) => {
    const { error } = await dispatch(updateIncomeItemThunk({ incomeId: incomeItem.id, incomeData: fieldsValues }));
    setIsLoading(false);
    if (!error) {
      onSave();
      handleCloseModal();
      showNotification({ title: t("notifications.income.update") });
    }
  };

  const handleDeleteIncome = async () => {
    setIsBtnLoading(true);
    const { error } = await dispatch(deleteIncomeItemThunk(incomeItem.id));
    setIsBtnLoading(false);
    if (!error) {
      onSave();
      handleCloseModal();
      showNotification({ title: t("notifications.income.delete") });
    }
  };

  const formRef = useRef();
  const handleSetCalculatedAmount = (value) => formRef.current.handleChangeFieldValue({ id: "amount", value });

  const footer = (
    <div className="flex flex-col gap-4">
      <CalculatorModal title={t("common.amount_calculator")} buttonOpen={t("common.amount_calculator")} buttonSave={t("buttons.save_amount")} onSave={handleSetCalculatedAmount} />
      <Button size="large" className="!flex w-full items-center justify-center gap-3" loading={isBtnLoading} onClick={handleDeleteIncome}>
        <SvgDelete className="h-5 w-5 cursor-pointer duration-300 hover:text-blue-600" />
        {t("buttons.delete_income")}
      </Button>
    </div>
  );

  return (
    <SideModal title={t("titles.detail_income")} isOpen={isOpen} isLoading={isLoading} footer={footer} onClose={handleCloseModal}>
      <DefaultForm ref={formRef} fields={incomeFields} isVisible={isOpen} onSaveForm={handleUpdateIncome} />
    </SideModal>
  );
});

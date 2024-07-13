import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { memo, useEffect, useRef, useState } from "react";
import { selectAccountFields, selectAccountItem } from "@/store/selectors/accounts";
import { deleteAccountItemThunk, getAccountItemThunk, setAccountItem, updateAccountItemThunk } from "@/store/accountsSlice";
import { DefaultForm } from "@/components/Form/DefaultForm.tsx";
import { getOnlyValuesFromData } from "@/helpers/processData.js";
import { showNotification } from "@/helpers/modals.js";
import { SideModal } from "@/components/Modals/SideModal.jsx";
import { useLoading } from "@/hooks/loading.js";
import SvgDelete from "@/assets/sprite/delete.svg";
import { CalculatorModal } from "@/components/Calculator/CalculatorModal.jsx";
import { Button } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux";

export const AccountDetail = memo(function AccountDetail({ onSave }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const accountId = searchParams.get("accountId");

  const [isLoading, setIsLoading] = useLoading(false);
  const [isBtnLoading, setIsBtnLoading] = useLoading(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
    router.push("/accounts");
    dispatch(setAccountItem(null));
  };

  useEffect(() => {
    if (accountId) {
      setIsOpen(true);
      setIsLoading(true);
      dispatch(getAccountItemThunk(accountId)).finally(() => setIsLoading(false));
    }
  }, [accountId]);

  const accountItem = useSelector(selectAccountItem);
  const accountValues = accountItem ? getOnlyValuesFromData(accountItem) : {};
  const accountEmptyFields = useSelector(selectAccountFields);
  const accountFields = accountEmptyFields.map((field) => ({ ...field, focus: field.id === "balance", disabled: field.id === "name" && accountItem?.disabled, value: accountValues[field.id] }));

  const handleUpdateAccount = async (fieldsValues) => {
    const accountData = { ...fieldsValues };
    if (accountItem?.disabled) delete accountData.name;
    const { error } = await dispatch(updateAccountItemThunk({ accountId: accountItem.id, accountData }));
    setIsLoading(false);
    if (!error) {
      await onSave();
      handleCloseModal();
      showNotification({ title: t("notifications.account.update") });
    }
  };

  const handleDeleteAccount = async () => {
    setIsBtnLoading(true);
    const { error } = await dispatch(deleteAccountItemThunk(accountItem.id));
    setIsBtnLoading(false);
    if (!error) {
      await onSave();
      handleCloseModal();
      showNotification({ title: t("notifications.account.delete") });
    }
  };

  const formRef = useRef();
  const handleSetCalculatedBalance = (value) => formRef.current.handleChangeFieldValue({ id: "balance", value });

  const footer = (
    <div className="flex flex-col gap-4">
      <CalculatorModal title={t("common.balance_calculator")} buttonOpen={t("common.balance_calculator")} buttonSave={t("buttons.save_amount")} onSave={handleSetCalculatedBalance} />
      <Button size="large" className="!flex w-full items-center justify-center gap-3" loading={isBtnLoading} data-cy="delete-account-btn" onClick={handleDeleteAccount}>
        <SvgDelete className="h-5 w-5 cursor-pointer duration-300 hover:text-blue-600" />
        {t("buttons.delete_account")}
      </Button>
    </div>
  );

  return (
    <SideModal title={t("titles.detail_account")} isOpen={isOpen} isLoading={isLoading} footer={footer} onClose={handleCloseModal}>
      <DefaultForm ref={formRef} fields={accountFields} isVisible={isOpen} data-cy="edit-account-form" onSaveForm={handleUpdateAccount} />
    </SideModal>
  );
});

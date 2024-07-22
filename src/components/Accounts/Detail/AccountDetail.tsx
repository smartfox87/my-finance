import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { memo, useEffect, useRef, useState } from "react";
import { selectAccountFields, selectAccountItem } from "@/store/selectors/accounts";
import { deleteAccountItemThunk, getAccountItemThunk, setAccountItem, updateAccountItemThunk } from "@/store/accountsSlice";
import { DefaultForm } from "@/components/Form/DefaultForm";
import { showNotification } from "@/helpers/modals.js";
import { SideModal } from "@/components/Modals/SideModal";
import { useLoading } from "@/hooks/loading.js";
import SvgDelete from "@/assets/sprite/delete.svg";
import { CalculatorModal } from "@/components/Calculator/CalculatorModal.jsx";
import { Button } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/hooks/redux";
import { DefaultFormRef, DefaultFormSaveHandler } from "@/types/form";
import { showCommonError } from "@/helpers/errors";
import { FieldIds, FieldTypes } from "@/types/field";
import { isAccountItemUpdateData } from "@/predicates/account";

export const AccountDetail = memo(function AccountDetail({ onSave }: { onSave: (props?: { types: boolean }) => Promise<void> }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const accountId = searchParams.get("accountId");

  const [isLoading, setIsLoading] = useLoading(false);
  const [isBtnLoading, setIsBtnLoading] = useLoading(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = (): void => {
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
  const accountFields = useSelector(selectAccountFields);

  const handleUpdateAccount: DefaultFormSaveHandler = async (fieldsValues) => {
    try {
      if (!accountItem) return;
      const accountData = accountItem.disabled
        ? { [FieldIds.BALANCE]: fieldsValues[FieldIds.BALANCE] }
        : { [FieldIds.BALANCE]: fieldsValues[FieldIds.BALANCE], [FieldIds.NAME]: fieldsValues[FieldIds.NAME] };
      if (!isAccountItemUpdateData(accountData)) return;
      await dispatch(updateAccountItemThunk({ accountId: accountItem.id, accountData })).unwrap();
      setIsLoading(false);
      await onSave();
      handleCloseModal();
      showNotification({ title: t("notifications.account.update") });
    } catch (error) {
      showCommonError();
    }
  };

  const handleDeleteAccount = async (): Promise<void> => {
    try {
      if (!accountItem) return;
      setIsBtnLoading(true);
      await dispatch(deleteAccountItemThunk(accountItem.id)).unwrap();
      setIsBtnLoading(false);
      await onSave();
      handleCloseModal();
      showNotification({ title: t("notifications.account.delete") });
    } catch (error) {
      showCommonError();
    }
  };

  const formRef = useRef<DefaultFormRef>(null);
  const handleSetCalculatedBalance = (value: number): void => formRef.current?.handleChangeFieldValue({ id: FieldIds.BALANCE, type: FieldTypes.NUMBER, value });

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
      <DefaultForm ref={formRef} fields={accountFields} data-cy="edit-account-form" onSaveForm={handleUpdateAccount} />
    </SideModal>
  );
});

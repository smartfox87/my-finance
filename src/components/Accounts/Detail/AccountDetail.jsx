import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useRef, useState } from "react";
import { selectAccountFields, selectAccountItem } from "@/store/selectors/accounts.js";
import { deleteAccountItemThunk, getAccountItemThunk, setAccountItem, updateAccountItemThunk } from "@/store/accountsSlice.js";
import { DefaultForm } from "@/components/Form/DefaultForm.jsx";
import { getOnlyValuesFromData } from "@/helpers/processData.js";
import { showNotification } from "@/helpers/modals.js";
import { SideModal } from "@/components/Modals/SideModal.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useLoading } from "@/hooks/loading.js";
import PropTypes from "prop-types";
import SvgDelete from "@/assets/sprite/delete.svg";
import { CalculatorModal } from "@/components/Calculator/CalculatorModal.jsx";
import { Button } from "antd";

export const AccountDetail = memo(function AccountDetail({ onSave }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { accountId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useLoading(false);
  const [isBtnLoading, setIsBtnLoading] = useLoading(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
    navigate("/accounts");
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
      onSave();
      handleCloseModal();
      showNotification({ title: t("notifications.account.update") });
    }
  };

  const handleDeleteAccount = async () => {
    setIsBtnLoading(true);
    const { error } = await dispatch(deleteAccountItemThunk(accountItem.id));
    setIsBtnLoading(false);
    if (!error) {
      onSave();
      handleCloseModal();
      showNotification({ title: t("notifications.account.delete") });
    }
  };

  const formRef = useRef();
  const handleSetCalculatedBalance = (value) => formRef.current.handleChangeFieldValue({ id: "balance", value });

  const footer = (
    <div className="flex flex-col gap-4">
      <CalculatorModal title={t("common.balance_calculator")} buttonOpen={t("common.balance_calculator")} buttonSave={t("buttons.save_amount")} onSave={handleSetCalculatedBalance} />
      <Button size="large" className="!flex w-full items-center justify-center gap-3" loading={isBtnLoading} onClick={handleDeleteAccount}>
        <SvgDelete className="h-5 w-5 cursor-pointer duration-300 hover:text-blue-600" />
        {t("buttons.delete_account")}
      </Button>
    </div>
  );

  return (
    <SideModal title={t("titles.detail_account")} isOpen={isOpen} isLoading={isLoading} footer={footer} onClose={handleCloseModal}>
      <DefaultForm ref={formRef} fields={accountFields} isVisible={isOpen} onSaveForm={handleUpdateAccount} />
    </SideModal>
  );
});

AccountDetail.propTypes = {
  onSave: PropTypes.func,
};

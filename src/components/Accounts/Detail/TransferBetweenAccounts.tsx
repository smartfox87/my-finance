import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { memo, useLayoutEffect, useMemo, useRef, useState } from "react";
import { selectAccountsList } from "@/store/selectors/accounts";
import { transferAccountsBalanceThunk } from "@/store/accountsSlice";
import { showNotification } from "@/helpers/modals.js";
import { SideModal } from "@/components/Modals/SideModal";
import { useLoading } from "@/hooks/loading.js";
import { CalculatorModal } from "@/components/Calculator/CalculatorModal.jsx";
import { handleFilterSelectOptions } from "@/helpers/fields";
import { Button, Form, InputNumber, Select } from "antd";
import { useViewport } from "@/hooks/viewport";
import SvgTransfer from "@/assets/sprite/transfer.svg";
import { useAppDispatch } from "@/hooks/redux";

export const TransferBetweenAccounts = memo(function TransferBetweenAccounts({ onSave }: { onSave: (props?: { types: boolean }) => Promise<void> }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isMobile } = useViewport();

  const [isLoading, setIsLoading] = useLoading(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = () => setIsOpen((prevState) => !prevState);

  const focusInputRef = useRef();
  const [isInitialized, setIsInitialized] = useState(false);
  useLayoutEffect(() => {
    if (isOpen && isInitialized) setTimeout(() => focusInputRef.current?.focus());
  }, [isOpen, isInitialized]);

  const accountsList = useSelector(selectAccountsList);
  const initialFieldsValues = { from: null, to: null, amount: null };
  const [fieldsValues, setFieldsValues] = useState({ ...initialFieldsValues });
  const formFieldsValues = Object.entries(fieldsValues).map(([id, value]) => ({ name: id, value }));
  const isChangedFieldsData = Object.values(fieldsValues).some((value) => value);
  const maxAmount = useMemo(() => accountsList?.find(({ id }) => id === fieldsValues.from)?.balance, [accountsList, fieldsValues.from]);

  const handleChangeFieldValue = ({ id, value }) => {
    setFieldsValues((oldFieldsValues) => ({ ...oldFieldsValues, [id]: value }));
    if (id === "from" && fieldsValues.amount) form.validateFields(["amount"]);
  };

  const [form] = Form.useForm();
  const handleSubmitForm = async () => {
    const values = await form.validateFields(["from", "to", "amount"]);
    setIsLoading(true);
    const { error } = await dispatch(transferAccountsBalanceThunk(values));
    if (!error) {
      await onSave();
      handleToggleVisibility();
      showNotification({ title: t("notifications.account.money_transfer") });
      setFieldsValues({ ...initialFieldsValues });
    }
    setIsLoading(false);
  };

  const handleCancelForm = () => {
    setFieldsValues({ ...initialFieldsValues });
    handleToggleVisibility();
  };

  const handleSetCalculatedBalance = (value) => handleChangeFieldValue({ id: "amount", value });

  return (
    <>
      <Button size="large" data-cy="transfer-between-accounts-btn" className="!flex items-center justify-center gap-2" onClick={handleToggleVisibility}>
        <SvgTransfer className="h-7 w-7 shrink-0" />
        {!isMobile && t("common.transfer_money")}
      </Button>
      <SideModal
        title={t("common.transfer_money")}
        isOpen={isOpen}
        isLoading={isLoading}
        footer={<CalculatorModal title={t("common.amount_calculator")} buttonOpen={t("common.amount_calculator")} buttonSave={t("buttons.save_amount")} onSave={handleSetCalculatedBalance} />}
        onClose={handleToggleVisibility}
        onInit={setIsInitialized}
      >
        <div className="flex flex-col gap-4">
          <Form layout="vertical" form={form} fields={formFieldsValues} data-cy="transfer-between-accounts-form" className="flex w-full flex-col" onFinish={handleSubmitForm}>
            <Form.Item label={t(`fields.simple.from`)} name="from" rules={[{ required: true, message: t("fields.errors.required") }]}>
              <Select
                ref={focusInputRef}
                size="large"
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                options={accountsList?.filter(({ id }) => id !== fieldsValues.to).map(({ id, name }) => ({ label: name, value: id }))}
                showSearch
                filterOption={handleFilterSelectOptions}
                onChange={(value) => handleChangeFieldValue({ id: "from", value })}
              />
            </Form.Item>
            <Form.Item label={t(`fields.simple.to`)} name="to" rules={[{ required: true, message: t("fields.errors.required") }]}>
              <Select
                size="large"
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                options={accountsList?.filter(({ id }) => id !== fieldsValues.from).map(({ id, name }) => ({ label: name, value: id }))}
                showSearch
                filterOption={handleFilterSelectOptions}
                onChange={(value) => handleChangeFieldValue({ id: "to", value })}
              />
            </Form.Item>
            <Form.Item
              label={t(`fields.simple.amount`)}
              name="amount"
              rules={[
                { validator: (_, value) => (value > maxAmount ? Promise.reject(new Error(t("fields.errors.balance_exceeded"))) : Promise.resolve()) },
                { required: true, message: t("fields.errors.required") },
              ]}
            >
              <InputNumber size="large" disabled={!fieldsValues.from} min={1} max={999999999999999} style={{ width: "100%" }} onChange={(value) => handleChangeFieldValue({ id: "amount", value })} />
            </Form.Item>
            <div className="mt-2 flex gap-4">
              <Button size="large" type="primary" htmlType="submit" loading={isLoading} className="w-1/3 grow" disabled={!isChangedFieldsData}>
                {t("buttons.submit")}
              </Button>
              <Button size="large" variant="bordered" className="w-1/3 grow" disabled={!isChangedFieldsData} onClick={handleCancelForm}>
                {t("buttons.cancel")}
              </Button>
            </div>
          </Form>
        </div>
      </SideModal>
    </>
  );
});

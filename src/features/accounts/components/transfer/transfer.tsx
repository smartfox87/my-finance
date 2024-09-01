import { useTranslation } from "react-i18next";
import { selectAccountsList, selectAccountTransferFields } from "../../selectors";
import { transferAccountsBalanceThunk } from "../../store";
import { SideModal } from "@/components/modals/side-modal";
import { useLoading } from "@/hooks/loading";
import { CalculatorModal } from "@/features/calculator";
import { handleFilterSelectOptions } from "@/utils/fields";
import { Button, Form, InputNumber, Select } from "antd";
import { useViewport } from "@/hooks/viewport";
import SvgTransfer from "@/assets/sprite/transfer.svg";
import { useFieldFocus } from "@/hooks/field-focus";
import { showCommonError } from "@/utils/errors";
import { INITIAL_ACCOUNT_TRANSFER_VALUES } from "../../constants";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { FieldIds } from "@/types/field";
import { memo, type ReactNode, useMemo, useState } from "react";
import type { BaseSelectRef } from "rc-select";
import type { AccountTransferField, AccountTransferValues } from "../../types";

export const Transfer = memo(function TransferBetweenAccounts() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isMobile } = useViewport();

  const [isLoading, setIsLoading] = useLoading(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = (): void => setIsOpen((prevState) => !prevState);

  const [focusFieldRef, mountFocusField] = useFieldFocus<BaseSelectRef>();

  const accountsList = useAppSelector(selectAccountsList);
  const formFields = useAppSelector(selectAccountTransferFields);
  const [currentFieldsValues, setCurrentFieldsValues] = useState<AccountTransferValues>({ ...INITIAL_ACCOUNT_TRANSFER_VALUES });
  const isChangedFieldsData = useMemo(() => Object.values(currentFieldsValues).some((value) => value), [currentFieldsValues]);
  const maxAmount = useMemo(() => accountsList?.find(({ id }) => id === currentFieldsValues.from)?.balance, [accountsList, currentFieldsValues.from]);

  const handleChangeFieldValue = ({ id, value }: Pick<AccountTransferField, "id" | "value">): void => {
    setCurrentFieldsValues((oldFieldsValues) => ({ ...oldFieldsValues, [id]: value }));
  };

  const [form] = Form.useForm();
  const handleSubmitForm = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      setIsLoading(true);
      await dispatch(transferAccountsBalanceThunk(values)).unwrap();
      handleToggleVisibility();
      form.resetFields();
    } catch (error) {
      showCommonError({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelForm = (): void => {
    form.resetFields();
    handleToggleVisibility();
  };

  const handleSetCalculatedAmount = (value: number): void => {
    handleChangeFieldValue({ id: FieldIds.AMOUNT, value });
    form.setFieldsValue({ [FieldIds.AMOUNT]: value });
  };

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
        footer={<CalculatorModal title={t("common.amount_calculator")} buttonOpen={t("common.amount_calculator")} buttonSave={t("buttons.save_amount")} onSave={handleSetCalculatedAmount} />}
        onClose={handleToggleVisibility}
        onMountContent={mountFocusField}
      >
        <Form layout="vertical" form={form} data-cy="transfer-between-accounts-form" className="flex w-full flex-col" onFinish={handleSubmitForm}>
          {formFields.map((field): ReactNode => {
            if (field.id === FieldIds.FROM) {
              return (
                <Form.Item key={field.id} label={t(`fields.simple.${field.id}`)} name={field.id} rules={[{ required: true, message: t("fields.errors.required") }]}>
                  <Select
                    ref={focusFieldRef}
                    size="large"
                    getPopupContainer={(triggerNode) => triggerNode.parentElement}
                    options={field.options.filter(({ value }) => value !== currentFieldsValues.to)}
                    showSearch
                    filterOption={handleFilterSelectOptions}
                    onChange={(value) => handleChangeFieldValue({ id: field.id, value })}
                  />
                </Form.Item>
              );
            } else if (field.id === FieldIds.TO) {
              return (
                <Form.Item key={field.id} label={t(`fields.simple.${field.id}`)} name={field.id} rules={[{ required: true, message: t("fields.errors.required") }]}>
                  <Select
                    size="large"
                    getPopupContainer={(triggerNode) => triggerNode.parentElement}
                    options={field.options.filter(({ value }) => value !== currentFieldsValues.from)}
                    showSearch
                    filterOption={handleFilterSelectOptions}
                    onChange={(value) => handleChangeFieldValue({ id: field.id, value })}
                  />
                </Form.Item>
              );
            } else {
              return (
                <Form.Item
                  key={field.id}
                  label={t(`fields.simple.${field.id}`)}
                  name={field.id}
                  rules={[
                    { validator: (_, value) => (maxAmount && value > maxAmount ? Promise.reject(new Error(t("fields.errors.balance_exceeded"))) : Promise.resolve()) },
                    { required: true, message: t("fields.errors.required") },
                  ]}
                >
                  <InputNumber
                    size="large"
                    disabled={!currentFieldsValues.from}
                    min={1}
                    max={Number.MAX_SAFE_INTEGER}
                    style={{ width: "100%" }}
                    onChange={(value) => handleChangeFieldValue({ id: field.id, value })}
                  />
                </Form.Item>
              );
            }
          })}
          <div className="mt-2 flex gap-4">
            <Button size="large" type="primary" htmlType="submit" loading={isLoading} className="w-1/3 grow" disabled={!isChangedFieldsData}>
              {t("buttons.submit")}
            </Button>
            <Button size="large" className="w-1/3 grow" disabled={!isChangedFieldsData} onClick={handleCancelForm}>
              {t("buttons.cancel")}
            </Button>
          </div>
        </Form>
      </SideModal>
    </>
  );
});

import { Button } from "antd";
import { SideModal } from "@/components/modals/SideModal";
import { DefaultForm } from "@/components/form/DefaultForm";
import { useSelector } from "react-redux";
import { selectAccountFields } from "@/store/selectors/accounts";
import { createAccountItemThunk } from "@/store/slices/accountsSlice";
import { useTranslation } from "react-i18next";
import { showNotification } from "@/helpers/modals";
import { memo, useRef, useState } from "react";
import SvgNewAccount from "@/assets/sprite/new-account.svg";
import { CalculatorModal } from "@/components/calculator/CalculatorModal";
import { useViewport } from "@/hooks/viewport";
import { useAppDispatch } from "@/hooks/redux";
import { showCommonError } from "@/helpers/errors";
import { isAccountItemCreateData } from "@/predicates/account";
import { FieldIds, FieldTypes } from "@/types/field";
import type { DefaultFormRef, DefaultFormSaveHandler } from "@/types/form";
import type { CalculatorSaveHandler } from "@/types/calculator";

export const AddNewAccount = memo(function AddNewAccount({ onSave }: { onSave: (props?: { types: boolean }) => Promise<void> }) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isMobile } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = (): void => setIsOpen((prevState) => !prevState);

  const newAccountFields = useSelector(selectAccountFields);

  const handleSaveNewAccount: DefaultFormSaveHandler = async (fieldsValues) => {
    try {
      if (!isAccountItemCreateData(fieldsValues)) return;
      await dispatch(createAccountItemThunk(fieldsValues)).unwrap();
      await onSave({ types: true });
      setIsOpen(false);
      showNotification({ title: t("notifications.account.create") });
    } catch (error) {
      showCommonError();
    }
  };

  const formRef = useRef<DefaultFormRef | null>(null);
  const handleSetCalculatedBalance: CalculatorSaveHandler = (value) => formRef.current?.handleChangeFieldValue({ id: FieldIds.BALANCE, type: FieldTypes.NUMBER, value });

  return (
    <>
      <Button size="large" data-cy="add-account-modal-btm" className="!flex items-center justify-center gap-2" onClick={handleToggleVisibility}>
        <SvgNewAccount className="h-7 w-7" />
        {!isMobile && t("common.add_account")}
      </Button>
      <SideModal
        title={t("common.add_account")}
        isOpen={isOpen}
        footer={<CalculatorModal title={t("common.balance_calculator")} buttonOpen={t("common.balance_calculator")} buttonSave={t("buttons.save_balance")} onSave={handleSetCalculatedBalance} />}
        onClose={handleToggleVisibility}
      >
        <DefaultForm ref={formRef} fields={newAccountFields} data-cy="add-account-form" isResetAfterSave onSaveForm={handleSaveNewAccount} />
      </SideModal>
    </>
  );
});

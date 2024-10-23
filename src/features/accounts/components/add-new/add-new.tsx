import { Button } from "antd";
import { SideModal } from "@/components/modals/side-modal";
import { DefaultForm } from "@/features/default-form";
import { selectAccountFields } from "@/store/selectors/accounts";
import { createAccountItemThunk } from "@/store/slices/accounts";
import { useTranslation } from "react-i18next";
import { memo, useRef, useState } from "react";
import SvgNewAccount from "@/assets/sprite/new-account.svg";
import { useViewport } from "@/hooks/viewport";
import { showCommonError } from "@/utils/show-common-error";
import { isAccountItemCreateData } from "../../predicates";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { FieldIds, FieldTypes } from "@/types/field";
import { type CalculatorSaveHandler, CalculatorModal } from "@/features/calculator";
import type { DefaultFormRef, DefaultFormSaveHandler } from "@/types/form";

export const AddNew = memo(function AddNewAccount() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isMobile } = useViewport();

  const [isOpen, setIsOpen] = useState(false);
  const handleToggleVisibility = (): void => setIsOpen((prevState) => !prevState);

  const newAccountFields = useAppSelector(selectAccountFields);

  const handleSaveNewAccount: DefaultFormSaveHandler = async (fieldsValues) => {
    try {
      if (!isAccountItemCreateData(fieldsValues)) return;
      await dispatch(createAccountItemThunk(fieldsValues)).unwrap();
      setIsOpen(false);
    } catch (error) {
      showCommonError({ error });
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

import { Button } from "antd";
import { SideModal } from "@/components/modals/side-modal";
import { DefaultForm } from "@/components/form/DefaultForm";
import { selectAccountFields } from "../../selectors";
import { createAccountItemThunk } from "../../store";
import { useTranslation } from "react-i18next";
import { memo, useRef, useState } from "react";
import SvgNewAccount from "@/assets/sprite/new-account.svg";
import { CalculatorModal } from "@/components/calculator/CalculatorModal";
import { useViewport } from "@/hooks/viewport";
import { showCommonError } from "@/helpers/errors";
import { isAccountItemCreateData } from "../../predicates";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { FieldIds, FieldTypes } from "@/types/field";
import type { DefaultFormRef, DefaultFormSaveHandler } from "@/types/form";
import type { CalculatorSaveHandler } from "@/types/calculator";

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

import { useTranslation } from "react-i18next";
import { useLoading } from "@/hooks/loading";
import dynamic from "next/dynamic";
import { isFieldId } from "@/predicates/field";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useState } from "react";
import { getChangedFieldValue, getValuesFromPropsFields, processFormValues } from "@/helpers/form";
import { FieldTypes } from "@/types/field";
import { Button, Form, type FormProps } from "antd";
import type { ChangedField, DefaultFormProps, FormValues } from "@/types/form";

const TextFieldComponent = dynamic(() => import("@/components/form/TextFormFieldComponent").then((mod) => mod.TextFormFieldComponent));
const PasswordFieldComponent = dynamic(() => import("@/components/form/PasswordFormFieldComponent").then((mod) => mod.PasswordFormFieldComponent));
const TextAreaFieldComponent = dynamic(() => import("@/components/form/TextareaFormFieldComponent").then((mod) => mod.TextareaFormFieldComponent));
const PeriodFieldComponent = dynamic(() => import("@/components/form/PeriodFormFieldComponent").then((mod) => mod.PeriodFormFieldComponent));
const SingleSelectFieldComponent = dynamic(() => import("@/components/form/SingleSelectFormFieldComponent").then((mod) => mod.SingleSelectFormFieldComponent));
const MultiSelectFieldComponent = dynamic(() => import("@/components/form/MultiSelectFormFieldComponent").then((mod) => mod.MultiSelectFormFieldComponent));
const DatePickerFieldComponent = dynamic(() => import("@/components/form/DatePickerFormFieldComponent").then((mod) => mod.DatePickerFormFieldComponent));
const InputNumberFieldComponent = dynamic(() => import("@/components/form/InputNumberFormFieldComponent").then((mod) => mod.InputNumberFormFieldComponent));
const RadioGroupFieldComponent = dynamic(() => import("@/components/form/RadioGroupFormFieldComponent").then((mod) => mod.RadioGroupFormFieldComponent));
const UploadFieldComponent = dynamic(() => import("@/components/form/UploadFormFieldComponent").then((mod) => mod.UploadFormFieldComponent));

export const DefaultForm = forwardRef(function DefaultForm({ fields, isResetAfterSave, "data-cy": dataCy, onSaveForm, onResetForm, onChange }: DefaultFormProps, ref) {
  const { t } = useTranslation();
  const [form] = Form.useForm<FormValues>();

  const propsFieldsValues = useMemo(() => getValuesFromPropsFields(fields), [fields]);
  const [currentFieldsValues, setCurrentFieldsValues] = useState<FormValues>(propsFieldsValues);

  useEffect(() => {
    form.setFieldsValue(propsFieldsValues);
    setCurrentFieldsValues(form.getFieldsValue(true));
  }, [propsFieldsValues]);

  const handleChangeFieldValue = useCallback(
    (field: ChangedField): void => {
      form.setFieldsValue(getChangedFieldValue(currentFieldsValues[field.id], field));
      setCurrentFieldsValues(form.getFieldsValue(true));
      if (typeof onChange === "function") onChange();
    },
    [onChange, currentFieldsValues],
  );
  useImperativeHandle(ref, () => ({ handleChangeFieldValue }));

  const isChangedFieldsValues = useMemo(
    (): boolean =>
      Object.entries(propsFieldsValues).some(([key, value]) => isFieldId(key) && (value || currentFieldsValues[key]) && JSON.stringify(value) !== JSON.stringify(currentFieldsValues[key])),
    [propsFieldsValues, currentFieldsValues],
  );

  const [isLoading, setIsLoading] = useLoading(false);
  const handleSubmitForm: FormProps["onFinish"] = async (): Promise<void> => {
    try {
      const values = await form.validateFields();
      setIsLoading(true);
      const processedValues: FormValues = processFormValues(values);
      await onSaveForm(processedValues);
      if (isResetAfterSave) form.resetFields();
    } catch (errorInfo) {
      console.warn("Failed:", errorInfo);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelForm = (): void => {
    if (onResetForm) onResetForm();
    form.setFieldsValue(propsFieldsValues);
  };

  return (
    <Form layout="vertical" form={form} className="flex w-full flex-col" data-cy={dataCy} onFinish={handleSubmitForm}>
      {fields.map((field) => (
        <>
          {(field.type === FieldTypes.TEXT || field.type === FieldTypes.EMAIL) && <TextFieldComponent key={field.id} field={field} onChange={handleChangeFieldValue} />}
          {field.type === FieldTypes.PASSWORD && <PasswordFieldComponent key={field.id} field={field} onChange={handleChangeFieldValue} />}
          {field.type === FieldTypes.TEXTAREA && <TextAreaFieldComponent key={field.id} field={field} onChange={handleChangeFieldValue} />}
          {field.type === FieldTypes.SELECT && <SingleSelectFieldComponent key={field.id} field={field} onChange={handleChangeFieldValue} />}
          {field.type === FieldTypes.MULTISELECT && <MultiSelectFieldComponent key={field.id} field={field} onChange={handleChangeFieldValue} />}
          {field.type === FieldTypes.DATE && <DatePickerFieldComponent key={field.id} field={field} onChange={handleChangeFieldValue} />}
          {field.type === FieldTypes.NUMBER && <InputNumberFieldComponent key={field.id} field={field} onChange={handleChangeFieldValue} />}
          {field.type === FieldTypes.DATES_PERIOD && <PeriodFieldComponent key={field.id} field={field} onChange={handleChangeFieldValue} />}
          {field.type === FieldTypes.RADIO_BUTTONS && <RadioGroupFieldComponent key={field.id} field={field} onChange={handleChangeFieldValue} />}
          {field.type === FieldTypes.FILE && <UploadFieldComponent key={field.id} field={field} value={currentFieldsValues[field.id]} onChange={handleChangeFieldValue} />}
        </>
      ))}
      <div className="mt-2 flex gap-4">
        <Button size="large" type="primary" htmlType="submit" loading={isLoading} className="w-1/3 grow" disabled={!isChangedFieldsValues}>
          {t("buttons.submit")}
        </Button>
        <Button size="large" className="w-1/3 grow" disabled={!isChangedFieldsValues} onClick={handleCancelForm}>
          {t("buttons.cancel")}
        </Button>
      </div>
    </Form>
  );
});

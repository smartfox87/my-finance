import { forwardRef, LegacyRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoading } from "@/hooks/loading";
import SvgUpload from "@/assets/sprite/upload.svg";
import { getFileSizeWithUnit } from "@/helpers/file";
import { cutDecimals, handleFilterSelectOptions, handleKeyDownDecimalsValidation, handleKeyUpCutDecimals } from "@/helpers/fields";
import dynamic from "next/dynamic";
import { showErrorMessage } from "@/helpers/message";
import { ChangedField, DefaultFormProps, FileFormFieldId, FormItemRule, FormValues } from "@/types/form";
import { Button, type DatePickerProps, Form, FormProps, Input, InputRef, SelectProps, type UploadFile } from "antd";
import dayjs, { isDayjs } from "dayjs";
import { FieldTranslationError, FieldType, FieldTypes, FieldValues, MultiSelectValue, SelectComponentProps, SingleSelectValue } from "@/types/field";
import { isFieldId, isMultiSelectValue, isUploadFileArray } from "@/predicates/field";
import { isTruthy } from "@/predicates/common";
import { useFieldFocus } from "@/hooks/fieldFocus";
import type { BaseSelectRef } from "rc-select";

const PeriodComponent = dynamic(() => import("@/components/Form/PeriodField").then((mod) => mod.PeriodField));
const DatePickerComponent = dynamic<DatePickerProps>(() => import("antd/es/date-picker"));
const SelectComponent = dynamic<SelectComponentProps<SelectProps>>(() => import("antd/es/select"));
const InputNumberComponent = dynamic(() => import("antd/es/input-number"));
const RadioGroupComponent = dynamic(() => import("antd/es/radio").then((mod) => mod.Group));
const UploadComponent = dynamic(() => import("antd/es/upload"));

export const DefaultForm = forwardRef(function DefaultForm({ fields, isResetAfterSave, onSaveForm, onResetForm, onChange, ...props }: DefaultFormProps, ref) {
  const { t } = useTranslation();
  const [form] = Form.useForm<FormValues>();

  const propsFieldsValues = useMemo(
    (): FormValues =>
      Object.assign(
        {},
        ...fields.map(({ id, type, value }) => ({
          [id]: type === FieldTypes.DATE && value ? dayjs(value) : value,
        })),
      ),
    [fields],
  );
  const [currentFieldsValues, setCurrentFieldsValues] = useState<FormValues>(propsFieldsValues);

  useEffect(() => {
    form.setFieldsValue(propsFieldsValues);
    setCurrentFieldsValues(form.getFieldsValue(true));
  }, [propsFieldsValues]);

  const [focusFieldRef, mountFocusField] = useFieldFocus<BaseSelectRef | InputRef>();
  useLayoutEffect(() => {
    mountFocusField(true);
    return () => mountFocusField(false);
  }, []);

  const handleChangeFieldValue = useCallback(
    ({ id, value, type }: ChangedField): void => {
      const currentFieldValue = currentFieldsValues[id];
      if (type === FieldTypes.MULTISELECT && isMultiSelectValue(value) && isMultiSelectValue(currentFieldValue)) {
        if (!value?.length || (!currentFieldValue.includes(FieldValues.ALL) && value.includes(FieldValues.ALL))) form.setFieldsValue({ [id]: [FieldValues.ALL] });
        else form.setFieldsValue({ [id]: value.filter((val) => val !== FieldValues.ALL) });
      } else form.setFieldsValue({ [id]: value });
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
      const processedValues: FormValues = Object.assign(
        {},
        ...Object.entries(values).map(([key, value]) => {
          if (isUploadFileArray(value)) return { [key]: value.map(({ originFileObj }) => originFileObj).filter(isTruthy) };
          // todo optimize date format for single function
          else if (isDayjs(value)) return { [key]: value.format("YYYY-MM-DD") };
          else if (isMultiSelectValue(value)) return { [key]: value.filter((val) => val !== FieldValues.ALL) };
          else return { [key]: value };
        }),
      );
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

  const normFile = (e: { fileList: UploadFile[] }): UploadFile[] => (Array.isArray(e) ? e : e?.fileList);
  const handleRemoveFile = ({ id, value }: { id: FileFormFieldId; value: UploadFile }): void =>
    form.setFieldsValue({
      [id]: form.getFieldValue(id).filter(({ uid }: { uid: string }) => uid !== value.uid),
    });
  const handleAddFile = async ({ id, value, maxSize = 20 * 1024 * 1024 }: { id: FileFormFieldId; value: UploadFile; maxSize?: number }): Promise<boolean | string> => {
    if (value.size && value.size <= maxSize) {
      form.setFieldsValue({
        [id]: [...form.getFieldValue(id), value],
      });
      return true;
    }
    showErrorMessage(`${t("fields.errors.file_size")} ${getFileSizeWithUnit(maxSize)}`);
    return UploadComponent && "LIST_IGNORE" in UploadComponent && typeof UploadComponent.LIST_IGNORE === "string" ? UploadComponent.LIST_IGNORE : false;
  };
  const getFieldRules = ({ required, type }: { required?: boolean; type: FieldType }) => {
    const rules: { required?: boolean; type?: FormItemRule; message: string }[] = [];
    if (!type && FieldTypes.EMAIL === type) {
      const message: FieldTranslationError = `fields.errors.${type}`;
      rules.push({ type, message: t(message) });
    }
    if (required) rules.push({ required: true, message: t("fields.errors.required") });
    return rules;
  };

  return (
    <Form layout="vertical" form={form} className="flex w-full flex-col" {...props} onFinish={handleSubmitForm}>
      {fields.map(({ label, label_suffix, required, focus, disabled, placeholder, ...field }) => {
        return (
          <Form.Item
            label={`${t(`fields.${label}`)} ${label_suffix ? label_suffix : ""}`}
            name={field.id}
            key={field.id}
            rules={getFieldRules({ required, type: field.type })}
            valuePropName={field.type === FieldTypes.FILE ? "fileList" : "value"}
            getValueFromEvent={field.type === FieldTypes.FILE ? normFile : (e) => e}
          >
            {(field.type === FieldTypes.TEXT || field.type === FieldTypes.EMAIL) && (
              <Input
                size="large"
                ref={focus ? (focusFieldRef as LegacyRef<InputRef>) : undefined}
                type={field.type}
                maxLength={field.maxLength}
                disabled={disabled}
                onChange={(event) => handleChangeFieldValue({ id: field.id, type: field.type, value: event.target.value })}
              />
            )}
            {field.type === FieldTypes.PASSWORD && (
              <Input.Password
                ref={focus ? (focusFieldRef as LegacyRef<InputRef>) : undefined}
                size="large"
                maxLength={field.maxLength}
                disabled={disabled}
                onChange={(event) => handleChangeFieldValue({ id: field.id, type: field.type, value: event.target.value })}
              />
            )}
            {field.type === FieldTypes.TEXTAREA && (
              <Input.TextArea
                ref={focus ? focusFieldRef : undefined}
                rows={5}
                maxLength={field.maxLength}
                showCount={!!field.maxLength}
                disabled={disabled}
                onChange={(event) => handleChangeFieldValue({ id: field.id, type: field.type, value: event.target.value })}
              />
            )}
            {field.type === FieldTypes.SELECT && (
              <SelectComponent
                size="large"
                autoFocus={!!focus}
                disabled={disabled}
                options={field.options?.map(({ label, label_translation, value }) => ({
                  label: label_translation ? t(`fields.${label_translation}`) : label || value,
                  value,
                }))}
                showSearch={field.showSearch}
                filterOption={field.showSearch ? handleFilterSelectOptions : undefined}
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                onChange={(value: SingleSelectValue) => handleChangeFieldValue({ id: field.id, type: field.type, value })}
              />
            )}
            {field.type === FieldTypes.MULTISELECT && (
              <SelectComponent
                size="large"
                autoFocus={!!focus}
                mode="multiple"
                disabled={disabled}
                options={field.options?.map(({ label, label_translation, value }) => ({
                  label: label_translation ? t(`fields.${label_translation}`) : label || value,
                  value,
                }))}
                showSearch={field.showSearch}
                filterOption={field.showSearch ? handleFilterSelectOptions : undefined}
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                onChange={(value: MultiSelectValue) => handleChangeFieldValue({ id: field.id, type: field.type, value })}
              />
            )}
            {field.type === FieldTypes.DATE && (
              <DatePickerComponent
                size="large"
                autoFocus={!!focus}
                picker={field.picker}
                disabledDate={field.disabledDate}
                disabled={disabled}
                placeholder={placeholder}
                getPopupContainer={(triggerNode) => triggerNode}
                format={{
                  format: "YYYY-MM-DD",
                  type: "mask",
                }}
                style={{ width: "100%" }}
                onChange={(value) => handleChangeFieldValue({ id: field.id, type: field.type, value })}
              />
            )}
            {field.type === FieldTypes.NUMBER && (
              <InputNumberComponent
                size="large"
                autoFocus={!!focus}
                disabled={disabled}
                onKeyDown={handleKeyDownDecimalsValidation}
                onKeyUp={handleKeyUpCutDecimals}
                min={0}
                max={Number.MAX_SAFE_INTEGER}
                style={{ width: "100%" }}
                onChange={(value) => handleChangeFieldValue({ id: field.id, type: field.type, value: cutDecimals(value) })}
              />
            )}
            {field.type === FieldTypes.DATES_PERIOD && <PeriodComponent id={field.id} value={field.value} onChange={(value) => handleChangeFieldValue({ id: field.id, type: field.type, value })} />}
            {field.type === FieldTypes.RADIO_BUTTONS && (
              <RadioGroupComponent
                className="w-full"
                size="large"
                optionType="button"
                buttonStyle="solid"
                options={field.options?.map(({ label, label_translation, value }) => ({ label: label ? label : t(`fields.${label_translation}`), value }))}
                onChange={(event) => handleChangeFieldValue({ id: field.id, type: field.type, value: event.target.value })}
              />
            )}
            {field.type === FieldTypes.FILE && (
              <UploadComponent
                listType="picture"
                multiple={!!field.multiple}
                maxCount={field.maxCount}
                accept={field.accept}
                beforeUpload={(value) => handleAddFile({ id: field.id, value, maxSize: field.maxSize })}
                onRemove={(value) => handleRemoveFile({ id: field.id, value })}
              >
                <Button icon={<SvgUpload className="h-4 w-4" />} size="large">
                  {t("buttons.upload")}
                </Button>
              </UploadComponent>
            )}
          </Form.Item>
        );
      })}
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

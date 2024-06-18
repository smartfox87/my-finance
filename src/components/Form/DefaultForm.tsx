import { forwardRef, LegacyRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, type DatePickerProps, Form, FormProps, Input, InputRef, SelectProps, type UploadFile } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useLoading } from "@/hooks/loading.js";
import SvgUpload from "@/assets/sprite/upload.svg";
import { getFileSizeWithUnit } from "@/helpers/file.js";
import { cutDecimals, handleFilterSelectOptions, handleKeyDownDecimalsValidation, handleKeyUpCutDecimals } from "@/helpers/fields";
import dynamic from "next/dynamic";
import { showErrorMessage } from "@/helpers/message";
import { ChangedField, DefaultFormProps, FieldType, FieldTypes, FormField, FormItemRule, FormValue, FormValues, ProcessedValues, PropFieldValue } from "@/types/form";
import { SelectValue } from "antd/es/select";

const PeriodComponent = dynamic(() => import("@/components/Form/PeriodField").then((mod) => mod.PeriodField));
const DatePickerComponent = dynamic<DatePickerProps>(() => import("antd/es/date-picker"));
const SelectComponent = dynamic<SelectProps<SelectValue>>(() => import("antd/es/select"));
const InputNumberComponent = dynamic(() => import("antd/es/input-number"));
const RadioGroupComponent = dynamic(() => import("antd/es/radio").then((mod) => mod.Group));
const UploadComponent = dynamic(() => import("antd/es/upload"));

export const DefaultForm = forwardRef(function DefaultForm({ fields, isResetAfterSave, isVisible = true, onSaveForm, onResetForm, onChange, ...props }: DefaultFormProps, ref) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const propsFieldsValues = useMemo(
    () =>
      fields.reduce(
        (acc, { id, type, value }) => ({
          ...acc,
          [id]: type === FieldTypes.DATE ? dayjs(value) : value,
        }),
        {},
      ),
    [fields],
  );
  const [currentFieldsValues, setCurrentFieldsValues] = useState<{ [key: string]: any }>(propsFieldsValues);

  useEffect(() => {
    form.setFieldsValue(propsFieldsValues);
    console.log("111111111111111111111111111111", form.getFieldsValue(true));
    setCurrentFieldsValues(form.getFieldsValue(true));
  }, [propsFieldsValues]);

  const focusInputRef = useRef<HTMLInputElement | InputRef>(null);
  // todo check importance isVisible
  useLayoutEffect(() => {
    if (isVisible) setTimeout(() => focusInputRef.current?.focus());
  }, [isVisible]);

  const handleChangeFieldValue = useCallback(
    ({ id, value, type }: ChangedField): void => {
      if (type === FieldTypes.SELECT && Array.isArray(value)) {
        if (!value?.length || (!(currentFieldsValues[id] as string[]).includes("all") && (value as string[]).includes("all"))) form.setFieldsValue({ [id]: ["all"] });
        else form.setFieldsValue({ [id]: (value as string[]).filter((val: string) => val !== "all") });
      } else form.setFieldsValue({ [id]: value });
      setCurrentFieldsValues(form.getFieldsValue(true));
      if (typeof onChange === "function") onChange();
    },
    [onChange, currentFieldsValues],
  );
  useImperativeHandle(ref, () => ({ handleChangeFieldValue }));

  const isChangedFieldsValues = useMemo(
    () => Object.entries(propsFieldsValues).some(([key, value]) => (value || currentFieldsValues[key]) && JSON.stringify(value) !== JSON.stringify(currentFieldsValues[key])),
    [propsFieldsValues, currentFieldsValues],
  );

  const [isLoading, setIsLoading] = useLoading(false);
  // const handleSubmitForm: FormProps<FormValues>["onFinish"] = async () => {
  const handleSubmitForm: FormProps["onFinish"] = async () => {
    try {
      const values = await form.validateFields();
      setIsLoading(true);
      const processedValues = Object.entries(values).reduce((acc: ProcessedValues, [key, value]) => {
        if (key.includes("file") && Array.isArray(value)) acc[key] = (value as { originFileObj: File }[]).map(({ originFileObj }) => originFileObj);
        else if (key.includes("date") && value) acc[key] = (value as Dayjs).format("YYYY-MM-DD");
        else if (Array.isArray(value)) acc[key] = (value as string[]).filter((val: string) => val !== "all");
        else acc[key] = value;
        return acc;
      }, {});
      await onSaveForm(processedValues);
      if (isResetAfterSave) form.resetFields();
    } catch (errorInfo) {
      console.warn("Failed:", errorInfo);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelForm = () => {
    if (onResetForm) onResetForm();
    form.setFieldsValue(propsFieldsValues);
  };

  const normFile = (e: { fileList: UploadFile[] }) => (Array.isArray(e) ? e : e?.fileList);
  const handleRemoveFile = (file: UploadFile) =>
    form.setFieldsValue({
      [file.uid]: form.getFieldValue(file.uid).filter(({ uid }: { uid: string }) => uid !== file.uid),
    });
  const handleAddFile = async (file: UploadFile, { maxSize }: { maxSize: number }) => {
    if (file.size && file.size <= maxSize) {
      form.setFieldsValue({
        [file.uid]: form.getFieldValue(file.uid).concat([file]),
      });
      return true;
    }
    showErrorMessage(`${t("fields.errors.file_size")} ${getFileSizeWithUnit(maxSize)}`);
    return UploadComponent && "LIST_IGNORE" in UploadComponent && typeof UploadComponent.LIST_IGNORE === "string" ? UploadComponent.LIST_IGNORE : false;
  };
  const getFieldRules = ({ required, type }: { required?: boolean; type: FieldType }) => {
    const rules: { required?: boolean; type?: FormItemRule; message: string }[] = [];
    if ("email" === type) rules.push({ type, message: t(`fields.errors.${type}`) });
    if (required) rules.push({ required: true, message: t("fields.errors.required") });
    return rules;
  };

  return (
    <Form layout="vertical" form={form} className="flex w-full flex-col" {...props} onFinish={handleSubmitForm}>
      {fields.map(({ id, label, label_translation, label_suffix, required, focus, disabled, placeholder, ...field }) => {
        return (
          <Form.Item
            label={`${label_translation ? t(`fields.${label_translation}`) : label} ${label_suffix ? label_suffix : ""}`}
            name={id}
            key={id}
            rules={getFieldRules({ required, type: field.type })}
            valuePropName={field.type === FieldTypes.FILE ? "fileList" : "value"}
            getValueFromEvent={field.type === FieldTypes.FILE ? normFile : (e) => e}
          >
            {(field.type === FieldTypes.TEXT || field.type === FieldTypes.EMAIL) && (
              <Input
                size="large"
                ref={focus ? (focusInputRef as LegacyRef<InputRef>) : undefined}
                type={field.type}
                maxLength={field.maxLength}
                disabled={disabled}
                onChange={(event) => handleChangeFieldValue({ id, type: field.type, value: event.target.value })}
              />
            )}
            {field.type === FieldTypes.PASSWORD && (
              <Input.Password
                ref={focus ? (focusInputRef as LegacyRef<InputRef>) : undefined}
                size="large"
                maxLength={field.maxLength}
                disabled={disabled}
                onChange={(event) => handleChangeFieldValue({ id, type: field.type, value: event.target.value })}
              />
            )}
            {field.type === FieldTypes.TEXTAREA && (
              <Input.TextArea
                ref={focus ? focusInputRef : undefined}
                rows={5}
                maxLength={field.maxLength}
                showCount={!!field.maxLength}
                disabled={disabled}
                onChange={(event) => handleChangeFieldValue({ id, type: field.type, value: event.target.value })}
              />
            )}
            {field.type === FieldTypes.SELECT && (
              <SelectComponent
                size="large"
                autoFocus={!!focus}
                mode={field.multiple ? "multiple" : undefined}
                disabled={disabled}
                options={field.options?.map(({ option, label, label_translation, value }) => ({
                  label: option || (label_translation ? t(`fields.${label_translation}`) : label || value),
                  value,
                }))}
                showSearch={field.showSearch}
                filterOption={field.showSearch ? handleFilterSelectOptions : undefined}
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                onChange={(value) => handleChangeFieldValue({ id, type: field.type, value })}
                // onChange={(value) => handleChangeFieldValue({ id, type: field.type, value, multiple: field.multiple })}
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
                onChange={(value) => handleChangeFieldValue({ id, type: field.type, value })}
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
                max={999999999999999}
                style={{ width: "100%" }}
                onChange={(value) => handleChangeFieldValue({ id, type: field.type, value: cutDecimals(value) })}
              />
            )}
            {field.type === FieldTypes.PERIOD && <PeriodComponent id={id} value={field.value} onChange={(value) => handleChangeFieldValue({ id, type: field.type, value })} />}
            {field.type === FieldTypes.RADIO_BUTTONS && (
              <RadioGroupComponent
                className="w-full"
                size="large"
                optionType="button"
                buttonStyle="solid"
                options={field.options?.map(({ label, value }) => ({ label: t(`fields.${label}`), value }))}
                onChange={(event) => handleChangeFieldValue({ id, type: field.type, value: event.target.value })}
              />
            )}
            {field.type === FieldTypes.FILE && (
              <UploadComponent
                listType="picture"
                multiple={!!field.multiple}
                maxCount={field.maxCount}
                accept={field.accept}
                beforeUpload={(file) => handleAddFile(file, { maxSize: field.maxSize || 20 * 1024 * 1024 })}
                onRemove={handleRemoveFile}
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

import { forwardRef, LegacyRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Input, UploadFile, InputRef, FormProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useLoading } from "@/hooks/loading.js";
import SvgUpload from "@/assets/sprite/upload.svg";
import { getFileSizeWithUnit } from "@/helpers/file.js";
import { handleFilterSelectOptions } from "@/helpers/fields";
import { ExtendedFormItemRule, PropField, FormItemRule, DefaultFormProps, PropFieldValue, FormValue, ChangedField, FormValues, ProcessedValues } from "@/types/Form";
import dynamic from "next/dynamic";
import { showErrorMessage } from "@/helpers/message";

export const DefaultForm = forwardRef(function DefaultForm({ fields, isResetAfterSave, isVisible = true, onSaveForm, onResetForm, onChange, ...props }: DefaultFormProps, ref) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const propsFieldsValues = useMemo(
    () =>
      fields.map(({ type, id, value }: PropField): PropFieldValue => {
        const item: PropFieldValue = { name: id, type };
        if (type === "file") item.fileList = value;
        else item.value = value && type === "date" ? dayjs(value) : value;
        return item;
      }),
    [fields],
  );
  const propsFieldsIds = useMemo(() => fields.map(({ id }) => id), [fields]);
  const prevFieldsValuesRef = useRef<{ [key: string]: FormValue }>({});
  const setPropsFormValues = () =>
    form.setFieldsValue(
      propsFieldsValues.reduce(
        (acc, { name, value, fileList }) => ({
          ...acc,
          [name]: fileList || value,
        }),
        {},
      ),
    );

  useEffect(() => {
    setPropsFormValues();
    prevFieldsValuesRef.current = form.getFieldsValue(propsFieldsIds);
  }, [propsFieldsValues]);

  const [isLoading, setIsLoading] = useLoading(false);

  const focusInputRef = useRef<HTMLInputElement | InputRef>(null);
  useLayoutEffect(() => {
    if (isVisible) setTimeout(() => focusInputRef.current?.focus());
  }, [isVisible]);

  const handleChangeFieldValue = useCallback(
    ({ id, value: newValue, multiple, type }: ChangedField) => {
      if (multiple && type === "select" && Array.isArray(newValue)) {
        if (!newValue?.length || (!(prevFieldsValuesRef.current[id] as string[]).includes("all") && (newValue as string[]).includes("all"))) form.setFieldsValue({ [id]: ["all"] });
        else form.setFieldsValue({ [id]: (newValue as string[]).filter((val: string) => val !== "all") });
      } else form.setFieldsValue({ [id]: newValue });
      prevFieldsValuesRef.current = form.getFieldsValue(propsFieldsIds);
      if (typeof onChange === "function") onChange();
    },
    [onChange],
  );

  const isChangedFieldsData = JSON.stringify(propsFieldsValues) !== JSON.stringify(form.getFieldsValue(propsFieldsIds));

  const handleSubmitForm: FormProps<FormValues>["onFinish"] = async () => {
    try {
      const values = await form.validateFields(propsFieldsIds);
      setIsLoading(true);
      const processedValues = Object.keys(values).reduce((acc: ProcessedValues, key) => {
        if (key.includes("file") && Array.isArray(values[key])) acc[key] = (values[key] as { originFileObj: File }[]).map(({ originFileObj }) => originFileObj);
        else if (key.includes("date") && values[key]) acc[key] = (values[key] as Dayjs).format("YYYY-MM-DD");
        else if (Array.isArray(values[key])) acc[key] = (values[key] as string[]).filter((val: string) => val !== "all");
        else acc[key] = values[key];
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
    setPropsFormValues();
  };

  useImperativeHandle(ref, () => ({ handleChangeFieldValue }));

  const PeriodField = useMemo(() => fields.find(({ type }) => type === "period") && dynamic(() => import("@/components/Form/PeriodField").then((mod) => mod.PeriodField)), []);
  const DatePicker = useMemo(() => fields.find(({ type }) => type === "date") && dynamic(() => import("antd/es/date-picker")), []);
  const Select = useMemo(() => fields.find(({ type }) => type === "select") && dynamic(() => import("antd/es/select")), []);
  const InputNumber = useMemo(() => fields.find(({ type }) => type === "number") && dynamic(() => import("antd/es/input-number")), []);
  const RadioGroup = useMemo(() => fields.find(({ type }) => type === "radio-buttons") && dynamic(() => import("antd/es/radio").then((mod) => mod.Group)), []);
  const Upload = useMemo(() => fields.find(({ type }) => type === "file") && dynamic(() => import("antd/es/upload")), []);

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
    return Upload && "LIST_IGNORE" in Upload && typeof Upload.LIST_IGNORE === "string" ? Upload.LIST_IGNORE : false;
  };
  const getFieldRules = ({ required, type }: { required?: boolean; type: ExtendedFormItemRule }) => {
    const rules: { required?: boolean; type?: FormItemRule; message: string }[] = [];
    if ("number" === type || "email" === type) rules.push({ type, message: t(`fields.errors.${type}`) });
    if (required) rules.push({ required: true, message: t("fields.errors.required") });
    return rules;
  };

  return (
    <Form layout="vertical" form={form} className="flex w-full flex-col" {...props} onFinish={handleSubmitForm}>
      {fields.map(
        ({
          id,
          label,
          label_translation,
          label_suffix,
          type,
          required,
          focus,
          disabled,
          disabledDate,
          multiple,
          options,
          showSearch,
          maxLength,
          picker,
          placeholder,
          maxCount = 1,
          accept = "",
          maxSize = 20 * 1024 * 1024,
        }) => {
          return (
            <Form.Item
              label={`${label_translation ? t(`fields.${label_translation}`) : label} ${label_suffix ? label_suffix : ""}`}
              name={id}
              key={id}
              rules={getFieldRules({ required, type })}
              valuePropName={type === "file" ? "fileList" : "value"}
              getValueFromEvent={type === "file" ? normFile : (e) => e}
            >
              {type === "password" && (
                <Input.Password
                  ref={focus ? (focusInputRef as LegacyRef<InputRef>) : undefined}
                  size="large"
                  maxLength={maxLength}
                  disabled={disabled}
                  onChange={(event) => handleChangeFieldValue({ id, value: event.target.value })}
                />
              )}
              {type === "date" && DatePicker && (
                <DatePicker
                  size="large"
                  autoFocus={!!focus}
                  picker={picker}
                  disabledDate={disabledDate}
                  disabled={disabled}
                  placeholder={placeholder}
                  format={{
                    format: "YYYY-MM-DD",
                    type: "mask",
                  }}
                  style={{ width: "100%" }}
                  onChange={(value) => handleChangeFieldValue({ id, value: value as Dayjs })}
                />
              )}
              {type === "number" && InputNumber && (
                <InputNumber size="large" autoFocus={!!focus} disabled={disabled} min={0} max={999999999999999} style={{ width: "100%" }} onChange={(value) => handleChangeFieldValue({ id, value })} />
              )}
              {type === "textarea" && (
                <Input.TextArea
                  ref={focus ? focusInputRef : undefined}
                  rows={5}
                  maxLength={maxLength}
                  showCount={!!maxLength}
                  disabled={disabled}
                  onChange={(event) => handleChangeFieldValue({ id, value: event.target.value })}
                />
              )}
              {type === "select" && Select && (
                <Select
                  size="large"
                  autoFocus={!!focus}
                  mode={multiple ? "multiple" : undefined}
                  disabled={disabled}
                  options={options?.map(({ option, label, label_translation, value }) => ({
                    label: option || (label_translation ? t(`fields.${label_translation}`) : label || value),
                    value,
                  }))}
                  showSearch={showSearch}
                  filterOption={showSearch ? handleFilterSelectOptions : undefined}
                  getPopupContainer={(triggerNode) => triggerNode.parentElement}
                  onChange={(value) => handleChangeFieldValue({ id, value: value as string | string[], multiple, type: "select" })}
                />
              )}
              {type === "period" && PeriodField && <PeriodField onChange={(value: Dayjs) => handleChangeFieldValue({ id, value })} />}
              {type === "radio-buttons" && RadioGroup && (
                <RadioGroup
                  className="w-full"
                  size="large"
                  optionType="button"
                  buttonStyle="solid"
                  options={options?.map(({ label, value }) => ({ label: t(`fields.${label}`), value }))}
                  onChange={(event) => handleChangeFieldValue({ id, value: event.target.value })}
                />
              )}
              {type === "file" && Upload && (
                <Upload listType="picture" multiple={!!multiple} maxCount={maxCount} accept={accept} beforeUpload={(file) => handleAddFile(file, { maxSize })} onRemove={handleRemoveFile}>
                  <Button icon={<SvgUpload className="h-4 w-4" />} size="large">
                    {t("buttons.upload")}
                  </Button>
                </Upload>
              )}
              {!["password", "period", "date", "number", "textarea", "select", "radio-buttons", "file"].includes(type) && (
                <Input
                  size="large"
                  ref={focus ? (focusInputRef as LegacyRef<InputRef>) : undefined}
                  type={type}
                  maxLength={maxLength}
                  disabled={disabled}
                  onChange={(event) => handleChangeFieldValue({ id, value: event.target.value })}
                />
              )}
            </Form.Item>
          );
        },
      )}
      <div className="mt-2 flex gap-4">
        <Button size="large" type="primary" htmlType="submit" loading={isLoading} className="w-1/3 grow" disabled={!isChangedFieldsData}>
          {t("buttons.submit")}
        </Button>
        <Button size="large" className="w-1/3 grow" disabled={!isChangedFieldsData} onClick={handleCancelForm}>
          {t("buttons.cancel")}
        </Button>
      </div>
    </Form>
  );
});

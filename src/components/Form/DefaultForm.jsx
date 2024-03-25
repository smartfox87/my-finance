import PropTypes from "prop-types";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Input, Select, DatePicker, InputNumber, Radio, Upload, message } from "antd";
import dayjs from "dayjs";
import { handleFilterSelectOptions } from "@/helpers/fields.js";
import { useLoading } from "@/hooks/loading.js";
import { PeriodField } from "@/components/Form/PeriodField.jsx";
import SvgUpload from "@/assets/sprite/upload.svg";
import { getFileSizeWithUnit } from "@/helpers/file.js";

export const DefaultForm = forwardRef(function DefaultForm({ fields, isResetAfterSave, isVisible = true, onSaveForm, onResetForm }, ref) {
  const { t } = useTranslation();
  const { TextArea } = Input;

  const propsFieldsValues = useMemo(
    () =>
      fields.map(({ type, id, value }) => {
        const item = { type, name: id };
        if (type === "file") item.fileList = value;
        else item.value = value && type === "date" ? dayjs(value) : value;
        return item;
      }),
    [fields],
  );
  const propsFieldsIds = useMemo(() => fields.map(({ id }) => id), [fields]);

  const [isLoading, setIsLoading] = useLoading(false);

  const focusInputRef = useRef(null);
  useLayoutEffect(() => {
    if (isVisible) setTimeout(() => focusInputRef.current?.focus());
  }, [isVisible]);

  const [fieldsValues, setFieldsValues] = useState(propsFieldsValues);

  useEffect(() => {
    setFieldsValues(propsFieldsValues);
  }, [propsFieldsValues]);

  const handleChangeFieldValue = useCallback(({ id, value: newValue, multiple, type }) => {
    setFieldsValues((oldFieldsValues) =>
      oldFieldsValues.map(({ name, value, fileList, type }) => {
        if (multiple && type === "select" && name === id) {
          if (!newValue?.length || (oldFieldsValues.find(({ name, value }) => name === id && !value.includes("all")) && newValue.includes("all"))) return { name, value: ["all"] };
          else return { name, value: newValue.filter((val) => val !== "all") };
        } else {
          const field = { name, fileList, type };
          if (value !== undefined) field.value = name === id ? newValue : value;
          return field;
        }
      }),
    );
  }, []);

  const isChangedFieldsData = JSON.stringify(propsFieldsValues) !== JSON.stringify(fieldsValues);

  const [form] = Form.useForm();
  const handleSubmitForm = async () => {
    try {
      const values = await form.validateFields(propsFieldsIds);
      setIsLoading(true);
      const processedValues = Object.keys(values).reduce((acc, key) => {
        if (key.includes("file") && Array.isArray(values[key])) acc[key] = values[key].map(({ originFileObj }) => originFileObj);
        else if (key.includes("date") && values[key]) acc[key] = values[key].format("YYYY-MM-DD");
        else if (Array.isArray(values[key])) acc[key] = values[key].filter((val) => val !== "all");
        else acc[key] = values[key];
        return acc;
      }, {});
      onSaveForm(processedValues).finally(() => {
        setIsLoading(false);
        if (isResetAfterSave) setFieldsValues(propsFieldsValues);
      });
    } catch (errorInfo) {
      console.warn("Failed:", errorInfo);
    }
  };

  const handleCancelForm = () => {
    if (onResetForm) onResetForm();
    setFieldsValues(propsFieldsValues);
  };

  useImperativeHandle(ref, () => ({ handleChangeFieldValue }));

  const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);
  const handleRemoveFile = (file) =>
    setFieldsValues((oldFieldsValues) => oldFieldsValues.map((field) => (field.type === "file" ? { ...field, fileList: field.fileList.filter(({ uid }) => uid !== file.uid) } : field)));
  const handleAddFile = (file, { maxSize }) => {
    if (file.size <= maxSize) return !!setFieldsValues((oldFieldsValues) => oldFieldsValues.map((field) => (field.type === "file" ? { ...field, fileList: field.fileList.concat([file]) } : field)));
    message.error(`${t("fields.errors.file_size")} ${getFileSizeWithUnit(maxSize)}`);
    return Upload.LIST_IGNORE;
  };

  return (
    <Form layout="vertical" form={form} fields={fieldsValues} className="flex w-full flex-col" onSubmit={handleSubmitForm}>
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
              rules={[
                required ? { required: true, message: t("fields.errors.required") } : null,
                type === "email" ? { type: "email", message: t("fields.errors.email") } : null,
                type === "number" ? { type: "number", message: t("fields.errors.number") } : null,
              ].filter(Boolean)}
              valuePropName={type === "file" ? "fileList" : "value"}
              getValueFromEvent={type === "file" ? normFile : (e) => e}
            >
              {type === "password" && (
                <Input.Password
                  ref={focus ? focusInputRef : null}
                  size="large"
                  maxLength={maxLength}
                  disabled={disabled}
                  onChange={(event) => handleChangeFieldValue({ id, value: event.target.value })}
                />
              )}
              {type === "date" && (
                <DatePicker
                  ref={focus ? focusInputRef : null}
                  size="large"
                  picker={picker}
                  disabledDate={disabledDate}
                  disabled={disabled}
                  placeholder={placeholder}
                  format={{
                    format: "YYYY-MM-DD",
                    type: "mask",
                  }}
                  style={{ width: "100%" }}
                  onChange={(value) => handleChangeFieldValue({ id, value })}
                />
              )}
              {type === "number" && (
                <InputNumber
                  ref={focus ? focusInputRef : null}
                  size="large"
                  disabled={disabled}
                  min={0}
                  max={100000000000000000}
                  style={{ width: "100%" }}
                  onChange={(value) => handleChangeFieldValue({ id, value })}
                />
              )}
              {type === "textarea" && (
                <TextArea
                  ref={focus ? focusInputRef : null}
                  rows={5}
                  maxLength={maxLength}
                  showCount={maxLength}
                  disabled={disabled}
                  onChange={(event) => handleChangeFieldValue({ id, value: event.target.value })}
                />
              )}
              {type === "select" && (
                <Select
                  size="large"
                  mode={multiple ? "multiple" : ""}
                  disabled={disabled}
                  ref={focus ? focusInputRef : null}
                  options={options?.map(({ option, label, label_translation, value }) => ({
                    label: option || (label_translation ? t(`fields.${label_translation}`) : label || value),
                    value,
                  }))}
                  showSearch={showSearch}
                  filterOption={showSearch ? handleFilterSelectOptions : null}
                  onChange={(value) => handleChangeFieldValue({ id, value, multiple, type: "select" })}
                />
              )}
              {type === "period" && <PeriodField onChange={(value) => handleChangeFieldValue({ id, value })} />}
              {type === "radio-buttons" && (
                <Radio.Group
                  className="w-full"
                  size="large"
                  optionType="button"
                  buttonStyle="solid"
                  options={options?.map(({ label, value }) => ({ label: t(`fields.${label}`), value }))}
                  onChange={(event) => handleChangeFieldValue({ id, value: event.target.value })}
                />
              )}
              {type === "file" && (
                <Upload listType="picture" multiple={!!multiple} maxCount={maxCount} accept={accept} beforeUpload={(file) => handleAddFile(file, { maxSize })} onRemove={handleRemoveFile}>
                  <Button icon={<SvgUpload className="h-4 w-4" />} size="large">
                    {t("buttons.upload")}
                  </Button>
                </Upload>
              )}
              {!["password", "period", "date", "number", "textarea", "select", "radio-buttons", "file"].includes(type) && (
                <Input
                  size="large"
                  ref={focus ? focusInputRef : null}
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
        <Button size="large" type="primary" loading={isLoading} className="w-1/3 grow" disabled={!isChangedFieldsData} onClick={handleSubmitForm}>
          {t("buttons.submit")}
        </Button>
        <Button size="large" variant="bordered" className="w-1/3 grow" disabled={!isChangedFieldsData} onClick={handleCancelForm}>
          {t("buttons.cancel")}
        </Button>
      </div>
    </Form>
  );
});

DefaultForm.propTypes = {
  fields: PropTypes.array,
  isResetAfterSave: PropTypes.bool,
  isVisible: PropTypes.bool,
  onSaveForm: PropTypes.func,
  onResetForm: PropTypes.func,
};

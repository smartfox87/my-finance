import { useTranslation } from "react-i18next";
import { DatePicker, Form } from "antd";
import type { DateFormField, FormFieldProps } from "@/types/form";

export const DatePickerField = ({ field, onChange }: FormFieldProps<DateFormField>) => {
  const { t } = useTranslation();

  return (
    <Form.Item label={t(`fields.${field.label}`)} name={field.id} rules={field.required ? [{ required: true, message: t("fields.errors.required") }] : undefined}>
      <DatePicker
        size="large"
        autoFocus={!!field.focus}
        picker={field.picker}
        disabledDate={field.disabledDate}
        disabled={field.disabled}
        placeholder={field.placeholder}
        getPopupContainer={(triggerNode) => triggerNode}
        format={{
          format: "YYYY-MM-DD",
          type: "mask",
        }}
        style={{ width: "100%" }}
        onChange={(value) => onChange({ id: field.id, type: field.type, value })}
      />
    </Form.Item>
  );
};

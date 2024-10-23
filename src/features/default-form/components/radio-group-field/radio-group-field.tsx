import { useTranslation } from "react-i18next";
import { Form, Radio } from "antd";
import type { RadioButtonsFormField } from "@/features/fields";
import type { FormFieldProps } from "../../types";

export const RadioGroupField = ({ field, onChange }: FormFieldProps<RadioButtonsFormField>) => {
  const { t } = useTranslation();

  return (
    <Form.Item label={t(`fields.${field.label}`)} name={field.id} key={field.id} rules={field.required ? [{ required: true, message: t("fields.errors.required") }] : undefined}>
      <Radio.Group
        className="w-full"
        size="large"
        disabled={field.disabled}
        optionType="button"
        buttonStyle="solid"
        options={field.options?.map(({ label, label_translation, value }) => ({ label: label ? label : t(`fields.${label_translation}`), value }))}
        onChange={(event) => onChange({ id: field.id, type: field.type, value: event.target.value })}
      />
    </Form.Item>
  );
};

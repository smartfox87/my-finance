import { useTranslation } from "react-i18next";
import { handleFilterSelectOptions } from "@/utils/handle-filter-select-options";
import { Form, Select } from "antd";
import type { SingleSelectValue } from "@/features/fields";
import type { SingleSelectFormField } from "@/features/fields";
import type { FormFieldProps } from "../../types";

export const SingleSelectField = ({ field, onChange }: FormFieldProps<SingleSelectFormField>) => {
  const { t } = useTranslation();

  return (
    <Form.Item label={t(`fields.${field.label}`)} name={field.id} rules={field.required ? [{ required: true, message: t("fields.errors.required") }] : undefined}>
      <Select
        size="large"
        autoFocus={!!field.focus}
        disabled={field.disabled}
        options={field.options?.map(({ label, label_translation, value }) => ({
          label: label_translation ? t(`fields.${label_translation}`) : label || value,
          value,
        }))}
        showSearch={field.showSearch}
        filterOption={field.showSearch ? handleFilterSelectOptions : undefined}
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        onChange={(value: SingleSelectValue) => onChange({ id: field.id, type: field.type, value })}
      />
    </Form.Item>
  );
};

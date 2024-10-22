import { useTranslation } from "react-i18next";
import { handleFilterSelectOptions } from "@/utils/handle-filter-select-options";
import { Form, Select } from "antd";
import type { MultiSelectValue } from "../../types";
import type { FormFieldProps, MultiSelectFormField } from "../../types";

export const MultiSelectField = ({ field, onChange }: FormFieldProps<MultiSelectFormField>) => {
  const { t } = useTranslation();

  return (
    <Form.Item label={t(`fields.${field.label}`)} name={field.id} rules={field.required ? [{ required: true, message: t("fields.errors.required") }] : undefined}>
      <Select
        size="large"
        autoFocus={!!field.focus}
        mode="multiple"
        disabled={field.disabled}
        options={field.options?.map(({ label, label_translation, value }) => ({
          label: label_translation ? t(`fields.${label_translation}`) : label || value,
          value,
        }))}
        showSearch={field.showSearch}
        filterOption={field.showSearch ? handleFilterSelectOptions : undefined}
        getPopupContainer={(triggerNode) => triggerNode.parentElement}
        onChange={(value: MultiSelectValue) => onChange({ id: field.id, type: field.type, value })}
      />
    </Form.Item>
  );
};

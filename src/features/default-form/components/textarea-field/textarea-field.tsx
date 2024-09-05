import { useTranslation } from "react-i18next";
import { useFieldFocus } from "@/hooks/field-focus";
import { useLayoutEffect } from "react";
import { Form, Input, type InputRef } from "antd";
import type { FormFieldProps, TextFormField } from "@/types/form";

export const TextareaField = ({ field, onChange }: FormFieldProps<TextFormField>) => {
  const { t } = useTranslation();

  const [focusFieldRef, mountFocusField] = useFieldFocus<InputRef>();
  useLayoutEffect(() => {
    mountFocusField(true);
    return () => mountFocusField(false);
  }, []);

  return (
    <Form.Item label={t(`fields.${field.label}`)} name={field.id} rules={field.required ? [{ required: true, message: t("fields.errors.required") }] : undefined}>
      <Input.TextArea
        ref={field.focus ? focusFieldRef : undefined}
        rows={5}
        maxLength={field.maxLength}
        showCount={!!field.maxLength}
        disabled={field.disabled}
        onChange={(event) => onChange({ id: field.id, type: field.type, value: event.target.value })}
      />
    </Form.Item>
  );
};

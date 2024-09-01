import { useTranslation } from "react-i18next";
import { useFieldFocus } from "@/hooks/field-focus";
import { type LegacyRef, useLayoutEffect } from "react";
import { Form, Input, InputRef } from "antd";
import type { FormFieldProps, TextFormField } from "@/types/form";

export const PasswordFormFieldComponent = ({ field, onChange }: FormFieldProps<TextFormField>) => {
  const { t } = useTranslation();

  const [focusFieldRef, mountFocusField] = useFieldFocus<InputRef>();
  useLayoutEffect(() => {
    mountFocusField(true);
    return () => mountFocusField(false);
  }, []);

  return (
    <Form.Item label={t(`fields.${field.label}`)} name={field.id} rules={field.required ? [{ required: true, message: t("fields.errors.required") }] : undefined}>
      <Input.Password
        ref={field.focus ? (focusFieldRef as LegacyRef<InputRef>) : undefined}
        size="large"
        maxLength={field.maxLength}
        disabled={field.disabled}
        onChange={(event) => onChange({ id: field.id, type: field.type, value: event.target.value })}
      />
    </Form.Item>
  );
};

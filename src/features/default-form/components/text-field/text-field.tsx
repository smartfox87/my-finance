import { useTranslation } from "react-i18next";
import { useFieldFocus } from "@/hooks/field-focus";
import { Form, Input, InputRef } from "antd";
import { type LegacyRef, useLayoutEffect } from "react";
import { type TextFormField, type FieldTranslationError, type FieldType, FieldTypes } from "@/features/fields";
import type { FormFieldProps, FormItemRule } from "../../types";

export const TextField = ({ field, onChange }: FormFieldProps<TextFormField>) => {
  const { t } = useTranslation();

  const [focusFieldRef, mountFocusField] = useFieldFocus<InputRef>();
  useLayoutEffect(() => {
    mountFocusField(true);
    return () => mountFocusField(false);
  }, []);

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
    <Form.Item label={t(`fields.${field.label}`)} name={field.id} rules={getFieldRules({ required: field.required, type: field.type })}>
      <Input
        size="large"
        ref={field.focus ? (focusFieldRef as LegacyRef<InputRef>) : undefined}
        type={field.type}
        maxLength={field.maxLength}
        disabled={field.disabled}
        onChange={(event) => onChange({ id: field.id, type: field.type, value: event.target.value })}
      />
    </Form.Item>
  );
};

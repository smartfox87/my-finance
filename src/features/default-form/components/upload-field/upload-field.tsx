import { useTranslation } from "react-i18next";
import SvgUpload from "@/assets/sprite/upload.svg";
import { getFileSizeWithUnit } from "../../utils";
import { showErrorMessage } from "@/utils/show-error-message";
import { Button, Form, Upload, type UploadFile } from "antd";
import { isUploadFilesArray } from "@/predicates/common";
import { FieldTypes } from "@/types/field";
import type { FileFormField, FileFormFieldId } from "@/types/form";
import type { FormFieldProps } from "../../types";

export const UploadField = ({ field, value, onChange }: FormFieldProps<FileFormField>) => {
  const { t } = useTranslation();

  const normFile = (e: { fileList: UploadFile[] }): UploadFile[] => (Array.isArray(e) ? e : e?.fileList);
  const handleRemoveFile = ({ id, file }: { id: FileFormFieldId; file: UploadFile }): void => {
    if (isUploadFilesArray(value)) onChange({ id, value: value.filter(({ uid }: { uid: string }) => uid !== file.uid), type: field.type });
  };

  const handleAddFile = async ({ id, file, maxSize = 20 * 1024 * 1024 }: { id: FileFormFieldId; file: UploadFile; maxSize?: number }): Promise<boolean | string> => {
    if (file.size && file.size <= maxSize) {
      if (isUploadFilesArray(value)) onChange({ id, value: value.concat(file), type: field.type });
      return true;
    }
    showErrorMessage(`${t("fields.errors.file_size")} ${getFileSizeWithUnit(maxSize)}`);
    return Upload.LIST_IGNORE;
  };

  return (
    <Form.Item
      label={t(`fields.${field.label}`)}
      name={field.id}
      rules={field.required ? [{ required: true, message: t("fields.errors.required") }] : undefined}
      valuePropName="fileList"
      getValueFromEvent={normFile}
    >
      {field.type === FieldTypes.FILE && (
        <Upload
          disabled={field.disabled}
          listType="picture"
          multiple={!!field.multiple}
          maxCount={field.maxCount}
          accept={field.accept}
          beforeUpload={(file) => handleAddFile({ id: field.id, file, maxSize: field.maxSize })}
          onRemove={(file) => handleRemoveFile({ id: field.id, file })}
        >
          <Button icon={<SvgUpload className="h-4 w-4" />} size="large">
            {t("buttons.upload")}
          </Button>
        </Upload>
      )}
    </Form.Item>
  );
};

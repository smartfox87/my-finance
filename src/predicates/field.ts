import { FieldId, FieldIds, FieldValues, MultiSelectValue, SingleSelectValue } from "@/types/field";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import { isNumber } from "@/predicates/common";
import { DatesPeriod, DatesPeriods } from "@/types/date";

export const isSelectAllValue = (value: any): value is FieldValues.ALL => value === FieldValues.ALL;

export const isMultiSelectValue = (value: any): value is MultiSelectValue => Array.isArray(value) && value.every((item) => isNumber(item) || isSelectAllValue(item));

export const isUploadFile = (value: any): value is UploadFile => ["uid", "name"].every((key) => value[key] !== undefined);

export const isUploadFileArray = (value: any): value is UploadFile[] => Array.isArray(value) && value.every((item) => isUploadFile(item));

export const isRcFile = (value: any): value is RcFile => "uid" in value && !("name" in value);

export const isRcFileArray = (value: any): value is RcFile[] => Array.isArray(value) && value.every((item) => isRcFile(item));

export const isDatesPeriod = (value: any): value is DatesPeriod => Object.values(DatesPeriods).includes(value);

export const isFieldId = (value: any): value is FieldId => Object.values(FieldIds).includes(value);

import { isNumber, isObject } from "@/predicates/common";
import { type DatesPeriod, DatesPeriods, FieldId, FieldIds, FieldValues, type MultiSelectValue } from "../types";
import type { RcFile, UploadFile } from "antd/es/upload/interface";

export const isSelectAllValue = (value: unknown): value is FieldValues.ALL => value === FieldValues.ALL;

export const isMultiSelectValue = (value: unknown): value is MultiSelectValue => Array.isArray(value) && value.every((item) => isNumber(item) || isSelectAllValue(item));

export const isUploadFile = (value: unknown): value is UploadFile => isObject(value) && ["uid", "name", "size", "type"].every((key) => value[key] !== undefined);

export const isUploadFileArray = (value: unknown): value is UploadFile[] => Array.isArray(value) && value.every((item) => isUploadFile(item));

export const isRcFile = (value: unknown): value is RcFile => isObject(value) && ["uid", "name", "size", "type"].every((key) => value[key] !== undefined);

export const isRcFileArray = (value: unknown): value is RcFile[] => Array.isArray(value) && value.every((item) => isRcFile(item));

export const isFieldId = (value: unknown): value is FieldId => !!Object.values(FieldIds).find((id) => id === value);

export const isDatesPeriod = (value: unknown): value is DatesPeriod => !!Object.values(DatesPeriods).find((period) => period === value);

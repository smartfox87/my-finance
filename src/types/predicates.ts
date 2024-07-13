import type { RcFile, UploadFile } from "antd/es/upload/interface";
import { type DatesPeriod, DatesPeriods } from "@/types/date";
import { FieldValues } from "@/types/field";
import { MultiSelectValue } from "@/types/field";

export const isString = (value: any): value is string => typeof value === "string";

export const isNumber = (value: any): value is number => typeof value === "number";

export const isStringNumber = (value: any): value is string | number => isString(value) || isNumber(value);

export const isMultiSelectValue = (value: any): value is MultiSelectValue => Array.isArray(value) && value.every((item) => typeof item === "number" || item === FieldValues.ALL);

export const isRcFile = (value: any): value is RcFile => "uid" in value && !("name" in value);

export const isRcFileArray = (value: any): value is RcFile[] => Array.isArray(value) && value.every((item) => isRcFile(item));

export const isUploadFile = (value: any): value is UploadFile => ["uid", "name"].every((key) => value[key] !== undefined);

export const isUploadFileArray = (value: any): value is UploadFile[] => Array.isArray(value) && value.every((item) => isUploadFile(item));

export const isDatesPeriod = (value: any): value is DatesPeriod => Object.values(DatesPeriods).includes(value);

export const isTruthy = <T>(value?: T | undefined | null | false): value is T => !!value;

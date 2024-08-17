import type { UploadFile } from "antd/es/upload/interface";

export const isTruthy = <T>(value?: T | undefined | null | false): value is T => !!value;

export const isString = (value: unknown): value is string => typeof value === "string";

export const isNumber = (value: unknown): value is number => typeof value === "number";

export const isStringNumber = (value: unknown): value is string | number => isString(value) || isNumber(value);

export const isObject = (value: unknown): value is Record<string, unknown> => !!value && !Array.isArray(value) && typeof value === "object";

export const isFile = (value: unknown): value is File => isObject(value) && ["name", "size", "type"].every((key) => key in value);

export const isFilesArray = (value: unknown): value is File[] => Array.isArray(value) && value.every((val) => isFile(val));

export const isUploadFile = (value: unknown): value is UploadFile => isObject(value) && ["name", "size", "type"].every((key) => key in value);

export const isUploadFilesArray = (value: unknown): value is UploadFile[] => Array.isArray(value) && value.every((val) => isUploadFile(val));

export const isError = (value: unknown): value is Error => isObject(value) && value instanceof Error;

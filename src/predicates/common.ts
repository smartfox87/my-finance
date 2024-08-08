export const isTruthy = <T>(value?: T | undefined | null | false): value is T => !!value;

export const isString = (value: any): value is string => typeof value === "string";

export const isNumber = (value: any): value is number => typeof value === "number";

export const isStringNumber = (value: any): value is string | number => isString(value) || isNumber(value);

export const isObject = (value: any): value is Record<string, any> => !!value && !Array.isArray(value) && typeof value === "object";

export const isFile = (value: any): value is File => isObject(value) && ["name", "size", "type"].every((key) => key in value);

export const isFilesArray = (value: any): value is File[] => Array.isArray(value) && value.every((val) => isFile(val));

export const isError = (value: any): value is Error => isObject(value) && value instanceof Error;

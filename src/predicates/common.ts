export const isTruthy = <T>(value?: T | undefined | null | false): value is T => !!value;

export const isString = (value: any): value is string => typeof value === "string";

export const isNumber = (value: any): value is number => typeof value === "number";

export const isStringNumber = (value: any): value is string | number => isString(value) || isNumber(value);

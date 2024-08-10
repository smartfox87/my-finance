import { type KeyboardEvent, isValidElement, ReactElement } from "react";
import { decimalsKeys, integerKeys, navigationKeys } from "@/constants/input";
import type { BaseOptionType } from "rc-select/es/Select";
import type { FlattenOptionData } from "rc-select/es/interface";
import type { SelectOption } from "@/types/field";

export const handleFilterSelectOptions = (inputValue: string, option: SelectOption & { label: string | ReactElement }): boolean => {
  if (isValidElement(option.label)) return option.label.props["data-text"]?.toLowerCase().includes(inputValue.toLowerCase());
  else return ((option.label as string) ?? "").toLowerCase().includes(inputValue.toLowerCase());
};

// todo fix internationalization
export const cutDecimals = (value: number | string | null, decimals: number = 2): string => {
  if (!value) return "";
  const [integer, decimal] = value.toString().split(".");
  if (!decimal?.length) return value.toString();
  return `${integer}.${decimal.slice(0, decimals)}`;
};

const allowedInputNumberKeys = [...integerKeys, ...decimalsKeys, ...navigationKeys];
export const handleKeyDownDecimalsValidation = (event: KeyboardEvent<HTMLInputElement>): void => {
  if (!allowedInputNumberKeys.includes(event.key) || (decimalsKeys.includes(event.key) && event.currentTarget.value.includes(event.key))) event.preventDefault();
};

export const handleKeyUpCutDecimals = (event: KeyboardEvent<HTMLInputElement>): void => {
  event.currentTarget.value = cutDecimals(event.currentTarget.value);
};

export const renderSelectOption = ({ label, value }: FlattenOptionData<BaseOptionType>): ReactElement => <span data-value={value}>{label}</span>;

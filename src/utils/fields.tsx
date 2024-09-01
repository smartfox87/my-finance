import { DECIMAL_KEYS, INTEGER_KEYS, NAVIGATION_KEYS } from "@/constants/input";
import { type KeyboardEvent, isValidElement, type ReactElement } from "react";
import type { BaseOptionType, DefaultOptionType, FilterFunc } from "rc-select/es/Select";
import type { FlattenOptionData } from "rc-select/es/interface";

export const handleFilterSelectOptions: FilterFunc<DefaultOptionType> = (inputValue, option) => {
  if (isValidElement(option?.label)) return option.label.props["data-text"]?.toLowerCase().includes(inputValue.toLowerCase());
  else return (option?.label ?? "").toString().toLowerCase().includes(inputValue.toLowerCase());
};

export const cutDecimals = (value: number | string | null, decimals: number = 2): string => {
  if (!value) return "";
  const [integer, decimal] = value.toString().split(".");
  if (!decimal?.length) return value.toString();
  return `${integer}.${decimal.slice(0, decimals)}`;
};

const allowedInputNumberKeys = [...INTEGER_KEYS, ...DECIMAL_KEYS, ...NAVIGATION_KEYS];
export const handleKeyDownDecimalsValidation = (event: KeyboardEvent<HTMLInputElement>): void => {
  if (!allowedInputNumberKeys.includes(event.key) || (DECIMAL_KEYS.includes(event.key) && event.currentTarget.value.includes(event.key))) event.preventDefault();
};

export const handleKeyUpCutDecimals = (event: KeyboardEvent<HTMLInputElement>): void => {
  event.currentTarget.value = cutDecimals(event.currentTarget.value);
};

export const renderSelectOption = ({ label, value }: FlattenOptionData<BaseOptionType>): ReactElement => <span data-value={value}>{label}</span>;

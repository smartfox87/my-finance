import { isValidElement, ReactElement } from "react";
import { decimalsKeys, integerKeys, navigationKeys } from "@/initial-data/input";
import { BaseOptionType } from "rc-select/es/Select";
import { FlattenOptionData } from "rc-select/es/interface";

export const handleFilterSelectOptions = (inputValue: string, option: any): boolean => {
  if (isValidElement(option.label)) return (option.label as ReactElement).props["data-text"]?.toLowerCase().includes(inputValue.toLowerCase());
  else return ((option.label as string) ?? "").toLowerCase().includes(inputValue.toLowerCase());
};

export const cutDecimals = (value: number | string | null, decimals: number = 2): string => {
  if (!value) return "";
  const [integer, decimal] = value.toString().split(".");
  if (!decimal?.length) return value.toString();
  return `${integer}.${decimal.slice(0, decimals)}`;
};

const allowedInputNumberKeys = [...integerKeys, ...decimalsKeys, ...navigationKeys];
export const handleKeyDownDecimalsValidation = (event: React.KeyboardEvent<HTMLInputElement>): void => {
  if (!allowedInputNumberKeys.includes(event.key) || (decimalsKeys.includes(event.key) && event.currentTarget.value.includes(event.key))) event.preventDefault();
};

export const handleKeyUpCutDecimals = (event: React.KeyboardEvent<HTMLInputElement>): void => {
  event.currentTarget.value = cutDecimals(event.currentTarget.value);
};

export const renderSelectOption = ({ label, value }: FlattenOptionData<BaseOptionType>): ReactElement => <span data-value={value}>{label}</span>;

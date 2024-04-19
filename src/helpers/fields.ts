import { isValidElement, ReactElement } from "react";

export const handleFilterSelectOptions = (inputValue: string, option: any): boolean => {
  if (isValidElement(option.label)) return (option.label as ReactElement).props["data-text"]?.toLowerCase().includes(inputValue.toLowerCase());
  else return ((option.label as string) ?? "").toLowerCase().includes(inputValue.toLowerCase());
};

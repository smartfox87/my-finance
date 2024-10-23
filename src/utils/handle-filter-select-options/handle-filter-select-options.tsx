import { isValidElement } from "react";
import type { DefaultOptionType, FilterFunc } from "rc-select/es/Select";

export const handleFilterSelectOptions: FilterFunc<DefaultOptionType> = (inputValue, option) => {
  if (isValidElement(option?.label)) return option.label.props["data-text"]?.toLowerCase().includes(inputValue.toLowerCase());
  else return (option?.label ?? "").toString().toLowerCase().includes(inputValue.toLowerCase());
};

import { isValidElement } from "react";

export const handleFilterSelectOptions = (input, { label }) => {
  if (isValidElement(label)) return label.props["data-text"]?.toLowerCase().includes(input.toLowerCase());
  else return (label ?? "").toLowerCase().includes(input.toLowerCase());
};

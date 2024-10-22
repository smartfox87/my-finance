import { DECIMAL_KEYS, INTEGER_KEYS, NAVIGATION_KEYS } from "@/constants/input";
import type { KeyboardEvent } from "react";

const allowedInputNumberKeys = [...INTEGER_KEYS, ...DECIMAL_KEYS, ...NAVIGATION_KEYS];
export const handleKeyDownDecimalsValidation = (event: KeyboardEvent<HTMLInputElement>): void => {
  if (!allowedInputNumberKeys.includes(event.key) || (DECIMAL_KEYS.includes(event.key) && event.currentTarget.value.includes(event.key))) event.preventDefault();
};

import { cutDecimals } from "../cut-decimals";
import type { KeyboardEvent } from "react";

export const handleKeyUpCutDecimals = (event: KeyboardEvent<HTMLInputElement>): void => {
  event.currentTarget.value = cutDecimals(event.currentTarget.value);
};

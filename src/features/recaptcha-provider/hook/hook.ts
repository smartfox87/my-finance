import { useContext } from "react";
import { RecaptchaContext } from "../provider";
import type { RecaptchaContextType } from "../types";

export const useRecaptcha = (): RecaptchaContextType => {
  const state = useContext(RecaptchaContext);
  if (!state) throw new Error("useRecaptcha must be used within a RecaptchaProvider");
  return state;
};

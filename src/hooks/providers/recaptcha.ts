import { useContext } from "react";
import { RecaptchaContext } from "@/providers/items/recaptcha";
import type { RecaptchaContextType } from "@/types/providers/recaptcha";

export const useRecaptcha = (): RecaptchaContextType => {
  const state = useContext(RecaptchaContext);
  if (!state) throw new Error("useRecaptcha must be used within a RecaptchaProvider");
  return state;
};

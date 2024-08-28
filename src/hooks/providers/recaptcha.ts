import { useContext } from "react";
import { RecaptchaContext } from "@/providers/recaptcha";
import type { RecaptchaContextType } from "@/types/providers/recaptchaProvider";

export const useRecaptcha = (): RecaptchaContextType => {
  const state = useContext(RecaptchaContext);
  if (!state) throw new Error("useRecaptcha must be used within a RecaptchaProvider");
  return state;
};

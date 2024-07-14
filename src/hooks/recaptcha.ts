import { useContext } from "react";
import { RecaptchaContext } from "@/providers/RecaptchaProvider";
import { RecaptchaContextType } from "@/types/recaptchaProvider";

export const useRecaptcha = (): RecaptchaContextType => {
  const state = useContext(RecaptchaContext);
  if (!state) throw new Error("useRecaptcha must be used within a RecaptchaProvider");
  return state;
};

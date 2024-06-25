import { useContext } from "react";
import { RecaptchaContext } from "@/providers/RecaptchaProvider";

export const useRecaptcha = () => {
  const state = useContext(RecaptchaContext);
  if (!state) throw new Error("useRecaptcha must be used within a RecaptchaProvider");
  return state;
};

import { useContext } from "react";
import { RecaptchaContext } from "@/providers/RecaptchaProvider.jsx";

export const useRecaptcha = () => useContext(RecaptchaContext);

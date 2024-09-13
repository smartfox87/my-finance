"use client";

import { RecaptchaProvider } from "@/providers/items/recaptcha";
import type { ReactNode } from "react";

export function AuthPagesProvider({ children }: { children: ReactNode }) {
  return <RecaptchaProvider>{children}</RecaptchaProvider>;
}

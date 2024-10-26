"use client";

import { RecaptchaProvider } from "@/features/recaptcha-provider";
import { UIProvider } from "@/features/ui-provider";
import type { ReactNode } from "react";

export function AuthPagesProvider({ children }: { children: ReactNode }) {
  return (
    <UIProvider isActive>
      <RecaptchaProvider>{children}</RecaptchaProvider>
    </UIProvider>
  );
}

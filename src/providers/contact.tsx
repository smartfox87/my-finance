"use client";

import { RecaptchaProvider } from "@/features/recaptcha-provider";
import { AntdProvider } from "@/features/antd-provider";
import type { ReactNode } from "react";

export function ContactPageProvider({ children }: { children: ReactNode }) {
  return (
    <AntdProvider isActive>
      <RecaptchaProvider>{children}</RecaptchaProvider>
    </AntdProvider>
  );
}

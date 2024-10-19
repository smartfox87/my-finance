"use client";

import { useCssVariables } from "@/hooks/css-variables";
import type { ComponentChildrenProps } from "@/types/common";

export function CSSVariablesInitialization({ children }: ComponentChildrenProps) {
  useCssVariables();

  return <>{children}</>;
}

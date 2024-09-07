"use client";

import { useEffect } from "react";
import { setCSSVariables } from "@/utils/css-variables";
import type { ComponentChildrenProps } from "@/types/common";

export function CSSVariablesInitialisation({ children }: ComponentChildrenProps) {
  useEffect((): void => {
    setCSSVariables();
  }, []);

  return <>{children}</>;
}

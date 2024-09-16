"use client";

import { selectUser } from "@/store/selectors/auth";
import { getUserId } from "@/utils/local-storage";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import type { ComponentChildrenProps } from "@/types/common";

export function AuthInitialization({ children }: ComponentChildrenProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect((): void => {
    if (getUserId() || user) import("@/utils/auth").then(({ handleAuthStateChange }) => handleAuthStateChange());
    if (getUserId() && !user) import("@/store/slices/auth").then(({ getUserSessionThunk }) => dispatch(getUserSessionThunk()));
  }, [user]);

  return <>{children}</>;
}
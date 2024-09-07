"use client";

import { selectUser } from "@/store/selectors/auth";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import type { ComponentChildrenProps } from "@/types/common";

export function LoadingAccounts({ children }: ComponentChildrenProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect((): void => {
    if (user) import("@/store/slices/accounts").then(({ getAccountsListThunk }) => dispatch(getAccountsListThunk()));
  }, [user]);

  return <>{children}</>;
}

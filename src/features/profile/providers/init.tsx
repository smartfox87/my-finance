"use client";

import { selectUser } from "@/store/selectors/auth";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import type { ComponentChildrenProps } from "@/types/common";

export function InitialProfile({ children }: ComponentChildrenProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect((): void => {
    if (user) import("../store").then(({ getProfileThunk }) => dispatch(getProfileThunk()));
  }, [user]);

  return <>{children}</>;
}

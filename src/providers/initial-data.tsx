"use client";

import { selectUser } from "@/store/selectors/auth";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { setCSSVariables } from "@/utils/css-variables";
import type { ComponentChildrenProps } from "@/types/common";

export function InitialData({ children }: ComponentChildrenProps) {
  const dispatch = useAppDispatch();
  const {
    i18n: { language },
  } = useTranslation();

  const user = useAppSelector(selectUser);

  useEffect((): void => {
    if (user) import("@/store/slices/references").then(({ getCurrenciesThunk }) => dispatch(getCurrenciesThunk()));
  }, [user]);

  useEffect((): void => {
    if (user)
      import("@/store/slices/references").then(({ getAccountTypesThunk, getCostCategoriesThunk, getIncomeCategoriesThunk }) =>
        Promise.all([dispatch(getAccountTypesThunk()), dispatch(getCostCategoriesThunk()), dispatch(getIncomeCategoriesThunk())]),
      );
  }, [language, user]);

  useEffect((): void => {
    setCSSVariables();
  }, []);

  return <>{children}</>;
}

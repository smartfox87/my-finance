"use client";

import { selectUser } from "@/store/selectors/auth";
import { useTranslation } from "react-i18next";
import { getUserId } from "@/utils/local-storage";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { setCSSVariables } from "@/utils/css-variables";
import type { ComponentChildrenProps } from "@/types/common";

export default function InitialData({ children }: ComponentChildrenProps) {
  const dispatch = useAppDispatch();
  const {
    i18n: { language },
  } = useTranslation();

  const user = useAppSelector(selectUser);

  const initProfile = async (): Promise<void> => {
    if (getUserId()) import("@/features/auth").then(({ handleAuthStateChange }) => handleAuthStateChange());
    if (getUserId() && !user) {
      const { getUserSessionThunk } = await import("@/features/auth");
      await dispatch(getUserSessionThunk());
    }
    if (!user) return;
    const [{ getAccountsListThunk }, { getProfileThunk }, { getCurrenciesThunk }] = await Promise.all([
      import("@/features/accounts"),
      import("@/features/profile"),
      import("@/store/slices/references"),
    ]);
    await Promise.all([dispatch(getCurrenciesThunk()), dispatch(getProfileThunk()), dispatch(getAccountsListThunk())]);
  };

  useEffect((): void => {
    initProfile();
  }, [user]);

  const initReferences = async (): Promise<void> => {
    if (!user) return;
    const { getAccountTypesThunk, getCostCategoriesThunk, getIncomeCategoriesThunk } = await import("@/store/slices/references");
    await Promise.all([dispatch(getAccountTypesThunk()), dispatch(getCostCategoriesThunk()), dispatch(getIncomeCategoriesThunk())]);
  };

  useEffect((): void => {
    initReferences();
  }, [language, user]);

  useEffect((): void => {
    setCSSVariables();
  }, []);

  return <>{children}</>;
}

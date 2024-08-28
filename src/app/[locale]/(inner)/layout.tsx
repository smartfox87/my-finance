"use client";

import { Header } from "@/components/layout/header/Header";
import { MainNav } from "@/components/layout/navigation/MainNav";
import { useViewport } from "@/hooks/viewport";
import { selectUser } from "@/store/selectors/auth";
import { useTranslation } from "react-i18next";
import { getUserId } from "@/helpers/localStorage";
import { MobileNav } from "@/components/layout/navigation/MobileNav";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import type { ComponentChildrenProps } from "@/types/common";
import { setCSSVariables } from "@/helpers/cssVariables";

export default function MainLayout({ children }: ComponentChildrenProps) {
  const dispatch = useAppDispatch();
  const { isTablet } = useViewport();
  const {
    i18n: { language },
  } = useTranslation();

  const user = useAppSelector(selectUser);

  const initProfile = async (): Promise<void> => {
    if (getUserId()) import("@/helpers/auth").then(({ handleAuthStateChange }) => handleAuthStateChange());
    if (getUserId() && !user) {
      const { getUserSessionThunk } = await import("@/store/slices/authSlice");
      await dispatch(getUserSessionThunk());
    }
    if (!user) return;
    const [{ getAccountsListThunk }, { getProfileThunk }, { getCurrenciesThunk }] = await Promise.all([
      import("@/store/slices/accountsSlice"),
      import("@/store/slices/profileSlice"),
      import("@/store/slices/referencesSlice"),
    ]);
    await Promise.all([dispatch(getCurrenciesThunk()), dispatch(getProfileThunk()), dispatch(getAccountsListThunk())]);
  };

  useEffect((): void => {
    initProfile();
  }, [user]);

  const initReferences = async (): Promise<void> => {
    if (!user) return;
    const { getAccountTypesThunk, getCostCategoriesThunk, getIncomeCategoriesThunk } = await import("@/store/slices/referencesSlice");
    await Promise.all([dispatch(getAccountTypesThunk()), dispatch(getCostCategoriesThunk()), dispatch(getIncomeCategoriesThunk())]);
  };

  useEffect((): void => {
    initReferences();
  }, [language, user]);

  useEffect((): void => {
    setCSSVariables();
  }, []);

  return (
    <>
      <Header />
      <main className="container flex grow">
        <MainNav className="container hidden !w-auto !pl-0 lg:block" />
        <div className="relative flex min-w-0 grow flex-col py-4 md:py-6 lg:ml-6">{children}</div>
      </main>
      <div className="sticky bottom-0 z-30 bg-white dark:bg-dark">{isTablet && <MobileNav />}</div>
    </>
  );
}

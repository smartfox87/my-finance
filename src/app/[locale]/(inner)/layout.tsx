"use client";

import { Header } from "@/components/Layout/Header/Header";
import { MainNav } from "@/components/Layout/MainNav";
import { useViewport } from "@/hooks/viewport";
import { ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/auth";
import { useTranslation } from "react-i18next";
import { getUserId } from "@/helpers/localStorage";
import { MobileNav } from "@/components/Layout/MobileNav";
import { useAppDispatch } from "@/hooks/redux";

export default function MainLayout({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();
  const { isTablet } = useViewport();
  const {
    i18n: { language },
  } = useTranslation();

  const user = useSelector(selectUser);

  const initProfile = async () => {
    if (getUserId()) import("@/api/auth").then(({ handleAuthStateChange }) => handleAuthStateChange());
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
  useEffect(() => {
    initProfile();
  }, [user]);

  const initReferences = async () => {
    if (!user) return;
    const { getAccountTypesThunk, getCostCategoriesThunk, getIncomeCategoriesThunk } = await import("@/store/slices/referencesSlice");
    await Promise.all([dispatch(getAccountTypesThunk()), dispatch(getCostCategoriesThunk()), dispatch(getIncomeCategoriesThunk())]);
  };
  useEffect(() => {
    initReferences();
  }, [language, user]);

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

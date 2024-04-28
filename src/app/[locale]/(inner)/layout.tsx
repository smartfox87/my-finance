"use client";

import { Header } from "@/components/Layout/Header/Header.jsx";
import { MainNav } from "@/components/Layout/MainNav";
import { useViewport } from "@/hooks/viewport.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/auth.js";
import { useTranslation } from "react-i18next";
import { useInjectReducer } from "@/hooks/injectReducer";
import { getUserId } from "@/helpers/localStorage.js";
import { MobileNav } from "@/components/Layout/MobileNav";
import { ReactNodeLike } from "prop-types";
import { getAccountsListThunk } from "@/store/accountsSlice";
import { useAppDispatch } from "@/hooks/redux";
import { getProfileThunk } from "@/store/profileSlice";
import { getAccountTypesThunk, getCostCategoriesThunk, getCurrenciesThunk, getIncomeCategoriesThunk } from "@/store/referencesSlice";

export default function MainLayout({ children }: { children: ReactNodeLike }) {
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();
  const { viewport } = useViewport();
  const {
    i18n: { language },
  } = useTranslation();

  const user = useSelector(selectUser);
  const { injectReducer } = useInjectReducer();

  const initProfile = async () => {
    if (getUserId() && !user) {
      const { getUserSessionThunk } = await injectReducer("auth");
      await dispatch(getUserSessionThunk());
    }
    if (!user) return;
    await import("@/store/accountsSlice");
    await import("@/store/profileSlice");
    await import("@/store/referencesSlice");
    await Promise.all([appDispatch(getCurrenciesThunk()), appDispatch(getProfileThunk()), appDispatch(getAccountsListThunk())]);
  };
  useEffect(() => {
    initProfile();
  }, [user]);

  const initReferences = async () => {
    if (!user) return;
    await Promise.all([appDispatch(getAccountTypesThunk()), appDispatch(getCostCategoriesThunk()), appDispatch(getIncomeCategoriesThunk())]);
  };
  useEffect(() => {
    initReferences();
  }, [language, user]);

  return (
    <>
      <Header />
      <main className="container flex grow">
        <MainNav className="hidden lg:block" />
        <div className="relative flex min-w-0 grow flex-col py-4 md:py-6 lg:ml-6">{children}</div>
      </main>
      <div className="sticky bottom-0 z-30 bg-white dark:bg-dark">{["sm", "xs", "xxs"].includes(viewport) && <MobileNav />}</div>
    </>
  );
}

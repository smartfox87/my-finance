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

export default function MainLayout({ children }: { children: ReactNodeLike }) {
  const dispatch = useDispatch();
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
    const [{ getCurrenciesThunk }, { getProfileThunk }, { getAccountsListThunk }] = await Promise.all([injectReducer("references"), injectReducer("profile"), injectReducer("accounts")]);
    await Promise.all([dispatch(getCurrenciesThunk()), dispatch(getProfileThunk()), dispatch(getAccountsListThunk())]);
  };
  useEffect(() => {
    initProfile();
  }, [user]);

  const initReferences = async () => {
    if (!user) return;
    const { getCostCategoriesThunk, getAccountTypesThunk, getIncomeCategoriesThunk } = await injectReducer("references");
    await Promise.all([dispatch(getAccountTypesThunk()), dispatch(getCostCategoriesThunk()), dispatch(getIncomeCategoriesThunk())]);
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

"use client";

import { Header } from "@/components/Layout/Header/Header.jsx";
import { MainNav } from "@/components/Layout/MainNav.jsx";
import { useViewport } from "@/hooks/viewport.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Preloader } from "@/components/Layout/Preloader.jsx";
import { selectUser } from "@/store/selectors/auth.js";
import { useTranslation } from "react-i18next";
import { useInjectReducer } from "@/hooks/injectReducer.js";
import { getUserId } from "@/helpers/localStorage.js";
import { MobileNav } from "@/components/Layout/MobileNav.jsx";
import { usePage } from "@/hooks/page.js";
import { ReactNodeLike } from "prop-types";

export default function MainLayout({ children }: { children: ReactNodeLike }) {
  const dispatch = useDispatch();
  const { viewport } = useViewport();
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { page } = usePage();

  const user = useSelector(selectUser);
  const { injectReducer } = useInjectReducer();
  const [isLoadingReferences, setIsLoadingReferences] = useState(true);

  const initProfile = async () => {
    if (getUserId() && !user) {
      const { getUserSessionThunk } = await injectReducer("auth");
      await dispatch(getUserSessionThunk());
    }
    if (!user) return;
    setIsLoadingReferences(true);
    const [{ getCurrenciesThunk }, { getProfileThunk }, { getAccountsListThunk }] = await Promise.all([injectReducer("references"), injectReducer("profile"), injectReducer("accounts")]);
    Promise.all([dispatch(getCurrenciesThunk()), dispatch(getProfileThunk()), dispatch(getAccountsListThunk())]).finally(() => setIsLoadingReferences(false));
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
      <div className="container flex grow">
        {["xl", "lg", "md"].includes(viewport) && <MainNav />}
        <div className="relative flex min-w-0 grow flex-col py-4 md:py-6 lg:ml-6">
          <Preloader isLoading={isLoadingReferences}>{!isLoadingReferences && children}</Preloader>
        </div>
      </div>
      <div className="sticky bottom-0 z-30 bg-white dark:bg-dark">{["sm", "xs", "xxs"].includes(viewport) && <MobileNav />}</div>
    </>
  );
}

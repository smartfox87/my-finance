"use client";

import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { toggleDayjsLocale } from "@/helpers/date";
import { AntdLocale, AntdLocales, isStringLocale, Locale, Locales } from "@/types/locales";
import { i18nConfig } from "../../i18nConfig";
import { locales } from "@/constants/router";
import { useParams, usePathname, useRouter } from "next/navigation";

interface LocaleContextType {
  antdLocale: AntdLocale | undefined;
  changeLocale: (lang: Locale) => Promise<void>;
}

const getAntdLocale = (lang: Locale): Promise<AntdLocale> => import(`antd/lib/locale/${AntdLocales[lang]}`).then((module) => module.default);

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();
  const languageCode = language.substring(0, 2);
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();

  const [antdLocale, setAntdLocale] = useState<AntdLocale | undefined>();
  const changeLocale = useCallback(
    async (lang: Locale): Promise<void> => {
      if (!isStringLocale(languageCode) || (isStringLocale(languageCode) && !locales.includes(languageCode))) return;

      await changeLanguage(lang);
      setAntdLocale(await getAntdLocale(lang));
      await toggleDayjsLocale(lang);

      const days = 30;
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = date.toUTCString();
      document.cookie = `NEXT_LOCALE=${lang};expires=${expires};path=/`;

      if (languageCode === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) router.push(`/${lang}${pathname}`);
      else router.push(pathname.replace(`/${languageCode}`, `/${lang}`));
    },
    [language, locale, pathname],
  );

  useEffect(() => {
    if (locale && isStringLocale(locale) && languageCode !== i18nConfig.defaultLocale && locales.includes(locale)) changeLocale(locale);
  }, []);

  const contextValue = useMemo(() => ({ antdLocale, changeLocale }), [antdLocale, changeLocale]);

  return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
};

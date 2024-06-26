import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { setLanguage } from "@/store/commonSlice.js";
import { useTranslation } from "react-i18next";
import { store } from "@/store";
import { toggleDayjsLocale } from "@/helpers/date";
import { locales } from "@/constants/router";
import { Locale } from "@/types/locales";
import { AntdLocale } from "@/constants/antd-locales";

interface LocaleContextType {
  locale: AntdLocale | null;
  changeLocale: (lang: Locale) => Promise<void>;
}

export const languages: Record<Locale, AntdLocale | null> = Object.assign({}, ...locales.map((lang) => ({ [lang]: null })));

const getLocale = async (lang: Locale): Promise<AntdLocale | null> => {
  if (languages[lang] !== null) return languages[lang];
  return await import(`@/constants/antd-locales`).then((module) => module.default[lang]);
};

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();
  const dispatch = store.dispatch;

  const [locale, setLocale] = useState<AntdLocale | null>(null);
  const changeLocale = useCallback(
    async (lang: Locale) => {
      if (!language.includes(lang)) await changeLanguage(lang);
      dispatch(setLanguage(lang));
      const antdLocale = await getLocale(lang);
      setLocale(antdLocale);
      await toggleDayjsLocale(lang);
    },
    [language],
  );

  useEffect(() => {
    changeLocale(language);
  }, []);

  const contextValue = useMemo(() => ({ locale, changeLocale }), [locale, changeLocale]);

  return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
};

import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { setLanguage } from "@/store/commonSlice.js";
import { useTranslation } from "react-i18next";
import { store } from "@/store";
import { toggleDayjsLocale } from "@/helpers/date";
import { AntdLocale, AntdLocales, Locale, Locales } from "@/types/locales";

interface LocaleContextType {
  locale: AntdLocale | undefined;
  changeLocale: (lang: Locale) => Promise<void>;
}

const getLocale = (lang: Locale): Promise<AntdLocale> => import(`antd/lib/locale/${AntdLocales[lang]}`).then((module) => module.default);

export const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();
  const dispatch = store.dispatch;

  const [locale, setLocale] = useState<AntdLocale | undefined>();
  const changeLocale = useCallback(
    async (lang: Locale): Promise<void> => {
      if (!language.includes(lang)) await changeLanguage(lang);
      dispatch(setLanguage(lang));
      const antdLocale = await getLocale(lang);
      setLocale(antdLocale);
      await toggleDayjsLocale(lang);
    },
    [language],
  );

  useEffect(() => {
    if (language !== Locales.EN) changeLocale(language);
  }, []);

  const contextValue = useMemo(() => ({ locale, changeLocale }), [locale, changeLocale]);

  return <LocaleContext.Provider value={contextValue}>{children}</LocaleContext.Provider>;
};

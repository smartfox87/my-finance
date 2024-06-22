import { createContext, ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import { setLanguage } from "@/store/commonSlice.js";
import { useTranslation } from "react-i18next";
import { store } from "@/store";
import { toggleDayjsLocale } from "@/helpers/date";
import { locales } from "@/constants/router";
import type { Locale } from "@/types/router";

export const languages = locales.reduce((acc: Record<Locale, any>, lang) => ({ ...acc, [lang]: null }), {});
const getLocale = async (lang: Locale) => (languages[lang] ? languages[lang] : (languages[lang] = await import(`@/constants/antd-locales`).then((module) => module[lang]?.default)));
export const LocaleContext = createContext({ locale: Locale, changeLocale: () => Promise.resolve() });

export const LocaleProvider = ({ children }: { children: ReactElement }) => {
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();
  const dispatch = store.dispatch;

  const [locale, setLocale] = useState(getLocale(language));
  const changeLocale = useCallback(
    async (lang) => {
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

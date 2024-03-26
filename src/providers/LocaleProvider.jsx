import { createContext, useCallback, useEffect, useState } from "react";
import { setLanguage } from "@/store/commonSlice.js";
import { useTranslation } from "react-i18next";
import { store } from "@/store/index.js";
import i18nConfig from "../../i18nConfig";

export const languages = i18nConfig.locales.reduce((acc, lang) => ({ ...acc, [lang]: null }), {});
const getLocale = async (lang) => (languages[lang] ? languages[lang] : (languages[lang] = await import(`@/initial-data/antd-locales`).then((module) => module[lang])));
export const LocaleContext = createContext({ locale: null, changeLocale: () => {} });

export const LocaleProvider = ({ children }) => {
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
    },
    [language],
  );

  useEffect(() => {
    changeLocale(language);
  }, []);

  return <LocaleContext.Provider value={{ locale, changeLocale }}>{children}</LocaleContext.Provider>;
};

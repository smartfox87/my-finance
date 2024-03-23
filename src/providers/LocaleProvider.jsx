import { createContext, useCallback, useEffect, useState } from "react";
import { setLanguage } from "@/store/commonSlice.js";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { store } from "@/store/index.js";

export const languages = { en: null, ru: null };
const getLocale = async (lang) => (languages[lang] ? languages[lang] : (languages[lang] = await import(`@/initial-data/antd-locales`).then((module) => module[lang])));
export const LocaleContext = createContext({});

export const LocaleProvider = ({ children }) => {
  const {
    i18n: { language, changeLanguage },
  } = useTranslation();
  const dispatch = store.dispatch;

  const [locale, setLocale] = useState(getLocale(language));
  const changeLocale = useCallback(
    async (lang) => {
      if (!language.includes(lang)) changeLanguage(lang);
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

LocaleProvider.propTypes = {
  children: PropTypes.node,
};

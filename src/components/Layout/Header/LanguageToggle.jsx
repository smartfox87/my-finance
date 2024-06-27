import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { SimpleSelect } from "@/components/Form/SimpleSelect.jsx";
import { useLocale } from "@/hooks/locale";
import { locales } from "@/constants/router";

export const LanguageToggle = () => {
  const {
    i18n: { language },
  } = useTranslation();
  const languageCode = language.substring(0, 2);

  const { changeLocale } = useLocale();
  const options = useMemo(() => Object.values(locales)?.map((locale) => ({ label: locale, value: locale })), []);

  return <SimpleSelect value={languageCode} options={options} onChange={changeLocale} className="w-[58px]" />;
};

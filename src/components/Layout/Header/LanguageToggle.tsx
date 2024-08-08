import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { SimpleSelect } from "@/components/Form/SimpleSelect";
import { useLocale } from "@/hooks/providers/locale";
import { locales } from "@/constants/router";
import { SimpleSelectValue } from "@/types/select";
import { isLocale } from "@/predicates/locales";
import { isString } from "@/predicates/common";

export const LanguageToggle = () => {
  const {
    i18n: { language },
  } = useTranslation();
  const languageCode = language.substring(0, 2);

  const { changeLocale } = useLocale();
  const options = useMemo(() => Object.values(locales)?.map((locale) => ({ label: locale, value: locale })), []);

  const handleLocaleChange = (value: SimpleSelectValue) => {
    if (isString(value) && isLocale(value)) changeLocale(value);
  };

  return <SimpleSelect value={languageCode} options={options} className="w-[58px]" dataCy="locale-toggle" onChange={handleLocaleChange} />;
};

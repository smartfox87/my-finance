import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import { SimpleSelect } from "../simple-select";
import { useLocale } from "@/features/locale-provider";
import { LOCALES } from "@/constants/config";
import { isString } from "@/predicates/common";
import { isStringLocale } from "@/predicates/locale";
import type { SimpleSelectValue } from "@/features/main-layout/types/select";

export const LanguageToggle = () => {
  const {
    i18n: { language },
  } = useTranslation();
  const languageCode = language.substring(0, 2);

  const { changeLocale } = useLocale();
  const options = useMemo(() => Object.values(LOCALES)?.map((locale) => ({ label: locale, value: locale })), []);

  const handleLocaleChange = (value: SimpleSelectValue): void => {
    if (isString(value) && isStringLocale(value)) changeLocale(value);
  };

  return <SimpleSelect value={languageCode} options={options} className="w-[58px]" dataCy="locale-toggle" onChange={handleLocaleChange} />;
};

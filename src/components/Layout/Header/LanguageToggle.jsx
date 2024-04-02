import { useTranslation } from "react-i18next";
import { useEffect, useMemo } from "react";
import { SimpleSelect } from "@/components/Form/SimpleSelect.jsx";
import { languages } from "@/providers/LocaleProvider.jsx";
import { useLocale } from "@/hooks/locale";
import { useParams, usePathname, useRouter } from "next/navigation";
import { i18nConfig } from "../../../../i18nConfig";

export const LanguageToggle = () => {
  const {
    i18n: { language },
  } = useTranslation();
  const router = useRouter();
  const { locale } = useParams();
  const pathname = usePathname();
  const languageCode = language.substring(0, 2);

  const { changeLocale } = useLocale();
  const options = useMemo(() => Object.keys(languages)?.map((locale) => ({ label: locale, value: locale })), []);
  const handleChange = (code) => {
    if (languageCode === code) return;

    changeLocale(code);

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${code};expires=${expires};path=/`;

    // redirect to the new locale path
    if (language === i18nConfig.defaultLocale && !i18nConfig.prefixDefault) {
      router.push("/" + code + pathname);
    } else {
      router.push(pathname.replace(`/${language}`, `/${code}`));
    }
    router.refresh();
  };

  useEffect(() => {
    if (locale && languageCode !== locale && Object.keys(languages).includes(locale)) changeLocale(locale);
  }, []);

  return <SimpleSelect value={languageCode} options={options} onChange={handleChange} className="w-[58px]" />;
};

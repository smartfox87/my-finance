import { I18nextProvider } from "react-i18next";
import { createInstance, Resource } from "i18next";
import { initTranslations } from "@/i18n";
import { useParams } from "next/navigation";
import { ReactNode } from "react";
import { isStringLocale } from "@/predicates/locale";

export function I18nProvider({ children, resources }: { children: ReactNode; resources: Resource }) {
  const i18nInstance = createInstance();
  const { locale } = useParams();

  if (isStringLocale(locale)) initTranslations({ locale, i18nInstance, resources });

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}

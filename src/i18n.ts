import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { i18nConfig } from "../i18nConfig";
import { ALL_I18N_NAMESPACES } from "@/constants/config";
import { createInstance } from "i18next";
import type { I18nNamespace, Locale } from "@/types/locales";
import type { I18nProps, I18nRef, I18nResult } from "@/types/i18n";

export const i18nRef: I18nRef = {};

export async function initTranslations({ locale, namespaces = ALL_I18N_NAMESPACES, i18nInstance, resources }: I18nProps): Promise<I18nResult> {
  const instance = i18nInstance || createInstance();
  instance.use(initReactI18next);

  if (!resources) instance.use(resourcesToBackend((language: Locale, namespace: I18nNamespace) => import(`../locales/${language}/${namespace}.json`)));

  await instance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
  });

  i18nRef.t = instance.t;
  i18nRef.locale = locale;

  return {
    i18n: instance,
    resources: instance.services.resourceStore.data,
    t: instance.t,
  };
}

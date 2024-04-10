import { createInstance, i18n, Resource } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { i18nConfig, Locale } from "../i18nConfig";

export const i18nRef: { i18n?: i18n; resources?: Resource; t?: i18n["t"]; locale?: Locale } = {};

export default async function initTranslations(locale: Locale, namespaces: string[], i18nInstance?: i18n, resources?: Resource) {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) i18nInstance.use(resourcesToBackend((language: Locale, namespace: string) => import(`../locales/${language}/${namespace}.json`)));

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : [locale],
  });

  if (!i18nRef.i18n) {
    i18nRef.i18n = i18nInstance;
    i18nRef.resources = i18nInstance.services.resourceStore.data;
    i18nRef.t = i18nInstance.t;
    i18nRef.locale = locale;
  }

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t,
  };
}

import { createInstance, i18n, Resource } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { i18nConfig } from "../i18nConfig";
import type { I18nNamespace, Locale } from "@/types/locales";

export const i18nRef: { resources?: Resource; t?: i18n["t"]; locale?: Locale } = {};

export default async function initTranslations(locale: Locale, namespaces: I18nNamespace[], i18nInstance?: i18n, resources?: Resource) {
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
    preload: resources ? [] : [locale],
  });

  i18nRef.resources = instance.services.resourceStore.data;
  i18nRef.t = instance.t;
  i18nRef.locale = locale;

  return {
    i18n: instance,
    resources: instance.services.resourceStore.data,
    t: instance.t,
  };
}

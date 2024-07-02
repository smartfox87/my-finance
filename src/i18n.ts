import { createInstance, i18n, Resource, TFunction } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { i18nConfig } from "../i18nConfig";
import { allI18nNamespaces } from "@/constants/locales";
import { I18nNamespace, Locale } from "@/types/locales";

interface I18nRef {
  t?: TFunction;
  locale?: Locale;
}

interface Props {
  locale: Locale;
  namespaces?: I18nNamespace[];
  i18nInstance?: i18n;
  resources?: Resource;
}

interface Result {
  i18n: i18n;
  t: TFunction;
  resources: Resource;
}

export const i18nRef: I18nRef = {};

export async function initTranslations({ locale, namespaces = allI18nNamespaces, i18nInstance, resources }: Props): Promise<Result> {
  console.log("11111111111111111111111111111", locale, namespaces, !!i18nInstance, !!resources);
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

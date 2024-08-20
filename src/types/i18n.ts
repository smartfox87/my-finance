import type { i18n, Resource, TFunction } from "i18next";
import type { I18nNamespace, Locale } from "@/types/locales";

export type I18nRef = {
  t?: TFunction;
  locale?: Locale;
};

export type I18nProps = {
  locale: Locale;
  namespaces?: I18nNamespace[];
  i18nInstance?: i18n;
  resources?: Resource;
};

export type I18nResult = {
  i18n: i18n;
  t: TFunction;
  resources: Resource;
};

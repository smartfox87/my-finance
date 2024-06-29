import "i18next";
import common from "../../locales/en/common.json";
import { Callback, TFunction } from "i18next";
import { Locale, I18nNamespace } from "@/types/locales";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: I18nNamespace.COMMON;
    resources: {
      [I18nNamespace.COMMON]: typeof common;
    };
  }
  interface i18n {
    language: Locale;
    languages: Locale[];
    changeLanguage(lang: Locale, callback?: Callback): Promise<TFunction>;
  }
}

import "i18next";
import common from "../../locales/en/common.json";
import { Callback, TFunction } from "i18next";
import { Namespaces } from "@/types/i18n";
import { Locale } from "@/types/locales";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: Namespaces.COMMON;
    resources: {
      [Namespaces.COMMON]: typeof common;
    };
  }
  interface i18n {
    language: Locale;
    languages: Locale[];
    changeLanguage(lang: Locale, callback?: Callback): Promise<TFunction>;
  }
}

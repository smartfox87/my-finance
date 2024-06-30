import "i18next";
import common from "../../locales/en/common.json";
import { I18nNamespace } from "@/types/locales";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: I18nNamespace.COMMON;
    resources: {
      [I18nNamespace.COMMON]: typeof common;
    };
  }
}

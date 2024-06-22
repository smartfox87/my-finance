import "i18next";
import common from "../../locales/en/common.json";
// import { TFunction } from "i18next";
import { Namespaces } from "@/types/i18n";
import { Locales } from "@/types/router";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: Namespaces.COMMON;
    locales: Locales;
    languages: Locales;
    resources: {
      common: typeof common;
    };
  }
}
// t: TFunction<Namespaces.COMMON>;

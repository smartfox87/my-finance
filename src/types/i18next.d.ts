import "i18next";
import common from "../../locales/en/common.json";
// import { TFunction } from "i18next";
import { Namespaces } from "@/types/i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: Namespaces.COMMON;
    resources: {
      common: typeof common;
    };
  }
}
// t: TFunction<Namespaces.COMMON>;

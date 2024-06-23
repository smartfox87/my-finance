import "i18next";
import common from "../../locales/en/common.json";
import home from "../../locales/en/home.json";
import accounts from "../../locales/en/accounts.json";
import incomes from "../../locales/en/incomes.json";
import expenses from "../../locales/en/expenses.json";
import budgets from "../../locales/en/budgets.json";
import statistics from "../../locales/en/statistics.json";
import contact from "../../locales/en/contact.json";
import profile from "../../locales/en/profile.json";
import settings from "../../locales/en/settings.json";
import { Callback, TFunction } from "i18next";
import { Namespaces } from "@/types/i18n";
import { Locale } from "@/types/router";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: Namespaces.COMMON;
    resources: {
      [Namespaces.COMMON]: typeof common;
      [Namespaces.HOME]: typeof home;
      [Namespaces.ACCOUNTS]: typeof accounts;
      [Namespaces.INCOMES]: typeof incomes;
      [Namespaces.EXPENSES]: typeof expenses;
      [Namespaces.BUDGETS]: typeof budgets;
      [Namespaces.STATISTICS]: typeof statistics;
      [Namespaces.CONTACT]: typeof contact;
      [Namespaces.PROFILE]: typeof profile;
      [Namespaces.SETTINGS]: typeof settings;
    };
  }
  interface i18n {
    language: Locale;
    languages: Locale[];
    changeLanguage(lang: Locale, callback?: Callback): Promise<TFunction>;
  }
}

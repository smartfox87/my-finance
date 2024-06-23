import type { RequireAtLeastOne } from "type-fest";

export enum Pages {
  HOME = "home",
  ACCOUNTS = "accounts",
  INCOMES = "incomes",
  EXPENSES = "expenses",
  BUDGETS = "budgets",
  STATISTICS = "statistics",
  CONTACT = "contact",
  PROFILE = "profile",
  SETTINGS = "settings",
}
export type Page = `${Pages}`;

export enum OtherNamespaces {
  COMMON = "common",
}
export const Namespaces = {
  ...Pages,
  ...OtherNamespaces,
};
export type Namespaces = typeof Namespaces;
export type Namespace = Namespaces[keyof Namespaces];

export interface Dictionary {
  [Namespaces.COMMON]: typeof import("../fixtures/locales/en/common.json");
  [Namespaces.HOME]: typeof import("../fixtures/locales/en/home.json");
  [Namespaces.ACCOUNTS]: typeof import("../fixtures/locales/en/accounts.json");
  [Namespaces.INCOMES]: typeof import("../fixtures/locales/en/incomes.json");
  [Namespaces.EXPENSES]: typeof import("../fixtures/locales/en/expenses.json");
  [Namespaces.BUDGETS]: typeof import("../fixtures/locales/en/budgets.json");
  [Namespaces.STATISTICS]: typeof import("../fixtures/locales/en/statistics.json");
  [Namespaces.CONTACT]: typeof import("../fixtures/locales/en/contact.json");
  [Namespaces.PROFILE]: typeof import("../fixtures/locales/en/profile.json");
  [Namespaces.SETTINGS]: typeof import("../fixtures/locales/en/settings.json");
}

export enum SortProp {
  NAME = "name",
  DATE = "date",
  AMOUNT = "amount",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

interface RequiredSortItem {
  created: string;
}

type AnySortItem = {
  [key in SortProp]?: string;
};

export type SortItem = RequiredSortItem & RequireAtLeastOne<AnySortItem, SortProp>;

export interface SelectedOptionData {
  label: string;
  value: number | string;
}

export type SelectedOptionsData = SelectedOptionData[];

export type FilterPropValues = string[];

export type FilteredSinglePropItems = string[];

export type FilteredMultiPropsItems = string[][];

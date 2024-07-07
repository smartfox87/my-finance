import dictionary from "../fixtures/locales/en/common.json";

type AtLeastOneProp<T, K extends keyof T = keyof T> = {
  [Key in K]: Required<Pick<T, Key>> & Partial<Omit<T, Key>>;
}[K];

export type Dictionary = typeof dictionary;

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

export enum Locales {
  EN = "en",
  DE = "de",
  IT = "it",
  ES = "es",
  FR = "fr",
  PL = "pl",
  ZH = "zh",
  HI = "hi",
  RU = "ru",
}

export type Locale = `${Locales}`;

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

export type SortItem = RequiredSortItem & AtLeastOneProp<AnySortItem, SortProp>;

export interface SelectedOptionData {
  label: string;
  value: number | string;
}

export type SelectedOptionsData = SelectedOptionData[];

export type FilterPropValues = string[];

export type FilteredSinglePropItems = string[];

export type FilteredMultiPropsItems = string[][];

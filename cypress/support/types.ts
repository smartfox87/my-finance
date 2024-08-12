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

export enum FieldIds {
  SORT = "sort",
  PERIOD = "period",
  ACCOUNT = "account",
  ACCOUNTS = "accounts",
  CATEGORY = "category",
  CATEGORIES = "categories",
  NAME = "name",
  AMOUNT = "amount",
  BALANCE = "balance",
  DATE = "date",
  CURRENCY = "currency",
  FULL_NAME = "full_name",
  EMAIL = "email",
  BIRTHDATE = "birthdate",
  GENDER = "gender",
  SUBJECT = "subject",
  MESSAGE = "message",
  FILES = "files",
  PASSWORD = "password",
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      deleteE2EUser(): Chainable<void>;
      login(): Chainable<void>;
      loginDemo(): Chainable<void>;
      getLang(): Chainable<string>;
      getDictionary(locale?: Locale): Chainable<Dictionary>;
      pickSelect(selector: string, options?: { index?: number; returnValue?: boolean }): Chainable<string>;
      pickMultiSelect(selector: string, options?: { indexes?: number[]; indexesCount?: number; minIndex?: number; returnValue?: boolean; allSelectable?: boolean }): Chainable<void>;
      pickDate(selector: string): Chainable<void>;
      pickPeriod(selector: string): Chainable<void>;
      pickRadioButton(selector: string): Chainable<void>;
      pickCalculator(expression: string): Chainable<void>;
      pickFile(selector: string): Chainable<void>;
      pickSiteLocale(locale: Locale): Chainable<void>;
      checkItemsSort(props: { items: JQuery<HTMLElement>; prop: SortProp; order: SortOrder }): Chainable<boolean>;
      checkSinglePropItemsFilter(props: { items: FilteredSinglePropItems; filterPropValues: FilterPropValues }): Chainable<boolean>;
      checkMultiPropsItemsFilter(props: { items: FilteredMultiPropsItems; filterPropValues: FilterPropValues }): Chainable<boolean>;
    }
  }
}

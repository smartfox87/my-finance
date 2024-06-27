export enum CeoPages {
  HOME = "",
  ACCOUNTS = "accounts",
  BUDGETS = "budgets",
  EXPENSES = "expenses",
  INCOMES = "incomes",
  STATISTICS = "statistics",
  CONTACT = "contact",
}

export type CeoPage = `${CeoPages}`;

export enum OtherPages {
  HOME = "home",
  PROFILE = "profile",
  SETTINGS = "settings",
}

export const Pages = {
  ...CeoPages,
  ...OtherPages,
};

export type Pages = typeof Pages;

export type Page = Pages[keyof Pages];

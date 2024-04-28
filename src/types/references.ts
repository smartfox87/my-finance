export interface CostCategory {
  id: string;
  name: string;
}

export type CostCategories = CostCategory[];

export interface AccountType {
  id: string;
  user_id: string;
  name: string;
}

export interface AccountTypeData {
  general_name: string;
}

export type AccountTypes = AccountType[];

export interface IncomeCategory {
  id: string;
  user_id: string;
  name: string;
}

export interface IncomeCategoryData {
  general_name: string;
}

export type IncomeCategories = IncomeCategory[];

export interface Currency {
  id: string;
  name: string;
  code: string;
  symbol: string;
}

export type Currencies = Currency[];

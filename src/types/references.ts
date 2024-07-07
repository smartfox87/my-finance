export interface CostCategory {
  id: string;
  name: string;
}

export interface AccountType {
  id: string;
  user_id: string;
  name: string;
  general_name?: string;
}

export interface AccountTypesObject {
  id: string;
  user_id: string;
  name: string;
  general_name?: string;
}

export interface AccountTypeData {
  general_name: string;
}

export interface IncomeCategory {
  id: string;
  user_id: string;
  name: string;
}

export interface IncomeCategoryData {
  general_name: string;
}

export interface Currency {
  id: string;
  name: string;
  code: string;
  symbol: string;
}

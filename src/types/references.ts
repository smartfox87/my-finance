export interface CostCategory {
  id: number;
  name: string;
}

export interface AccountType {
  id: number;
  user_id: string;
  name: string;
  general_name?: string;
}

export interface AccountTypesObject {
  [key: string]: {
    name: string;
    user_id: string;
  };
}

export interface AccountTypeData {
  general_name: string;
}

export interface IncomeCategory {
  id: number;
  user_id: string;
  name: string;
}

export interface IncomeCategoryData {
  general_name: string;
}

export interface Currency {
  id: number;
  name: string;
  code: string;
  symbol: string;
}

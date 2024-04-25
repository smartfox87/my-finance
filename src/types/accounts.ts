export interface NewAccountItem {
  name: string;
  balance: number;
}

export interface UpdatedAccountItem extends NewAccountItem {}

export interface AccountItem {
  id: number;
  account_type_id: number;
  balance: number;
  updated_at: string;
  name?: string;
}

export type AccountsList = AccountItem[];

export interface AccountType {
  id: number;
  name: string;
}

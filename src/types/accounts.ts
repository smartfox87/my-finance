import { FieldIds } from "@/types/field";

export type AccountKey = FieldIds.BALANCE;

export const isAccountKey = (key: string): key is AccountKey => FieldIds.BALANCE === key;

export interface AccountItemBalanceData {
  accountId: number;
  increase?: number;
  decrease?: number;
}

export interface AccountItemBalance {
  [FieldIds.BALANCE]: number;
}

export interface AccountItemData extends AccountItemBalance {
  account_type_id?: number;
  name: string;
}

export interface AccountItem {
  id: number;
  updated_at: string;
  account_type_id: number;
  [FieldIds.BALANCE]: number;
  name?: string;
}

export interface AccountsSliceState {
  accountsList: AccountItem[] | null;
  accountItem: AccountItem | null;
}

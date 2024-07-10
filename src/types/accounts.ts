import { FieldIds } from "@/types/field";

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

export interface ProcessedAccountItem {
  id: number;
  updated_at: string;
  name: string;
  [FieldIds.BALANCE]: number;
  disabled: boolean;
}

export interface AccountsSliceState {
  accountsList: AccountItem[] | null;
  accountItem: AccountItem | null;
}

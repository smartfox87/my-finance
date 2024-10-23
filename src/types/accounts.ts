import { FieldIds, FieldTypes } from "@/features/fields";
import type { NumberFormField, SingleSelectFormField, TextFormField } from "@/features/fields";

export interface AccountItemBalanceData {
  accountId: number;
  increase?: number;
  decrease?: number;
}

export type AccountItemBalance = {
  [FieldIds.BALANCE]: number;
};

export type AccountItemCreateData = AccountItemBalance & {
  [FieldIds.NAME]: string;
};

export type AccountItemUpdateData = AccountItemBalance & {
  [FieldIds.NAME]?: string;
};

export interface AccountItem {
  id: number;
  updated_at: string;
  account_type_id: number;
  [FieldIds.NAME]?: string;
  [FieldIds.BALANCE]: number;
}

export interface ProcessedAccountItem {
  id: number;
  updated_at: string;
  disabled: boolean;
  [FieldIds.NAME]: string;
  [FieldIds.BALANCE]: number;
}

export interface AccountsSliceState {
  accountsList: AccountItem[] | null;
  accountItem: AccountItem | null;
}

export type AccountItemField = TextFormField<FieldIds.NAME, FieldTypes.TEXTAREA> | NumberFormField<FieldIds.BALANCE>;

export type AccountTransferField = SingleSelectFormField<FieldIds.FROM> | SingleSelectFormField<FieldIds.TO> | NumberFormField<FieldIds.AMOUNT>;

export type AccountTransferValues = { [FieldIds.FROM]: null | number; [FieldIds.TO]: null | number; [FieldIds.AMOUNT]: number };

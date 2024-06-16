import type { FieldType } from "@/types/form";

export interface AccountField {
  id: string;
  type: FieldType;
  label_translation: string;
  value: string;
  maxLength?: number;
  required?: boolean;
  focus?: boolean;
}

export interface AccountItemBalanceData {
  accountId: number;
  increase?: number;
  decrease?: number;
}

export interface AccountItemBalance {
  balance: number;
}

export interface AccountItemData extends AccountItemBalance {
  account_type_id?: number;
  name: string;
}

export interface AccountItem {
  id: number;
  account_type_id: number;
  balance: number;
  updated_at: string;
  name?: string;
}

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

export type AccountsList = AccountItem[];

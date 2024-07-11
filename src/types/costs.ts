export interface CostItem {
  id: number;
  amount: number;
  date: string;
  account: number;
  category: number;
  name: string;
  created_at: string;
}

export interface CostItemData {
  amount: number;
  date: string;
  account: number;
  category: number;
  name: string;
}

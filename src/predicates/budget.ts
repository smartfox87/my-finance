import { FieldIds } from "@/types/field";
import { BudgetItemData } from "@/types/budgets";

export const isBudgetItemData = (data: object): data is BudgetItemData =>
  FieldIds.NAME in data && FieldIds.AMOUNT in data && FieldIds.PERIOD in data && FieldIds.ACCOUNTS in data && FieldIds.CATEGORIES in data;

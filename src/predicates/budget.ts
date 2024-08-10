import { FieldIds } from "@/types/field";
import { BudgetItemData } from "@/types/budgets";
import { isObject } from "@/predicates/common";

export const isBudgetItemData = (data: unknown): data is BudgetItemData =>
  isObject(data) && FieldIds.NAME in data && FieldIds.AMOUNT in data && FieldIds.PERIOD in data && FieldIds.ACCOUNTS in data && FieldIds.CATEGORIES in data;

import { FieldIds } from "@/types/field";
import { IncomeItemData } from "@/types/incomes";

export const isIncomeItemData = (data: Record<string, any>): data is IncomeItemData =>
  FieldIds.AMOUNT in data && FieldIds.DATE in data && FieldIds.ACCOUNT in data && FieldIds.CATEGORY in data && FieldIds.NAME in data;

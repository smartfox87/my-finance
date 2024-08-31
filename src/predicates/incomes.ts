import { isObject } from "@/predicates/common";
import { FieldIds } from "@/types/field";
import type { IncomeItemData } from "@/types/incomes";

export const isIncomeItemData = (data: unknown): data is IncomeItemData =>
  isObject(data) && FieldIds.AMOUNT in data && FieldIds.DATE in data && FieldIds.ACCOUNT in data && FieldIds.CATEGORY in data && FieldIds.NAME in data;
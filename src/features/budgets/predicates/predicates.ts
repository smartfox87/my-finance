import { FieldIds } from "@/types/field";
import { isObject } from "@/predicates/common";
import type { BudgetItemData } from "../types";

export const isBudgetItemData = (data: unknown): data is BudgetItemData =>
  isObject(data) && FieldIds.NAME in data && FieldIds.AMOUNT in data && FieldIds.PERIOD in data && FieldIds.ACCOUNTS in data && FieldIds.CATEGORIES in data;

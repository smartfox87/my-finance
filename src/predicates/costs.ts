import { CostItemData } from "@/types/costs";
import { FieldIds } from "@/types/field";
import { isObject } from "@/predicates/common";

export const isCostItemData = (data: unknown): data is CostItemData =>
  isObject(data) && FieldIds.AMOUNT in data && FieldIds.DATE in data && FieldIds.ACCOUNT in data && FieldIds.CATEGORY in data && FieldIds.NAME in data;

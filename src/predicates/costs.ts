import { CostItemData } from "@/types/costs";
import { FieldIds } from "@/types/field";

export const isCostItemData = (data: object): data is CostItemData =>
  FieldIds.AMOUNT in data && FieldIds.DATE in data && FieldIds.ACCOUNT in data && FieldIds.CATEGORY in data && FieldIds.NAME in data;

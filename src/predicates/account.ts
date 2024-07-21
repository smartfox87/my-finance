import { FieldIds } from "@/types/field";
import { AccountItemCreateData, AccountItemUpdateData } from "@/types/accounts";

export const isAccountItemUpdateData = (data: object): data is AccountItemUpdateData =>
  (Object.keys(data).length === 2 && FieldIds.NAME in data && FieldIds.BALANCE in data) || (Object.keys(data).length === 1 && FieldIds.BALANCE in data);

export const isAccountItemCreateData = (data: object): data is AccountItemCreateData => Object.keys(data).length === 2 && FieldIds.NAME in data && FieldIds.BALANCE in data;

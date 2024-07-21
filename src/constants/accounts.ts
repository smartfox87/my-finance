import { BALANCE_FIELD, NAME_FIELD } from "@/constants/fields";
import { AccountItemField } from "@/types/accounts";

export const INITIAL_ACCOUNT_FIELDS: AccountItemField[] = [{ ...NAME_FIELD, maxLength: 200 }, BALANCE_FIELD];

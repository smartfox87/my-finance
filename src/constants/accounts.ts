import { AMOUNT_FIELD, BALANCE_FIELD, FROM_ACCOUNT_FIELD, NAME_FIELD, TO_ACCOUNT_FIELD } from "@/constants/fields";
import { AccountItemField, AccountTransferField, AccountTransferValues } from "@/types/accounts";

export const INITIAL_ACCOUNT_FIELDS: AccountItemField[] = [{ ...NAME_FIELD, maxLength: 200, focus: true }, BALANCE_FIELD];

export const INITIAL_ACCOUNT_TRANSFER_FIELDS: AccountTransferField[] = [FROM_ACCOUNT_FIELD, TO_ACCOUNT_FIELD, AMOUNT_FIELD];

export const INITIAL_ACCOUNT_TRANSFER_VALUES: AccountTransferValues = INITIAL_ACCOUNT_TRANSFER_FIELDS.reduce((acc, { id, value }) => ({ ...acc, [id]: value }), {} as AccountTransferValues);

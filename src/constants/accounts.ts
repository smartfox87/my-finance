import { FieldTypes, type FormField } from "@/types/form";
import { BALANCE_FIELD, NAME_FIELD } from "@/constants/fields";

export const INITIAL_ACCOUNT_FIELDS: FormField[] = [{ ...NAME_FIELD, maxLength: 200, type: FieldTypes.TEXT }, BALANCE_FIELD];

import { type FormField } from "@/types/form";
import { BALANCE_FIELD, NAME_FIELD } from "@/constants/fields";
import { FieldTypes } from "@/types/field";

export const INITIAL_ACCOUNT_FIELDS: FormField[] = [{ ...NAME_FIELD, maxLength: 200, type: FieldTypes.TEXT }, BALANCE_FIELD];

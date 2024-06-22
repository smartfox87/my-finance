import type { FormField } from "@/types/form";
import { BIRTHDATE_FIELD, CURRENCY_FIELD, EMAIL_FIELD, FULL_NAME_FIELD, GENDER_FIELD, PERIOD_FIELD } from "@/constants/fields";

export const INITIAL_SETTINGS_FIELDS: FormField[] = [CURRENCY_FIELD, PERIOD_FIELD];

export const INITIAL_PROFILE_FIELDS: FormField[] = [{ ...FULL_NAME_FIELD, required: true }, { ...EMAIL_FIELD, disabled: true }, BIRTHDATE_FIELD, GENDER_FIELD];

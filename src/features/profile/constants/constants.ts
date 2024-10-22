import { BIRTHDATE_FIELD, CURRENCY_FIELD, EMAIL_FIELD, FULL_NAME_FIELD, GENDER_FIELD, PERIOD_FIELD } from "@/features/default-form";
import type { ProfileField, SettingsField } from "../types";

export const INITIAL_SETTINGS_FIELDS: SettingsField[] = [CURRENCY_FIELD, PERIOD_FIELD];

export const INITIAL_PROFILE_FIELDS: ProfileField[] = [{ ...FULL_NAME_FIELD, required: true }, { ...EMAIL_FIELD, disabled: true }, BIRTHDATE_FIELD, GENDER_FIELD];

import { EMAIL_FIELD, FULL_NAME_FIELD, PASSWORD_FIELD } from "@/constants/fields";

export const INITIAL_SIGN_UP_FIELDS = [FULL_NAME_FIELD, EMAIL_FIELD, PASSWORD_FIELD];

export const INITIAL_SIGN_IN_FIELDS = [{ ...EMAIL_FIELD, focus: true }, PASSWORD_FIELD];
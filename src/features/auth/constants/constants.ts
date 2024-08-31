import { EMAIL_FIELD, FULL_NAME_FIELD, PASSWORD_FIELD } from "@/constants/fields";
import type { LoginField, RegisterField } from "../types";

export const INITIAL_SIGN_UP_FIELDS: RegisterField[] = [FULL_NAME_FIELD, EMAIL_FIELD, PASSWORD_FIELD];

export const INITIAL_SIGN_IN_FIELDS: LoginField[] = [{ ...EMAIL_FIELD, focus: true }, PASSWORD_FIELD];

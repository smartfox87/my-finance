import { type FormField } from "@/types/form";
import { EMAIL_FIELD, FILES_FIELD, FULL_NAME_FIELD, MESSAGE_FIELD, SUBJECT_FIELD } from "@/constants/fields";

export const INITIAL_CONTACT_FIELDS: FormField[] = [FULL_NAME_FIELD, EMAIL_FIELD, SUBJECT_FIELD, MESSAGE_FIELD, FILES_FIELD];

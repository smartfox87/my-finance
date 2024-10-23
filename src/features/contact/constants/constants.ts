import { EMAIL_FIELD, FILES_FIELD, FULL_NAME_FIELD, MESSAGE_FIELD, SUBJECT_FIELD } from "@/features/fields";
import type { ContactItemField } from "../types";

export const INITIAL_CONTACT_FIELDS: ContactItemField[] = [FULL_NAME_FIELD, EMAIL_FIELD, SUBJECT_FIELD, MESSAGE_FIELD, FILES_FIELD];

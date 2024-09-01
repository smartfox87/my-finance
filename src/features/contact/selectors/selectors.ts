import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_CONTACT_FIELDS } from "../constants";
import { selectProfile } from "@/features/profile";
import { isString, isTruthy } from "@/predicates/common";
import { FieldIds } from "@/types/field";
import type { ContactItemField } from "../types";

export const selectContactFields = createSelector([selectProfile], (profile): ContactItemField[] =>
  INITIAL_CONTACT_FIELDS.map((field) => {
    if ((field.id === FieldIds.EMAIL || field.id === FieldIds.FULL_NAME) && isTruthy(profile)) {
      // notice: type for nested object prop
      const value = profile[field.id];
      if (isString(value)) return { ...field, value };
    }
    return field;
  }),
);

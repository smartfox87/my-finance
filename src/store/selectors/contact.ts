import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_CONTACT_FIELDS } from "@/constants/contact";
import { selectProfile } from "@/store/selectors/profile";
import { FieldIds } from "@/types/field";
import { FormField } from "@/types/form";
import { isString, isTruthy } from "@/types/predicates";

export const selectContactFields = createSelector([selectProfile], (profile): FormField[] =>
  INITIAL_CONTACT_FIELDS.map((field) => {
    if ((field.id === FieldIds.EMAIL || field.id === FieldIds.FULL_NAME) && isTruthy(profile)) {
      // notice: type for nested object prop
      let value = profile[field.id];
      if (isString(value)) return { ...field, value };
    }
    return field;
  }),
);

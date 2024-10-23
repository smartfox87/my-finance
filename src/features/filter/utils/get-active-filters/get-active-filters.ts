import { i18nRef } from "@/i18n";
import { isTruthy } from "@/predicates/common";
import { FieldTypes } from "@/features/fields";
import type { ProcessedFilterField, ActiveFilterItem, FilterState } from "../../types";

export const getActiveFilters = (processedFilterFields: ProcessedFilterField[], filterValues: FilterState | null): ActiveFilterItem[] =>
  processedFilterFields
    .map((field) => {
      if (field.type === FieldTypes.DATES_PERIOD) {
        return {
          id: field.id,
          label: i18nRef.t?.(`fields.${field.label}`),
          value: filterValues?.[field.id]?.[0] === filterValues?.[field.id]?.[1] ? filterValues?.[field.id]?.[0] : filterValues?.[field.id]?.join(" - "),
        };
      } else if (field.type === FieldTypes.MULTISELECT) {
        return filterValues?.[field.id]?.map((value) => ({
          id: field.id,
          label: i18nRef.t?.(`fields.${field.label}`),
          value,
          textValue: field.optionsObject?.[value],
        }));
      } else {
        const filterValue = filterValues?.[field.id];
        if (filterValue === undefined) return;
        return {
          id: field.id,
          label: i18nRef.t?.(`fields.${field.label}`),
          value: filterValues?.[field.id],
          textValue: field.optionsObject?.[filterValue],
        };
      }
    })
    .flat(1)
    .filter(isTruthy);

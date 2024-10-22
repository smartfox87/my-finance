import { isTruthy } from "@/predicates/common";
import { getOptionsTranslations } from "../get-options-translations";
import { getOptionsFromItemsList } from "../get-options-from-items-list";
import { getOptionsObjectFromOptions } from "../get-options-object-from-options";
import { FieldIds, FieldTypes, type MultiSelectOptionValue } from "@/features/default-form";
import type { CostCategory, IncomeCategory } from "@/types/references";
import type { ProcessedAccountItem } from "@/types/accounts";
import type { FilterField, ProcessedFilterField } from "../../types";

export const processFilterFields = <T extends IncomeCategory | CostCategory>(
  initialFieldsData: FilterField[],
  categoriesList: T[] | null,
  accountsList: ProcessedAccountItem[] | null,
): ProcessedFilterField[] =>
  initialFieldsData
    .map((field) => {
      if (field.type === FieldTypes.MULTISELECT) {
        if (field.id === FieldIds.CATEGORIES && categoriesList?.length) {
          const options = getOptionsTranslations<MultiSelectOptionValue>(field.options).concat(getOptionsFromItemsList(categoriesList ?? []));
          const optionsObject = getOptionsObjectFromOptions(options);
          return { ...field, optionsObject, options };
        } else if (field.id === FieldIds.ACCOUNTS && accountsList?.length) {
          const options = getOptionsTranslations<MultiSelectOptionValue>(field.options).concat(getOptionsFromItemsList(accountsList ?? []));
          const optionsObject = getOptionsObjectFromOptions(options);
          return { ...field, optionsObject, options };
        }
      } else if (field.type === FieldTypes.SELECT) {
        const optionsObject = getOptionsObjectFromOptions(field.options);
        return { ...field, optionsObject };
      } else {
        return field;
      }
    })
    .filter(isTruthy);

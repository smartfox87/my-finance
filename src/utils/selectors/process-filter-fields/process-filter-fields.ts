import { isTruthy } from "@/predicates/common";
import { getOptionsObjectFromOptions, getOptionsFromItemsList, getOptionsTranslations } from "@/utils/selectors";
import { FieldIds, FieldTypes, type MultiSelectOptionValue } from "@/types/field";
import type { CostCategory, IncomeCategory } from "@/types/references";
import type { FilterField } from "@/types/filter";
import type { ProcessedAccountItem } from "@/types/accounts";
import type { ProcessedFilterField } from "@/types/selectors";

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

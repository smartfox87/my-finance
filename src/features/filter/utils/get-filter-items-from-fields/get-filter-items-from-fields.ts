import { isTruthy } from "@/predicates/common";
import { isFilterMultiItem, isFilterPeriodItem, isFilterSortItem } from "../../predicates";
import type { FilterField, FilterItem } from "../../types";

export const getFilterItemsFromFields = (fields: FilterField[]): FilterItem[] =>
  fields
    .map((item): FilterItem | undefined => {
      const filterItem = { id: item.id, value: item.value };
      if (isFilterPeriodItem(filterItem) || isFilterSortItem(filterItem) || isFilterMultiItem(filterItem)) return filterItem;
    })
    .filter(isTruthy);

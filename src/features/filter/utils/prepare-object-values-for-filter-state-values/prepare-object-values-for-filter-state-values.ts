import { isFilterMultiItem, isFilterPeriodItem, isFilterSortItem } from "../../predicates";
import { isTruthy } from "@/predicates/common";
import type { FilterItem, FilterStateValue } from "../../types";

export const prepareObjectValuesForFilterStateValues = (objectValues: Record<string, FilterStateValue>): FilterItem[] =>
  Object.entries(objectValues)
    .map(([key, value]) => {
      const filterItem = { id: key, value };
      if (isFilterPeriodItem(filterItem) || isFilterSortItem(filterItem) || isFilterMultiItem(filterItem)) return filterItem;
    })
    .filter(isTruthy);

import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_INCOME_FIELDS, INITIAL_INCOMES_FILTER_FIELDS } from "../constants";
import { selectIncomeCategories } from "@/store/selectors/references";
import { selectCurrency } from "@/features/profile";
import { selectAccountsList } from "@/features/accounts";
import { filterSingleItemsList, processFilterFields, sortItemsList } from "@/utils/selectors";
import dayjs from "dayjs";
import { FieldIds, FieldTypes } from "@/types/field";
import type { LazyLoadedSlices } from "@/types/store";
import type { IncomeItem, IncomeItemField } from "../types";
import type { FilterState } from "@/types/filter";
import type { ProcessedFilterField } from "@/types/selectors";

export const selectIncomesList = ({ incomes }: LazyLoadedSlices): IncomeItem[] | null => incomes?.incomesList || null;

export const selectIncomeItem = ({ incomes }: LazyLoadedSlices): IncomeItem | null => incomes?.incomeItem || null;

export const selectIncomesFilterValues = ({ incomes }: LazyLoadedSlices): FilterState | null => incomes?.incomesFilterValues || null;

export const selectIncomesByFilter = createSelector([selectIncomesList, selectIncomesFilterValues], (allIncomes, incomesFilterValues): IncomeItem[] | null =>
  allIncomes && incomesFilterValues ? sortItemsList(incomesFilterValues, filterSingleItemsList(incomesFilterValues, allIncomes)) : null,
);

export const selectIncomesAmount = createSelector([selectIncomesByFilter], (incomes): number => incomes?.reduce((acc, { amount }) => acc + amount, 0) || 0);

export const selectIncomesFilterFields = createSelector([selectIncomeCategories, selectAccountsList], (incomeCategories, accountsList): ProcessedFilterField[] =>
  processFilterFields(INITIAL_INCOMES_FILTER_FIELDS, incomeCategories, accountsList),
);

export const selectIncomeFields = createSelector(
  [selectIncomeCategories, selectAccountsList, selectCurrency, selectIncomeItem],
  (incomeCategories, accountsList, currency, incomeItem): IncomeItemField[] =>
    INITIAL_INCOME_FIELDS.map((field): IncomeItemField => {
      if (field.type === FieldTypes.SELECT) {
        const value = incomeItem?.[field.id] ? incomeItem[field.id] : field.value;
        if (field.id === FieldIds.CATEGORY) return { ...field, value, options: field.options.concat(incomeCategories?.map(({ id, name }) => ({ value: id, label: name })) || []) };
        else return { ...field, value, options: field.options.concat(accountsList?.map(({ id, name }) => ({ value: id, label: name })) || []) };
      } else if (field.id === FieldIds.AMOUNT) {
        return { ...field, value: incomeItem?.[field.id] ? incomeItem[field.id] : field.value, label_suffix: currency };
      } else if (field.id === FieldIds.DATE) {
        return { ...field, value: incomeItem?.[field.id] ? dayjs(incomeItem[field.id]) : field.value };
      } else {
        return { ...field, value: incomeItem?.[field.id] ? incomeItem[field.id] : field.value };
      }
    }),
);

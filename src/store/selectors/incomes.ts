import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_INCOME_FIELDS, INITIAL_INCOMES_FILTER_FIELDS } from "@/constants/incomes";
import { selectIncomeCategories } from "@/store/selectors/references";
import { selectCurrency } from "@/store/selectors/profile";
import { selectAccountsList } from "@/store/selectors/accounts";
import { LazyLoadedSlices } from "@/store";
import { filterSingleItemsList, processFilterFields, sortItemsList } from "@/helpers/selectors";
import { FieldIds, FieldTypes } from "@/types/field";
import { IncomeItemField } from "@/types/incomes";
import dayjs from "dayjs";

export const selectIncomesList = ({ incomes }: LazyLoadedSlices) => incomes?.incomesList || null;

export const selectIncomeItem = ({ incomes }: LazyLoadedSlices) => incomes?.incomeItem || null;

export const selectIncomesFilterValues = ({ incomes }: LazyLoadedSlices) => incomes?.incomesFilterValues || null;

export const selectIncomesByFilter = createSelector([selectIncomesList, selectIncomesFilterValues], (allIncomes, incomesFilterValues) =>
  allIncomes && incomesFilterValues ? sortItemsList(incomesFilterValues, filterSingleItemsList(incomesFilterValues, allIncomes)) : null,
);

export const selectIncomesFilterFields = createSelector([selectIncomeCategories, selectAccountsList], (incomeCategories, accountsList) =>
  processFilterFields(INITIAL_INCOMES_FILTER_FIELDS, incomeCategories, accountsList),
);

export const selectIncomeFields = createSelector([selectIncomeCategories, selectAccountsList, selectCurrency, selectIncomeItem], (incomeCategories, accountsList, currency, incomeItem) =>
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

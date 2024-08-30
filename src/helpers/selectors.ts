import { i18nRef } from "@/i18n";
import { isTruthy } from "@/predicates/common";
import { FieldIds, FieldTypes, FieldValues, type MultiSelectOptionValue, type MultiSelectValue, type SelectOption, type SingleSelectValue } from "@/types/field";
import type { DatesStrings } from "@/types/date";
import type { ProcessedAccountItem } from "@/features/accounts";
import type { CostCategory, IncomeCategory } from "@/types/references";
import type { FilterState } from "@/types/filter";
import type { CostItem } from "@/features/expenses";
import type { IncomeItem } from "@/features/incomes";
import type { ProcessedBudgetItem } from "@/features/budgets";
import type { FilterField } from "@/types/filter";
import type { ProcessedFilterField } from "@/types/selectors";
import type { ProcessedStatisticsBudgetItem, StatisticsCostItem, StatisticsIncomeItem } from "@/types/statistics";

export const checkSingleItemCondition = (filterItem: MultiSelectValue | undefined, itemId: number): boolean =>
  filterItem !== undefined && (filterItem.includes(itemId) || filterItem.includes(FieldValues.ALL));

export const checkMultiItemCondition = (filterItem: MultiSelectValue | undefined, itemValues: MultiSelectValue) =>
  filterItem !== undefined && (!itemValues.length || filterItem.includes(FieldValues.ALL) || filterItem.some((filterValue) => itemValues.includes(filterValue)));

export const checkPeriodCondition = (dates: DatesStrings | undefined, date: string): boolean => dates !== undefined && date >= dates[0] && date <= dates[1];

export const checkPeriodsCondition = (dates: DatesStrings | undefined, [itemFrom, itemTo]: DatesStrings) => dates !== undefined && itemFrom >= dates[0] && itemTo <= dates[1];

export const filterSingleItemsList = <T extends CostItem | IncomeItem | StatisticsCostItem | StatisticsIncomeItem>(filterValues: FilterState, itemsList: T[]): T[] =>
  itemsList.filter(
    ({ date, category, account }) =>
      checkSingleItemCondition(filterValues[FieldIds.CATEGORIES], category) &&
      checkPeriodCondition(filterValues[FieldIds.PERIOD], date) &&
      checkSingleItemCondition(filterValues[FieldIds.ACCOUNTS], account),
  );

export const filterMultiItemsList = <T extends ProcessedBudgetItem | ProcessedStatisticsBudgetItem>(filterValues: FilterState, itemsList: T[]): T[] =>
  itemsList.filter(
    ({ period, categories, accounts }) =>
      checkMultiItemCondition(filterValues[FieldIds.CATEGORIES], categories) &&
      checkPeriodsCondition(filterValues[FieldIds.PERIOD], period) &&
      checkMultiItemCondition(filterValues[FieldIds.ACCOUNTS], accounts),
  );

export const sortItemsList = <T extends CostItem | IncomeItem | ProcessedBudgetItem>(filterValues: FilterState, itemsList: T[]): T[] =>
  itemsList.sort((a, b) => {
    if (!filterValues[FieldIds.SORT]) return a.created_at.localeCompare(b.created_at);
    const [prop, order] = filterValues[FieldIds.SORT].split("_");
    const [first, second] = order === "asc" ? [a, b] : [b, a];
    let difference = 0;
    if (prop === FieldIds.AMOUNT) difference = first.amount - second.amount;
    else if (prop === FieldIds.DATE) {
      if (FieldIds.PERIOD in first && FieldIds.PERIOD in second) difference = first[FieldIds.PERIOD][0].localeCompare(second[FieldIds.PERIOD][0]);
      else if (FieldIds.DATE in first && FieldIds.DATE in second) difference = first.date.localeCompare(second.date);
    } else if (prop === FieldIds.NAME) return first.name.localeCompare(second.name);
    return difference === 0 ? first.created_at.localeCompare(second.created_at) : difference;
  });

export const getOptionsFromItemsList = <T extends ProcessedAccountItem | CostCategory>(itemsList: T[]): SelectOption<MultiSelectOptionValue>[] =>
  itemsList.map(({ id, name }) => ({ value: id, label: name }));

export const getOptionsTranslations = <V extends MultiSelectOptionValue>(options: SelectOption<V>[]): SelectOption<MultiSelectOptionValue>[] =>
  options.map(({ label, label_translation, value }) => {
    const labelString = label_translation ? i18nRef.t?.(`fields.${label_translation}`) : label;
    return { label: labelString, value };
  });

// todo try importance of Object.assign everywhere
export const getOptionsObjectFromOptions = <T extends SingleSelectValue | MultiSelectOptionValue>(options: SelectOption<T>[]): Record<string, string> =>
  Object.assign({}, ...options.map(({ value, label, label_translation }) => value && { [value]: label_translation ? i18nRef.t?.(`fields.${label_translation}`) : label }, {}).filter(isTruthy));

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

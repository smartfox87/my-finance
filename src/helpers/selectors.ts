import { FieldIds, FieldTypes, FieldValues, MultiSelectOptionValue, MultiSelectValue, SelectOption, SingleSelectValue } from "@/types/field";
import { DatesStrings } from "@/types/date";
import { ProcessedAccountItem } from "@/types/accounts";
import { CostCategory, IncomeCategory } from "@/types/references";
import { i18nRef } from "@/i18n";
import { FilterState } from "@/types/filter";
import { CostItem } from "@/types/costs";
import { IncomeItem } from "@/types/incomes";
import { ProcessedBudgetItem } from "@/types/budgets";
import { FilterField } from "@/types/filter";
import { ProcessedStatisticsBudgetItem, StatisticsCostItem, StatisticsIncomeItem } from "@/types/statistics";
import { ProcessedFilterField } from "@/types/selectors";
import { isTruthy } from "@/predicates/common";

export const checkSingleItemCondition = (filterItem: MultiSelectValue | undefined, itemId: number): boolean =>
  filterItem !== undefined && (filterItem.includes(itemId) || filterItem.includes(FieldValues.ALL));

export const checkMultiItemCondition = (filterItem: MultiSelectValue | undefined, itemValues: MultiSelectValue) =>
  filterItem !== undefined && (!itemValues.length || filterItem.includes(FieldValues.ALL) || filterItem.some((filterValue) => itemValues.includes(filterValue)));

export const checkPeriodCondition = (dates: DatesStrings | undefined, date: string): boolean => dates !== undefined && date >= dates[0] && date <= dates[1];

export const checkPeriodsCondition = (dates: DatesStrings | undefined, [itemFrom, itemTo]: DatesStrings) => dates !== undefined && itemFrom >= dates[0] && itemTo <= dates[1];

export const filterSingleItemsList = <T extends CostItem | IncomeItem | StatisticsCostItem | StatisticsIncomeItem>(filterValues: FilterState, itemsList: T[]) =>
  itemsList.filter(
    ({ date, category, account }) =>
      checkSingleItemCondition(filterValues[FieldIds.CATEGORIES], category) &&
      checkPeriodCondition(filterValues[FieldIds.PERIOD], date) &&
      checkSingleItemCondition(filterValues[FieldIds.ACCOUNTS], account),
  );

export const filterMultiItemsList = <T extends ProcessedBudgetItem | ProcessedStatisticsBudgetItem>(filterValues: FilterState, itemsList: T[]) =>
  itemsList.filter(
    ({ period, categories, accounts }) =>
      checkMultiItemCondition(filterValues[FieldIds.CATEGORIES], categories) &&
      checkPeriodsCondition(filterValues[FieldIds.PERIOD], period) &&
      checkMultiItemCondition(filterValues[FieldIds.ACCOUNTS], accounts),
  );

export const sortItemsList = <T extends CostItem | IncomeItem | ProcessedBudgetItem>(filterValues: FilterState, itemsList: T[]) =>
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
    const labelString = i18nRef.t && label_translation ? i18nRef.t(`fields.${label_translation}`) : label;
    return { label: labelString, value };
  });

// todo try importance of Object.assign everywhere
export const getOptionsObjectFromOptions = <T extends SingleSelectValue | MultiSelectOptionValue>(options: SelectOption<T>[]): Record<string, string> =>
  Object.assign(
    {},
    ...options.map(({ value, label, label_translation }) => value && { [value]: label_translation && i18nRef.t ? i18nRef.t(`fields.${label_translation}`) : label }, {}).filter(isTruthy),
  );

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

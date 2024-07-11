import { FieldValues, MultiSelectOption, MultiSelectOptionValue, MultiSelectValue, SelectOption, SingleSelectValue } from "@/types/field";
import { DatesStrings } from "@/types/date";
import { ProcessedAccountItem } from "@/types/accounts";
import { CostCategory } from "@/types/references";
import { i18nRef } from "@/i18n";

export const checkSingleItemCondition = (filterItem: MultiSelectValue | undefined, itemId: number): boolean =>
  filterItem !== undefined && (filterItem.includes(itemId) || filterItem.includes(FieldValues.ALL));

export const checkMultiItemCondition = (filterItem: MultiSelectValue | undefined, itemValues: MultiSelectValue) =>
  filterItem !== undefined && (filterItem.includes(FieldValues.ALL) || filterItem.some((filterValue) => itemValues.includes(filterValue)));

export const checkPeriodCondition = (dates: DatesStrings | undefined, date: string): boolean => dates !== undefined && date >= dates[0] && date <= dates[1];

export const checkPeriodsCondition = (dates: DatesStrings | undefined, [itemFrom, itemTo]: DatesStrings) => dates !== undefined && itemFrom >= dates[0] && itemTo <= dates[1];

export const getOptionsFromItemsList = <T extends ProcessedAccountItem | CostCategory>(itemsList: T[]) => itemsList?.map(({ id, name }): MultiSelectOption => ({ value: id, label: name }));

export const getOptionsObjectFromOptions = <T extends SingleSelectValue | MultiSelectOptionValue>(options: SelectOption<T>[]): { [key: number]: string } =>
  Object.assign({}, ...options.map(({ value, label, label_translation }) => ({ [value]: label_translation && i18nRef.t ? i18nRef.t(`fields.${label_translation}`) : label }), {}));

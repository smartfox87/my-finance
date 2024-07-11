import { FieldValues, MultiSelectOption, MultiSelectOptionValue, MultiSelectValue, SelectOption, SingleSelectValue } from "@/types/field";
import { DatesStrings } from "@/types/date";
import { ProcessedAccountItem } from "@/types/accounts";
import { CostCategory } from "@/types/references";
import { i18nRef } from "@/i18n";

export const checkCategoryCondition = (filterCategory: MultiSelectValue | undefined, itemCategoryId: number): boolean =>
  filterCategory !== undefined && (filterCategory.includes(itemCategoryId) || filterCategory.includes(FieldValues.ALL));

export const checkPeriodCondition = (dates: DatesStrings | undefined, date: string): boolean => dates !== undefined && date >= dates[0] && date <= dates[1];

export const checkAccountCondition = (filterAccount: MultiSelectValue | undefined, itemAccountId: number): boolean =>
  filterAccount !== undefined && (filterAccount.includes(itemAccountId) || filterAccount.includes(FieldValues.ALL));

export const checkPeriodsCondition = (dates: DatesStrings | undefined, [itemFrom, itemTo]: DatesStrings) => dates !== undefined && itemFrom >= dates[0] && itemTo <= dates[1];

export const checkCategoriesCondition = (filterCategory: MultiSelectValue | undefined, itemCategories: MultiSelectValue) =>
  filterCategory !== undefined && (filterCategory.includes(FieldValues.ALL) || filterCategory.some((categoryId) => itemCategories.includes(categoryId)));

export const checkAccountsCondition = (filterAccount: MultiSelectValue | undefined, itemAccounts: MultiSelectValue) =>
  filterAccount !== undefined && (filterAccount.includes(FieldValues.ALL) || filterAccount.some((accountId) => itemAccounts.includes(accountId)));

export const getOptionsFromItemsList = <T extends ProcessedAccountItem | CostCategory>(itemsList: T[]) => itemsList?.map(({ id, name }): MultiSelectOption => ({ value: id, label: name }));

export const getOptionsObjectFromOptions = <T extends SingleSelectValue | MultiSelectOptionValue>(options: SelectOption<T>[]): { [key: number]: string } =>
  Object.assign({}, ...options.map(({ value, label, label_translation }) => ({ [value]: label_translation && i18nRef.t ? i18nRef.t(`fields.${label_translation}`) : label }), {}));

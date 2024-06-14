import { type FilteredMultiPropsItems, type FilteredSinglePropItems, type FilterPropValues, type SortItem, SortOrder, SortProp } from "./types";

const isSortProp = (value: any): value is SortProp => Object.values(SortProp).includes(value);

const isSortOrder = (value: any): value is SortOrder => Object.values(SortOrder).includes(value);

export const getPropAndOrder = (selectedValue: JQuery<HTMLElement>): { prop: SortProp | null; order: SortOrder | null } => {
  if (!("value" in selectedValue) || typeof selectedValue.value !== "string") return { prop: null, order: null };
  const value = selectedValue.value.split("_");
  const prop = isSortProp(value[0]) ? value[0] : null;
  const order = isSortOrder(value[1]) ? value[1] : null;
  return { prop, order };
};

const getFloatValue = (value: string, locale: string): number => {
  const cleanedValue = value.replace(/[^\d.,-]/g, "");
  const numberFormat = new Intl.NumberFormat(locale);
  const groupSeparator = numberFormat.format(1111).replace(/1/g, "");
  const decimalSeparator = numberFormat.format(1.1).replace(/1/g, "");
  const result = cleanedValue.replace(new RegExp("\\" + groupSeparator, "g"), "").replace(new RegExp("\\" + decimalSeparator, "g"), ".");
  return Number.isNaN(result) ? 0 : parseFloat(result);
};

export const sortItems = ({ items, order, locale }: { items: SortItem[]; order: SortOrder; locale: string }): SortItem[] => {
  return items.slice().sort((a, b) => {
    const [first, second] = order === SortOrder.ASC ? [a, b] : [b, a];
    let difference = 0;
    if (first[SortProp.AMOUNT] && second[SortProp.AMOUNT]) difference = getFloatValue(first[SortProp.AMOUNT], locale) - getFloatValue(second[SortProp.AMOUNT], locale);
    else if (first[SortProp.NAME] && second[SortProp.NAME]) difference = first[SortProp.NAME].toLowerCase().localeCompare(second[SortProp.NAME].toLowerCase());
    else if (first[SortProp.DATE] && second[SortProp.DATE]) difference = first.date.toLowerCase().localeCompare(second.date.toLowerCase());
    return difference === 0 ? first.created.localeCompare(second.created) : difference;
  });
};

export const getIndexesArray = (length: number): number[] => Array.from({ length }).map((_, index) => index);

export const getReverseIndexesArray = (length: number): number[] => getIndexesArray(length).reverse();

export const compareSinglePropItemsToFilterPropValues = ({ items, filterPropValues }: { items: FilteredSinglePropItems; filterPropValues: FilterPropValues }): boolean =>
  items.every((item) => filterPropValues.includes(item));

export const compareMultiPropsItemsToFilterPropValues = ({ items, filterPropValues }: { items: FilteredMultiPropsItems; filterPropValues: FilterPropValues }): boolean =>
  items.every((item) => item.some((prop) => filterPropValues.includes(prop)));

import type { FilteredMultiPropsItems, FilteredSinglePropItems, FilterPropValues, SortItems, SortOrder, SortProp } from "./types";

const getFloatValue = (value: string): number => parseFloat(value.replace(/\s/g, "").replace(",", "."));

export const sortItems = ({ items, order }: { items: SortItems; order: SortOrder }): SortItems => {
  return items.slice().sort((a, b) => {
    const [first, second] = order === "asc" ? [a, b] : [b, a];
    let difference = 0;
    if ("amount" in first && "amount" in second) difference = getFloatValue(first.amount) - getFloatValue(second.amount);
    else if ("name" in first && "name" in second) difference = first.name.toLowerCase().localeCompare(second.name.toLowerCase());
    else if ("date" in first && "date" in second) difference = first.date.toLowerCase().localeCompare(second.date.toLowerCase());
    return difference === 0 ? first.created.localeCompare(second.created) : difference;
  });
};

export const getIndexesArray = (length: number): number[] => Array.from({ length }).map((_, index) => index);

export const getReverseIndexesArray = (length: number): number[] => getIndexesArray(length).reverse();

export const compareSinglePropItemsToFilterPropValues = ({ items, filterPropValues }: { items: FilteredSinglePropItems; filterPropValues: FilterPropValues }): boolean =>
  items.every((item) => filterPropValues.includes(item));

export const compareMultiPropsItemsToFilterPropValues = ({ items, filterPropValues }: { items: FilteredMultiPropsItems; filterPropValues: FilterPropValues }): boolean =>
  items.every((item) => item.some((prop) => filterPropValues.includes(prop)));

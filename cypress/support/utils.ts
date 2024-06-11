import type { FilteredMultiPropsItems, FilteredSinglePropItems, FilterPropValues, SortItems, SortOrder, SortProp } from "./types";

const getFloatValue = (value: string): number => parseFloat(value.replace(/\s/g, "").replace(",", "."));

export const sortItems = ({ items, prop, order }: { items: SortItems; prop: SortProp; order: SortOrder }): SortItems => {
  return items.slice().sort((a, b) => {
    console.log(prop, order);
    const [first, second] = order === "asc" ? [a, b] : [b, a];
    if (Array.isArray(first) && Array.isArray(second) && prop === "date") {
      const difference = first[0].localeCompare(second[0]);
      return difference === 0 ? first[1].localeCompare(second[1]) : difference;
    } else if (typeof first === "string" && typeof second === "string") {
      if (prop === "amount") return getFloatValue(first) - getFloatValue(second);
      else if (prop === "name") return first.toLowerCase().localeCompare(second.toLowerCase());
    }
    return 0;
  });
};

export const getIndexesArray = (length: number): number[] => Array.from({ length }).map((_, index) => index);

export const getReverseIndexesArray = (length: number): number[] => getIndexesArray(length).reverse();

export const compareSinglePropItemsToFilterPropValues = ({ items, filterPropValues }: { items: FilteredSinglePropItems; filterPropValues: FilterPropValues }): boolean =>
  items.every((item) => filterPropValues.includes(item));

export const compareMultiPropsItemsToFilterPropValues = ({ items, filterPropValues }: { items: FilteredMultiPropsItems; filterPropValues: FilterPropValues }): boolean =>
  items.every((item) => item.some((prop) => filterPropValues.includes(prop)));

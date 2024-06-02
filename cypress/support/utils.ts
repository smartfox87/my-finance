import { SortItems, SortOrder, SortProp } from "./types";

export const sortItems = ({ items, prop, order }: { items: SortItems; prop: SortProp; order: SortOrder }) => {
  return items.slice().sort((a, b) => {
    const [first, second] = order === "asc" ? [a, b] : [b, a];
    if (Array.isArray(first) && Array.isArray(second) && prop === "date") {
      const difference = first[0].localeCompare(second[0]);
      return difference === 0 ? first[1].localeCompare(second[1]) : difference;
    } else if (typeof first === "string" && typeof second === "string") {
      if (prop === "amount") return parseFloat(first.replace(/\s/g, "").replace(",", ".")) - parseFloat(second.replace(/\s/g, "").replace(",", "."));
      else if (prop === "name") return first.toLowerCase().localeCompare(second.toLowerCase());
    }
  });
};

export const getIndexesArray = (length: number) => Array.from({ length }).map((_, index) => index);

export const getReverseIndexesArray = (length: number) => getIndexesArray(length).reverse();

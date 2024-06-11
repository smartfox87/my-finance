import dictionary from "../fixtures/locales/en/default.json";

export type Dictionary = typeof dictionary;

export type SortProp = "name" | "date" | "amount";

export type SortOrder = "asc" | "desc";

interface BaseSortItem {
  created: string;
}

type SortProperties = {
  [key in SortProp]?: string;
};

export type SortItem = BaseSortItem & SortProperties;

export type SortItems = SortItem[];

export interface SelectedOptionData {
  label: string;
  value: number | string;
}

export type SelectedOptionsData = SelectedOptionData[];

export type FilterPropValues = string[];

export type FilteredSinglePropItems = string[];

export type FilteredMultiPropsItems = string[][];

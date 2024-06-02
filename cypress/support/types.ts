import dictionary from "../fixtures/locales/en/default.json";

export type Dictionary = typeof dictionary;

export type SortItem = string | [string, string];

export type SortItems = SortItem[];

export type SortProp = "name" | "date" | "amount";

export type SortOrder = "asc" | "desc";

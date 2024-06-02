import dictionary from "../fixtures/locales/en/default.json";

export type Dictionary = typeof dictionary;

export type SortItems = string[] | [string, string][];

export type SortProp = "name" | "date" | "amount";

export type SortOrder = "asc" | "desc";

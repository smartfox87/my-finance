import { FieldId, FieldIds, FieldValues } from "@/types/field";
import { DatesStrings } from "@/types/date";

type FilterValue = string | (string | FieldValues.ALL)[];

type FilterId = Exclude<FieldId, FieldIds.PERIOD>;

export type FilterCommonItem = { id: FilterId; value: FilterValue };

export type FilterPeriodItem = { id: FieldIds.PERIOD; value: DatesStrings };

export type FilterItem = FilterCommonItem | FilterPeriodItem;

export type FilterCommonStateItem = {
  [K in Exclude<FieldId, FieldIds.PERIOD>]?: FilterValue;
};

export type FilterPeriodStateItem = {
  [FieldIds.PERIOD]: DatesStrings;
};

export type FilterState = FilterCommonStateItem | Partial<FilterPeriodStateItem>;

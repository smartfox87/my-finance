import { getDatesPeriod, getPeriod } from "@/helpers/date.js";

export const INITIAL_STATISTICS_FILTER_FIELDS = [
  {
    id: "account",
    label_translation: "filter.account.label",
    type: "select",
    value: ["all"],
    options: [{ label_translation: "filter.account.options.all", value: "all" }],
    showSearch: true,
    multiple: true,
  },
  {
    id: "category",
    label_translation: "filter.category.label",
    type: "select",
    value: ["all"],
    options: [{ label_translation: "filter.category.options.all", value: "all" }],
    showSearch: true,
    multiple: true,
  },
  {
    id: "period",
    label_translation: "filter.period.label",
    type: "period",
    value: getDatesPeriod(undefined, getPeriod()),
  },
];

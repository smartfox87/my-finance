import { getDatesPeriod, getPeriod } from "@/helpers/date";

export const INITIAL_STATISTICS_FILTER_FIELDS = [
  {
    id: "account",
    label_translation: "complex.account.label",
    type: "select",
    value: ["all"],
    options: [{ label_translation: "complex.account.options.all", value: "all" }],
    showSearch: true,
    multiple: true,
  },
  {
    id: "category",
    label_translation: "complex.category.label",
    type: "select",
    value: ["all"],
    options: [{ label_translation: "complex.category.options.all", value: "all" }],
    showSearch: true,
    multiple: true,
  },
  {
    id: "period",
    label_translation: "complex.period.label",
    type: "period",
    value: getDatesPeriod(undefined, getPeriod()),
  },
];

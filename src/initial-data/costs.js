import { getDatesPeriod, getPeriod } from "@/helpers/date.js";

export const INITIAL_COSTS_FILTER_FIELDS = [
  {
    id: "sort",
    focus: true,
    label_translation: "filter.sort.label",
    type: "select",
    value: "date_desc",
    options_prefix: "filter.sort.options.prefix",
    options: [
      { label_translation: "filter.sort.options.name_asc", value: "name_asc" },
      { label_translation: "filter.sort.options.name_desc", value: "name_desc" },
      { label_translation: "filter.sort.options.date_asc", value: "date_asc" },
      { label_translation: "filter.sort.options.date_desc", value: "date_desc" },
      { label_translation: "filter.sort.options.amount_asc", value: "amount_asc" },
      { label_translation: "filter.sort.options.amount_desc", value: "amount_desc" },
    ],
  },
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

export const INITIAL_COST_FIELDS = [
  { id: "name", label_translation: "expense.name", value: "", maxLength: 1000, type: "textarea", required: true, focus: true },
  {
    id: "account",
    label_translation: "expense.account",
    value: "",
    type: "select",
    required: true,
    showSearch: true,
    options: [],
  },
  {
    id: "category",
    label_translation: "expense.category",
    value: "",
    type: "select",
    required: true,
    showSearch: true,
    options: [],
  },
  { id: "amount", label_translation: "expense.amount", value: "", type: "number", required: true },
  { id: "date", label_translation: "expense.date", value: "", type: "date", required: true, placeholder: "YYYY-MM-DD" },
];

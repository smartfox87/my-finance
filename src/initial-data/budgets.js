import { getDatesPeriod, getPeriod } from "@/helpers/date.js";

export const INITIAL_BUDGETS_FILTER_FIELDS = [
  {
    id: "sort",
    type: "select",
    label_translation: "filter.sort.label",
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
    id: "accounts",
    label_translation: "filter.account.label",
    type: "select",
    value: ["all"],
    options: [{ label_translation: "filter.account.options.all", value: "all" }],
    showSearch: true,
    multiple: true,
  },
  {
    id: "categories",
    type: "select",
    label_translation: "filter.category.label",
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

export const INITIAL_BUDGET_FIELDS = [
  { id: "name", label_translation: "budget.name", value: "", maxLength: 200, type: "textarea", required: true, focus: true },
  {
    id: "accounts",
    label_translation: "filter.account.label",
    value: ["all"],
    options: [{ label_translation: "filter.account.options.all", value: "all" }],
    type: "select",
    required: true,
    showSearch: true,
    multiple: true,
  },
  {
    id: "categories",
    label_translation: "budget.category",
    value: ["all"],
    options: [{ label_translation: "filter.category.options.all", value: "all" }],
    type: "select",
    required: true,
    showSearch: true,
    multiple: true,
  },
  { id: "amount", label_translation: "budget.amount", label_suffix: "", value: "", type: "number", required: true },
  {
    id: "period",
    label_translation: "filter.period.label",
    type: "period",
    value: getDatesPeriod(undefined, getPeriod()),
    required: true,
  },
];

import { getDatesPeriod, getPeriod } from "@/helpers/date.js";

export const INITIAL_BUDGETS_FILTER_FIELDS = [
  {
    id: "sort",
    type: "select",
    label_translation: "complex.sort.label",
    value: "date_desc",
    options_prefix: "complex.sort.options.prefix",
    options: [
      { label_translation: "complex.sort.options.name_asc", value: "name_asc" },
      { label_translation: "complex.sort.options.name_desc", value: "name_desc" },
      { label_translation: "complex.sort.options.date_asc", value: "date_asc" },
      { label_translation: "complex.sort.options.date_desc", value: "date_desc" },
      { label_translation: "complex.sort.options.amount_asc", value: "amount_asc" },
      { label_translation: "complex.sort.options.amount_desc", value: "amount_desc" },
    ],
  },
  {
    id: "accounts",
    label_translation: "complex.account.label",
    type: "select",
    value: ["all"],
    options: [{ label_translation: "complex.account.options.all", value: "all" }],
    showSearch: true,
    multiple: true,
  },
  {
    id: "categories",
    type: "select",
    label_translation: "complex.category.label",
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

export const INITIAL_BUDGET_FIELDS = [
  { id: "name", label_translation: "simple.name", value: "", maxLength: 200, type: "textarea", required: true, focus: true },
  {
    id: "accounts",
    label_translation: "complex.account.label",
    value: ["all"],
    options: [{ label_translation: "complex.account.options.all", value: "all" }],
    type: "select",
    required: true,
    showSearch: true,
    multiple: true,
  },
  {
    id: "categories",
    label_translation: "simple.category",
    value: ["all"],
    options: [{ label_translation: "complex.category.options.all", value: "all" }],
    type: "select",
    required: true,
    showSearch: true,
    multiple: true,
  },
  { id: "amount", label_translation: "simple.amount", label_suffix: "", value: "", type: "number", required: true },
  {
    id: "period",
    label_translation: "complex.period.label",
    type: "period",
    value: getDatesPeriod(undefined, getPeriod()),
    required: true,
  },
];

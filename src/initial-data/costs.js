import { getDatesPeriod, getPeriod } from "@/helpers/date";

export const INITIAL_COSTS_FILTER_FIELDS = [
  {
    id: "sort",
    focus: true,
    label_translation: "complex.sort.label",
    type: "select",
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

export const INITIAL_COST_FIELDS = [
  { id: "name", label_translation: "simple.name", value: "", maxLength: 1000, type: "textarea", required: true, focus: true },
  {
    id: "account",
    label_translation: "simple.account",
    value: "",
    type: "select",
    required: true,
    showSearch: true,
    options: [],
  },
  {
    id: "category",
    label_translation: "simple.category",
    value: "",
    type: "select",
    required: true,
    showSearch: true,
    options: [],
  },
  { id: "amount", label_translation: "simple.amount", value: "", type: "number", required: true },
  { id: "date", label_translation: "simple.date", value: "", type: "date", required: true, placeholder: "YYYY-MM-DD" },
];

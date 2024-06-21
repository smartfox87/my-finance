import { getDatesPeriod, getPeriod } from "@/helpers/date";
import { FieldTypes, ComplexFieldNames, SimplyFieldNames } from "@/types/form";
import { ACCOUNTS_FIELD, CATEGORIES_FIELD, PERIOD_FIELD, SORT_FIELD } from "@/constants/fields";

export const INITIAL_BUDGETS_FILTER_FIELDS = [SORT_FIELD, ACCOUNTS_FIELD, CATEGORIES_FIELD, PERIOD_FIELD];

export const INITIAL_BUDGET_FIELDS = [
  { id: "name", label_translation: "simple.name", value: "", maxLength: 200, type: "textarea", required: true, focus: true },
  {
    id: "accounts",
    label_translation: `complex.${ComplexFieldNames.ACCOUNT}.label`,
    value: ["all"],
    options: [{ label_translation: "complex.account.options.all", value: "all" }],
    type: FieldTypes.SELECT,
    required: true,
    showSearch: true,
    multiple: true,
  },
  {
    id: "categories",
    label_translation: `simple.${SimplyFieldNames.CATEGORY}`,
    value: ["all"],
    options: [{ label_translation: "complex.category.options.all", value: "all" }],
    type: FieldTypes.SELECT,
    required: true,
    showSearch: true,
    multiple: true,
  },
  { id: "amount", label_translation: "simple.amount", label_suffix: "", value: "", type: "number", required: true },
  {
    id: "period",
    label_translation: `complex.${ComplexFieldNames.PERIOD}.label`,
    type: FieldTypes.PERIOD,
    value: getDatesPeriod(undefined, getPeriod()),
    required: true,
  },
];

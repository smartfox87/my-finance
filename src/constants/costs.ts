import { FieldTypes, SimplyFieldNames } from "@/types/form";
import { ACCOUNT_FIELD, CATEGORY_FIELD, PERIOD_FIELD, SORT_FIELD } from "@/constants/fields";

export const INITIAL_COSTS_FILTER_FIELDS = [SORT_FIELD, ACCOUNT_FIELD, CATEGORY_FIELD, PERIOD_FIELD];

export const INITIAL_COST_FIELDS = [
  { id: "name", label_translation: "simple.name", value: "", maxLength: 1000, type: "textarea", required: true, focus: true },
  {
    id: "account",
    label_translation: `simple.${SimplyFieldNames.ACCOUNT}`,
    value: "",
    type: FieldTypes.SELECT,
    required: true,
    showSearch: true,
    options: [],
  },
  {
    id: "category",
    label_translation: `simple.${SimplyFieldNames.CATEGORY}`,
    value: "",
    type: FieldTypes.SELECT,
    required: true,
    showSearch: true,
    options: [],
  },
  { id: "amount", label_translation: "simple.amount", value: "", type: "number", required: true },
  { id: "date", label_translation: "simple.date", value: "", type: "date", required: true, placeholder: "YYYY-MM-DD" },
];

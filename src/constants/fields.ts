import { ComplexFieldNames, FieldTypes, FormField } from "@/types/form";
import { getDatesPeriod, getPeriod } from "@/helpers/date";

export const SORT_FIELD: FormField = {
  id: "sort",
  focus: true,
  label_translation: `complex.${ComplexFieldNames.SORT}.label`,
  type: FieldTypes.SELECT,
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
};

export const ACCOUNT_FIELD: FormField = {
  id: "account",
  label_translation: `complex.${ComplexFieldNames.ACCOUNT}.label`,
  type: FieldTypes.SELECT,
  value: ["all"],
  options: [{ label_translation: "complex.account.options.all", value: "all" }],
  showSearch: true,
  multiple: true,
};

export const CATEGORY_FIELD: FormField = {
  id: "category",
  label_translation: `complex.${ComplexFieldNames.CATEGORY}.label`,
  type: FieldTypes.SELECT,
  value: ["all"],
  options: [{ label_translation: "complex.category.options.all", value: "all" }],
  showSearch: true,
  multiple: true,
};

export const PERIOD_FIELD: FormField = {
  id: "period",
  label_translation: `complex.${ComplexFieldNames.PERIOD}.label`,
  type: FieldTypes.PERIOD,
  value: getDatesPeriod(undefined, getPeriod()),
};

export const ACCOUNTS_FIELD = {
  id: "accounts",
  label_translation: `complex.${ComplexFieldNames.ACCOUNT}.label`,
  type: FieldTypes.SELECT,
  value: ["all"],
  options: [{ label_translation: "complex.account.options.all", value: "all" }],
  showSearch: true,
  multiple: true,
};

export const CATEGORIES_FIELD = {
  id: "categories",
  type: FieldTypes.SELECT,
  label_translation: `complex.${ComplexFieldNames.CATEGORY}.label`,
  value: ["all"],
  options: [{ label_translation: "complex.category.options.all", value: "all" }],
  showSearch: true,
  multiple: true,
};

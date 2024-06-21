import { getDatesPeriod, getPeriod } from "@/helpers/date";
import { FieldTypes, ComplexFieldNames } from "@/types/form";

export const INITIAL_STATISTICS_FILTER_FIELDS = [
  {
    id: "account",
    label_translation: `complex.${ComplexFieldNames.ACCOUNT}.label`,
    type: FieldTypes.SELECT,
    value: ["all"],
    options: [{ label_translation: "complex.account.options.all", value: "all" }],
    showSearch: true,
    multiple: true,
  },
  {
    id: "category",
    label_translation: `complex.${ComplexFieldNames.CATEGORY}.label`,
    type: FieldTypes.SELECT,
    value: ["all"],
    options: [{ label_translation: "complex.category.options.all", value: "all" }],
    showSearch: true,
    multiple: true,
  },
  {
    id: "period",
    label_translation: `complex.${ComplexFieldNames.PERIOD}.label`,
    type: "period",
    value: getDatesPeriod(undefined, getPeriod()),
  },
];

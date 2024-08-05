import { DateFormField, DatesPeriodFormField, FileFormField, NumberFormField, RadioButtonsFormField, MultiSelectFormField, SingleSelectFormField, TextFormField } from "@/types/form";
import { getDatesPeriod, getPeriod, periodOptions } from "@/helpers/date";
import { PickerPeriods } from "@/types/date";
import { ComplexFieldNames, SelectFieldOptions, FieldTypes, SimpleFieldNames, SortFieldOptions, GenderFieldOptions, SubjectFieldOptions, FieldValues } from "@/types/field";
import { FieldIds } from "@/types/field";

export const SORT_FIELD: SingleSelectFormField<FieldIds.SORT, string> = {
  id: FieldIds.SORT,
  type: FieldTypes.SELECT,
  label: `complex.${ComplexFieldNames.SORT}.label`,
  value: "date_desc",
  options: [
    { label_translation: `complex.${ComplexFieldNames.SORT}.options.${SortFieldOptions.NAME_ASC}`, value: "name_asc" },
    { label_translation: `complex.${ComplexFieldNames.SORT}.options.${SortFieldOptions.NAME_DESC}`, value: "name_desc" },
    { label_translation: `complex.${ComplexFieldNames.SORT}.options.${SortFieldOptions.DATE_ASC}`, value: "date_asc" },
    { label_translation: `complex.${ComplexFieldNames.SORT}.options.${SortFieldOptions.DATE_DESC}`, value: "date_desc" },
    { label_translation: `complex.${ComplexFieldNames.SORT}.options.${SortFieldOptions.AMOUNT_ASC}`, value: "amount_asc" },
    { label_translation: `complex.${ComplexFieldNames.SORT}.options.${SortFieldOptions.AMOUNT_DESC}`, value: "amount_desc" },
  ],
  options_prefix: "complex.sort.options.prefix",
  focus: true,
};

export const ACCOUNT_FIELD: SingleSelectFormField<FieldIds.ACCOUNT> = {
  id: FieldIds.ACCOUNT,
  type: FieldTypes.SELECT,
  label: `complex.${ComplexFieldNames.ACCOUNT}.label`,
  value: "",
  options: [],
  required: true,
  showSearch: true,
};

export const FROM_ACCOUNT_FIELD: SingleSelectFormField<FieldIds.FROM, number | null> = {
  id: FieldIds.FROM,
  type: FieldTypes.SELECT,
  label: `complex.${ComplexFieldNames.ACCOUNT}.label`,
  value: null,
  options: [],
  required: true,
  showSearch: true,
};

export const TO_ACCOUNT_FIELD: SingleSelectFormField<FieldIds.TO, number | null> = {
  id: FieldIds.TO,
  type: FieldTypes.SELECT,
  label: `complex.${ComplexFieldNames.ACCOUNT}.label`,
  value: null,
  options: [],
  required: true,
  showSearch: true,
};

export const ACCOUNTS_FIELD: MultiSelectFormField = {
  id: FieldIds.ACCOUNTS,
  type: FieldTypes.MULTISELECT,
  label: `complex.${ComplexFieldNames.ACCOUNT}.label`,
  value: [FieldValues.ALL],
  options: [{ label_translation: `complex.${ComplexFieldNames.ACCOUNT}.options.${SelectFieldOptions.ALL}`, value: FieldValues.ALL }],
  showSearch: true,
  multiple: true,
};

export const CATEGORY_FIELD: SingleSelectFormField<FieldIds.CATEGORY> = {
  id: FieldIds.CATEGORY,
  type: FieldTypes.SELECT,
  label: `complex.${ComplexFieldNames.CATEGORY}.label`,
  value: "",
  options: [],
  required: true,
  showSearch: true,
};

export const CATEGORIES_FIELD: MultiSelectFormField = {
  id: FieldIds.CATEGORIES,
  type: FieldTypes.MULTISELECT,
  label: `complex.${ComplexFieldNames.CATEGORY}.label`,
  value: [FieldValues.ALL],
  options: [{ label_translation: `complex.${ComplexFieldNames.CATEGORY}.options.${SelectFieldOptions.ALL}`, value: FieldValues.ALL }],
  showSearch: true,
  multiple: true,
};

export const DATES_PERIOD_FIELD: DatesPeriodFormField = {
  id: FieldIds.PERIOD,
  type: FieldTypes.DATES_PERIOD,
  label: `complex.${ComplexFieldNames.PERIOD}.label`,
  value: getDatesPeriod(undefined, getPeriod()),
};

export const NAME_FIELD: TextFormField<FieldIds.NAME, FieldTypes.TEXTAREA> = {
  id: FieldIds.NAME,
  type: FieldTypes.TEXTAREA,
  label: `simple.${SimpleFieldNames.NAME}`,
  value: "",
  maxLength: 1000,
  required: true,
  focus: true,
};

export const AMOUNT_FIELD: NumberFormField<FieldIds.AMOUNT> = { id: FieldIds.AMOUNT, type: FieldTypes.NUMBER, label: `simple.${SimpleFieldNames.AMOUNT}`, label_suffix: "", value: "", required: true };

export const BALANCE_FIELD: NumberFormField<FieldIds.BALANCE> = { id: FieldIds.BALANCE, type: FieldTypes.NUMBER, label: `simple.${SimpleFieldNames.BALANCE}`, value: "", required: true };

export const DATE_FIELD: DateFormField<FieldIds.DATE> = {
  id: FieldIds.DATE,
  type: FieldTypes.DATE,
  label: `simple.${SimpleFieldNames.DATE}`,
  value: null,
  picker: PickerPeriods.DATE,
  required: true,
  placeholder: "YYYY-MM-DD",
};

export const CURRENCY_FIELD: SingleSelectFormField<FieldIds.CURRENCY, string> = {
  id: FieldIds.CURRENCY,
  type: FieldTypes.SELECT,
  label: `simple.${SimpleFieldNames.CURRENCY}`,
  value: "",
  options: [],
  required: true,
  showSearch: true,
  focus: true,
};

export const PERIOD_FIELD: RadioButtonsFormField = {
  id: FieldIds.PERIOD,
  type: FieldTypes.RADIO_BUTTONS,
  label: `simple.${SimpleFieldNames.PERIOD}`,
  value: "",
  options: periodOptions,
  required: true,
};

export const FULL_NAME_FIELD: TextFormField<FieldIds.FULL_NAME, FieldTypes.TEXT> = {
  id: FieldIds.FULL_NAME,
  type: FieldTypes.TEXT,
  label: `simple.${SimpleFieldNames.FULL_NAME}`,
  value: "",
  focus: true,
};

export const EMAIL_FIELD: TextFormField<FieldIds.EMAIL, FieldTypes.EMAIL> = {
  id: FieldIds.EMAIL,
  type: FieldTypes.EMAIL,
  label: `simple.${SimpleFieldNames.EMAIL}`,
  value: "",
  required: true,
};

export const BIRTHDATE_FIELD: DateFormField<FieldIds.BIRTHDATE> = {
  id: FieldIds.BIRTHDATE,
  type: FieldTypes.DATE,
  label: `simple.${SimpleFieldNames.BIRTHDATE}`,
  picker: PickerPeriods.DATE,
  value: null,
};

export const GENDER_FIELD: SingleSelectFormField<FieldIds.GENDER> = {
  id: FieldIds.GENDER,
  type: FieldTypes.SELECT,
  label: `complex.${ComplexFieldNames.GENDER}.label`,
  value: "",
  options: [
    { label_translation: `complex.${ComplexFieldNames.GENDER}.options.${GenderFieldOptions.FEMALE}`, value: "female" },
    { label_translation: `complex.${ComplexFieldNames.GENDER}.options.${GenderFieldOptions.MALE}`, value: "male" },
  ],
};

export const SUBJECT_FIELD: SingleSelectFormField = {
  id: FieldIds.SUBJECT,
  type: FieldTypes.SELECT,
  label: `complex.${ComplexFieldNames.SUBJECT}.label`,
  value: "",
  options: [
    { label_translation: `complex.${ComplexFieldNames.SUBJECT}.options.${SubjectFieldOptions.FEEDBACK}`, value: "feedback" },
    { label_translation: `complex.${ComplexFieldNames.SUBJECT}.options.${SubjectFieldOptions.BUG}`, value: "bug" },
    { label_translation: `complex.${ComplexFieldNames.SUBJECT}.options.${SubjectFieldOptions.SUPPORT}`, value: "support" },
    { label_translation: `complex.${ComplexFieldNames.SUBJECT}.options.${SubjectFieldOptions.SUGGESTION}`, value: "suggestion" },
    { label_translation: `complex.${ComplexFieldNames.SUBJECT}.options.${SubjectFieldOptions.COLLABORATION}`, value: "collaboration" },
    { label_translation: `complex.${ComplexFieldNames.SUBJECT}.options.${SubjectFieldOptions.OTHER}`, value: "other" },
  ],
  required: true,
};

export const MESSAGE_FIELD: TextFormField = {
  id: FieldIds.MESSAGE,
  type: FieldTypes.TEXTAREA,
  label: `simple.${SimpleFieldNames.MESSAGE}`,
  value: "",
  required: true,
};

export const FILES_FIELD: FileFormField = {
  id: FieldIds.FILES,
  type: FieldTypes.FILE,
  label: `simple.${SimpleFieldNames.ATTACHMENTS}`,
  value: [],
  maxCount: 3,
  multiple: true,
  accept: "image/*,video/*",
  maxSize: 5 * 1024 * 1024,
};

export const PASSWORD_FIELD: TextFormField<FieldIds.PASSWORD, FieldTypes.PASSWORD> = {
  id: FieldIds.PASSWORD,
  type: FieldTypes.PASSWORD,
  label: `simple.${SimpleFieldNames.PASSWORD}`,
  value: "",
  required: true,
};

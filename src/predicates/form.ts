import { DateFormFieldId, DatesPeriodFormFieldId, FileFormFieldId, MultiSelectFormFieldId, NumberFormFieldId, RadioButtonsFormFieldId, SingleSelectFormFieldId, TextFormFieldId } from "@/types/form";
import { FieldIds } from "@/types/field";

export const isSingleSelectFormFieldId = (id: string): id is SingleSelectFormFieldId =>
  FieldIds.SORT === id || FieldIds.ACCOUNT === id || FieldIds.CATEGORY === id || FieldIds.CURRENCY === id || FieldIds.GENDER === id || FieldIds.SUBJECT === id;

export const isMultiSelectFormFieldId = (id: string): id is MultiSelectFormFieldId => FieldIds.ACCOUNTS === id || FieldIds.CATEGORIES === id;

export const isRadioButtonsFormFieldId = (id: string): id is RadioButtonsFormFieldId => FieldIds.PERIOD === id;

export const isFileFormFieldId = (id: string): id is FileFormFieldId => FieldIds.FILES === id;

export const isDateFormFieldId = (id: string): id is DateFormFieldId => FieldIds.DATE === id || FieldIds.BIRTHDATE === id;

export const isDatesPeriodFormFieldId = (id: string): id is DatesPeriodFormFieldId => FieldIds.PERIOD === id;

export const isTextFormFieldId = (id: string): id is TextFormFieldId =>
  FieldIds.NAME === id || FieldIds.FULL_NAME === id || FieldIds.EMAIL === id || FieldIds.MESSAGE === id || FieldIds.PASSWORD === id;

export const isNumberFormFieldId = (id: string): id is NumberFormFieldId => FieldIds.AMOUNT === id || FieldIds.BALANCE === id;

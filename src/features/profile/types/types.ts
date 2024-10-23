import { FieldIds, FieldTypes } from "@/types/field";
import type { DatesPeriod } from "@/types/date";
import type { DateFormField, RadioButtonsFormField, SingleSelectFormField, TextFormField } from "@/types/form";

export interface ProfileData {
  [FieldIds.FULL_NAME]: string;
  [FieldIds.EMAIL]: string;
  [FieldIds.BIRTHDATE]: string | null;
  [FieldIds.GENDER]: string | null;
}

export interface SettingsData {
  [FieldIds.PERIOD]: DatesPeriod | null;
  [FieldIds.CURRENCY]: number | null;
}

interface Currency {
  id: number;
  code: string;
  symbol: string;
}

export interface Types {
  id: number;
  created_at: string;
  updated_at: string;
  [FieldIds.EMAIL]: string;
  [FieldIds.FULL_NAME]: string | null;
  [FieldIds.BIRTHDATE]: string | null;
  [FieldIds.GENDER]: string | null;
  [FieldIds.PERIOD]: DatesPeriod | null;
  [FieldIds.CURRENCY]: Currency | Currency[] | null;
}

export interface ProfileSliceState {
  profile: Types | null;
}

export type SettingsField = SingleSelectFormField<FieldIds.CURRENCY, number> | RadioButtonsFormField;

export type ProfileField =
  | TextFormField<FieldIds.FULL_NAME, FieldTypes.TEXT>
  | TextFormField<FieldIds.EMAIL, FieldTypes.EMAIL>
  | DateFormField<FieldIds.BIRTHDATE>
  | SingleSelectFormField<FieldIds.GENDER, string>;

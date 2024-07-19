import { type DatesPeriod } from "@/types/date";
import { FieldIds } from "@/types/field";

export type ProfileKey = FieldIds.EMAIL | FieldIds.FULL_NAME | FieldIds.BIRTHDATE | FieldIds.GENDER | FieldIds.PERIOD | FieldIds.CURRENCY;

export interface ProfileData {
  [FieldIds.FULL_NAME]: string | null;
  [FieldIds.BIRTHDATE]: string | null;
  [FieldIds.GENDER]: string | null;
  [FieldIds.PERIOD]: DatesPeriod | null;
  [FieldIds.CURRENCY]: number | null;
}

interface Currency {
  id: number;
  code: string;
  symbol: string;
}

export interface Profile {
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
  profile: Profile | null;
}

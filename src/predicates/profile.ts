import { FieldIds } from "@/types/field";
import { ProfileData, ProfileKey, SettingsData } from "@/types/profile";

export const isProfileKey = (key: string): key is ProfileKey =>
  FieldIds.EMAIL === key || FieldIds.FULL_NAME === key || FieldIds.BIRTHDATE === key || FieldIds.GENDER === key || FieldIds.PERIOD === key || FieldIds.CURRENCY === key;

export const isProfileData = (data: Record<string, any>): data is ProfileData => FieldIds.FULL_NAME in data && FieldIds.EMAIL in data && FieldIds.BIRTHDATE in data && FieldIds.GENDER in data;

export const isSettingsData = (data: Record<string, any>): data is SettingsData => FieldIds.PERIOD in data && FieldIds.CURRENCY in data;

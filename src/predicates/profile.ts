import { FieldIds } from "@/types/field";
import { ProfileData, SettingsData } from "@/types/profile";

export const isProfileData = (data: Record<string, any>): data is ProfileData => FieldIds.FULL_NAME in data && FieldIds.EMAIL in data && FieldIds.BIRTHDATE in data && FieldIds.GENDER in data;

export const isSettingsData = (data: Record<string, any>): data is SettingsData => FieldIds.PERIOD in data && FieldIds.CURRENCY in data;

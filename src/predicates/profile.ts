import { FieldIds } from "@/types/field";
import { ProfileKey } from "@/types/profile";

export const isProfileKey = (key: string): key is ProfileKey =>
  FieldIds.EMAIL === key || FieldIds.FULL_NAME === key || FieldIds.BIRTHDATE === key || FieldIds.GENDER === key || FieldIds.PERIOD === key || FieldIds.CURRENCY === key;

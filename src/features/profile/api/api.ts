import { apiClient } from "@/lib/api-client";
import { getUserId } from "@/helpers/localStorage";
import { getCurrentDate } from "@/helpers/date";
import type { ProfileData, SettingsData } from "../types";

export const getProfileApi = () =>
  apiClient.from("profiles").select("id, created_at, updated_at, email, full_name, birthdate, gender, period, currency(id, code, symbol)").eq("id", getUserId()).single();

export const updateProfileApi = (userData: Partial<ProfileData | SettingsData>) =>
  apiClient
    .from("profiles")
    .update({ ...userData, updated_at: getCurrentDate() })
    .eq("id", getUserId())
    .select("id, created_at, updated_at, email, full_name, birthdate, gender, period, currency(id, code, symbol)")
    .single();

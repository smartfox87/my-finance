import { supabase } from "@/api/supabase";
import { getUserId } from "@/helpers/localStorage.js";
import { replacedEmptyValuesOnNull } from "@/helpers/processData.js";
import { getCurrentDate } from "@/helpers/date";
import { ProfileData } from "@/types/profile";

export const getProfileApi = () =>
  supabase.from("profiles").select("id, created_at, updated_at, email, full_name, birthdate, gender, period, currency(id, code, symbol)").eq("id", getUserId()).single();

export const updateProfileApi = (userData: ProfileData) =>
  supabase
    .from("profiles")
    .update({ ...replacedEmptyValuesOnNull(userData), updated_at: getCurrentDate() })
    .eq("id", getUserId())
    .select("id, created_at, updated_at, email, full_name, birthdate, gender, period, currency(id, code, symbol)")
    .single();

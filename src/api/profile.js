import { supabase } from "@/api/supabase.js";
import { getUserId } from "@/helpers/localStorage.js";
import { replacedEmptyValuesOnNull } from "@/helpers/processData.js";
import { getCurrentDate } from "@/helpers/date";

export const getProfileApi = () =>
  supabase.from("profiles").select("id, created_at, updated_at, email, full_name, birthdate, gender, period, currency(id, code, symbol)").eq("id", getUserId()).maybeSingle();

export const updateProfileApi = (userData) =>
  supabase
    .from("profiles")
    .update({ ...replacedEmptyValuesOnNull(userData), updated_at: getCurrentDate() })
    .eq("id", getUserId())
    .select("*, currency(id, code, symbol)")
    .single();

import { supabase } from "@/api/supabase.js";
import { getUserId } from "@/helpers/localStorage.js";
import { getCurrentDate } from "@/helpers/date.js";

export const getCostsListApi = ({ period: [from, to] }) =>
  supabase.from("costs").select("created_at, id, name, amount, date, category, account").eq("user_id", getUserId()).gte("date", from).lte("date", to);

export const getCostItemApi = (costId) => supabase.from("costs").select("id, name, amount, date, category, account").match({ user_id: getUserId(), id: costId }).single();

export const createCostItemApi = (costData) =>
  supabase
    .from("costs")
    .insert({ ...costData, user_id: getUserId() })
    .select()
    .single();

export const deleteCostItemApi = (costId) => supabase.from("costs").delete().match({ user_id: getUserId(), id: costId });

export const updateCostItemApi = ({ costId, costData }) =>
  supabase
    .from("costs")
    .update({ ...costData, updated_at: getCurrentDate() })
    .match({ user_id: getUserId(), id: costId })
    .select("id, name, amount, date, category, account")
    .single();

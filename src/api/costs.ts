import { supabase } from "@/api/supabase";
import { getUserId } from "@/helpers/localStorage.js";
import { DatesValues, getCurrentDate } from "@/helpers/date";
import { CostItemData } from "@/types/costs";

export const getCostsListApi = ({ period: [from, to] }: { period: DatesValues }) =>
  supabase.from("costs").select("created_at, id, name, amount, date, category, account").eq("user_id", getUserId()).gte("date", from).lte("date", to);

export const getCostItemApi = (costId: string) => supabase.from("costs").select("id, name, amount, date, category, account").match({ user_id: getUserId(), id: costId }).single();

export const createCostItemApi = (costData: CostItemData) =>
  supabase
    .from("costs")
    .insert({ ...costData, user_id: getUserId() })
    .select("created_at, id, name, amount, date, category, account")
    .single();

export const deleteCostItemApi = (costId: number) =>
  supabase.from("costs").delete().match({ user_id: getUserId(), id: costId }).select("created_at, id, name, amount, date, category, account").single();

export const updateCostItemApi = ({ costId, costData }: { costId: number; costData: CostItemData }) =>
  supabase
    .from("costs")
    .update({ ...costData, updated_at: getCurrentDate() })
    .match({ user_id: getUserId(), id: costId })
    .select("id, name, amount, date, category, account")
    .single();

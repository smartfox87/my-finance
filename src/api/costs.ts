import { supabaseClient } from "@/api/supabaseClient";
import { getUserId } from "@/helpers/localStorage";
import { getCurrentDate } from "@/helpers/date";
import type { CostItemData } from "@/types/costs";
import { FieldIds } from "@/types/field";
import { FilterPeriodStateItem } from "@/types/filter";

export const getCostsListApi = (filter: FilterPeriodStateItem) => {
  const [from, to] = filter[FieldIds.PERIOD];
  return supabaseClient.from("costs").select("created_at, id, name, amount, date, category, account").eq("user_id", getUserId()).gte("date", from).lte("date", to);
};

export const getCostItemApi = (costId: string) => supabaseClient.from("costs").select("created_at, id, name, amount, date, category, account").match({ user_id: getUserId(), id: costId }).single();

export const createCostItemApi = (costData: CostItemData) =>
  supabaseClient
    .from("costs")
    .insert({ ...costData, user_id: getUserId() })
    .select("created_at, id, name, amount, date, category, account")
    .single();

export const deleteCostItemApi = (costId: number) =>
  supabaseClient.from("costs").delete().match({ user_id: getUserId(), id: costId }).select("created_at, id, name, amount, date, category, account").single();

export const updateCostItemApi = ({ costId, costData }: { costId: number; costData: CostItemData }) =>
  supabaseClient
    .from("costs")
    .update({ ...costData, updated_at: getCurrentDate() })
    .match({ user_id: getUserId(), id: costId })
    .select("created_at, id, name, amount, date, category, account")
    .single();

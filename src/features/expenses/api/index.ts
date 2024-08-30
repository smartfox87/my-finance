import { apiClient } from "@/lib/api-client";
import { getUserId } from "@/helpers/localStorage";
import { getCurrentDate } from "@/helpers/date";
import { FieldIds } from "@/types/field";
import type { FilterPeriodStateItem } from "@/types/filter";
import type { CostItemData } from "../types";

export const getCostsListApi = (filter: FilterPeriodStateItem) => {
  const [from, to] = filter[FieldIds.PERIOD];
  return apiClient.from("costs").select("created_at, id, name, amount, date, category, account").eq("user_id", getUserId()).gte("date", from).lte("date", to);
};

export const getCostItemApi = (costId: string) => apiClient.from("costs").select("created_at, id, name, amount, date, category, account").match({ user_id: getUserId(), id: costId }).single();

export const createCostItemApi = (costData: CostItemData) =>
  apiClient
    .from("costs")
    .insert({ ...costData, user_id: getUserId() })
    .select("created_at, id, name, amount, date, category, account")
    .single();

export const deleteCostItemApi = (costId: number) =>
  apiClient.from("costs").delete().match({ user_id: getUserId(), id: costId }).select("created_at, id, name, amount, date, category, account").single();

export const updateCostItemApi = ({ costId, costData }: { costId: number; costData: CostItemData }) =>
  apiClient
    .from("costs")
    .update({ ...costData, updated_at: getCurrentDate() })
    .match({ user_id: getUserId(), id: costId })
    .select("created_at, id, name, amount, date, category, account")
    .single();

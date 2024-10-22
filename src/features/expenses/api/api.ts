import { apiClient } from "@/libs/api-client";
import { getUserId } from "@/utils/get-user-id";
import { getCurrentISODate } from "@/utils/get-current-iso-date";
import { FieldIds } from "@/types/field";
import type { FilterPeriodStateItem } from "@/features/filter";
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
    .update({ ...costData, updated_at: getCurrentISODate() })
    .match({ user_id: getUserId(), id: costId })
    .select("created_at, id, name, amount, date, category, account")
    .single();
